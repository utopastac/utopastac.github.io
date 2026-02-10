import { EMAIL_URL, LINKEDIN_URL } from '../../data/links'
import { JOBS } from '../../data/jobs'
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
        <p className={styles.workExperience}>
          {JOBS.map((job, index) => (
            <span key={job.id} className={styles.companyGroup}>
              {job.company}
              {index < JOBS.length - 1 && (
                <span className={styles.divider}> / </span>
              )}
            </span>
          ))}
        </p>
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
