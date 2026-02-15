# TA Portfolio Site Design

## Overview

Technical Artist portfolio site with public projects and password-protected NDA section.

## Decisions

| Item | Decision |
|------|----------|
| Tech stack | HTML + Tailwind CSS (CDN) |
| Hosting | GitHub Pages |
| Visual tone | Dark + minimal (pure black background) |
| Page structure | Hybrid: main single-page + project detail pages |
| NDA protection | Client-side AES encryption with shared password |
| Media types | Video embeds, images, interactive demos (all) |
| Work categories | Shaders, Tools, VFX, and other TA work |
| Project filter | None (removed for simplicity) |
| Grid layout | 2-column cards on desktop, 1-column on mobile |

## Site Structure

```
index.html              Main page (Hero + Projects + About + Contact)
private.html            Password gate + AES-decrypted NDA projects
projects/
  {project-name}.html   Individual project detail pages
css/
  style.css             Custom styles on top of Tailwind CDN
js/
  main.js               Navigation, scroll animations
  crypto.js             AES encrypt/decrypt utilities
assets/
  images/               Thumbnails, screenshots
tools/
  encrypt.html          Dev-only: encrypt NDA content before deploy
```

## Main Page Sections

1. **Nav** - Fixed top bar: Projects | About | Contact | Private (lock icon)
2. **Hero** - Full-screen, name + "Technical Artist" + tagline
3. **Projects** - 2-column card grid, no filter. Each card: thumbnail (hover preview) + title + tags + description
4. **About** - Brief intro + skill tags
5. **Contact** - Email, GitHub, LinkedIn links
6. **Footer** - Copyright

## Project Detail Page

- Back button to main
- Title + tags
- Hero media (video/image/demo)
- Overview section
- Technical Breakdown section (with images)
- Results section
- Prev/Next project navigation

## Private Section (private.html)

- Password input field
- On correct password: AES-decrypt encrypted HTML blob → render NDA project cards
- Encrypted content stored as base64 in the HTML
- Source code never contains plaintext NDA content
- `tools/encrypt.html` used locally to encrypt content before committing

## Color System

| Token | Value | Usage |
|-------|-------|-------|
| bg | #000000 | Page background |
| surface | #0a0a0a | Card backgrounds |
| border | #1a1a1a | Borders, dividers |
| muted | #555555 | Secondary text |
| accent | #3b82f6 | Interactive highlights |
| white | #ffffff | Primary text |

## Wireframe

See `wireframe.html` in project root for visual reference.
