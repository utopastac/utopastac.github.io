import { LANES, type LaneId } from '@/data/sections'

export function isLaneId(value: string): value is LaneId {
  return LANES.some((lane) => lane.id === value)
}

/** Read the active lane from `location.hash` (`#work`, `#personal`, `#about`). */
export function laneIdFromHash(hash = window.location.hash): LaneId {
  const raw = hash.replace(/^#/, '').split('/')[0]?.trim() ?? ''
  return isLaneId(raw) ? raw : 'work'
}

export function hashForLane(laneId: LaneId): string {
  return `#${laneId}`
}
