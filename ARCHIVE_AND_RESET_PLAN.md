# Archive & reset plan: utopastac.github.io

## Current state

- **Stack**: Create React App, React 17, SASS modules, react-router-dom
- **GitHub Pages**: Build output is `./docs` (Pages likely set to “Deploy from branch” → branch `main` → folder `/docs`)
- **Custom domain**: `public/CNAME` → www.f-90.co.uk
- **Structure**: `src/` with components (index.js + index.module.sass), containers, data, styles (variables, mixins, typography)

## Phase 1: Archive current site

1. **Create archive branch** (keeps full history and current site reproducible)
   - `git checkout -b archive/legacy-site`
   - `git push -u origin archive/legacy-site`
   - Return to `main`: `git checkout main`

2. **Optional: tag current state** (quick way to restore or diff later)
   - `git tag archive/legacy-2025-02-07`
   - `git push origin archive/legacy-2025-02-07`

3. **Remove current app from `main`** (so we can add the new app without losing archive)
   - Delete everything except:
     - `.git/`
     - `.gitignore` (we’ll adjust for new app)
     - `ARCHIVE_AND_RESET_PLAN.md` (this file; can remove after reset)
     - `public/CNAME` (keep for GitHub Pages custom domain)
   - Commit: e.g. “chore: remove legacy site (archived in archive/legacy-site)”

## Phase 2: New React app (single-page, GitHub Pages–friendly)

### Tooling

- **Scaffold**: Vite + React + TypeScript (latest React 19–ready, fast, good for static export)
- **Styling**: CSS only (no SASS)
  - **CSS Modules** (e.g. `*.module.css`) for component styles
  - **CSS variables** for theme (colors, spacing, typography)
  - **Native CSS nesting** (no preprocessor)
  - **PostCSS** with **postcss-mixins** (or similar) for typography mixins
- **Output**: Single build directory (e.g. `dist/`); we’ll configure GitHub Pages to use it (see Phase 3).

### Repo layout (after reset)

```
public/
  CNAME              # keep for www.f-90.co.uk
  index.html
  favicon.ico
  ...
src/
  index.css          # global: CSS variables + any global resets
  main.tsx
  App.tsx
  components/
    App/
      index.tsx
      index.module.css
    Page/
      index.tsx
      index.module.css
  ...
postcss.config.js
vite.config.ts
package.json
```

### Conventions

1. **One component per folder**
   - `ComponentName/index.tsx` + `ComponentName/index.module.css`
   - No class names in JSX except the single root class from the module (e.g. `className={styles.root}`). All other styling is done inside the CSS module via nesting (e.g. `& h1`, `& .section`).

2. **CSS**
   - Use **CSS variables** from a global file (e.g. `src/index.css` or `src/theme.css`) for colors, spacing, font families, sizes. No hardcoded values in modules when a variable exists.
   - **CSS Modules**: One root class per component; internal structure and typography styled with **native nesting** inside that module.
   - **Typography**: Define mixins (e.g. “heading”, “body”, “caption”) in a shared file and use PostCSS to allow `@mixin heading-lg` (or similar) in module files. No typography classes applied in JSX—only in CSS (selectors like `& h1`, `& p` using mixins).

3. **No classes in JSX**
   - Only the root element gets a class from the module (e.g. `className={styles.root}`). No `className={styles.title}`, etc.; use element/structural selectors and nesting in the module instead.

### Config highlights

- **Vite**
  - `base: '/'` for GitHub Pages (or `base: '/repo-name/'` if using project site).
  - Build output: `dist/` (default).
- **PostCSS**
  - `postcss-mixins` (and optionally `postcss-nested` only if we need fallback for very old nesting; modern browsers support native nesting).
  - Mixin file: e.g. `src/styles/mixins.css` or `src/typography-mixins.css` with `@define-mixin heading-lg { font-size: var(--font-size-lg); ... }` and in modules `@mixin heading-lg;`.
- **CSS Modules**
  - Vite supports `*.module.css` by default; use `*.module.css` (not SASS) so we can use native nesting and PostCSS mixins without a SASS layer.

## Phase 3: GitHub Pages after reset

- **Option A – Deploy from branch**
  - Set branch to `main`, folder to `/ (root)`.
  - Add a step to push **contents of `dist/`** into the root (e.g. via GitHub Actions that build, then push the `dist` contents to `main`, or to a `gh-pages` branch).  
  - If you keep building to `docs/`: set “Source” to branch `main`, folder `docs`, and in Vite set `outDir: 'docs'` and `base: '/'`.

- **Option B – GitHub Actions (recommended)**
  - Build with Vite in CI; deploy the `dist/` (or `docs/`) output with `peaceiris/actions-gh-pages` or `actions/upload-pages-artifact` + deploy. No need to commit build output to `main`.
  - Preserve `CNAME`: ensure the workflow copies `public/CNAME` into the deploy artifact so the custom domain keeps working.

## Phase 4: Checklist

- [ ] Phase 1: Archive branch (and optional tag) created and pushed; legacy site removed from `main`.
- [ ] Phase 2: New Vite + React + TS app; component folders with `index.tsx` + `index.module.css`; CSS variables; PostCSS mixins for typography; no JSX classes except root.
- [ ] Phase 3: Build outputs to `docs/` or `dist/`; GitHub Pages source updated; `CNAME` still in deployed output.
- [ ] Verify: https://www.f-90.co.uk (or your GitHub Pages URL) serves the new single-page app.

## Summary

| Item | Choice |
|------|--------|
| Archive | Branch `archive/legacy-site` (+ optional tag) |
| New stack | Vite + React (latest) + TypeScript |
| Styling | CSS Modules + CSS variables + native nesting |
| Typography | PostCSS mixins (no classes in JSX) |
| Components | One folder per component: `index.tsx` + `index.module.css` |
| JSX classes | Only root class from module; rest in CSS via nesting |
| Hosting | GitHub Pages; keep `CNAME` for www.f-90.co.uk |
