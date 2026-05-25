import type { RefObject } from 'react'
import { useContext, useRef } from 'react'
import { ModalContext } from '@/context/ModalContext'
import { SectionBackgroundContext } from '@/context/SectionBackgroundContext'
import { animateScrollTo, scrollToSectionElement } from '@/utils/animateScrollTo'
import styles from './index.module.css'

const PEEK_PX = 50
const PEEK_DURATION_MS = 800

type ScrollDownArrowProps = {
  sectionIds: readonly string[]
  scrollContainerRef?: RefObject<HTMLDivElement | null>
}

export function ScrollDownArrow({ sectionIds, scrollContainerRef }: ScrollDownArrowProps) {
  const sectionCtx = useContext(SectionBackgroundContext)
  const modalCtx = useContext(ModalContext)
  const scrollYOnPeekRef = useRef<number | null>(null)
  const cancelPeekRef = useRef<(() => void) | null>(null)

  const isModalOpen = modalCtx?.content != null || modalCtx?.isClosing === true
  if (isModalOpen) return null

  const activeId = sectionCtx?.activeSectionId ?? null
  const index = activeId != null ? sectionIds.indexOf(activeId) : -1
  const nextIndex = index >= 0 && index < sectionIds.length - 1 ? index + 1 : -1
  const nextId = nextIndex >= 0 ? sectionIds[nextIndex] : null
  const isLastSection = index >= 0 && index === sectionIds.length - 1

  const getScrollTarget = () => scrollContainerRef?.current ?? window
  const getScrollY = () =>
    scrollContainerRef?.current ? scrollContainerRef.current.scrollTop : window.scrollY

  const cancelPeek = () => {
    cancelPeekRef.current?.()
    cancelPeekRef.current = null
  }

  const handleClick = () => {
    if (!nextId) return
    const nextEl = document.getElementById(nextId)
    if (!nextEl) return
    cancelPeek()
    scrollYOnPeekRef.current = null
    scrollToSectionElement(nextEl, scrollContainerRef?.current)
  }

  const handleMouseEnter = () => {
    if (isLastSection) return
    cancelPeek()
    const fromY = getScrollY()
    scrollYOnPeekRef.current = fromY
    cancelPeekRef.current = animateScrollTo(getScrollTarget(), fromY + PEEK_PX, {
      duration: PEEK_DURATION_MS,
    })
  }

  const handleMouseLeave = () => {
    const saved = scrollYOnPeekRef.current
    scrollYOnPeekRef.current = null
    if (saved != null) {
      cancelPeek()
      cancelPeekRef.current = animateScrollTo(getScrollTarget(), saved, {
        duration: PEEK_DURATION_MS,
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
