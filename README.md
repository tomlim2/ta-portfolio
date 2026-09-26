# ta-portfolio

Personal portfolio of Younsoo Lim, Technical Artist. The site presents technology research and validation through real-time rendering, character animation pipelines, and 3D creation tools. Hosted on GitHub Pages at ta.tommlimm.net.

For project narratives, editing locations, and evidence-record navigation, start with [map.md](map.md).

## Design and page authoring

- [Current style guide](docs/style-guide.md): colors, typography, spacing, responsive layouts, media, and interaction rules.
- [Component Library](component-library.html): visual examples using the shared CSS, including project cards and the image viewer.
- [Project authoring guide](docs/project-template.md) and [HTML starter](projects/_template.html): migrate one project at a time.

These internal references are excluded from `site-public.json`. Preview them locally from the repository root with `python3 -m http.server 8781 --bind 127.0.0.1`, then open `/component-library.html` or `/projects/_template.html`. The normal `_site/` preview does not include them. The February documents in `docs/plans/` are historical plans, not the current style specification.

## Design portfolio home

`design/index.html` presents all six projects from the original design portfolio using the shared navigation, card layout, language preference, and footer. Its hero starts directly with the original Vimeo demo reel. Both homepages link to each other in their footers. All six design cards now open local case studies under `projects/`; their legacy `children/` paths redirect to the new pages. Junkyard also includes six original interactive demos at their existing local paths. Command G retains its separately hosted demo link. Source assets, migration changes, and verification limits are recorded in [the migration notes](docs/design-portfolio-migration.md).

## Shotloom case study

Shotloom is the fourth Projects card, after NPR Shading & Look Development, Character System, and UE5 Profiling. Its homepage card and case-study hero use the approved `assets/images/shotloom/thumbnail-editor-v2.png`, labeled as an AI-retouched thumbnail. Original development screenshots remain in the case study. Direct access is also available: `/shotloom` redirects to `/projects/shotloom.html`. The case study covers core 3D workflows, company service integration, and accessible editing. SceneGen illustrates one of several Shotloom use cases: in this example, Shotloom’s 3D editing and scene video output connect CINEV’s image input with final video generation. The product reached development-server deployment; publication of this case study does not imply a product launch.

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
- **Language** — The footer dropdown follows browser preferences initially and saves explicit choices; English content is paired with `data-ko` attributes
- **Legacy encryption** — AES-256-GCM helpers remain in `js/auth.js` and `js/crypto.js`; the current checked-in project pages contain plain HTML

## Structure

```
index.html               # Landing page
resume.html              # Single-column, two-page A4 resume source
resume-viewer.html       # Direct-link fallback for the resume modal
assets/resume.pdf        # Download from the preview; regenerate after resume edits
projects/                # 8 published case studies
shotloom/index.html      # Direct-entry redirect to the Shotloom case study
css/style.css            # Shared portfolio styles
css/preview-modal.css    # Common preview shell and icon toolbar
js/preview-modal.js      # Shared close, focus and scroll behavior
js/                      # Shared behavior, including image and resume previews
assets/                  # Images, resume PDF, cursors
site-public.json         # Explicit publication manifest
scripts/                 # Site validation and release-note generation
releases/                # Optional editorial notes for individual version tags
.github/workflows/       # Validation and tag-triggered release/deployment
tools/drafts/            # Local, gitignored unpublished work
tools/career-notes/      # Local, gitignored interview, evidence, and revision records
```

## Editing content

All on-demand previews use the shared modal: content name on the left, contextual actions on the right, and close always rightmost. Image and resume previews use the same shell. The resume preview shows the PDF filename and offers a separate download action. See the [preview rules](docs/style-guide.md#모든-미리보기는-모달).

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
