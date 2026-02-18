import { useCallback, useContext, useRef, useState } from 'react'
import type { NavPlacement } from '@/data/sections'
import { JOBS } from '@/data/jobs'
import { EDUCATION } from '@/data/education'
import { JobRow } from '@/components/JobRow'
import { SectionBackgroundContext } from '@/context/SectionBackgroundContext'
import gsap from 'gsap'
import styles from './index.module.css'

export type SectionLink = {
  id: string
  label: string
  backgroundColor?: string
  navPlacement: NavPlacement
}

type PageNavProps = {
  sections: SectionLink[]
  navPanelBackgroundColor?: string | null
}

const JOBS_BY_ID = new Map(JOBS.map((job) => [job.id, job]))

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function PageNav({ sections, navPanelBackgroundColor }: PageNavProps) {
  const sectionCtx = useContext(SectionBackgroundContext)
  const iconRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLUListElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleSectionClick = useCallback(
    (id: string, backgroundColor?: string) => {
      sectionCtx?.navigateToSection(id, backgroundColor)
      scrollToSection(id)
    },
    [sectionCtx]
  )

  const open = useCallback(() => {
    if (isOpen) return
    setIsOpen(true)
    if (backdropRef.current) {
      backdropRef.current.style.pointerEvents = 'auto'
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      )
    }
    if (panelRef.current) {
      panelRef.current.style.pointerEvents = 'auto'
      gsap.fromTo(
        panelRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      )
    }
    // if (iconRef.current) {
    //   gsap.to(iconRef.current, {
    //     opacity: 0,
    //     filter: 'blur(6px)',
    //     duration: 0.25,
    //     ease: 'power2.in',
    //   })
    // }
  }, [isOpen])

  const close = useCallback(() => {
    if (!isOpen) return
    if (backdropRef.current) {
      backdropRef.current.style.pointerEvents = 'none'
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      })
    }
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        opacity: 0,
        // filter: 'blur(8px)',
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          if (panelRef.current) panelRef.current.style.pointerEvents = 'none'
          setIsOpen(false)
        },
      })
    } else {
      setIsOpen(false)
    }
    // if (iconRef.current) {
    //   gsap.to(iconRef.current, {
    //     opacity: 1,
    //     filter: 'blur(0px)',
    //     duration: 0.3,
    //     ease: 'power2.out',
    //   })
    // }
  }, [isOpen])

  return (
    <div
      className={styles.triggerZone}
      data-open={isOpen}
      onMouseEnter={open}
      onMouseLeave={close}
      aria-label="Page sections"
    >
      <div
        ref={backdropRef}
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
          ref={iconRef}
          type="button"
          className={styles.menuIcon}
          aria-expanded={isOpen}
          aria-controls="page-nav-list"
        >
          <span aria-hidden>☰</span>
        </button>
        <ul
          ref={panelRef}
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
                const middle = job?.company ?? (isEducation ? EDUCATION.institution : label)
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
              .map(({ id, label, backgroundColor }) => (
                <li key={id} role="listitem">
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={() => handleSectionClick(id, backgroundColor)}
                  >
                    {label}
                  </button>
                </li>
              ))}
          </div>
        </ul>
      </nav>
    </div>
  )
}
