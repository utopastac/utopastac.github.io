import { EMAIL_URL, LINKEDIN_URL } from '../../data/links'
import styles from './index.module.css'

export function CornerOverlay() {
  const year = new Date().getFullYear()

  return (
    <div className={styles.root}>
      <div className={styles.topLeft}>Peter Wright</div>
      <a
        className={styles.topRight}
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <div className={styles.bottomLeft}>{year}</div>
      <a className={styles.bottomRight} href={EMAIL_URL}>
        Email
      </a>
    </div>
  )
}
