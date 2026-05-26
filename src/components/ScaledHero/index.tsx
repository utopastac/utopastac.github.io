import type { ReactNode } from 'react'
import { useFontSizeToFillWidth } from '@/hooks/useFontSizeToFillWidth'
import styles from './index.module.css'

const SIZE_ANCHOR_FONT = 'var(--font-display)'

type ScaledHeroBaseProps = {
  /** Text used in the hidden measure element to compute scale (e.g. "DESIGNER" or "designer."). */
  measureText: string
  /** Semantic element for the scaled title. Use "div" for decorative watermarks. Defaults to "h1". */
  as?: 'h1' | 'div'
  /** Optional class name merged onto the h1 (e.g. for .line spacing in IntroHero). */
  titleClassName?: string
  /** Optional class name merged onto the wrapper div (e.g. to override alignment). */
  wrapperClassName?: string
  /** Optional class name merged onto the title + reflection group. */
  titleGroupClassName?: string
  /** When set, renders a mirrored copy below the title (e.g. EndPage reflection). */
  reflectionClassName?: string
  /** Inner wrapper that applies the vertical flip (keeps fade mask on reflectionClassName). */
  reflectionMirrorClassName?: string
  /** Optional horizon line rendered between the title and reflection. */
  reflectionHorizonClassName?: string
  /** Optional class merged onto the reflected title span (single-layer reflection). */
  reflectionTextClassName?: string
  /**
   * Masked blur layers for gradated reflection blur (Stack Overflow mask-on-filter technique).
   * Each class is merged onto a duplicate title span inside the mirror wrapper.
   */
  reflectionBlurLayerClassNames?: string[]
  children: ReactNode
}

type ScaledHeroProps =
  | (ScaledHeroBaseProps & { as?: 'h1'; ariaLabel: string })
  | (ScaledHeroBaseProps & { as: 'div'; ariaLabel?: string })

export function ScaledHero({
  measureText,
  as = 'h1',
  ariaLabel,
  titleClassName,
  wrapperClassName,
  titleGroupClassName,
  reflectionClassName,
  reflectionMirrorClassName,
  reflectionHorizonClassName,
  reflectionTextClassName,
  reflectionBlurLayerClassNames,
  children,
}: ScaledHeroProps) {
  const { wrapperRef, measureRef, fontSize } = useFontSizeToFillWidth()
  const titleClass = titleClassName ? `${styles.title} ${titleClassName}` : styles.title
  const titleStyle = fontSize !== null ? { fontSize: `${fontSize}px` } : undefined
  const TitleTag = as === 'div' ? 'div' : 'h1'

  const title = (
    <TitleTag
      className={titleClass}
      aria-label={as === 'h1' ? ariaLabel : undefined}
      aria-hidden={as === 'div' ? true : undefined}
      style={titleStyle}
    >
      {children}
    </TitleTag>
  )

  const reflectionContent = reflectionBlurLayerClassNames ? (
    reflectionBlurLayerClassNames.map((layerClassName) => (
      <span key={layerClassName} className={`${styles.title} ${layerClassName}`} style={titleStyle}>
        {children}
      </span>
    ))
  ) : (
    <span
      className={
        reflectionTextClassName ? `${styles.title} ${reflectionTextClassName}` : styles.title
      }
      style={titleStyle}
    >
      {children}
    </span>
  )

  return (
    <div ref={wrapperRef} className={wrapperClassName ? `${styles.wrapper} ${wrapperClassName}` : styles.wrapper}>
      <span
        ref={measureRef}
        className={styles.measure}
        style={{ fontFamily: SIZE_ANCHOR_FONT }}
        aria-hidden
      >
        {measureText}
      </span>
      {reflectionClassName ? (
        <div
          className={
            titleGroupClassName
              ? `${styles.titleGroup} ${titleGroupClassName}`
              : styles.titleGroup
          }
        >
          {title}
          {reflectionHorizonClassName ? (
            <div className={reflectionHorizonClassName} aria-hidden />
          ) : null}
          <div className={reflectionClassName} aria-hidden style={titleStyle}>
            <div className={reflectionMirrorClassName}>{reflectionContent}</div>
          </div>
        </div>
      ) : (
        title
      )}
    </div>
  )
}
