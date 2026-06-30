import { DotGrid } from '@/components/DotGrid'
import { useCursorTilt } from '@/hooks/useCursorTilt'
import styles from './index.module.css'

const FOREGROUND_TILT_DEG = 20
const BACKGROUND_TILT_DEG = 15
const DOT_GRID_TILT_DEG = 12

export function IntroHero() {
  const { enabled: isTiltEnabled, tiltRef: foregroundTiltRef, perspectiveRootRef } = useCursorTilt({ maxTiltDeg: FOREGROUND_TILT_DEG })
  const { tiltRef: backgroundTiltRef } = useCursorTilt({ maxTiltDeg: BACKGROUND_TILT_DEG, enabled: isTiltEnabled })
  const { tiltRef: dotGridTiltRef } = useCursorTilt({ maxTiltDeg: DOT_GRID_TILT_DEG, enabled: isTiltEnabled })

  return (
    <div className={styles.root}>
      {isTiltEnabled ? (
        <div className={styles.dotGridScene} aria-hidden>
          <div ref={dotGridTiltRef} className={`${styles.dotGridTilt} ${styles.tiltPlane}`}>
            <DotGrid />
          </div>
        </div>
      ) : (
        <div className={styles.dotGridBackdrop} aria-hidden>
          <DotGrid />
        </div>
      )}
      <div className={styles.heroScene}>
        <div ref={perspectiveRootRef} className={isTiltEnabled ? styles.tiltRoot : styles.tiltRoot}>
          <div
            ref={isTiltEnabled ? backgroundTiltRef : undefined}
            className={isTiltEnabled ? `${styles.photoLayer} ${styles.tiltBackground}` : styles.photoLayer}
            aria-hidden
          >
            <div className={styles.photoPlaceholder} />
          </div>
          <div
            ref={isTiltEnabled ? foregroundTiltRef : undefined}
            className={isTiltEnabled ? `${styles.textLayer} ${styles.tiltForeground}` : styles.textLayer}
          >
            <p className={styles.bio}>
              Peter Wright is a principal designer working across product, systems, and experience. He has shipped work for companies in technology, consumer goods, and media. Currently available for new projects and collaborations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
