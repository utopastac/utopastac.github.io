import { useCallback, useRef, useState } from 'react'
import styles from './index.module.css'

type SettingsScrubberProps = {
  label?: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  unit?: string
}

export function SettingsScrubber({
  label,
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  unit = '',
}: SettingsScrubberProps) {
  const [editing, setEditing] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const dragStartX = useRef<number>(0)
  const dragStartValue = useRef<number>(0)
  const dragged = useRef(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const clamp = useCallback(
    (v: number) => Math.min(max, Math.max(min, v)),
    [min, max],
  )

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (editing) return
      e.currentTarget.setPointerCapture(e.pointerId)
      dragStartX.current = e.clientX
      dragStartValue.current = value
      dragged.current = false
    },
    [editing, value],
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
      const delta = e.clientX - dragStartX.current
      if (Math.abs(delta) >= 4) {
        dragged.current = true
      }
      if (dragged.current) {
        const newValue = clamp(
          Math.round((dragStartValue.current + delta * step) / step) * step,
        )
        onChange(newValue)
      }
    },
    [clamp, onChange, step],
  )

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragged.current) {
        setInputValue(String(value))
        setEditing(true)
        requestAnimationFrame(() => {
          inputRef.current?.select()
        })
      }
      dragged.current = false
      e.currentTarget.releasePointerCapture(e.pointerId)
    },
    [value],
  )

  const commitEdit = useCallback(() => {
    const parsed = parseFloat(inputValue)
    if (!isNaN(parsed)) {
      onChange(clamp(parsed))
    }
    setEditing(false)
  }, [inputValue, clamp, onChange])

  const cancelEdit = useCallback(() => {
    setEditing(false)
  }, [])

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        commitEdit()
      } else if (e.key === 'Escape') {
        cancelEdit()
      }
    },
    [commitEdit, cancelEdit],
  )

  const displayValue =
    Number.isInteger(step) || step >= 1
      ? String(Math.round(value))
      : value.toFixed(String(step).split('.')[1]?.length ?? 2)

  return (
    <div
      className={styles.root}
      onPointerDown={editing ? undefined : handlePointerDown}
      onPointerMove={editing ? undefined : handlePointerMove}
      onPointerUp={editing ? undefined : handlePointerUp}
      data-editing={editing}
    >
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.valueWrapper}>
        {unit && <span className={styles.unit}>{unit}</span>}
        {editing ? (
          <input
            ref={inputRef}
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={handleInputKeyDown}
            autoFocus
          />
        ) : (
          <span className={styles.valueDisplay}>{displayValue}</span>
        )}
      </div>
    </div>
  )
}
