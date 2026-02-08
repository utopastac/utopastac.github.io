import { useEffect, useRef, useState } from 'react'
import styles from './index.module.css'

const MEASURE_FONT_SIZE = 100
const SIZE_ANCHOR_WORD = 'DESIGNER'
const SIZE_ANCHOR_FONT = 'var(--font-display)'

const ROTATING_ITEMS = [
  { word: 'PRINCIPAL', font: 'var(--font-display)', fontWeight: 'var(--font-weight-bold)', fontStyle: 'normal', color: 'var(--color-text)' },
  { word: 'System', font: 'var(--font-serif)', fontWeight: 'var(--font-weight-normal)', fontStyle: 'italic', color: 'var(--color-text-muted)' },
  { word: 'TOY', font: 'var(--font-fun)', fontWeight: 'var(--font-weight-semibold)', fontStyle: 'normal', color: 'var(--color-accent)' },
  { word: 'PRODUCT', font: 'var(--font-display)', fontWeight: 'var(--font-weight-normal)', fontStyle: 'normal', color: 'var(--color-text)' },
] as const
const CHAR_MS = 80
const PAUSE_MS = 3000

function useFontSizeToFillWidth() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const [fontSize, setFontSize] = useState<number | null>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const measureEl = measureRef.current
    if (!wrapper || !measureEl) return

    const updateFontSize = () => {
      const targetWidth = wrapper.offsetWidth
      measureEl.style.fontSize = `${MEASURE_FONT_SIZE}px`
      void measureEl.offsetWidth // force reflow
      const measuredWidth = measureEl.offsetWidth
      measureEl.style.fontSize = ''
      if (measuredWidth > 0) {
        const newSize = (MEASURE_FONT_SIZE * targetWidth) / measuredWidth
        setFontSize(newSize)
      }
    }

    updateFontSize()

    const resizeObserver = new ResizeObserver(updateFontSize)
    resizeObserver.observe(wrapper)

    return () => resizeObserver.disconnect()
  }, [])

  return { wrapperRef, measureRef, fontSize }
}

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
  const { wrapperRef, measureRef, fontSize } = useFontSizeToFillWidth()
  const currentItem = ROTATING_ITEMS[wordIndex]

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <span
        ref={measureRef}
        className={styles.measure}
        style={{ fontFamily: SIZE_ANCHOR_FONT }}
        aria-hidden
      >
        {SIZE_ANCHOR_WORD}
      </span>
      <h1
        className={styles.title}
        aria-label={`${firstLineText || currentItem.word} Designer`}
        style={fontSize !== null ? { fontSize: `${fontSize}px` } : undefined}
      >
        <span
          className={styles.line}
          style={{
            fontFamily: currentItem.font,
            ...(currentItem.fontWeight !== undefined && { fontWeight: currentItem.fontWeight }),
            ...(currentItem.fontStyle !== undefined && { fontStyle: currentItem.fontStyle }),
            ...(currentItem.color !== undefined && { color: currentItem.color }),
          }}
          aria-live="polite"
        >
          {firstLineText}
        </span>
        <span className={styles.line}>DESIGNER</span>
      </h1>
    </div>
  )
}
