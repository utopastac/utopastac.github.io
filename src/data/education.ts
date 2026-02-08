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
}

export const EDUCATION: EducationEntry = {
  id: 'education',
  degree: 'BA hons Design for Communication',
  institution: 'University of Reading',
  date: '2001 – 2005',
  details: 'Courses in Economics, Maths and Statistics.',
  backgroundColor: '#e8e4e0',
}
