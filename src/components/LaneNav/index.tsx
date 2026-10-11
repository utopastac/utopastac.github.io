import type { LaneData, LaneId } from '@/data/sections'
import styles from './index.module.css'

type LaneNavProps = {
  lanes: readonly LaneData[]
  activeId: LaneId
  onChange: (id: LaneId) => void
}

export function LaneNav({ lanes, activeId, onChange }: LaneNavProps) {
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
          >
            {lane.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
