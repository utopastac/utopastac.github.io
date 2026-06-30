import { MetaColumn } from '@/components/MetaColumn'
import { ProjectHoverTooltip } from '@/components/ProjectHoverTooltip'
import { DESKTOP_TILT_MEDIA, useCursorTilt } from '@/hooks/useCursorTilt'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useSpringFollow } from '@/hooks/useSpringFollow'
import styles from './index.module.css'

const PIXEL_PORTRAIT_SRCS = Array.from({ length: 50 }, (_, i) => ({
  src: `/images/p${i + 1}.PNG`,
  alt: `Pixel portrait ${i + 1}`,
}))

const PORTRAIT_MAX_TILT_DEG = 200
const PORTRAIT_LERP_FACTOR = 0.35
const PORTRAIT_MAX_INFLUENCE_RADIUS = 2000

type PortraitCellProps = {
  src: string
  alt: string
  enabled: boolean
}

function PortraitCell({ src, alt, enabled }: PortraitCellProps) {
  const { tiltRef } = useCursorTilt({
    enabled,
    maxTiltDeg: PORTRAIT_MAX_TILT_DEG,
    lerpFactor: PORTRAIT_LERP_FACTOR,
    maxInfluenceRadius: PORTRAIT_MAX_INFLUENCE_RADIUS,
  })

  return (
    <div
      ref={enabled ? tiltRef : undefined}
      className={enabled ? `${styles.cell} ${styles.tiltPlane}` : styles.cell}
    >
      <img src={src} alt={alt} className={styles.image} />
    </div>
  )
}

export function PixelPortraitsSection() {
  const { displayPos, setTarget } = useSpringFollow()
  const isTiltEnabled = useMediaQuery(DESKTOP_TILT_MEDIA)
  const { perspectiveRootRef } = useCursorTilt({ enabled: isTiltEnabled })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTarget(e.clientX - rect.left, e.clientY - rect.top)
  }

  return (
    <div className={styles.root}>
      <MetaColumn items={[
        { label: 'Pixelator' },
        { label: 'Personal project' },
      ]} />

      <p className={styles.descriptionColumn}>
        A React-based interface for creating and sharing pixel art projects.{' '}
        <a
          href="https://pixelator.f-90.co.uk"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.siteLink}
        >
          pixelator.f-90.co.uk ↗
        </a>
      </p>

      <a
        href="https://pixelator.f-90.co.uk"
        target="_blank"
        rel="noopener noreferrer"
        className={isTiltEnabled ? `${styles.imageColumn} ${styles.tiltEnabled}` : styles.imageColumn}
        onMouseMove={handleMouseMove}
      >
        <div ref={perspectiveRootRef} className={isTiltEnabled ? `${styles.scene} ${styles.tiltRoot}` : styles.scene}>
          <div className={styles.grid}>
            {PIXEL_PORTRAIT_SRCS.map(({ src, alt }, i) => (
              <PortraitCell key={i} src={src} alt={alt} enabled={isTiltEnabled} />
            ))}
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
