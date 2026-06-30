import { useCursorTilt } from '@/hooks/useCursorTilt'
import styles from './index.module.css'

const FOREGROUND_TILT_DEG = 20
const BACKGROUND_TILT_DEG = 15

export function IntroHero() {
  const { enabled: isTiltEnabled, tiltRef: foregroundTiltRef, perspectiveRootRef } = useCursorTilt({ maxTiltDeg: FOREGROUND_TILT_DEG })
  const { tiltRef: backgroundTiltRef } = useCursorTilt({ maxTiltDeg: BACKGROUND_TILT_DEG, enabled: isTiltEnabled })

  return (
    <div className={styles.root}>
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
              [Principal, product, toy, strategy, ai] Designer.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
