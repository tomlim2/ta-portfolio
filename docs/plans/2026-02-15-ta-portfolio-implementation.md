# TA Portfolio Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a dark minimal TA portfolio site with public projects and AES-encrypted private NDA section.

**Architecture:** Static HTML + Tailwind CDN. Single-page main with scroll sections. Separate HTML files per project detail. Private page uses Web Crypto API for AES-GCM decryption of encrypted NDA content blobs. No build tools, no frameworks.

**Tech Stack:** HTML5, Tailwind CSS (CDN), Vanilla JavaScript, Web Crypto API (AES-GCM)

**Design Reference:** `wireframe.html` (visual), `docs/plans/2026-02-15-ta-portfolio-design.md` (spec)

---

### Task 1: Project scaffolding

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/main.js`

**Step 1: Create directory structure**

```bash
mkdir -p css js assets/images projects tools
```

**Step 2: Create index.html with base template**

Create `index.html` with:
- DOCTYPE, charset, viewport meta
- Tailwind CDN script with custom color config (bg: #000, surface: #0a0a0a, border: #1a1a1a, muted: #555, accent: #3b82f6)
- Empty `<body class="bg-bg text-white">`
- Link to `css/style.css` and `js/main.js`
- Google Fonts: Inter

**Step 3: Create css/style.css**

Minimal custom styles:
- `scroll-behavior: smooth`
- Card hover effects
- Tag font sizing

**Step 4: Create js/main.js**

Empty file with comment: `// TA Portfolio - Main JS`

**Step 5: Verify in browser**

Open `index.html` in browser. Should show black page with no errors in console.

**Step 6: Commit**

```bash
git add index.html css/style.css js/main.js
git commit -m "feat: project scaffolding with Tailwind CDN"
```

---

### Task 2: Navigation bar

**Files:**
- Modify: `index.html`

**Step 1: Add fixed nav bar**

Inside `<body>`, add `<nav>` element:
- Fixed top, full width, z-50
- `bg-bg/80 backdrop-blur-md border-b border-border`
- Left: site name "YOUNSOO LIM" (link to top)
- Right: `Projects` | `About` | `Contact` | `Private` (with lock SVG icon)
- All links use `#section-id` anchors except Private → `private.html`
- Height: h-14, max-width: max-w-6xl centered

**Step 2: Verify in browser**

Nav should be visible, fixed at top, with blur effect. Links should be muted color, white on hover.

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add fixed navigation bar"
```

---

### Task 3: Hero section

**Files:**
- Modify: `index.html`

**Step 1: Add hero section**

After nav, add `<section>`:
- Full viewport height: `h-screen`
- Flex centered content
- "Technical Artist" label: `text-muted text-sm tracking-widest uppercase`
- Name "Younsoo Lim": `text-5xl md:text-7xl font-bold tracking-tight`
- Tagline: `text-muted text-lg max-w-xl`
- Scroll down arrow with `animate-bounce`

**Step 2: Verify in browser**

Full-screen hero with centered text on pure black background.

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add hero section"
```

---

### Task 4: Projects grid section

**Files:**
- Modify: `index.html`

**Step 1: Add projects section**

After hero, add `<section id="projects">`:
- `max-w-6xl mx-auto px-6 py-24`
- "Projects" heading: `text-2xl font-bold mb-8`
- Grid: `grid grid-cols-1 md:grid-cols-2 gap-6`
- 6 placeholder project cards:
  - Each card: `<a>` wrapping the card (links to `projects/{name}.html`)
  - `bg-surface rounded-lg overflow-hidden border border-border`
  - Thumbnail area: `aspect-video` with gradient placeholder
  - Hover overlay: "View Project →"
  - Content: title (`text-lg font-medium`), description (`text-muted text-sm`), tags
  - Tags: small colored pills (category-specific colors)

Placeholder projects:
1. Custom Toon Shader (Shader, UE5)
2. Asset Pipeline Automation (Tool, Python)
3. Particle System Library (VFX, Niagara)
4. Procedural Terrain Material (Shader, Material)
5. Editor Utility Widgets (Tool, UE5)
6. Post-Process Effects Pack (VFX, Post-Process)

**Step 2: Add hover styles to css/style.css**

```css
.card:hover .card-overlay { opacity: 1; }
.card:hover .card-thumb { transform: scale(1.05); }
```

**Step 3: Verify in browser**

2-column grid on desktop, 1-column on mobile. Cards have hover effect.

**Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add projects grid section with placeholder cards"
```

---

### Task 5: About section

**Files:**
- Modify: `index.html`

**Step 1: Add about section**

After projects, add `<section id="about">`:
- `max-w-6xl mx-auto px-6 py-24 border-t border-border`
- 2-column grid on desktop: intro text left, skills right
- Left: brief TA introduction (2 paragraphs, muted text)
- Right: "Skills" label + flex-wrap skill tags
- Skills: UE5, HLSL/GLSL, Niagara VFX, Python, Material Editor, Blueprint, C++, Houdini, Substance Designer

**Step 2: Verify in browser**

About section visible below projects with divider line.

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add about section"
```

---

### Task 6: Contact section + footer

**Files:**
- Modify: `index.html`

**Step 1: Add contact section**

After about, add `<section id="contact">`:
- Same max-width and padding
- Border-top divider
- "Contact" heading
- Horizontal links with SVG icons: Email, GitHub, LinkedIn

**Step 2: Add footer**

After contact:
- `border-t border-border py-8 text-center text-muted text-xs`
- Copyright line

**Step 3: Verify in browser**

Contact links and footer visible at bottom.

**Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add contact section and footer"
```

---

### Task 7: Smooth scroll navigation

**Files:**
- Modify: `js/main.js`
- Modify: `css/style.css`

**Step 1: Add scroll behavior CSS**

In `css/style.css`:
```css
html { scroll-behavior: smooth; }
```

**Step 2: Add active nav highlighting**

In `js/main.js`:
- IntersectionObserver watching each section
- When section enters viewport, highlight corresponding nav link (add `text-white` class, remove `text-muted`)
- Threshold: 0.3

**Step 3: Add nav background on scroll**

In `js/main.js`:
- On scroll, toggle nav border visibility based on scroll position

**Step 4: Verify in browser**

Click nav links → smooth scroll to section. Active section highlights in nav.

**Step 5: Commit**

```bash
git add js/main.js css/style.css
git commit -m "feat: add smooth scroll and active nav highlighting"
```

---

### Task 8: Project detail page template

**Files:**
- Create: `projects/custom-toon-shader.html`

**Step 1: Create project detail HTML**

Full page with:
- Same Tailwind config and color system as index
- Same nav bar (with links pointing to `../index.html#section`)
- Back button: "← Back to Projects" linking to `../index.html#projects`
- Project title: `text-4xl font-bold`
- Tags row
- Description: `text-muted text-lg max-w-2xl`
- Hero media: `aspect-video` placeholder for video/image
- Content sections: Overview, Technical Breakdown (with 2-col image grid), Results
- Prev/Next project navigation at bottom
- Footer

**Step 2: Verify in browser**

Navigate from index card → detail page → back button works.

**Step 3: Commit**

```bash
git add projects/custom-toon-shader.html
git commit -m "feat: add project detail page template"
```

---

### Task 9: Remaining project detail pages

**Files:**
- Create: `projects/asset-pipeline-automation.html`
- Create: `projects/particle-system-library.html`
- Create: `projects/procedural-terrain-material.html`
- Create: `projects/editor-utility-widgets.html`
- Create: `projects/post-process-effects.html`

**Step 1: Create all remaining detail pages**

Copy structure from `custom-toon-shader.html`, update:
- Title, tags, description for each project
- Prev/Next links pointing to correct neighbors
- Unique placeholder gradient colors

**Step 2: Update index.html card links**

Ensure each card `<a href>` points to correct `projects/{name}.html`.

**Step 3: Verify in browser**

All 6 project cards link to their detail pages. Prev/Next navigation cycles through all projects.

**Step 4: Commit**

```bash
git add projects/ index.html
git commit -m "feat: add all project detail pages"
```

---

### Task 10: AES crypto utilities

**Files:**
- Create: `js/crypto.js`

**Step 1: Implement encrypt/decrypt functions**

Using Web Crypto API (AES-GCM):

```javascript
// Derive key from password using PBKDF2
async function deriveKey(password, salt) { ... }

// Encrypt plaintext HTML string → base64 blob (iv + salt + ciphertext)
async function encryptContent(plaintext, password) { ... }

// Decrypt base64 blob → plaintext HTML string
async function decryptContent(encryptedBase64, password) { ... }
```

Key details:
- PBKDF2 with 100,000 iterations, SHA-256
- AES-GCM with random 12-byte IV
- Random 16-byte salt per encryption
- Output format: base64(iv + salt + ciphertext)

**Step 2: Verify with manual test**

Open browser console, test:
```javascript
const enc = await encryptContent('<h1>Secret</h1>', 'test123');
const dec = await decryptContent(enc, 'test123');
console.assert(dec === '<h1>Secret</h1>');
```

**Step 3: Commit**

```bash
git add js/crypto.js
git commit -m "feat: add AES-GCM encrypt/decrypt utilities"
```

---

### Task 11: Private page with password gate

**Files:**
- Create: `private.html`

**Step 1: Create private.html**

Structure:
- Same nav and styling as index
- Password form: input + "Enter" button
- Below form: `<div id="private-content">` (hidden by default)
- On form submit:
  1. Get password from input
  2. Read encrypted blob from `<script type="application/encrypted">` tag
  3. Call `decryptContent(blob, password)`
  4. On success: inject decrypted HTML into `#private-content`, show it
  5. On failure: show "Incorrect password" error message
- Include `js/crypto.js`

**Step 2: Add placeholder encrypted content**

For now, add a `<script type="application/encrypted" id="encrypted-data">` with a test-encrypted blob (encrypted version of NDA project cards HTML using password "test123").

**Step 3: Verify in browser**

Enter "test123" → NDA project cards appear. Wrong password → error message.

**Step 4: Commit**

```bash
git add private.html
git commit -m "feat: add private page with AES password gate"
```

---

### Task 12: Encryption tool (dev-only)

**Files:**
- Create: `tools/encrypt.html`

**Step 1: Create encrypt.html**

Dev-only page (not linked from site):
- Textarea for HTML content to encrypt
- Password input
- "Encrypt" button
- Output textarea showing base64 result
- "Copy" button to copy result
- Instructions: paste this into private.html's `<script type="application/encrypted">` tag

Include `js/crypto.js`.

**Step 2: Verify**

1. Type HTML into textarea
2. Enter password
3. Click Encrypt → base64 appears
4. Copy blob, paste into private.html
5. Open private.html, enter password → content decrypts

**Step 3: Commit**

```bash
git add tools/encrypt.html
git commit -m "feat: add dev encryption tool for NDA content"
```

---

### Task 13: Mobile responsive polish

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`
- Modify: `private.html`

**Step 1: Mobile nav**

Add hamburger menu for mobile:
- Hidden on `md:` and above
- On click: slide-down menu with nav links
- Toggle with JS in `main.js`

**Step 2: Responsive typography**

Ensure hero text scales down on mobile. Cards stack to 1-column. About section stacks vertically.

**Step 3: Test at 375px, 768px, 1024px widths**

Verify all sections look correct at each breakpoint.

**Step 4: Commit**

```bash
git add index.html css/style.css js/main.js private.html
git commit -m "feat: mobile responsive polish"
```

---

### Task 14: GitHub Pages deployment setup

**Files:**
- Create: `.gitignore` (update existing if needed)
- Create: `.nojekyll`

**Step 1: Update .gitignore**

Add:
```
.DS_Store
tools/
wireframe.html
```

Keep `tools/encrypt.html` out of deployed site. Keep wireframe out too.

**Step 2: Create .nojekyll**

Empty file to prevent Jekyll processing on GitHub Pages.

**Step 3: Verify local**

All pages work, no console errors, responsive at all breakpoints.

**Step 4: Commit**

```bash
git add .gitignore .nojekyll
git commit -m "feat: GitHub Pages deployment setup"
```

---

### Task 15: Final review and cleanup

**Files:**
- All files

**Step 1: Review all pages**

- index.html: nav, hero, projects, about, contact, footer
- private.html: password gate, decryption working
- All 6 project detail pages: navigation, content structure
- Mobile responsive on all pages

**Step 2: Clean up wireframe**

Remove wireframe.html (development artifact).

**Step 3: Final commit**

```bash
git rm wireframe.html
git add -A
git commit -m "chore: final cleanup and review"
```
