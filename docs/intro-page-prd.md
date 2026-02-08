# Mini-PRD: Intro page

## Overview

The intro section is the first full-viewport section of the one-page site. It acts as the hero and establishes the primary professional title with a large, bold headline.

## Requirements

### Hero title

- **Copy**: Two words on separate lines:
  - Line 1: A **rotating first word** that types in and out (see below).
  - Line 2: **DESIGNER** (static).
- **Rotating first word (typing effect)**:
  - **Word set**: A configurable list of words; initial set: **Principal, Creative, Toy, Product** (displayed in all caps).
  - **Behaviour**: The first word types in one character at a time, then **pauses on the finished word for 3 seconds**, then types out one character at a time. When the word is fully removed, the next word in the set types in. The cycle repeats (after the last word, go back to the first).
  - **Timing**: Character-by-character typing in and typing out at a consistent speed; 3 second pause on the completed word before typing out.
- **Style**:
  - All caps (`text-transform: uppercase`).
  - Heaviest available font weight (design token: `--font-weight-bold`, 700).
  - Display font family (`--font-display`).
- **Layout**:
  - Title block width: **80vw** so it scales with the viewport and leaves margin on smaller screens.
  - Font size scales with viewport (e.g. `clamp()` or vw-based) so the title remains prominent across breakpoints without overflowing.
  - Words stacked (each on its own line); no wrapping within a word.

### Placement

- Renders inside the first section (section `id === 'intro'`) as defined in `src/data/sections.ts`.
- Uses the same section wrapper and background behavior as other sections (full viewport, site background from section color).
- Content centered in the section (existing `sectionContent` layout).

### Technical

- **Component**: Dedicated component (e.g. `IntroHero`) in `src/components/IntroHero/` with its own CSS module.
- **Design tokens**: Use existing CSS variables only (typography, color, spacing); no new hardcoded values beyond 80vw for width and scalable font size.
- **Accessibility**: Semantic `<h1>` with an `aria-label` if the visual is all caps/abbreviated so screen readers get a clear label (e.g. “Principal Designer”).

## Out of scope (for this mini-PRD)

- Subheadline, tagline, or body copy below the title.
- CTA buttons or links in the hero.
- Additional animation or scroll-triggered effects beyond the intro typing effect.
- Changes to section data shape or global section layout.

## Acceptance

- [ ] Intro section shows a rotating first word (Principal, Creative, Toy, Product) on line 1 and “DESIGNER” on line 2.
- [ ] First word types in one character at a time, pauses 3 seconds when complete, then types out one character at a time; cycle repeats through the word set.
- [ ] Text is all caps and uses the heaviest font weight in the design system.
- [ ] Title block is 80vw wide and font size scales with viewport (based on longest word so layout is stable).
- [ ] Implemented with a dedicated component and CSS module using design tokens.
- [ ] Other sections unchanged; only the intro section uses this hero content.
