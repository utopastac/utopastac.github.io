import { useCallback, useContext, useEffect, useRef } from 'react'
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
  open: boolean
  onOpenChange: (open: boolean) => void
  panelOpen?: boolean
}

const JOBS_BY_ID = new Map(JOBS.map((job) => [job.id, job]))

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) scrollToSectionElement(el)
}

export function PageNav({ sections, navPanelBackgroundColor, open, onOpenChange, panelOpen }: PageNavProps) {
  const sectionCtx = useContext(SectionBackgroundContext)
  const triggerZoneRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    if (!open) return
    onOpenChange(false)
  }, [open, onOpenChange])

  const handleSectionClick = useCallback(
    (id: string, backgroundColor?: string) => {
      sectionCtx?.navigateToSection(id, backgroundColor)
      scrollToSection(id)
      close()
    },
    [sectionCtx, close]
  )

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Node)) return
      if (triggerZoneRef.current?.contains(target)) return
      if (target instanceof Element && target.closest('[data-page-nav-menu]')) return
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
  }, [open, close])

  return (
    <>
    <div
      className={styles.backdrop}
      data-open={open}
      aria-hidden
      style={
        navPanelBackgroundColor
          ? ({ '--nav-panel-bg': navPanelBackgroundColor } as React.CSSProperties)
          : undefined
      }
    />
    <div
      ref={triggerZoneRef}
      className={styles.triggerZone}
      data-open={open}
      data-panel-open={panelOpen}
      aria-label="Page sections"
    >
      <nav className={styles.root}>
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
                  <JobRow
                    asButton
                    company={label}
                    title={navDescription ?? ''}
                    onClick={() => handleSectionClick(id, backgroundColor)}
                  />
                </li>
              ))}
          </div>
        </ul>
      </nav>
    </div>
    </>
  )
}
