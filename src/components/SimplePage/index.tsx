import { EMAIL_URL, LINKEDIN_URL } from '../../data/links'
import { JOBS } from '../../data/jobs'
import { EDUCATION } from '../../data/education'
import { JobRow } from '@/components/JobRow'
import styles from './index.module.css'

export function SimplePage() {
  const year = new Date().getFullYear()

  return (
    <div className={styles.root}>
      <p className={styles.nameYear}>
        Peter Wright / {year}
      </p>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Principal designer.</h1>
        <div className={styles.workExperience}>
          {JOBS.map((job) => (
            <JobRow
              key={job.id}
              date={job.date}
              company={job.company}
              title={job.jobTitle}
              size="sm"
            />
          ))}
          <JobRow
            key={EDUCATION.id}
            date={EDUCATION.date}
            company={EDUCATION.institutionShort}
            title={EDUCATION.degreeShort}
            size="sm"
          />
        </div>
      </div>
      <nav className={styles.links}>
        <a href={EMAIL_URL}>Email</a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </nav>
    </div>
  )
}
