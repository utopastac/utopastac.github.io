import { Settings } from 'lucide-react'
import { EMAIL_URL, LINKEDIN_URL } from '../../data/links'
import styles from './index.module.css'

type CornerOverlayProps = {
  onSettingsOpen?: () => void
}

export function CornerOverlay({ onSettingsOpen }: CornerOverlayProps) {
  const year = new Date().getFullYear()

  return (
    <div className={styles.root}>
      <div className={styles.topLeft}>
        Peter Wright
        {onSettingsOpen && (
          <button
            type="button"
            className={styles.settingsButton}
            onClick={onSettingsOpen}
            aria-label="Open settings"
          >
            <Settings size={14} aria-hidden />
          </button>
        )}
      </div>
      <div className={styles.contactLinks}>
        <a
          className={styles.topRight}
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a className={styles.bottomRight} href={EMAIL_URL}>
          Email
        </a>
      </div>
      <div className={styles.bottomLeft}>{year}</div>
    </div>
  )
}
