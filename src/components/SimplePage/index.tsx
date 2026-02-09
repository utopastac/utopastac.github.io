import { EMAIL_URL, LINKEDIN_URL } from '../../data/links'
import styles from './index.module.css'

export function SimplePage() {
  const year = new Date().getFullYear()

  return (
    <div className={styles.root}>
      <p className={styles.nameYear}>
        Peter Wright {year}
      </p>
      <h1 className={styles.title}>principal designer</h1>
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
