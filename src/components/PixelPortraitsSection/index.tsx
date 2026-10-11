import { MetaColumn } from '@/components/MetaColumn'
import { ProjectHoverTooltip } from '@/components/ProjectHoverTooltip'
import { DESKTOP_TILT_MEDIA, useCursorTilt } from '@/hooks/useCursorTilt'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useSpringFollow } from '@/hooks/useSpringFollow'
import styles from './index.module.css'

const PIXELATOR_URL = 'https://pixelator.f-90.co.uk'
const HERO_VIDEO = '/images/pixelator-hero.mp4'
const HERO_POSTER = '/images/pixelator-hero-poster.jpg'

export function PixelPortraitsSection() {
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
        { label: 'Pixelator' },
        { label: 'Web & iOS' },
      ]} />

      <p className={styles.descriptionColumn}>
        A pixel art editor for creating and sharing drawings — on the web and as an iOS app.{' '}
        <a
          href={PIXELATOR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.siteLink}
        >
          pixelator.f-90.co.uk ↗
        </a>
      </p>

      <a
        href={PIXELATOR_URL}
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
                aria-label="Pixelator app demo on iPhone"
              />
              <img
                className={styles.poster}
                src={HERO_POSTER}
                alt="Pixelator editor on iPhone"
                width={780}
                height={1696}
              />
            </div>
          </div>
        </div>
        <ProjectHoverTooltip
          label="pixelator.f-90.co.uk"
          aboveTilt={isTiltEnabled}
          style={{ left: displayPos.x, top: displayPos.y }}
        />
      </a>
    </div>
  )
}
