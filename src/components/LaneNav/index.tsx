import type { LaneData, LaneId } from '@/data/sections'
import styles from './index.module.css'

type LaneNavProps = {
  lanes: readonly LaneData[]
  activeId: LaneId
  onChange: (id: LaneId) => void
  /** Hover a different lane to peek toward it; null clears. */
  onPeek?: (id: LaneId | null) => void
}

export function LaneNav({ lanes, activeId, onChange, onPeek }: LaneNavProps) {
  return (
    <nav className={styles.root} aria-label="Site sections">
      <div className={styles.track}>
        {lanes.map((lane) => (
          <button
            key={lane.id}
            type="button"
            className={styles.tab}
            aria-current={lane.id === activeId ? 'true' : undefined}
            onClick={() => onChange(lane.id)}
            onMouseEnter={() => onPeek?.(lane.id === activeId ? null : lane.id)}
            onMouseLeave={(event) => {
              const next = event.relatedTarget
              // Moving into a sibling tab — keep peek; only clear when leaving the nav
              if (next instanceof Node && event.currentTarget.parentElement?.contains(next)) return
              onPeek?.(null)
            }}
          >
            {lane.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
