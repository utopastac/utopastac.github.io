import { useCallback, useContext, useRef } from 'react'
import { SectionBackgroundContext } from '@/context/SectionBackgroundContext'
import styles from './index.module.css'

type SectionProps = {
  id: string
  backgroundColor: string
  /** Optional text color for section content (sets --section-text-color). */
  textColor?: string
  /** Optional navigation panel background color (rgba value). */
  navPanelBackgroundColor?: string
  children: React.ReactNode
}

export function Section({ id, backgroundColor, textColor, navPanelBackgroundColor, children }: SectionProps) {
  const ctx = useContext(SectionBackgroundContext)
  const ref = useRef<HTMLElement>(null)
  const isActive = ctx?.activeSectionId === id
  const isInactive = ctx?.activeSectionId != null && !isActive

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      if (!ctx) return
      if (ref.current) ctx.unregisterSection(id)
      ref.current = node
      if (node) ctx.registerSection(id, backgroundColor, node, navPanelBackgroundColor)
    },
    [id, backgroundColor, navPanelBackgroundColor, ctx]
  )

  const style = textColor
    ? ({ '--section-text-color': textColor } as React.CSSProperties)
    : undefined

  return (
    <section
      ref={setRef}
      id={id}
      className={`${styles.root} ${isInactive ? styles.inactive : ''}`}
      style={style}
    >
      {children}
    </section>
  )
}
