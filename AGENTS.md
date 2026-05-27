# AGENTS.md — pjctlvv2 (Kelvin Portfolio)

## Stack

Pure static HTML/CSS/JS. No package manager, no build tools, no framework. Serve with any static file server.

## Dev Server

```bash
# VSCode Live Server (configured)
# Port: 5501 → .vscode/settings.json
```

Or `python3 -m http.server` / any static server.

## Repo Map

| Path | Role |
|------|------|
| `index.html` | Single-page portfolio (Spanish, sections: Inicio, Acerca, Proyectos, Habilidades) |
| `stylesheet/style.css` | All styles ~1500 lines (CRT/glitch aesthetic, SVG filters, scanlines) |
| `js/script.js` | Interactions: scramble text animation, dropdown nav, scroll fade-in, nav hover animation |
| `js/skills.js` | Skills data object + DOM rendering into `#skills-grid` |
| `fonts/` | DepartureMono Nerd Font (3 variants) — referenced in CSS via `@font-face` |
| `ico/` | Icon image assets for skills/tools |
| `design-system/kelvin-portfolio/MASTER.md` | Design tokens, component specs, anti-patterns — consult before UI changes |

## Commits

- Remote: `origin` → `github.com/adop1d/portfolio.git` (branch: `master`)
- Style: `feat:` prefix for features, occasional `fix:` — informal conventional commits
- No CI, no hooks, no linting, no tests

## Design System

`design-system/kelvin-portfolio/MASTER.md` contains:
- Color palette (monochrome + blue accent), typography, spacing tokens
- Component specs (buttons, cards, inputs, modals)
- Anti-patterns (no emoji icons, no layout-shifting hovers, prefers-reduced-motion)
- Pre-delivery checklist (contrast, responsive breakpoints, focus states)

Check it before making UI changes, but the actual site overrides some tokens (CRT dark aesthetic differs from the MASTER.md light palette).

## JS Architecture

- **`script.js`**: DOMContentLoaded handlers for 3 independent features (scramble, dropdown, scroll fade-in, nav animation). IntersectionObserver-based animations.
- **`skills.js`**: Data-driven grid renderer. Skills data is a JS object grouped by category. DOMContentLoaded → renderSkills().

## Gotchas

- No `.gitignore` — watch for unwanted tracked files
- All icons are local PNG/WebP/SVG in `ico/` — don't rely on external icon CDNs unless adding new ones
- Google Fonts loaded in index.html: Roboto Mono, Jacquard 24 (plus local DepartureMono)
- The scrambled name animation at top uses IntersectionObserver with 0.5 threshold — re-animates on every intersection
- Nav hover animation tracks pointer position relative to nav items via bounding rect math
