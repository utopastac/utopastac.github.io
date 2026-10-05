import { useCursorTilt } from '@/hooks/useCursorTilt'
import styles from './index.module.css'

const COLS = 10

type ColumnGridProps = {
  navOpen?: boolean
}

export function ColumnGrid({ navOpen = false }: ColumnGridProps) {
  const { enabled: isTiltEnabled, tiltRef, perspectiveRootRef } = useCursorTilt()

  return (
    <div
      ref={perspectiveRootRef}
      className={styles.root}
      data-nav-open={navOpen ? true : undefined}
      aria-hidden
    >
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
