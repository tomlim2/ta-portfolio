# Social brand marks

These are brand assets, separate from the Apache-licensed Google UI icons.
Retrieved 2026-09-25. The respective brand owners retain their trademarks.

- `github.svg`: official Invertocat artwork, `GitHub Logos/SVG/GitHub_Invertocat_Black.svg` from [GitHub logo downloads](https://brand.github.com/GitHub_Logos.zip). Unmodified file. [Usage guidance](https://brand.github.com/foundations/logo).
- `linkedin.svg`: the `inbug-blue-28` symbol from the [official LinkedIn brand downloads page](https://brand.linkedin.com/downloads), placed in a standalone 28px SVG. Original path geometry and blue fill retained; the embedded class/style is flattened to a fill attribute. [Brand guidance](https://brand.linkedin.com/).

Shared UI renders these SVGs as monochrome CSS masks sized to 16 × 16px within a centered 20 × 20px layout box, preserving proportions. The smaller artwork balances the visual size of Material Symbols Outlined glyphs, which include internal whitespace. The enclosing Ghost icon link has a 44 × 44px target by default; an `.icon-group` uses 32 × 44px targets with no extra gap or overlapping hit areas. The mask inherits the enclosing button color through currentColor. Ghost links turn the logo to the same theme accent blue as Google icons on hover, with opacity remaining at 1. Do not substitute `code` / `work`, redraw the logos, or apply Material Symbols weight settings.

`resume.html` embeds the same path geometry at 13px in the contact row; `assets/resume.pdf` carries the corresponding vector marks. Update HTML and PDF together. The accessible name and optional tooltip belong to the enclosing link; decorative SVGs/masks are hidden from assistive technology.
