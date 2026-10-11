/**
 * Section data: single source of truth for section content, title, background, etc.
 * Three lanes sit side by side: Work, Personal, and About.
 * Each lane is a vertical stack with the same intro and outro around its pages.
 * navPlacement controls how each section appears in the page nav (or if at all).
 */

import { ABOUT_SUMMARY } from '@/data/about'
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
  /** When true, this section renders AboutSummarySection. */
  isSummary?: boolean
  /** Intro and outro are repeated at the ends of every lane. */
  kind?: 'intro' | 'outro'
}

export type LaneId = 'work' | 'personal' | 'about'

export type LaneData = {
  id: LaneId
  label: string
  /** Display word on that lane’s intro screen. */
  introWord: string
  /** Display word on that lane’s outro screen. */
  outroWord: string
  sections: readonly SectionData[]
}

const OUTRO_BACKGROUNDS: Record<LaneId, string> = {
  work: 'var(--color-section-surface)',
  personal: 'var(--color-section-creator)',
  about: 'var(--color-section-teammate)',
}

const OUTRO_TEXT_COLORS: Partial<Record<LaneId, string>> = {
  personal: 'var(--color-section-creator-text)',
}

function bookend(laneId: LaneId, kind: 'intro' | 'outro'): SectionData {
  const isIntro = kind === 'intro'
  const textColor = !isIntro ? OUTRO_TEXT_COLORS[laneId] : undefined
  return {
    id: `${laneId}-${kind}`,
    title: kind,
    backgroundColor: isIntro ? 'var(--color-section-intro)' : OUTRO_BACKGROUNDS[laneId],
    navPlacement: 'hidden',
    kind,
    ...(textColor != null && { textColor }),
    ...(isIntro ? { navPanelBackgroundColor: 'var(--color-nav-panel)' } : {}),
  }
}

const WORK_SECTIONS: readonly SectionData[] = JOBS.map((job) => ({
  id: job.id,
  title: job.company,
  backgroundColor: job.backgroundColor,
  navPanelBackgroundColor: 'var(--color-nav-panel)',
  navPlacement: 'dated-submenu' as const,
  ...(job.textColor != null && { textColor: job.textColor }),
  jobId: job.id,
}))

const PERSONAL_SECTIONS: readonly SectionData[] = [
  {
    id: 'playpress',
    title: 'Playpress',
    backgroundColor: 'var(--color-section-neutral)',
    navPlacement: 'top-level',
    navPanelBackgroundColor: 'var(--color-nav-panel)',
    navDescription: 'UK based Toy company',
  },
  {
    id: 'pixel-portraits',
    title: 'Pixel portraits',
    backgroundColor: 'var(--color-section-neutral)',
    navPlacement: 'top-level',
    navPanelBackgroundColor: 'var(--color-nav-panel)',
    navDescription: 'Pixel art tool',
  },
  {
    id: 'dayring',
    title: 'Dayring',
    backgroundColor: 'var(--color-section-neutral)',
    navPlacement: 'top-level',
    navPanelBackgroundColor: 'var(--color-nav-panel)',
    navDescription: 'Numbers tracker',
  },
  {
    id: 'empires',
    title: 'Empires',
    backgroundColor: 'var(--color-section-neutral)',
    navPlacement: 'top-level',
    navPanelBackgroundColor: 'var(--color-nav-panel)',
    navDescription: 'Party word game',
  },
  {
    id: 'doodloop',
    title: 'Doodloop',
    backgroundColor: 'var(--color-section-neutral)',
    navPlacement: 'top-level',
    navPanelBackgroundColor: 'var(--color-nav-panel)',
    navDescription: 'Drawing relay',
  },
  {
    id: 'admin-ui',
    title: 'Admin UI',
    backgroundColor: 'var(--color-section-neutral)',
    navPlacement: 'top-level',
    navPanelBackgroundColor: 'var(--color-nav-panel)',
    navDescription: 'Component library',
  },
]

const ABOUT_SECTIONS: readonly SectionData[] = [
  {
    id: ABOUT_SUMMARY.id,
    title: ABOUT_SUMMARY.title,
    backgroundColor: ABOUT_SUMMARY.backgroundColor,
    navPanelBackgroundColor: ABOUT_SUMMARY.navPanelBackgroundColor,
    ...(ABOUT_SUMMARY.textColor != null && { textColor: ABOUT_SUMMARY.textColor }),
    isSummary: true,
    navPlacement: 'top-level',
    navDescription: ABOUT_SUMMARY.label,
  },
  {
    id: EDUCATION.id,
    title: 'Education',
    backgroundColor: EDUCATION.backgroundColor,
    textColor: EDUCATION.textColor,
    educationId: EDUCATION.id,
    navPlacement: 'dated-submenu',
  },
  {
    id: 'frontend-development',
    title: 'Development',
    backgroundColor: 'var(--color-section-frontend)',
    navPlacement: 'top-level',
    navPanelBackgroundColor: 'var(--color-nav-panel)',
    navDescription: 'Coding experience',
  },
  {
    id: 'quotes',
    title: 'Testimonials',
    backgroundColor: 'var(--color-section-quotes)',
    textColor: 'var(--color-section-quotes-text)',
    isQuotes: true,
    navPlacement: 'top-level',
    navDescription: 'Colleague quotes',
  },
]

export const LANES: readonly LaneData[] = [
  { id: 'work', label: 'Work', introWord: 'Designer', outroWord: 'Maker', sections: [bookend('work', 'intro'), ...WORK_SECTIONS, bookend('work', 'outro')] },
  { id: 'personal', label: 'Personal', introWord: 'Builder', outroWord: 'Creator', sections: [bookend('personal', 'intro'), ...PERSONAL_SECTIONS, bookend('personal', 'outro')] },
  { id: 'about', label: 'Profile', introWord: 'Problem solver', outroWord: 'Mentor', sections: [bookend('about', 'intro'), ...ABOUT_SECTIONS, bookend('about', 'outro')] },
]

export const SECTIONS: readonly SectionData[] = LANES.flatMap((lane) => lane.sections)

export function laneIdForSection(sectionId: string): LaneId | undefined {
  return LANES.find((lane) => lane.sections.some((section) => section.id === sectionId))?.id
}
