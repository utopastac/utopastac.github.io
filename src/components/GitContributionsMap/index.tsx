import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.css'

const CELL_GAP_PX = 2
const TARGET_CELL_SIZE_PX = 24

type GridMetrics = {
  columns: number
  rows: number
  cellSize: number
}

function getGridMetrics(width: number, height: number): GridMetrics {
  const approxColumns = Math.max(1, Math.ceil(width / TARGET_CELL_SIZE_PX))
  const approxRows = Math.max(1, Math.ceil(height / TARGET_CELL_SIZE_PX))

  const cellSize = Math.max(
    (width + CELL_GAP_PX) / approxColumns - CELL_GAP_PX,
    (height + CELL_GAP_PX) / approxRows - CELL_GAP_PX,
  )

  const columns = Math.max(1, Math.ceil((width + CELL_GAP_PX) / (cellSize + CELL_GAP_PX)))
  const rows = Math.max(1, Math.ceil((height + CELL_GAP_PX) / (cellSize + CELL_GAP_PX)))

  return { columns, rows, cellSize }
}

function hash2d(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123
  return n - Math.floor(n)
}

function getContributionLevel(column: number, row: number, columns: number, rows: number): 0 | 1 | 2 | 3 | 4 {
  const horizontal = columns > 1 ? column / (columns - 1) : 0
  const vertical = rows > 1 ? row / (rows - 1) : 0
  // Spread activity over the full map with broad + local variation.
  const lowFreqA = hash2d(horizontal * 6.3 + 1.9, vertical * 5.7 + 8.2)
  const lowFreqB = hash2d(horizontal * 4.1 + 14.6, vertical * 4.9 + 2.3)
  const midFreq = hash2d(horizontal * 12.7 + 7.1, vertical * 11.3 + 19.4)
  const cluster = hash2d(Math.floor(column / 4) + 3.7, Math.floor(row / 4) + 9.9)
  const grain = hash2d(column * 2.3, row * 2.7)
  const edgeSoftener = 1 - Math.max(Math.abs(horizontal - 0.5), Math.abs(vertical - 0.5)) * 0.22

  const activityScore =
    0.36 +
    lowFreqA * 0.17 +
    lowFreqB * 0.15 +
    midFreq * 0.11 +
    cluster * 0.13 +
    edgeSoftener * 0.06

  const quietField = hash2d(horizontal * 9.2 + 12.1, vertical * 8.6 + 5.4)
  const quietChance = 0.16 + (1 - activityScore) * 0.34 + quietField * 0.12
  const isGapDay = grain < quietChance

  if (isGapDay) return 0

  const darkChance = hash2d(column * 1.71 + 4.2, row * 1.29 + 2.6)
  if (activityScore > 0.84 && darkChance > 0.88) return 4
  if (activityScore > 0.8 && darkChance > 0.8) return 3
  if (activityScore > 0.63 && darkChance > 0.45) return 2
  return 1
}

export function GitContributionsMap() {
  const rootRef = useRef<HTMLElement | null>(null)
  const [metrics, setMetrics] = useState<GridMetrics>({
    columns: 40,
    rows: 40,
    cellSize: TARGET_CELL_SIZE_PX,
  })

  useEffect(() => {
    const element = rootRef.current
    if (!element) return

    const updateMetrics = () => {
      const { width, height } = element.getBoundingClientRect()
      if (width <= 0 || height <= 0) return

      const next = getGridMetrics(width, height)
      setMetrics((prev) => {
        const isSameLayout =
          prev.columns === next.columns &&
          prev.rows === next.rows &&
          Math.abs(prev.cellSize - next.cellSize) < 0.1
        return isSameLayout ? prev : next
      })
    }

    updateMetrics()
    const observer = new ResizeObserver(updateMetrics)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const cells = useMemo(() => {
    return Array.from({ length: metrics.columns * metrics.rows }, (_, i) => {
      const column = i % metrics.columns
      const row = Math.floor(i / metrics.columns)
      return {
        key: `${column}-${row}`,
        level: getContributionLevel(column, row, metrics.columns, metrics.rows),
      }
    })
  }, [metrics.columns, metrics.rows])

  return (
    <section ref={rootRef} className={styles.root} aria-label="Abstract yearly contribution heatmap">
      <div
        className={styles.grid}
        aria-hidden="true"
        style={{
          ['--cols' as string]: `${metrics.columns}`,
          ['--rows' as string]: `${metrics.rows}`,
          ['--cell-size' as string]: `${metrics.cellSize}px`,
          ['--cell-gap' as string]: `${CELL_GAP_PX}px`,
        }}
      >
        {cells.map(({ key, level }) => (
          <span key={key} className={styles.cell} data-level={level} />
        ))}
      </div>
    </section>
  )
}
