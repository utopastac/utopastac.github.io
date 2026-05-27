import { useCallback, useContext, useRef, useState } from 'react'
import type { NavPlacement } from '@/data/sections'
import { JOBS } from '@/data/jobs'
import { EDUCATION } from '@/data/education'
import { JobRow } from '@/components/JobRow'
import { SectionBackgroundContext } from '@/context/SectionBackgroundContext'
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
  const [isOpen, setIsOpen] = useState(false)
  const suppressOpenUntilLeaveRef = useRef(false)

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

  return (
    <div
      className={styles.triggerZone}
      data-open={isOpen}
      onMouseEnter={open}
      onMouseLeave={handleMouseLeave}
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
