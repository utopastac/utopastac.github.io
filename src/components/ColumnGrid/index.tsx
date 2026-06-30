import { useCursorTilt } from '@/hooks/useCursorTilt'
import styles from './index.module.css'

const COLS = 10

export function ColumnGrid() {
  const { enabled: isTiltEnabled, tiltRef, perspectiveRootRef } = useCursorTilt()

  return (
    <div ref={perspectiveRootRef} className={styles.root} aria-hidden>
      <div
        ref={isTiltEnabled ? tiltRef : undefined}
        className={isTiltEnabled ? `${styles.grid} ${styles.tiltPlane}` : styles.grid}
      >
        {Array.from({ length: COLS }, (_, i) => (
          <div key={i} className={styles.col} />
        ))}
      </div>
    </div>
  )
}
