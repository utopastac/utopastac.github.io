import { ProjectHoverTooltip } from '@/components/ProjectHoverTooltip'
import { useCursorTilt } from '@/hooks/useCursorTilt'
import { useSpringFollow } from '@/hooks/useSpringFollow'
import styles from './index.module.css'

const BACKGROUND_TILT_DEG = 20
const PP2_SRC = '/images/pp-2.jpg'

/** 3×3 grid. a0–a4, a6–a7 single; a5 = merged right column (2 rows), pp-2. */
const CELL_SOURCES = [
  '/images/pp-1.jpg',
  '/images/pp-3.jpg',
  '/images/pp-4.jpg',
  '/images/pp-5.jpg',
  '/images/pp-8.jpg',
  '/images/pp-6.jpg',
  PP2_SRC,
  '/images/pp-7.jpg',
  '/images/pp-10.jpg',
]

export function PlaypressSection() {
  const { displayPos, setTarget } = useSpringFollow()
  const { enabled: isTiltEnabled, tiltRef: foregroundTiltRef } = useCursorTilt()
  const { tiltRef: backgroundTiltRef } = useCursorTilt({
    enabled: isTiltEnabled,
    maxTiltDeg: BACKGROUND_TILT_DEG,
  })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTarget(e.clientX - rect.left, e.clientY - rect.top)
  }

  return (
    <a
      href="https://playpresstoys.com"
      target="_blank"
      rel="noopener noreferrer"
      className={isTiltEnabled ? `${styles.wrapper} ${styles.tiltEnabled}` : styles.wrapper}
      onMouseMove={handleMouseMove}
    >
      <div className={isTiltEnabled ? `${styles.root} ${styles.tiltRoot}` : styles.root}>
        <div
          ref={backgroundTiltRef}
          className={isTiltEnabled ? `${styles.grid} ${styles.tiltPlane}` : styles.grid}
        >
          {CELL_SOURCES.map((src, i) => (
            <div key={i} className={styles.cell} style={{ gridArea: `a${i}` }}>
              <img src={src} alt="" className={styles.image} />
            </div>
          ))}
        </div>
        <div
          ref={foregroundTiltRef}
          className={
            isTiltEnabled
              ? `${styles.logoLayer} ${styles.foregroundTilt} ${styles.tiltPlane}`
              : styles.logoLayer
          }
        >
          <img src="/images/pp-logo.png" alt="Playpress" className={styles.logo} />
        </div>
      </div>
      <ProjectHoverTooltip
        label="playpresstoys.com"
        aboveTilt={isTiltEnabled}
        style={{ left: displayPos.x, top: displayPos.y }}
      />
    </a>
  )
}
