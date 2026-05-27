import type { CSSProperties, ReactNode } from 'react'
import styles from './index.module.css'

type ProjectHoverTooltipProps = {
  /** URL label shown inside the card (e.g. playpresstoys.com). */
  label?: string
  /** Optional custom card content instead of label. */
  children?: ReactNode
  /** Cursor-follow position from useSpringFollow (left / top). */
  style?: CSSProperties
  /** Raise above 3D tilt planes (translateZ + z-index). */
  aboveTilt?: boolean
  /** Extra class names (e.g. section-specific modifiers). */
  className?: string
  /** Override pointer-events (defaults to none so parent link receives clicks). */
  pointerEvents?: CSSProperties['pointerEvents']
  /** Controlled visibility; omit to rely on parent :hover via data attribute. */
  visible?: boolean
}

export function ProjectHoverTooltip({
  label,
  children,
  style,
  aboveTilt = false,
  className,
  pointerEvents = 'none',
  visible,
}: ProjectHoverTooltipProps) {
  const rootClass = [
    styles.root,
    aboveTilt ? styles.aboveTilt : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  const mergedStyle: CSSProperties = {
    ...style,
    pointerEvents,
    ...(visible !== undefined ? { opacity: visible ? 1 : 0 } : {}),
  }

  return (
    <div
      className={rootClass}
      data-project-hover-tooltip
      aria-hidden="true"
      style={mergedStyle}
    >
      {children ?? (label ? <p className={styles.label}>{label}</p> : null)}
    </div>
  )
}
