/**
 * About-lane copy drawn from the CV executive summary.
 */

export type AboutSummary = {
  id: string
  title: string
  label: string
  summary: string
  backgroundColor: string
  navPanelBackgroundColor?: string
  textColor?: string
}

export const ABOUT_SUMMARY: AboutSummary = {
  id: 'summary',
  title: 'Summary',
  label: 'Principal Product Designer',
  summary:
    'Principal Product Designer and creative prototyper with 20+ years spanning global tech leaders (LinkedIn, Cash App, Twitter, Meta, Spotify, Google), scale-ups, and entrepreneurial ventures. Proven track record leading product strategy, driving trust and safety initiatives, scaling design systems, and building high-impact prototypes. Adept at bridging complex user needs, regulatory requirements, and technical implementation through a collaborative, user-centered approach.',
  backgroundColor: 'var(--color-section-summary)',
  textColor: 'var(--color-section-summary-text)',
  navPanelBackgroundColor: 'var(--color-nav-panel-summary)',
}
