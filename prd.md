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

## Technical approach

- **Context**: A provider wraps the app and holds the current “active” section background color; sections register (e.g. id + color + ref) and an `IntersectionObserver` updates the active color when a section enters view.
- **Section component**: Renders a full-viewport wrapper with `id` and `data-*` attributes (or ref) for observation; does not set its own background.
- **PageNav component**: Fixed right, vertically centered; menu icon by default; on hover shows list with fancy “2026”, section links, fancy “2001”; section links use `id` to scroll (e.g. `scrollIntoView` or anchor hash).
- **CornerOverlay component**: Fixed overlay (high z-index) with four corner elements (name, LinkedIn link, current year, email link); container uses pointer-events: none so it doesn’t block clicks, corner elements use pointer-events: auto for links.
- **Scroll-down arrow**: Fixed bottom center; reads active section from context (or section list) to scroll to next section on click; on hover, smoothly scrolls down a small amount (peek) and scrolls back on mouse leave; hidden on last section.
- **App**: Renders the provider, a global wrapper that applies the context background color, the CornerOverlay, the PageNav (with section config), the ScrollDownArrow (with section list and active section from context), and the scrollable content composed of Section wrappers. Section config (id, title, backgroundColor, etc.) is imported from data files (e.g. `src/data/sections.ts`), not defined in the component.

## Changelog

- PRD: Corner overlay (site chrome) with name, LinkedIn, year, email in fixed corners; user story 4; technical approach for CornerOverlay.
- Implemented: CornerOverlay component (four fixed corners, CSS module, uses design tokens).
- PRD: Section data driven by TypeScript data files; single source of truth for ~12 sections; user story 9.
- Implemented: Section data in `src/data/sections.ts` (SectionData type + SECTIONS array); App and PageNav read from data.
- Implemented: `SectionBackgroundContext` + provider (IntersectionObserver), `Section` component, `PageNav` component, App with three example sections; site background transitions on scroll.
- PRD: Scroll-down arrow (fixed bottom center, click to next section, hover peek); user story 10; technical approach for ScrollDownArrow.
- Implemented: ScrollDownArrow component; context exposes activeSectionId; peek-on-hover and scroll-to-next on click.
- Initial PRD: one-page scrolling, sections (100vh/100vw), Section wrapper with background color prop, context-driven site background, fixed right nav with menu icon and hover expand, fancy “2026”/“2001”, scroll-to-section.
