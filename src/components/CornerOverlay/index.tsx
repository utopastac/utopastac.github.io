import { useSettings } from '@/settings/SettingsContext'
import { EMAIL_URL, LINKEDIN_URL } from '../../data/links'
import styles from './index.module.css'

export function CornerOverlay() {
  const year = new Date().getFullYear()
  const { settings, update } = useSettings()

  return (
    <div className={styles.root}>
      <div className={styles.topLeft}>
        Peter Wright
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
      <div className={styles.bottomLeft}>
        {year}
        <input
          type="range"
          className={styles.slider}
          min={0}
          max={100}
          step={1}
          value={settings.animationIntensity}
          onChange={(e) => update('animationIntensity', Number(e.target.value))}
          aria-label="Animation intensity"
        />
      </div>
    </div>
  )
}
