# ta-portfolio

Personal portfolio of Younsoo Lim, Technical Artist. The site presents technology research and validation through real-time rendering, character animation pipelines, and 3D creation tools. Hosted on GitHub Pages at ta.tommlimm.net.

For project narratives, editing locations, and evidence-record navigation, start with [map.md](map.md).

## Shotloom case study

The Shotloom homepage card, case study, and SceneGen flow illustration are included in the public portfolio. The case study covers core 3D workflows, company service integration, and accessible editing. SceneGen illustrates one of several Shotloom use cases: in this example, Shotloom’s 3D editing and scene video output connect CINEV’s image input with final video generation. The product reached development-server deployment; publication of this case study does not imply a product launch.

## Projects

| Project | Scope | Description |
|---------|------|-------------|
| Shotloom | Company project; product reached dev deployment | Retargeting, editor UX/frontend, and engineering handoff |
| NPR Shading & Look Development | Cinev Studio company project | Research, look development, and lighting decisions |
| Character System | Cinev Studio company project | Artist authoring tools and runtime character loading |
| UE5 Profiling | Cinev Studio company project | GPU profiling and documented optimization decisions |
| PMX to VRM | Internal R&D; not integrated into Studio | Conversion for the existing VRM import path; internally validated |
| Matcap Painter | Personal tool shared with the character team | Real-time texture editing used for metal and plastic character details |
| MMD Player | Personal tool; sole user | Source-model verification and WebGPU motion experiments |
| Live UE Scene Bridge | Internal R&D PoC | Natural language UE scene control and AI generation integration |

## Tech Stack

- **Hosting** — GitHub Pages + custom domain
- **Styling** — Tailwind CSS + custom CSS variables
- **Language** — Korean by default; English content is paired with `data-ko` attributes
- **Legacy encryption** — AES-256-GCM helpers remain in `js/auth.js` and `js/crypto.js`; the current checked-in project pages contain plain HTML

## Structure

```
index.html               # Landing page
resume.html              # Single-column, two-page A4 resume source
assets/resume.pdf        # Download linked from the homepage; regenerate after resume edits
projects/                # 8 published case studies
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

The Korean resume is maintained directly in `resume.html`. Regenerate `assets/resume.pdf` after edits and check both A4 pages, text reading order, and contact links before release.

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
