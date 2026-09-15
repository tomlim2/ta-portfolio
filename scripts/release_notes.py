"""Create tag-specific release notes, with a commit list since the preceding tag."""

import argparse
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def git(*args):
    return subprocess.check_output(["git", *args], cwd=ROOT, text=True, stderr=subprocess.DEVNULL).strip()


def generate(tag, repository):
    if not re.fullmatch(r"v\d+\.\d+\.\d+", tag):
        raise ValueError("Use a stable version tag such as v1.0.0")
    if not re.fullmatch(r"[\w.-]+/[\w.-]+", repository):
        raise ValueError("Expected owner/repository")
    commit = git("rev-parse", f"{tag}^{{commit}}")
    try:
        previous = git("describe", "--tags", "--abbrev=0", "--match", "v[0-9]*.[0-9]*.[0-9]*", f"{tag}^")
    except subprocess.CalledProcessError:
        previous = None
    curated = ROOT / "releases" / f"{tag}.md"
    notes = [curated.read_text().strip() if curated.exists() else f"TA 포트폴리오 {tag} 업데이트."]
    log_args = ["log", "--format=%H%x09%s"]
    log_args += [f"{previous}..{tag}"] if previous else ["-1", tag]
    changes = []
    for line in git(*log_args).splitlines():
        sha, subject = line.split("\t", 1)
        changes.append(f"- {subject} ([{sha[:7]}](https://github.com/{repository}/commit/{sha}))")
    notes += ["## 변경 커밋\n\n" + "\n".join(changes)]
    if previous:
        notes.append(f"[전체 변경: {previous} → {tag}](https://github.com/{repository}/compare/{previous}...{tag})")
    notes.append(f"## 배포\n\n- 사이트: https://ta.tommlimm.net/\n- 버전: `{tag}`\n- 커밋: `{commit}`\n- 공개 파일 검증과 GitHub Pages 배포 완료 후 생성된 릴리즈입니다.")
    return "\n\n".join(notes) + "\n"


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("tag")
    parser.add_argument("--repository", required=True)
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()
    args.output.write_text(generate(args.tag, args.repository))
