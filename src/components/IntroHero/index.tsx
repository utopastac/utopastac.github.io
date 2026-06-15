import { useEffect, useRef, useState } from 'react'
import { DotGrid } from '@/components/DotGrid'
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
const DOT_GRID_TILT_DEG = 12

// Hard cap on blur (px) — scales down proportionally for short words
const MAX_BLUR_PX = 6

type Phase = 'in' | 'pause' | 'out'

/**
 * Renders typed text as individual character spans with a blur gradient:
 * the most recently typed / about-to-be-deleted character is most blurred,
 * fading to sharp within a window that scales with the word length so short
 * words never become fully blurred.
 *
 * blurWindow  → ~50 % of word length, clamped to [2, ∞)
 * maxBlurPx   → scales with word length, clamped to [3, MAX_BLUR_PX]
 */
function renderTypedText(text: string) {
  const blurWindow = Math.max(2, Math.round(text.length * 0.5))
  const maxBlurPx = Math.min(MAX_BLUR_PX, Math.max(3, text.length * 0.75))

  return text.split('').map((char, i) => {
    const distFromEnd = text.length - 1 - i
    const blurAmount = distFromEnd >= blurWindow
      ? 0
      : maxBlurPx * (1 - distFromEnd / blurWindow)
    return (
      <span
        key={i}
        className={styles.char}
        style={blurAmount > 0 ? { filter: `blur(${blurAmount.toFixed(2)}px)` } : undefined}
      >
        {char}
      </span>
    )
  })
}

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
  const { enabled: isTiltEnabled, tiltRef: foregroundTiltRef, perspectiveRootRef } = useCursorTilt({
    maxTiltDeg: FOREGROUND_TILT_DEG,
  })
  const { tiltRef: backgroundTiltRef } = useCursorTilt({
    maxTiltDeg: BACKGROUND_TILT_DEG,
    enabled: isTiltEnabled,
  })
  const { tiltRef: dotGridTiltRef } = useCursorTilt({
    maxTiltDeg: DOT_GRID_TILT_DEG,
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
      {renderTypedText(firstLineText)}
    </span>
  )

  const designerLine = <span className={styles.line}>DESIGNER</span>

  return (
    <div className={styles.root}>
      {isTiltEnabled ? (
        <div className={styles.dotGridScene} aria-hidden>
          <div
            ref={dotGridTiltRef}
            className={`${styles.dotGridTilt} ${styles.tiltPlane}`}
          >
            <DotGrid />
          </div>
        </div>
      ) : (
        <div className={styles.dotGridBackdrop} aria-hidden>
          <DotGrid />
        </div>
      )}
      <div className={styles.heroScene}>
        <div ref={perspectiveRootRef} className={isTiltEnabled ? styles.tiltRoot : undefined}>
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
      </div>
    </div>
  )
}
