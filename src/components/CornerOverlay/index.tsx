import { Grid3x3 } from 'lucide-react'
import { useSettings } from '@/settings/SettingsContext'
import { EMAIL_URL, LINKEDIN_URL } from '../../data/links'
import styles from './index.module.css'

export function CornerOverlay() {
  const year = new Date().getFullYear()
  const { settings, update } = useSettings()

  return (
    <div className={styles.root} data-corner-overlay>
      <div className={styles.topGroup}>
        <a
          className={styles.link}
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a className={styles.link} href={EMAIL_URL}>
          Email
        </a>
      </div>
      <div className={styles.bottomGroup}>
        <button
          type="button"
          className={styles.gridToggle}
          data-active={settings.showGrid}
          onClick={() => update('showGrid', !settings.showGrid)}
          aria-label={settings.showGrid ? 'Hide grid' : 'Show grid'}
          aria-pressed={settings.showGrid}
        >
          <Grid3x3 aria-hidden size={14} />
        </button>
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
        <span className={styles.year}>{year}</span>
        <span className={styles.name}>Peter Wright</span>
      </div>
    </div>
  )
}
