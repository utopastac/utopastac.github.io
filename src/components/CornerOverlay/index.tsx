import { useEffect } from 'react'
import { Grid3x3, Images } from 'lucide-react'
import { useSettings } from '@/settings/SettingsContext'
import { EMAIL_URL, LINKEDIN_URL } from '../../data/links'
import styles from './index.module.css'

export function CornerOverlay() {
  const year = new Date().getFullYear()
  const { settings, update } = useSettings()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === ';') {
        e.preventDefault()
        update('showGrid', !settings.showGrid)
      }
      if (e.metaKey && e.key === "'") {
        e.preventDefault()
        update('showImages', !settings.showImages)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [settings.showGrid, settings.showImages, update])

  return (
    <div className={styles.root} data-corner-overlay>
      <div className={styles.mobileHeader}>
        <span className={styles.mobileName}>Peter Wright</span>
        <span className={styles.mobileSep}>/</span>
        <span className={styles.mobileYear}>{year}</span>
        <span className={styles.mobileSep}>/</span>
        <a className={styles.mobileLink} href={EMAIL_URL}>Email</a>
        <span className={styles.mobileSep}>/</span>
        <a className={styles.mobileLink} href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
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
          className={styles.imagesToggle}
          data-active={settings.showImages}
          onClick={() => update('showImages', !settings.showImages)}
          aria-label={settings.showImages ? 'Hide images' : 'Show all images'}
          aria-pressed={settings.showImages}
        >
          <Images aria-hidden size={14} />
        </button>
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
