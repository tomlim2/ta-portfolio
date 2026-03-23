# ta-portfolio

Personal portfolio site for a Technical Artist specializing in Unreal Engine 5, NPR shaders, character systems, and pipeline tools. Deployed on GitHub Pages.

## Projects

| Project | Type | Description |
|---------|------|-------------|
| Character System | NDA | UE5 character creation and management pipeline |
| Megamelange | NDA | Unreal Engine project |
| PMX to VRM | NDA | 3D model format conversion pipeline |
| NPR Shader | Public | Non-photorealistic rendering shader system |
| Matcap Painter | Public | Web-based matcap texture painting tool |
| MMD Player | Public | MikuMikuDance animation player (Three.js WebGPU) |

## Tech Stack

- **Hosting** — GitHub Pages + custom domain
- **Styling** — Tailwind CSS + custom CSS variables
- **NDA Protection** — Client-side AES-256-GCM encryption for protected projects

## Structure

```
index.html               # Landing page
resume.html              # Resume
projects/                # 6 project detail pages (3 encrypted, 3 public)
css/style.css            # Custom styles
js/                      # main.js, auth.js, crypto.js
assets/                  # Images, cursors, resume PDF
tools/reencrypt.mjs      # NDA page encryption script
```
