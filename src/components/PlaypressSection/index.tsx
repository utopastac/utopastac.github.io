import { ProjectHoverTooltip } from '@/components/ProjectHoverTooltip'
import { useCursorTilt } from '@/hooks/useCursorTilt'
import { useSpringFollow } from '@/hooks/useSpringFollow'
import styles from './index.module.css'

const BACKGROUND_TILT_DEG = 20
const PP2_SRC = '/images/pp-2.jpg'

/** 4×3 grid. a0–a5 single; a6 = merged right column (2 rows), pp-2. */
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
  const { enabled: isTiltEnabled, tiltRef: foregroundTiltRef, perspectiveRootRef } = useCursorTilt()
  const { tiltRef: backgroundTiltRef } = useCursorTilt({
    enabled: isTiltEnabled,
    maxTiltDeg: BACKGROUND_TILT_DEG,
  })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTarget(e.clientX - rect.left, e.clientY - rect.top)
  }

  return (
    <div className={styles.root}>
      <div className={styles.metaColumn}>
        <h2 className={styles.company}>Playpress</h2>
        <span className={styles.type}>Toy company</span>
        <span className={styles.location}>UK based</span>
      </div>

      <p className={styles.descriptionColumn}>
        Playpress makes beautifully designed cardboard play sets for children — encouraging imaginative, screen-free play through thoughtful, sustainable design.{' '}
        <a
          href="https://playpresstoys.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.siteLink}
        >
          playpresstoys.com ↗
        </a>
      </p>

      <a
        href="https://playpresstoys.com"
        target="_blank"
        rel="noopener noreferrer"
        className={isTiltEnabled ? `${styles.imageColumn} ${styles.tiltEnabled}` : styles.imageColumn}
        onMouseMove={handleMouseMove}
      >
        <div
          ref={perspectiveRootRef}
          className={isTiltEnabled ? `${styles.imageRoot} ${styles.tiltRoot}` : styles.imageRoot}
        >
          <div
            ref={backgroundTiltRef}
            className={isTiltEnabled ? `${styles.grid} ${styles.tiltPlane} ${styles.gridTilt}` : styles.grid}
          >
            {CELL_SOURCES.map((src, i) => (
              <div key={i} className={styles.cell}>
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
    </div>
  )
}
