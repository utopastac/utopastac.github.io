/**
 * Section data: single source of truth for section content, title, background, etc.
 * Includes intro, one section per job (from JOBS), education, quotes, playpress, pixel-portraits, outro.
 * navPlacement controls how each section appears in the page nav (or if at all).
 */

import { EDUCATION } from '@/data/education'
import { JOBS } from '@/data/jobs'

export type NavPlacement = 'hidden' | 'dated-submenu' | 'top-level'

export type SectionData = {
  id: string
  title: string
  backgroundColor: string
  /** Where (if at all) this section appears in the page nav. */
  navPlacement: NavPlacement
  /** Optional text color for section content (e.g. var(--color-text-on-dark) for dark backgrounds). */
  textColor?: string
  /** Optional navigation panel background color (rgba value). */
  navPanelBackgroundColor?: string
  /** Short label shown right-aligned in page nav (top-level sections). */
  navDescription?: string
  /** When set, this section renders JobSection with the given job id from JOBS. */
  jobId?: string
  /** When set, this section renders EducationSection (id must match EDUCATION.id). */
  educationId?: string
  /** When true, this section renders QuotesSection. */
  isQuotes?: boolean
}

export const SECTIONS: readonly SectionData[] = [
  { 
    id: 'intro', 
    title: 'intro',
    backgroundColor: '#F4F4F4',
    navPanelBackgroundColor: 'rgba(255, 255, 255, 0.7)',
    navPlacement: 'hidden'
  },
  ...JOBS.map((job) => ({
    id: job.id,
    title: job.company,
    backgroundColor: job.backgroundColor,
    navPanelBackgroundColor: 'rgba(255, 255, 255, 0.7)',
    navPlacement: 'dated-submenu' as const,
    ...(job.textColor != null && { textColor: job.textColor }),
    jobId: job.id,
  })),
  {
    id: EDUCATION.id,
    title: 'Education',
    backgroundColor: EDUCATION.backgroundColor,
    textColor: EDUCATION.textColor,
    educationId: EDUCATION.id,
    navPlacement: 'dated-submenu',
  },
  {
    id: 'quotes',
    title: 'What people say',
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
    isQuotes: true,
    navPlacement: 'top-level',
    navDescription: 'Colleague quotes',
  },
  { 
    id: 'playpress',
    title: 'Playpress',
    backgroundColor: '#f5f5f0',
    navPlacement: 'top-level',
    navPanelBackgroundColor: 'rgba(255, 255, 255, 0.7)',
    navDescription: 'UK based Toy company',
  },
  {
    id: 'frontend-development',
    title: 'Development',
    backgroundColor: '#FFFFFF',
    navPlacement: 'top-level',
    navPanelBackgroundColor: 'rgba(255, 255, 255, 0.7)',
    navDescription: 'Coding experience',
  },
  {
    id: 'pixel-portraits',
    title: 'Pixel portraits',
    backgroundColor: '#f5f5f0',
    navPlacement: 'top-level',
    navPanelBackgroundColor: 'rgba(255, 255, 255, 0.7)',
    navDescription: 'Pixel art tool',
  },
  { 
    id: 'outro',
    title: 'outro',
    backgroundColor: '#083d32',
    textColor: '#FFFFFF',
    navPlacement: 'hidden'
  },
] as const
