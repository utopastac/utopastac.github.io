# utopastac.github.io

Single-page React app (Vite + React 19 + TypeScript), built for GitHub Pages.

## Setup

- **Node**: 20+
- **Install**: `npm install`
- **Dev**: `npm run dev`
- **Build**: `npm run build` → output in `docs/` (for GitHub Pages)

## Conventions

- **Components**: One folder per component with `index.tsx` and `index.module.css`.
- **Styling**: Only the root element gets a class from the CSS module (`className={styles.root}`). All other styling is done inside the module via nesting and typography mixins.
- **CSS**: Use CSS variables from `src/index.css`. Typography mixins live in `src/styles/mixins/` (use `@mixin heading-xl;` etc. in modules). Native CSS nesting in module files.

## Archive

The previous site is preserved on branch `archive/legacy-site` and tag `archive/legacy-2025-02-07`.
