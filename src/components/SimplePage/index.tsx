import styles from './index.module.css'

const LINKEDIN_URL = 'https://www.linkedin.com/in/peterwright'
const EMAIL = 'mailto:peter@example.com'

export function SimplePage() {
  const year = new Date().getFullYear()

  return (
    <div className={styles.root}>
      <p className={styles.nameYear}>
        Peter Wright {year}
      </p>
      <h1 className={styles.title}>principal designer</h1>
      <nav className={styles.links}>
        <a href={EMAIL}>Email</a>
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
