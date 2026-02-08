import { useCallback, useContext, useRef } from 'react'
import { SectionBackgroundContext } from '@/context/SectionBackgroundContext'
import styles from './index.module.css'

type SectionProps = {
  id: string
  backgroundColor: string
  /** Optional text color for section content (sets --section-text-color). */
  textColor?: string
  children: React.ReactNode
}

export function Section({ id, backgroundColor, textColor, children }: SectionProps) {
  const ctx = useContext(SectionBackgroundContext)
  const ref = useRef<HTMLElement>(null)

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      if (!ctx) return
      if (ref.current) ctx.unregisterSection(id)
      ref.current = node
      if (node) ctx.registerSection(id, backgroundColor, node)
    },
    [id, backgroundColor, ctx]
  )

  const style = textColor
    ? ({ '--section-text-color': textColor } as React.CSSProperties)
    : undefined

  return (
    <section ref={setRef} id={id} className={styles.root} style={style}>
      {children}
    </section>
  )
}
