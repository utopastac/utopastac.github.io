import { useEffect, useRef, useState } from 'react'
import { ScaledHero } from '@/components/ScaledHero'
import { useCursorTilt } from '@/hooks/useCursorTilt'
import styles from './index.module.css'

const ROTATING_ITEMS = [
  { word: 'Principal', font: 'var(--font-display)', fontWeight: 'var(--font-weight-normal)', fontStyle: 'normal', color: '#304C89' },
  { word: 'System', font: 'var(--font-display)', fontWeight: 'var(--font-weight-normal)', fontStyle: 'normal', color: '#6F8F7A' },
  { word: 'TOY', font: 'var(--font-fun)', fontWeight: 'var(--font-weight-semibold)', fontStyle: 'normal', color: 'var(--color-accent)' },
  { word: 'ai', font: 'var(--font-display)', fontWeight: 'var(--font-weight-normal)', fontStyle: 'normal', color: '#E09f3E' },
  { word: 'Product', font: 'var(--font-display)', fontWeight: 'var(--font-weight-normal)', fontStyle: 'normal', color: '#D1603D' },
] as const
const CHAR_MS = 70
const PAUSE_MS = 2750
const FOREGROUND_TILT_DEG = 30
const BACKGROUND_TILT_DEG = 25

type Phase = 'in' | 'pause' | 'out'

function useRotatingTyping() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [phase, setPhase] = useState<Phase>('in')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const { word } = ROTATING_ITEMS[wordIndex]

    const schedule = (fn: () => void, ms: number) => {
      timeoutRef.current = setTimeout(fn, ms)
    }

    if (phase === 'in') {
      if (displayText.length < word.length) {
        schedule(
          () => setDisplayText(word.slice(0, displayText.length + 1)),
          CHAR_MS
        )
      } else {
        setPhase('pause')
      }
    } else if (phase === 'pause') {
      schedule(() => setPhase('out'), PAUSE_MS)
    } else {
      if (displayText.length > 0) {
        schedule(
          () => setDisplayText((prev) => prev.slice(0, -1)),
          CHAR_MS
        )
      } else {
        setWordIndex((i) => (i + 1) % ROTATING_ITEMS.length)
        setPhase('in')
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [wordIndex, displayText, phase])

  return { displayText, wordIndex }
}

export function IntroHero() {
  const { displayText: firstLineText, wordIndex } = useRotatingTyping()
  const currentItem = ROTATING_ITEMS[wordIndex]
  const { enabled: isTiltEnabled, tiltRef: foregroundTiltRef } = useCursorTilt({
    maxTiltDeg: FOREGROUND_TILT_DEG,
  })
  const { tiltRef: backgroundTiltRef } = useCursorTilt({
    maxTiltDeg: BACKGROUND_TILT_DEG,
    enabled: isTiltEnabled,
  })

  const firstLineStyle = {
    fontFamily: currentItem.font,
    ...(currentItem.fontWeight !== undefined && { fontWeight: currentItem.fontWeight }),
    ...(currentItem.fontStyle !== undefined && { fontStyle: currentItem.fontStyle }),
    ...(currentItem.color !== undefined && { color: currentItem.color }),
  }

  const firstLine = (
    <span className={styles.line} style={firstLineStyle} aria-live="polite">
      {firstLineText}
    </span>
  )

  const designerLine = <span className={styles.line}>DESIGNER</span>

  return (
    <div className={isTiltEnabled ? styles.tiltRoot : undefined}>
      <ScaledHero
        measureText="DESIGNER"
        ariaLabel={`${firstLineText || currentItem.word} Designer`}
        titleClassName={styles.title}
        wrapperClassName={styles.wrapper}
      >
        {isTiltEnabled ? (
          <>
            <div
              ref={backgroundTiltRef}
              className={`${styles.backgroundTilt} ${styles.tiltPlane}`}
            >
              {firstLine}
            </div>
            <div
              ref={foregroundTiltRef}
              className={`${styles.foregroundTilt} ${styles.tiltPlane}`}
            >
              {designerLine}
            </div>
          </>
        ) : (
          <>
            {firstLine}
            {designerLine}
          </>
        )}
      </ScaledHero>
    </div>
  )
}
