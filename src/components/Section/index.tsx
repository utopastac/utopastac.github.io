import { useCallback, useContext, useRef } from 'react'
import { SectionBackgroundContext } from '@/context/SectionBackgroundContext'
import styles from './index.module.css'

type SectionProps = {
  id: string
  backgroundColor: string
  index?: number
  /** Optional text color for section content (sets --section-text-color). */
  textColor?: string
  /** Optional navigation panel background color (rgba value). */
  navPanelBackgroundColor?: string
  children: React.ReactNode
}

export function Section({ id, backgroundColor, index, textColor, navPanelBackgroundColor, children }: SectionProps) {
  const ctx = useContext(SectionBackgroundContext)
  const ref = useRef<HTMLElement>(null)

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
      className={styles.root}
      style={style}
    >
      {index != null && (
        <span className={styles.index} aria-hidden>
          {String(index).padStart(2, '0')}
        </span>
      )}
      {children}
    </section>
  )
}
