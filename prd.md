# PRD: One-page scrolling site

## Overview

Single-page site composed of full-viewport sections. The viewport background reflects the currently visible section’s color. A fixed right-side navigation reveals section links on hover and scrolls the page to sections on click.

## Requirements

### Layout & structure

- **One-page scrolling**: Single vertical scroll; no route changes.
- **Sections**: Content is split into “sections,” each:
  - **Size**: `100vh` height, `100vw` width.
  - **Background color**: Configurable per section via a prop (used for the *site* background when that section is in view, not as the section’s own background).

### Section wrapper component

- Reusable wrapper for each logical section.
- **Props**:
  - `backgroundColor` (string): Color applied to the *entire site* when this section is the active (in-view) section.
  - `id` (string): Used for scroll targets and navigation.
  - Children (section content).
- Sections do not render their own background; the active section’s color is shown on a global/site-level background (via context).

### Site background from active section

- When the user scrolls so that a section is “in view,” the **whole site** background updates to that section’s `backgroundColor`.
- Use **React context** (and a provider) so section background is not passed through intermediate components (no prop drilling).
- The section in view is determined by scroll position (e.g. intersection with the viewport).

### Section data (data-driven sections)

- **Data files**: Section content, appearance, and behaviour are driven by **TypeScript data files** (static variables), not hardcoded in components.
- **Location**: Centralised in a dedicated data layer (e.g. `src/data/`) so all section config lives in one place.
- **Per-section fields** (present and extensible for ~12 sections):
  - **id** (string): Unique id for scroll target and nav; used in URL/anchor if needed.
  - **title** (string): Section heading / title shown in the section and optionally in nav.
  - **backgroundColor** (string): Color applied to the site when this section is in view.
  - **Content and other fields** can be added later (e.g. body copy, images, links, layout hints) without changing the data shape contract.
- **Single source of truth**: App, PageNav, and any section-specific components read from this data; adding or reordering sections is done by editing the data only.

### Job sections

- **One section per job**: The site includes a section for each job from the CV; section order follows job chronology (most recent first).
- **Job data** (`src/data/jobs.ts`): Each job entry has:
  - **id** (string): Unique id; used for section id and nav.
  - **date** (string): e.g. "2024" or "2021 – 2023".
  - **jobTitle** (string): Role title.
  - **company** (string): Company name (also used as section title in nav).
  - **description** (string): First paragraph of the job description (body copy for the section).
  - **backgroundColor** (string): Section/site background when this section is in view (defined on the job entry, not in section config).
  - **images** (optional, string[]): Paths for the left-column image stack (e.g. `/images/spotify-1.png`). When present, layout is two columns and clicking the image column opens a modal with all images.
- **JobSection component**: Renders a single job in a two-column layout when the job has **images** (optional `images` array of paths in job data). Left column: vertical stack of images (cropped to 100vh, centered); right column: company, date/title, description (content max-width 30vw, vertically centered). Job sections are 100vh; image column is wider than content column. **Click to open modal**: Clicking the image column opens a modal that shows all of that job’s images in one long scrollable list (company name as modal title). Uses CSS module and design tokens. Section list is built from `JOBS`; each job section uses that job’s `backgroundColor`.

### Modal system

- **Reusable modals**: A single modal system is used across the site so that any section or component can open overlay dialogs (e.g. “View all quotes”, future “Read more” for a job, etc.).
- **Context**: `ModalContext` provides `openModal(content)`, `closeModal()`, and `content` (the currently shown React node, or null). `ModalProvider` wraps the app (e.g. in `main.tsx`).
- **Modal UI**: A single `Modal` component (rendered once in App) renders the current modal content in a portal: backdrop (dimmed), panel (scrollable body), close button, and close on backdrop click or Escape. Body scroll is locked while a modal is open.
- **Section-triggered modals**: Sections (or their content) can open modals by calling `openModal(<AnyContent />)` from context. For example, the quotes section opens a full-list modal on click; the job section’s image column opens a modal with all job images in a scrollable list; other sections may open their own modals (e.g. education details).

### Quotes section

- **Single section at the end**: A dedicated “What people say” section showcases testimonial quotes from colleagues.
- **Height**: The quotes section has **100vh height** (same as other sections). Content is cropped to fit with a **gradient fade** at the bottom so the list appears to fade out rather than hard-cut.
- **Quotes data** (`src/data/quotes.ts`): Each quote has **text** (string) and optional **company** (string) for attribution (e.g. “— Cash App”).
- **QuotesSection component**:
  - **Layout**: Multi-column, Pinterest-style (1 column on small viewports, 2 from ~480px, 3 from ~720px); each quote does not break across columns (`break-inside: avoid`). Content is inside a **crop wrapper** with `mask-image` (or equivalent) so the bottom ~30% fades to transparent.
  - **Content width**: The main content column is **70vw** wide (centered).
  - **Click to open modal**: Clicking anywhere on the quotes area (title or list) opens a **modal** that shows the **full list of quotes** in a single scrollable column. Closing the modal (button, backdrop click, or Escape) returns focus and hides the overlay.

### Simplified experience for small viewports

- **Switch at App level**: For viewport widths below a single breakpoint (e.g. 640px), the app renders a **drastically simplified** page instead of the full one-page scrolling experience. The full site is not made responsive at that size; we switch to a separate, minimal UI.
- **Breakpoint**: One media query (e.g. `max-width: 639px`) is used in App; when it matches, only the simple page is rendered (no sections, nav, corner overlay, or scroll arrow).
- **Simple page content**:
  - **Top left**: Site owner name and current year next to it (e.g. “Peter Wright 2026”), using caption/muted styling.
  - **Main title**: “principal designer” (lowercase), prominent heading.
  - **Under the title**: Two links only — Email (mailto) and LinkedIn (opens in new tab), stacked vertically.
- **SimplePage component**: Dedicated component and CSS module; uses existing CSS variables (typography, spacing, colors). No shared chrome (no corner overlay, no nav); minimal layout (centered content, name+year absolutely positioned top-left).

### Corner overlay (site chrome)

- **Position**: Fixed overlay on top of all other content (high z-index), covering the four corners of the viewport. Does not block interaction with the rest of the page (pointer-events: none on the overlay container; pointer-events: auto on the corner elements so links are clickable).
- **Content** (one element per corner):
  - **Top left**: Site owner name (e.g. “Peter Wright”).
  - **Top right**: Link to LinkedIn profile (opens in new tab, external).
  - **Bottom left**: Current year (e.g. 2026), updated dynamically.
  - **Bottom right**: Link to email address (mailto:).
- **Styling**: Uses existing CSS variables (typography, spacing, colors); corners have consistent padding from the viewport edge.

### Page navigation

- **Position**: Fixed on the right, vertically centered (e.g. center of the screen on the right).
- **Default state**: Only a **menu icon** is visible.
- **Hover state**: Expands to show the full navigation.
- **Content**:
  - **Top**: A “fancy” (serif) heading: **2026**.
  - **Middle**: A list of section links; clicking a link scrolls the main page to the corresponding section.
  - **Bottom**: A “fancy” (serif) heading: **2001**.

## User stories (testable)

1. **Section size**  
   As a user, I see each section fill the viewport so that one section occupies exactly 100vh height and 100vw width.

2. **Section background prop**  
   As a developer, I can pass a `backgroundColor` (and `id`) to a Section wrapper and use it to drive the site background when that section is in view.

3. **Site background follows scroll**  
   As a user, when I scroll and a new section becomes the one in view, the background of the entire page changes to that section’s assigned background color (no prop drilling; implemented via context).

4. **Corner overlay**  
   As a user, I see the owner’s name (top left), a LinkedIn link (top right), the current year (bottom left), and an email link (bottom right), each fixed in a corner of the viewport on top of the page content.

5. **Nav position**  
   As a user, I see the page navigation fixed on the right side of the screen and vertically centered.

6. **Nav default: menu icon**  
   As a user, by default I only see a menu icon (not the full list of sections).

7. **Nav on hover**  
   As a user, when I hover over the nav area, the full navigation appears (including “2026”, section links, and “2001”).

8. **Fancy headings in nav**  
   As a user, I see “2026” at the top and “2001” at the bottom of the navigation, styled with the “fancy” (serif) type style.

9. **Nav scroll to section**  
   As a user, when I click a section link in the navigation, the page scrolls so that the corresponding section is in view.

### Scroll-down arrow

- **Position**: Fixed at the bottom of the viewport, centered horizontally; high enough z-index to sit above main content.
- **Click**: Scrolls the page to the next section (smooth scroll). Hidden or inactive when the last section is in view.
- **Hover (peek)**: On hover, the page scrolls down a little to “peek” at the next section; on mouse leave, it scrolls back so the current section remains in view.
- **Styling**: Uses existing CSS variables; arrow icon (e.g. chevron down) that fits the site chrome.

10. **Scroll-down arrow**  
   As a user, I see a fixed arrow at the bottom center of the screen; clicking it scrolls to the next section, and hovering it briefly scrolls down a bit to peek at the next section then scrolls back.

11. **Sections driven by data**  
   As a developer, I can add, reorder, or change sections (title, background color, content, etc.) by editing TypeScript data files only; the app and nav reflect the data without hardcoded section lists.

12. **Job sections**  
   As a user, I see a full-viewport (100vh) section for each job with a two-column layout when the job has images: left column is a vertically centered, cropped stack of images (wider than the content column); right column has company, date/title, description (content constrained to 30vw, vertically centered). Clicking the image column opens a modal with all of that job’s images in one long scrollable list (company name as title). Each job section has its own background color defined on the job data.

13. **Quotes section**  
   As a user, I see a final section “What people say” that is 100vh tall, with testimonial quotes in a multi-column layout that fades out at the bottom (gradient crop). Clicking the section opens a modal with the full scrollable list of quotes; I can close the modal via the close button, clicking outside, or Escape.

14. **Simplified small viewport**  
   As a user on a small browser (e.g. narrow width), I see a single simple page with the owner’s name and year in the top left, the title “principal designer”, and Email and LinkedIn links under the title — not the full scrolling site.

15. **Modal system**  
   As a developer, I can open a modal from any part of the app (e.g. a section) by calling `openModal(content)` from `ModalContext`; the modal is shown in a portal with backdrop, close button, and scrollable body, and can be closed programmatically or by the user (Escape, backdrop click). Sections may trigger modals (e.g. quotes section opens full quotes list on click; job section image column opens modal with all job images in a scrollable list).

## Technical approach

- **Context**: A provider wraps the app and holds the current “active” section background color; sections register (e.g. id + color + ref) and an `IntersectionObserver` updates the active color when a section enters view.
- **Section component**: Renders a full-viewport wrapper with `id` and `data-*` attributes (or ref) for observation; does not set its own background.
- **PageNav component**: Fixed right, vertically centered; menu icon by default; on hover shows list with fancy “2026”, section links, fancy “2001”; section links use `id` to scroll (e.g. `scrollIntoView` or anchor hash).
- **CornerOverlay component**: Fixed overlay (high z-index) with four corner elements (name, LinkedIn link, current year, email link); container uses pointer-events: none so it doesn’t block clicks, corner elements use pointer-events: auto for links.
- **Scroll-down arrow**: Fixed bottom center; reads active section from context (or section list) to scroll to next section on click; on hover, smoothly scrolls down a small amount (peek) and scrolls back on mouse leave; hidden on last section.
- **App**: Renders the provider, a global wrapper that applies the context background color, the CornerOverlay, the PageNav (with section config), the ScrollDownArrow (with section list and active section from context), and the scrollable content composed of Section wrappers. Section config (id, title, backgroundColor, etc.) is imported from data files (e.g. `src/data/sections.ts`), not defined in the component. Intro section renders IntroHero; sections with `jobId` render JobSection (job looked up from `src/data/jobs.ts`); section with `isQuotes` renders QuotesSection with data from `src/data/quotes.ts`.
- **Job sections**: `SECTIONS` is built from intro + JOBS (each job contributes id, title, backgroundColor from job, jobId) + quotes section. Job backgroundColor is stored on each job entry in `jobs.ts`. JobSection uses two-column grid when job has `images`; image column is clickable and opens a modal with `JobImagesModalContent` (scrollable list of all job images, company as title). Job sections use full-height section wrapper (100vh).
- **Modal system**: `ModalContext` + `ModalProvider` in `src/context/ModalContext.tsx`; `Modal` component in `src/components/Modal/` renders `context.content` in a portal (backdrop, panel, close button). Sections or children call `openModal(<ReactNode />)` to show content; `closeModal()` and Escape/backdrop close. Body scroll locked while open.
- **Quotes section**: QuotesSection is 100vh tall; content lives in a crop wrapper with `mask-image: linear-gradient(...)` so the bottom fades. Clicking the area opens a modal with `QuotesModalContent` (full list, single column, scrollable). Uses `ModalContext` for open/close.
- **Small viewport**: App uses `useMediaQuery('(max-width: 639px)')`; when true, renders only `SimplePage` (name + year top-left, “principal designer” title, Email and LinkedIn links). No full-site tree on small viewports.

## Changelog

- PRD: Corner overlay (site chrome) with name, LinkedIn, year, email in fixed corners; user story 4; technical approach for CornerOverlay.
- Implemented: CornerOverlay component (four fixed corners, CSS module, uses design tokens).
- PRD: Section data driven by TypeScript data files; single source of truth for ~12 sections; user story 9.
- Implemented: Section data in `src/data/sections.ts` (SectionData type + SECTIONS array); App and PageNav read from data.
- Implemented: `SectionBackgroundContext` + provider (IntersectionObserver), `Section` component, `PageNav` component, App with three example sections; site background transitions on scroll.
- PRD: Scroll-down arrow (fixed bottom center, click to next section, hover peek); user story 10; technical approach for ScrollDownArrow.
- Implemented: ScrollDownArrow component; context exposes activeSectionId; peek-on-hover and scroll-to-next on click.
- Initial PRD: one-page scrolling, sections (100vh/100vw), Section wrapper with background color prop, context-driven site background, fixed right nav with menu icon and hover expand, fancy “2026”/“2001”, scroll-to-section.
- PRD: Job sections (one section per job from CV; JobSection component; job data with id, date, jobTitle, company, description, backgroundColor in `src/data/jobs.ts`); user story 12.
- PRD: Quotes section (testimonials at end of page; QuotesSection with multi-column Pinterest-style layout, 70vw content width, quote cards; data in `src/data/quotes.ts`); user story 13.
- Implemented: JobSection and QuotesSection components; jobs.ts and quotes.ts; sections built from JOBS with backgroundColor on each job; quotes in columns (70vw width).
- PRD: Simplified experience for small viewports (switch at App level; SimplePage with name+year top-left, “principal designer” title, Email and LinkedIn links only); user story 14.
- Implemented: SimplePage component; useMediaQuery hook; App switches to SimplePage when viewport ≤639px.
- PRD: Modal system (reusable modals via ModalContext; openModal/closeModal; Modal component with portal, backdrop, scrollable body; section-triggered modals); user story 15.
- PRD: Quotes section 100vh height, gradient crop for content, click opens modal with full scrollable quotes list.
- Implemented: ModalContext + ModalProvider; Modal component (portal, backdrop, close button, Escape/backdrop close); QuotesSection 100vh + crop wrapper with mask-image gradient; QuotesModalContent; click on quotes area opens modal; PRD updated.
- PRD: Job section image column click opens modal with all job images in one long scrollable list; JobSection two-column layout (images left, content right), 100vh, content 30vw.
- Implemented: JobImagesModalContent component; JobSection image column clickable (ModalContext), opens modal with full image list; PRD updated.
