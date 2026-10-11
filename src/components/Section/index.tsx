import { useCallback, useContext, useRef } from 'react'
import { SectionBackgroundContext } from '@/context/SectionBackgroundContext'
import { useCursorTilt } from '@/hooks/useCursorTilt'
import styles from './index.module.css'

type SectionProps = {
  id: string
  backgroundColor: string
  index?: number
  /** Intro sections use a larger optical offset so the index aligns with display headings. */
  kind?: 'intro' | 'outro'
  /** Optional text color for section content (sets --section-text-color). */
  textColor?: string
  /** Optional navigation panel background color (rgba value). */
  navPanelBackgroundColor?: string
  children: React.ReactNode
}

export function Section({ id, backgroundColor, index, kind, textColor, navPanelBackgroundColor, children }: SectionProps) {
  const ctx = useContext(SectionBackgroundContext)
  const ref = useRef<HTMLElement>(null)
  const { enabled: isTiltEnabled, tiltRef, perspectiveRootRef } = useCursorTilt()

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
      data-kind={kind}
      style={style}
    >
      <div
        ref={perspectiveRootRef}
        className={isTiltEnabled ? styles.tiltRoot : styles.tiltRoot}
      >
        <div
          ref={isTiltEnabled ? tiltRef : undefined}
          className={isTiltEnabled ? `${styles.inner} ${styles.tiltPlane}` : styles.inner}
        >
          {index != null && (
            <span className={styles.index} aria-hidden>
              {String(index).padStart(2, '0')}
            </span>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}
