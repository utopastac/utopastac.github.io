/**
 * Education / degree for the education section (from CV sidebar).
 */

export type EducationEntry = {
  id: string
  degree: string
  degreeShort: string
  institution: string
  institutionShort: string
  date: string
  details?: string
  backgroundColor: string
  navPanelBackgroundColor?: string,
  textColor?: string
}

export const EDUCATION: EducationEntry = {
  id: 'education',
  degree: 'BA hons Design for Communication',
  degreeShort: 'Design & typography',
  institution: 'Reading University',
  institutionShort: 'University',
  date: '2001',
  details: 'I studied typography at the department of Typography and graphic communication. Courses in Economics, Maths and Statistics.',
  backgroundColor: 'var(--color-section-education)',
  textColor: 'var(--color-section-education-text)',
  navPanelBackgroundColor: 'var(--color-nav-panel-education)',
}
