import { useEffect, useRef, useState } from 'react'
import { useCursorTilt } from '@/hooks/useCursorTilt'
import styles from './index.module.css'

const BACKGROUND_WORD = 'typography'
const BACKGROUND_TILT_DEG = 20
const MEASURE_FONT_SIZE = 100
const BACKGROUND_OVERFLOW_LINES = 4

type BackgroundScale = {
  fontSize: number
  lineCount: number
}

function useBackgroundTypographyScale() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const [scale, setScale] = useState<BackgroundScale | null>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const measureEl = measureRef.current
    if (!wrapper || !measureEl) return

    const updateScale = () => {
      const targetWidth = wrapper.offsetWidth || window.innerWidth
      const targetHeight = wrapper.offsetHeight
      if (targetWidth <= 0 || targetHeight <= 0) return

      measureEl.style.fontSize = `${MEASURE_FONT_SIZE}px`
      void measureEl.offsetWidth
      const measuredWidth = measureEl.offsetWidth
      measureEl.style.fontSize = ''
      if (measuredWidth <= 0) return

      const fontSize = (MEASURE_FONT_SIZE * targetWidth) / measuredWidth
      const visibleLineCount = Math.max(1, Math.round(targetHeight / fontSize))
      const lineCount = visibleLineCount + BACKGROUND_OVERFLOW_LINES
      setScale({ fontSize, lineCount })
    }

    updateScale()

    const resizeObserver = new ResizeObserver(updateScale)
    resizeObserver.observe(wrapper)

    return () => resizeObserver.disconnect()
  }, [])

  return { wrapperRef, measureRef, scale }
}

type EducationSectionProps = {
  degree: string
  institution: string
  date: string
  details?: string
}

export function EducationSection({
  degree,
  institution,
  date,
  details,
}: EducationSectionProps) {
  const { enabled: isTiltEnabled, tiltRef: foregroundTiltRef, perspectiveRootRef } = useCursorTilt()
  const { tiltRef: backgroundTiltRef } = useCursorTilt({
    enabled: isTiltEnabled,
    maxTiltDeg: BACKGROUND_TILT_DEG,
  })
  const { wrapperRef, measureRef, scale } = useBackgroundTypographyScale()
  const backgroundStackStyle =
    scale !== null ? { fontSize: `${scale.fontSize}px` } : undefined
  return (
    <div ref={perspectiveRootRef} className={isTiltEnabled ? styles.tiltRoot : undefined}>
      <div className={styles.container}>
        <div
          ref={isTiltEnabled ? backgroundTiltRef : undefined}
          className={isTiltEnabled ? `${styles.backgroundWord} ${styles.tiltPlane}` : styles.backgroundWord}
          aria-hidden
        >
          <div ref={wrapperRef} className={styles.backgroundWordInner}>
            <span ref={measureRef} className={styles.measure}>
              {BACKGROUND_WORD}
            </span>
            {scale !== null ? (
              <div className={styles.backgroundStack} style={backgroundStackStyle}>
                {Array.from({ length: scale.lineCount }, (_, index) => (
                  <span key={index} className={styles.backgroundText}>
                    {BACKGROUND_WORD}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div
          ref={isTiltEnabled ? foregroundTiltRef : undefined}
          className={isTiltEnabled ? `${styles.tiltPlane} ${styles.foregroundTilt}` : undefined}
        >
          <article className={styles.root}>
            <p className={styles.meta}>
              <span className={styles.date}>{date}</span>
              <span className={styles.separator}> / </span>
              <span>{institution}</span>
            </p>
            <h2 className={styles.title}>{degree}</h2>
            {details && <p className={styles.details}>{details}</p>}
          </article>
        </div>
      </div>
    </div>
  )
}
