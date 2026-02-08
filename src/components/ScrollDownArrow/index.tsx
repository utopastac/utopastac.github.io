import { useContext, useRef } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { SectionBackgroundContext } from '../../context/SectionBackgroundContext'
import styles from './index.module.css'

gsap.registerPlugin(ScrollToPlugin)

const PEEK_PX = 50
const PEEK_DURATION = 0.8
const PEEK_EASE = 'power2.inOut'

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
    gsap.killTweensOf(window) // stop peek animation so scrollIntoView can take over
    scrollYOnPeekRef.current = null // don't restore scroll on mouse leave after a click
    document.getElementById(nextId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleMouseEnter = () => {
    if (isLastSection) return
    const fromY = window.scrollY
    scrollYOnPeekRef.current = fromY
    gsap.to(window, {
      duration: PEEK_DURATION,
      ease: PEEK_EASE,
      scrollTo: { y: fromY + PEEK_PX },
    })
  }

  const handleMouseLeave = () => {
    const saved = scrollYOnPeekRef.current
    scrollYOnPeekRef.current = null
    if (saved != null) {
      gsap.to(window, {
        duration: PEEK_DURATION,
        ease: PEEK_EASE,
        scrollTo: { y: saved },
      })
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
