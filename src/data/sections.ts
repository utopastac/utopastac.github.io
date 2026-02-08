/**
 * Section data: single source of truth for section content, title, background, etc.
 * Edit this file to add, reorder, or change sections (~12 sections expected).
 */

export type SectionData = {
  id: string
  title: string
  backgroundColor: string
  /** Reserved for future: body copy, images, links, layout, etc. */
  // content?: string
  // image?: string
  // links?: { label: string; href: string }[]
}

export const SECTIONS: readonly SectionData[] = [
  { id: 'intro', title: 'LinkedIn', backgroundColor: '#f5f5f0' },
  { id: 'work', title: 'Block [Cash app]', backgroundColor: '#e8e8e0' },
  { id: 'about', title: 'Personio', backgroundColor: '#fafaf8' },
] as const
