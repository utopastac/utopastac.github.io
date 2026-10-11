import { MetaColumn } from '@/components/MetaColumn'
import { ProjectHoverTooltip } from '@/components/ProjectHoverTooltip'
import { DESKTOP_TILT_MEDIA, useCursorTilt } from '@/hooks/useCursorTilt'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useSpringFollow } from '@/hooks/useSpringFollow'
import styles from './index.module.css'

const EMPIRES_URL = 'https://empires.f-90.co.uk'
const HERO_VIDEO = '/images/empires-hero.mp4'
const HERO_POSTER = '/images/empires-hero-poster.jpg'

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
              <video
                className={styles.video}
                src={HERO_VIDEO}
                poster={HERO_POSTER}
                width={780}
                height={1696}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                disableRemotePlayback
                aria-label="Empires app demo on iPhone"
              />
              <img
                className={styles.poster}
                src={HERO_POSTER}
                alt="Empires home screen on iPhone"
                width={780}
                height={1696}
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
