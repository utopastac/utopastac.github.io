import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import type { NavPlacement } from '@/data/sections'
import { JOBS } from '@/data/jobs'
import { EDUCATION } from '@/data/education'
import { JobRow } from '@/components/JobRow'
import { SectionBackgroundContext } from '@/context/SectionBackgroundContext'
import { BREAKPOINT_MOBILE_MEDIA } from '@/constants/breakpoints'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { scrollToSectionElement } from '@/utils/animateScrollTo'
import styles from './index.module.css'

export type SectionLink = {
  id: string
  label: string
  backgroundColor?: string
  navPlacement: NavPlacement
  navDescription?: string
}

type PageNavProps = {
  sections: SectionLink[]
  navPanelBackgroundColor?: string | null
  onOpenChange?: (open: boolean) => void
}

const JOBS_BY_ID = new Map(JOBS.map((job) => [job.id, job]))

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) scrollToSectionElement(el)
}

export function PageNav({ sections, navPanelBackgroundColor, onOpenChange }: PageNavProps) {
  const sectionCtx = useContext(SectionBackgroundContext)
  const isMobile = useMediaQuery(BREAKPOINT_MOBILE_MEDIA)
  const [isOpen, setIsOpen] = useState(false)
  const suppressOpenUntilLeaveRef = useRef(false)
  const triggerZoneRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    if (!isOpen) return
    setIsOpen(false)
    onOpenChange?.(false)
  }, [isOpen, onOpenChange])

  const handleSectionClick = useCallback(
    (id: string, backgroundColor?: string) => {
      sectionCtx?.navigateToSection(id, backgroundColor)
      scrollToSection(id)
      suppressOpenUntilLeaveRef.current = true
      close()
    },
    [sectionCtx, close]
  )

  const open = useCallback(() => {
    if (suppressOpenUntilLeaveRef.current || isOpen) return
    setIsOpen(true)
    onOpenChange?.(true)
  }, [isOpen, onOpenChange])

  const handleMouseLeave = useCallback(() => {
    suppressOpenUntilLeaveRef.current = false
    close()
  }, [close])

  const handleMenuClick = useCallback(() => {
    suppressOpenUntilLeaveRef.current = false
    if (isOpen) {
      close()
      return
    }
    setIsOpen(true)
    onOpenChange?.(true)
  }, [isOpen, close, onOpenChange])

  useEffect(() => {
    if (!isMobile || !isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Node) || triggerZoneRef.current?.contains(target)) return
      close()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobile, isOpen, close])

  return (
    <div
      ref={triggerZoneRef}
      className={styles.triggerZone}
      data-open={isOpen}
      onMouseEnter={isMobile ? undefined : open}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
      aria-label="Page sections"
    >
      <div
        className={styles.backdrop}
        aria-hidden
        style={
          navPanelBackgroundColor
            ? ({ '--nav-panel-bg': navPanelBackgroundColor } as React.CSSProperties)
            : undefined
        }
      />
      <nav className={styles.root}>
        <button
          type="button"
          className={styles.menuIcon}
          aria-expanded={isOpen}
          aria-controls="page-nav-list"
          aria-label={isOpen ? 'Close page sections menu' : 'Open page sections menu'}
          onClick={isMobile ? handleMenuClick : undefined}
        >
          <span aria-hidden>☰</span>
        </button>
        <ul
          id="page-nav-list"
          className={styles.panel}
          role="list"
        >
          <div role="listitem">
            {sections
              .filter((s) => s.navPlacement === 'dated-submenu')
              .map(({ id, label, backgroundColor }) => {
                const job = JOBS_BY_ID.get(id)
                const isEducation = id === EDUCATION.id

                const left = job?.date ?? (isEducation ? EDUCATION.date : '')
                const middle = job?.company ?? (isEducation ? EDUCATION.institutionShort : label)
                const right = job?.jobTitle ?? (isEducation ? EDUCATION.degreeShort : '')

                return (
                  <li key={id} role="listitem">
                    <JobRow
                      asButton
                      date={left}
                      company={middle}
                      title={right}
                      onClick={() => handleSectionClick(id, backgroundColor)}
                    />
                  </li>
                )
              })}
          </div>
          <div className={styles.gap} />
          <div>
            {sections
              .filter((s) => s.navPlacement === 'top-level')
              .map(({ id, label, backgroundColor, navDescription }) => (
                <li key={id} role="listitem">
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={() => handleSectionClick(id, backgroundColor)}
                  >
                    <span className={styles.linkLabel}>{label}</span>
                    {navDescription ? (
                      <span className={styles.linkDescription}>{navDescription}</span>
                    ) : null}
                  </button>
                </li>
              ))}
          </div>
        </ul>
      </nav>
    </div>
  )
}
