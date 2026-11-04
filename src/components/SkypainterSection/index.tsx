import { MetaColumn } from '@/components/MetaColumn'
import { ProjectHoverTooltip } from '@/components/ProjectHoverTooltip'
import { DESKTOP_TILT_MEDIA, useCursorTilt } from '@/hooks/useCursorTilt'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useSpringFollow } from '@/hooks/useSpringFollow'
import styles from './index.module.css'

const SKYPAINTER_URL = 'https://skypainter.f-90.co.uk'
const HERO_SRC = '/images/skypainter-hero.png'

export function SkypainterSection() {
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
        { label: 'Skypainter' },
        { label: 'Personal project' },
      ]} />

      <p className={styles.descriptionColumn}>
        A drawing app for painting light across a sky and a globe.{' '}
        <a
          href={SKYPAINTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.siteLink}
        >
          skypainter.f-90.co.uk ↗
        </a>
      </p>

      <a
        href={SKYPAINTER_URL}
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
            <div className={styles.frame}>
              <img
                className={styles.screen}
                src={HERO_SRC}
                alt="Skypainter promotional artwork"
                width={1832}
                height={1096}
              />
            </div>
          </div>
        </div>
        <ProjectHoverTooltip
          label="skypainter.f-90.co.uk"
          aboveTilt={isTiltEnabled}
          style={{ left: displayPos.x, top: displayPos.y }}
        />
      </a>
    </div>
  )
}
