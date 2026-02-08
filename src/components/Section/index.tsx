import { useCallback, useContext, useRef } from 'react'
import { SectionBackgroundContext } from '../../context/SectionBackgroundContext'
import styles from './index.module.css'

type SectionProps = {
  id: string
  backgroundColor: string
  children: React.ReactNode
}

export function Section({ id, backgroundColor, children }: SectionProps) {
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

  return (
    <section ref={setRef} id={id} className={styles.root}>
      {children}
    </section>
  )
}
