import { MetaColumn } from '@/components/MetaColumn'
import { ProjectHoverTooltip } from '@/components/ProjectHoverTooltip'
import { DESKTOP_TILT_MEDIA, useCursorTilt } from '@/hooks/useCursorTilt'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useSpringFollow } from '@/hooks/useSpringFollow'
import styles from './index.module.css'

const DOODLOOP_URL = 'https://doodloop.f-90.co.uk'
const HERO_SRC = '/images/doodloop-hero.png'

export function DoodloopSection() {
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
        { label: 'Doodloop' },
        { label: 'Personal project' },
      ]} />

      <p className={styles.descriptionColumn}>
        A drawing relay for nearby iPhones. Draw, pass it on, guess, then see how far the doodle wandered.{' '}
        <a
          href={DOODLOOP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.siteLink}
        >
          doodloop.f-90.co.uk ↗
        </a>
      </p>

      <a
        href={DOODLOOP_URL}
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
                alt="Doodloop home screen on iPhone"
                width={1206}
                height={2622}
              />
            </div>
          </div>
        </div>
        <ProjectHoverTooltip
          label="doodloop.f-90.co.uk"
          aboveTilt={isTiltEnabled}
          style={{ left: displayPos.x, top: displayPos.y }}
        />
      </a>
    </div>
  )
}
