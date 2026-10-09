import { MetaColumn } from '@/components/MetaColumn'
import { ProjectHoverTooltip } from '@/components/ProjectHoverTooltip'
import { DESKTOP_TILT_MEDIA, useCursorTilt } from '@/hooks/useCursorTilt'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useSpringFollow } from '@/hooks/useSpringFollow'
import styles from './index.module.css'

const DAYRING_URL = 'https://dayring.f-90.co.uk'
const HERO_VIDEO = '/images/dayring-hero.mp4'
const HERO_POSTER = '/images/dayring-hero-poster.jpg'

export function DayringSection() {
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
        { label: 'Dayring' },
        { label: 'Personal project' },
      ]} />

      <p className={styles.descriptionColumn}>
        A minimalist iOS numbers tracker for daily goals — calories, water, workouts, and more.{' '}
        <a
          href={DAYRING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.siteLink}
        >
          dayring.f-90.co.uk ↗
        </a>
      </p>

      <a
        href={DAYRING_URL}
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
                width={390}
                height={844}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                disableRemotePlayback
                aria-label="Dayring app demo on iPhone"
              />
              <img
                className={styles.poster}
                src={HERO_POSTER}
                alt="Dayring counter screen on iPhone"
                width={390}
                height={844}
              />
            </div>
          </div>
        </div>
        <ProjectHoverTooltip
          label="dayring.f-90.co.uk"
          aboveTilt={isTiltEnabled}
          style={{ left: displayPos.x, top: displayPos.y }}
        />
      </a>
    </div>
  )
}
