import { useEffect, useRef, useState } from 'react'
import { ScaledHero } from '@/components/ScaledHero'
import styles from './index.module.css'

const ROTATING_ITEMS = [
  { word: 'PRINCIPAL', font: 'var(--font-display)', fontWeight: 'var(--font-weight-bold)', fontStyle: 'normal', color: '#304C89' },
  { word: 'SYSTEM', font: 'var(--font-serif)', fontWeight: 'var(--font-weight-normal)', fontStyle: 'italic', color: '#6F8F7A' },
  { word: 'TOY', font: 'var(--font-fun)', fontWeight: 'var(--font-weight-semibold)', fontStyle: 'normal', color: 'var(--color-accent)' },
  { word: 'PRODUCT', font: 'var(--font-display)', fontWeight: 'var(--font-weight-light)', fontStyle: 'normal', color: '#D1603D' },
] as const
const CHAR_MS = 80
const PAUSE_MS = 3000

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

  return (
    <ScaledHero
      measureText="DESIGNER"
      ariaLabel={`${firstLineText || currentItem.word} Designer`}
      titleClassName={styles.title}
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
    </ScaledHero>
  )
}
