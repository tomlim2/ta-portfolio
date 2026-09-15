"""Build and validate only the explicitly published portfolio files (stdlib only)."""

import json
import re
import shutil
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "_site"


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.references = []
        self.errors = []
        self.h1_count = 0
        self.feed(text)
        if "\ufffd" in text:
            self.errors.append("Invalid replacement character in HTML")
        if self.h1_count != 1:
            self.errors.append(f"Expected one h1, found {self.h1_count}")

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.h1_count += tag == "h1"
        if attrs.get("id"):
            if attrs["id"] in self.ids:
                self.errors.append(f"Duplicate id: {attrs['id']}")
            self.ids.add(attrs["id"])
        for key in ("href", "src", "poster"):
            if attrs.get(key):
                self.references.append(attrs[key])


def source_path(relative):
    path = ROOT / relative
    if not path.resolve().is_relative_to(ROOT) or path.is_symlink():
        raise ValueError(f"Unsafe source path: {relative}")
    if not path.is_file():
        raise ValueError(f"Missing source file: {relative}")
    return path


def build():
    manifest = json.loads((ROOT / "site-public.json").read_text())
    files = set(manifest["files"])
    for directory in manifest["directories"]:
        folder = ROOT / directory
        if not folder.is_dir() or folder.is_symlink() or not folder.resolve().is_relative_to(ROOT):
            raise ValueError(f"Invalid public directory: {directory}")
        for path in folder.rglob("*"):
            if path.is_symlink():
                raise ValueError(f"Symlink in public directory: {path}")
            if path.is_file() and not any(p.startswith(".") for p in path.relative_to(folder).parts):
                files.add(path.relative_to(ROOT).as_posix())

    # Rebuild a dedicated output folder; repository metadata and local notes stay out.
    if OUTPUT.exists():
        if OUTPUT.is_symlink():
            raise ValueError("Output must not be a symlink")
        shutil.rmtree(OUTPUT)
    for relative in sorted(files):
        source = source_path(relative)
        destination = OUTPUT / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, destination)

    pages = {p: Page(p.read_text()) for p in OUTPUT.rglob("*.html")}
    errors = [f"{p.relative_to(OUTPUT)}: {error}" for p, page in pages.items() for error in page.errors]
    reference_count = 0

    def check_reference(source, reference):
        nonlocal reference_count
        url = urlsplit(reference)
        if url.scheme or url.netloc:
            return
        reference_count += 1
        path = unquote(url.path)
        target = ((OUTPUT / path.lstrip("/")) if path.startswith("/") else (source.parent / path)).resolve() if path else source.resolve()
        if target.is_dir():
            target /= "index.html"
        if not target.is_relative_to(OUTPUT) or not target.is_file():
            errors.append(f"{source.relative_to(OUTPUT)}: Missing public target {reference}")
        elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
            errors.append(f"{source.relative_to(OUTPUT)}: Missing anchor {reference}")

    for path, page in pages.items():
        for reference in page.references:
            check_reference(path, reference)
    for path in OUTPUT.rglob("*.css"):
        for reference in re.findall(r"url\(\s*['\"]?([^)'\"]+)", path.read_text()):
            check_reference(path, reference)
    if errors:
        raise ValueError("\n".join(errors))
    print(f"Validated {len(pages)} pages and {reference_count} local references; published {len(files)} files to _site/")


if __name__ == "__main__":
    build()
