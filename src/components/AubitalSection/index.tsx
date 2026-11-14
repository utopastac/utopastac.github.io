import { MetaColumn } from '@/components/MetaColumn'
import { ProjectHoverTooltip } from '@/components/ProjectHoverTooltip'
import { DESKTOP_TILT_MEDIA, useCursorTilt } from '@/hooks/useCursorTilt'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useSpringFollow } from '@/hooks/useSpringFollow'
import styles from './index.module.css'

const AUBITAL_URL = 'https://aubital.f-90.co.uk'
const HERO_SRC = '/images/aubital-hero.png'

export function AubitalSection() {
  const { displayPos, setTarget } = useSpringFollow()
  const isTiltEnabled = useMediaQuery(DESKTOP_TILT_MEDIA)
  const { tiltRef, perspectiveRootRef } = useCursorTilt({ enabled: isTiltEnabled })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTarget(e.clientX - rect.left, e.clientY - rect.top)
  }

  return (
    <div className={styles.root}>
      <MetaColumn items={[
        { label: 'Aubital' },
        { label: 'Personal project' },
      ]} />

      <p className={styles.descriptionColumn}>
        A web and iOS app for drawing looping melodies on a spinning cylinder.{' '}
        <a
          href={AUBITAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.siteLink}
        >
          aubital.f-90.co.uk ↗
        </a>
      </p>

      <a
        href={AUBITAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={isTiltEnabled ? `${styles.mediaColumn} ${styles.tiltEnabled}` : styles.mediaColumn}
        onMouseMove={handleMouseMove}
      >
        <div
          ref={perspectiveRootRef}
          className={isTiltEnabled ? `${styles.scene} ${styles.tiltRoot}` : styles.scene}
        >
          <div
            ref={tiltRef}
            className={isTiltEnabled ? `${styles.band} ${styles.tiltPlane}` : styles.band}
          >
            <div className={styles.device}>
              <img
                className={styles.screen}
                src={HERO_SRC}
                alt="Aubital melody editor on iPhone"
                width={1320}
                height={2868}
              />
            </div>
          </div>
        </div>
        <ProjectHoverTooltip
          label="aubital.f-90.co.uk"
          aboveTilt={isTiltEnabled}
          style={{ left: displayPos.x, top: displayPos.y }}
        />
      </a>
    </div>
  )
}
