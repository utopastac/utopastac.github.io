/**
 * Section data: single source of truth for section content, title, background, etc.
 * Includes intro, one section per job (from JOBS), and a quotes section at the end.
 */

import { JOBS } from './jobs'

export type SectionData = {
  id: string
  title: string
  backgroundColor: string
  /** When set, this section renders JobSection with the given job id from JOBS. */
  jobId?: string
  /** When true, this section renders QuotesSection. */
  isQuotes?: boolean
}

export const SECTIONS: readonly SectionData[] = [
  { id: 'intro', title: 'intro', backgroundColor: '#f5f5f0' },
  ...JOBS.map((job) => ({
    id: job.id,
    title: job.company,
    backgroundColor: job.backgroundColor,
    jobId: job.id,
  })),
  {
    id: 'quotes',
    title: 'What people say',
    backgroundColor: '#e0e0dc',
    isQuotes: true,
  },
] as const
