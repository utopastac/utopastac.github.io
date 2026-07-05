import { useEffect, useRef } from 'react'
import { Grid3x3, Images, SquareGanttChart } from 'lucide-react'
import { useSettings } from '@/settings/SettingsContext'
import { EMAIL_URL, LINKEDIN_URL } from '../../data/links'
import { CornerIconButton } from '@/components/CornerIconButton'
import { Kbd } from '@/components/Kbd'
import { TiltControl } from '@/components/TiltControl'
import styles from './index.module.css'

const DEFAULT_TILT_INTENSITY = 100

export function CornerOverlay() {
  const year = new Date().getFullYear()
  const { settings, update } = useSettings()
  const prevIntensityRef = useRef<number>(
    settings.animationIntensity > 0 ? settings.animationIntensity : DEFAULT_TILT_INTENSITY,
  )

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
      if (e.metaKey && e.key === '.') {
        e.preventDefault()
        if (settings.animationIntensity > 0) {
          prevIntensityRef.current = settings.animationIntensity
          update('animationIntensity', 0)
        } else {
          update('animationIntensity', prevIntensityRef.current)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [settings.showGrid, settings.showImages, settings.animationIntensity, update])

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
        <CornerIconButton
          label={settings.showImages
            ? <>Text layout <Kbd>⌘</Kbd><Kbd>'</Kbd></>
            : <>Image layout <Kbd>⌘</Kbd><Kbd>'</Kbd></>
          }
          active={settings.showImages}
          onClick={() => update('showImages', !settings.showImages)}
          aria-label={settings.showImages ? 'Switch to text layout' : 'Switch to image layout'}
          aria-pressed={settings.showImages}
        >
          {settings.showImages
            ? <SquareGanttChart aria-hidden size={14} />
            : <Images aria-hidden size={14} />
          }
        </CornerIconButton>
        <CornerIconButton
          label={<>Grid <Kbd>⌘</Kbd><Kbd>;</Kbd></>}
          active={settings.showGrid}
          onClick={() => update('showGrid', !settings.showGrid)}
          aria-label={settings.showGrid ? 'Hide grid' : 'Show grid'}
          aria-pressed={settings.showGrid}
        >
          <Grid3x3 aria-hidden size={14} />
        </CornerIconButton>
        <TiltControl
          intensity={settings.animationIntensity}
          onToggle={() => {
            if (settings.animationIntensity > 0) {
              prevIntensityRef.current = settings.animationIntensity
              update('animationIntensity', 0)
            } else {
              update('animationIntensity', prevIntensityRef.current)
            }
          }}
          onIntensityChange={(value) => {
            prevIntensityRef.current = value
            update('animationIntensity', value)
          }}
        />
        <span className={styles.year}>{year}</span>
        <span className={styles.name}>Peter Wright</span>
      </div>
    </div>
  )
}
