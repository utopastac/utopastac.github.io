import { useContext, useRef } from 'react'
import { SectionBackgroundContext } from '../../context/SectionBackgroundContext'
import styles from './index.module.css'

const PEEK_PX = 100

type ScrollDownArrowProps = {
  sectionIds: readonly string[]
}

export function ScrollDownArrow({ sectionIds }: ScrollDownArrowProps) {
  const ctx = useContext(SectionBackgroundContext)
  const scrollYOnPeekRef = useRef<number | null>(null)

  const activeId = ctx?.activeSectionId ?? null
  const index = activeId != null ? sectionIds.indexOf(activeId) : -1
  const nextIndex = index >= 0 && index < sectionIds.length - 1 ? index + 1 : -1
  const nextId = nextIndex >= 0 ? sectionIds[nextIndex] : null
  const isLastSection = index >= 0 && index === sectionIds.length - 1

  const handleClick = () => {
    if (!nextId) return
    document.getElementById(nextId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleMouseEnter = () => {
    if (isLastSection) return
    scrollYOnPeekRef.current = window.scrollY
    window.scrollBy({ top: PEEK_PX, behavior: 'smooth' })
  }

  const handleMouseLeave = () => {
    const saved = scrollYOnPeekRef.current
    scrollYOnPeekRef.current = null
    if (saved != null) {
      window.scrollTo({ top: saved, behavior: 'smooth' })
    }
  }

  if (isLastSection || nextId == null) return null

  return (
    <button
      type="button"
      className={styles.arrow}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Scroll to next section"
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </svg>
    </button>
  )
}
