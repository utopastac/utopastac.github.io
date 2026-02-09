/**
 * Education / degree for the education section (from CV sidebar).
 */

export type EducationEntry = {
  id: string
  degree: string
  institution: string
  date: string
  details?: string
  backgroundColor: string
  textColor?: string
}

export const EDUCATION: EducationEntry = {
  id: 'education',
  degree: 'BA hons Design for Communication',
  institution: 'University of Reading',
  date: '2001–2005',
  details: 'I studied typography at the dapartment of Typography and graphic communication. Courses in Economics, Maths and Statistics.',
  backgroundColor: '#b8744c',
  textColor: '#f4f1ea',
}
