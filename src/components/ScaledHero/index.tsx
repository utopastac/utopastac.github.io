import type { ReactNode } from 'react'
import { useFontSizeToFillWidth } from '@/hooks/useFontSizeToFillWidth'
import styles from './index.module.css'

const SIZE_ANCHOR_FONT = 'var(--font-display)'

type ScaledHeroProps = {
  /** Text used in the hidden measure element to compute scale (e.g. "DESIGNER" or "designer."). */
  measureText: string
  ariaLabel: string
  /** Optional class name merged onto the h1 (e.g. for .line spacing in IntroHero). */
  titleClassName?: string
  children: ReactNode
}

export function ScaledHero({
  measureText,
  ariaLabel,
  titleClassName,
  children,
}: ScaledHeroProps) {
  const { wrapperRef, measureRef, fontSize } = useFontSizeToFillWidth()

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <span
        ref={measureRef}
        className={styles.measure}
        style={{ fontFamily: SIZE_ANCHOR_FONT }}
        aria-hidden
      >
        {measureText}
      </span>
      <h1
        className={titleClassName ? `${styles.title} ${titleClassName}` : styles.title}
        aria-label={ariaLabel}
        style={fontSize !== null ? { fontSize: `${fontSize}px` } : undefined}
      >
        {children}
      </h1>
    </div>
  )
}
