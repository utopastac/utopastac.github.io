/**
 * Section data: single source of truth for section content, title, background, etc.
 * Includes intro, one section per job (from JOBS), education, and a quotes section at the end.
 */

import { EDUCATION } from '@/data/education'
import { JOBS } from '@/data/jobs'

export type SectionData = {
  id: string
  title: string
  backgroundColor: string
  /** Optional text color for section content (e.g. var(--color-text-on-dark) for dark backgrounds). */
  textColor?: string
  /** When set, this section renders JobSection with the given job id from JOBS. */
  jobId?: string
  /** When set, this section renders EducationSection (id must match EDUCATION.id). */
  educationId?: string
  /** When true, this section renders QuotesSection. */
  isQuotes?: boolean
}

export const SECTIONS: readonly SectionData[] = [
  { id: 'intro', title: 'intro', backgroundColor: '#f5f5f0' },
  ...JOBS.map((job) => ({
    id: job.id,
    title: job.company,
    backgroundColor: job.backgroundColor,
    ...(job.textColor != null && { textColor: job.textColor }),
    jobId: job.id,
  })),
  {
    id: EDUCATION.id,
    title: 'Education',
    backgroundColor: EDUCATION.backgroundColor,
    educationId: EDUCATION.id,
  },
  {
    id: 'quotes',
    title: 'What people say',
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
    isQuotes: true,
  },
] as const
