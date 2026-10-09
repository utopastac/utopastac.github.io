import { MetaColumn } from '@/components/MetaColumn'
import { ProjectHoverTooltip } from '@/components/ProjectHoverTooltip'
import { DESKTOP_TILT_MEDIA, useCursorTilt } from '@/hooks/useCursorTilt'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useSpringFollow } from '@/hooks/useSpringFollow'
import styles from './index.module.css'

const EMPIRES_URL = 'https://empires.f-90.co.uk'
const HERO_SRC = '/images/empires-hero.png'

export function EmpiresSection() {
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
        { label: 'Empires' },
        { label: 'Personal project' },
      ]} />

      <p className={styles.descriptionColumn}>
        A local multiplayer party word game. Write secret answers, guess who wrote them, and absorb everyone into your empire.{' '}
        <a
          href={EMPIRES_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.siteLink}
        >
          empires.f-90.co.uk ↗
        </a>
      </p>

      <a
        href={EMPIRES_URL}
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
                alt="Empires home screen on iPhone"
                width={460}
                height={1000}
              />
            </div>
          </div>
        </div>
        <ProjectHoverTooltip
          label="empires.f-90.co.uk"
          aboveTilt={isTiltEnabled}
          style={{ left: displayPos.x, top: displayPos.y }}
        />
      </a>
    </div>
  )
}
