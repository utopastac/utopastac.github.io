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
  institutionShort: 'Reading Uni',
  date: '2001',
  details: 'I studied typography at the dapartment of Typography and graphic communication. Courses in Economics, Maths and Statistics.',
  backgroundColor: '#b8744c',
  textColor: '#f4f1ea',
  navPanelBackgroundColor: 'rgba(255, 255, 255, 0.05)'
}
