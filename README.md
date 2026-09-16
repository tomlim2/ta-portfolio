# ta-portfolio

Personal portfolio of Younsoo Lim, Technical Artist. The site presents technology research and validation through real-time rendering, character animation pipelines, and 3D creation tools. Hosted on GitHub Pages at ta.tommlimm.net.

## Local Shotloom preview

This branch, `codex/shotloom-preview`, enables the Shotloom homepage card and case study for local review. Shotloom is included in this branch's build manifest. The live website remains on the published `main` version. Keep this branch local until publication is explicitly requested; pushing it to this public repository would expose the draft. No release tag is needed for previewing.

## Projects

| Project | Scope | Description |
|---------|------|-------------|
| Shotloom | Local portfolio draft; product reached dev deployment | Retargeting, editor UX/frontend, and engineering handoff |
| NPR Shading & Look Development | CineV company project | Research, look development, and lighting decisions |
| Character System | CineV company project | Artist authoring tools and runtime character loading |
| UE5 Profiling | CineV company project | GPU profiling and documented optimization decisions |
| PMX to VRM | Production pipeline | Conversion into the existing VRM import path |
| Matcap Painter | Personal tool | Real-time texture editing and 3D preview |
| MMD Player | Personal tool | Source-model verification and WebGPU motion experiments |
| Live UE Scene Bridge | Internal R&D PoC | Natural language UE scene control and AI generation integration |

## Tech Stack

- **Hosting** — GitHub Pages + custom domain
- **Styling** — Tailwind CSS + custom CSS variables
- **Language** — Korean by default; English content is paired with `data-ko` attributes
- **Legacy encryption** — AES-256-GCM helpers remain in `js/auth.js` and `js/crypto.js`; the current checked-in project pages contain plain HTML

## Structure

```
index.html               # Landing page
resume.html              # A4 resume source
assets/resume.pdf        # Download linked from the homepage; regenerate after resume edits
projects/                # 7 published case studies + Shotloom preview
css/style.css            # Shared portfolio styles
js/                      # main.js, auth.js, crypto.js
assets/                  # Images, resume PDF, cursors
site-public.json         # Explicit publication manifest
scripts/                 # Site validation and release-note generation
releases/                # Optional editorial notes for individual version tags
.github/workflows/       # Validation and tag-triggered release/deployment
tools/drafts/            # Local, gitignored unpublished work
tools/career-notes/      # Local, gitignored interview, evidence, and revision records
```

## Editing content

Update both the English element content and its Korean `data-ko` value. Keep role ownership, implementation status, and measurement scope consistent across the homepage, case studies, and resume. Legacy encryption scripts expect `projects/originals/`, which is absent from this checkout; do not run them against incomplete source files.

Build the actual public bundle, then preview it with a static HTTP server:

```sh
python3 scripts/build_site.py
python3 -m http.server 8780 --directory _site
```

The build copies only `site-public.json` entries, then checks local links, anchors, CSS asset references, headings, and malformed text. Repository metadata, developer documentation, and local drafts are not published. Add new public pages and asset directories to the manifest deliberately. Check desktop/mobile layouts and the language toggle before releasing.

## Release and deployment

Pushing `main` runs validation. Deployment runs only when a stable version tag such as `v1.0.1` is pushed. Tags must point to a commit in `main` history. The workflow follows the [GitHub Pages custom workflow setup](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

```sh
# After committing the reviewed changes:
git push origin main
git tag -a v1.0.1 -m "Update portfolio"
git push origin v1.0.1
```

Use a new version each time. The workflow validates the publication bundle, deploys that tagged commit to GitHub Pages, then publishes its GitHub Release. The release includes the changes since the preceding version tag and the deployed commit. For the first release, the commit list contains the tagged commit. To add a human-written summary, commit `releases/<tag>.md` before creating the tag; it is included above the generated commit list. Without that file, notes are generated automatically.

In repository settings, Pages must use **GitHub Actions** and the `github-pages` environment must allow `v*` tags. The workflow uses the built-in `GITHUB_TOKEN`; no extra deployment token is required. Failed runs can be retried from Actions; the release step updates an existing release for the same tag instead of duplicating it.
