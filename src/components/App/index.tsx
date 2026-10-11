import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { SectionBackgroundContext } from '@/context/SectionBackgroundContext'
import { ModalContext } from '@/context/ModalContext'
import { useSettings } from '@/settings/SettingsContext'
import { BlurStrips } from '@/components/BlurStrips'
import { ColumnGrid } from '@/components/ColumnGrid'
import { CornerOverlay } from '@/components/CornerOverlay'
import { CursorBlurOverlay } from '@/components/CursorBlurOverlay'
import { AboutSummarySection } from '@/components/AboutSummarySection'
import { EducationSection } from '@/components/EducationSection'
import { EndPage } from '@/components/EndPage'
import { FrontendDevelopmentSection } from '@/components/FrontendDevelopmentSection'
import { IntroHero } from '@/components/IntroHero'
import { JobSection } from '@/components/JobSection'
import { LaneNav } from '@/components/LaneNav'
import { Modal } from '@/components/Modal'
import { PageNav } from '@/components/PageNav'
import { AdminUiSection } from '@/components/AdminUiSection'
import { DayringSection } from '@/components/DayringSection'
import { DoodloopSection } from '@/components/DoodloopSection'
import { EmpiresSection } from '@/components/EmpiresSection'
import { PixelPortraitsSection } from '@/components/PixelPortraitsSection'
import { PlaypressSection } from '@/components/PlaypressSection'
import { QuotesSection } from '@/components/QuotesSection'
import { ScrollDownArrow } from '@/components/ScrollDownArrow'
import { Section } from '@/components/Section'
import { ABOUT_SUMMARY } from '@/data/about'
import { EDUCATION } from '@/data/education'
import { JOBS } from '@/data/jobs'
import { QUOTES } from '@/data/quotes'
import { LANES, SECTIONS, laneIdForSection, type LaneData, type LaneId, type SectionData } from '@/data/sections'
import { hashForLane, laneIdFromHash } from '@/utils/laneHash'
import styles from './index.module.css'

const FULL_BLEED_SECTION_IDS = new Set([
  'playpress',
  'frontend-development',
  'pixel-portraits',
  'dayring',
  'empires',
  'doodloop',
  'admin-ui',
])

function laneIntroLinks(lane: LaneData) {
  return lane.sections
    .filter((section) => section.navPlacement !== 'hidden')
    .map((section) => ({ id: section.id, label: section.title }))
}

function sectionContentClass(section: SectionData) {
  if (section.kind === 'intro') return `${styles.sectionContent} ${styles.sectionContentIntro}`
  if (section.kind === 'outro') return `${styles.sectionContent} ${styles.sectionContentOutro}`
  if (FULL_BLEED_SECTION_IDS.has(section.id)) return `${styles.sectionContent} ${styles.sectionContentFullHeight}`
  return styles.sectionContent
}

function mostVisibleSectionId(laneEl: HTMLElement): string | null {
  const laneRect = laneEl.getBoundingClientRect()
  let bestId: string | null = null
  let bestVisible = 0
  for (const section of laneEl.querySelectorAll<HTMLElement>('section[id]')) {
    const rect = section.getBoundingClientRect()
    const visible = Math.min(rect.bottom, laneRect.bottom) - Math.max(rect.top, laneRect.top)
    if (visible > bestVisible) {
      bestVisible = visible
      bestId = section.id
    }
  }
  return bestId
}

export function App() {
  useEffect(() => {
    const urls = JOBS.flatMap((job) => (job.images ?? []).map((img) => img.src))
    urls.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  const { settings } = useSettings()
  const ctx = useContext(SectionBackgroundContext)
  const modal = useContext(ModalContext)
  const backgroundColor = ctx?.backgroundColor ?? 'var(--color-bg)'
  const navPanelBackgroundColor = ctx?.navPanelBackgroundColor ?? null
  const activeSection = SECTIONS.find((section) => section.id === ctx?.activeSectionId)
  const cornerTextColor = activeSection?.textColor ?? 'var(--color-text)'
  const jobMap = new Map(JOBS.map((job) => [job.id, job]))
  const laneScrollRefs = useRef<Partial<Record<LaneId, HTMLDivElement | null>>>({})
  const activeScrollRef = useRef<HTMLDivElement | null>(null)
  const skipLaneSyncRef = useRef(false)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [activeLane, setActiveLane] = useState<LaneId>(() => laneIdFromHash())
  const activeLaneRef = useRef(activeLane)
  activeLaneRef.current = activeLane
  const handleNavOpenChange = useCallback((open: boolean) => setIsNavOpen(open), [])
  const laneIndex = Math.max(0, LANES.findIndex((lane) => lane.id === activeLane))

  useEffect(() => {
    activeScrollRef.current = laneScrollRefs.current[activeLane] ?? null
  })

  useEffect(() => {
    if (skipLaneSyncRef.current) {
      skipLaneSyncRef.current = false
      return
    }
    const laneEl = laneScrollRefs.current[activeLane]
    if (!laneEl) return
    const id = mostVisibleSectionId(laneEl)
    if (id) ctx?.setActiveSection(id)
  }, [activeLane, ctx])

  useEffect(() => {
    const next = hashForLane(activeLane)
    if (window.location.hash === next) return
    if (!window.location.hash) {
      window.history.replaceState(null, '', next)
      return
    }
    window.history.pushState(null, '', next)
  }, [activeLane])

  useEffect(() => {
    const syncFromUrl = () => {
      const id = laneIdFromHash()
      if (activeLaneRef.current === id) return
      setActiveLane(id)
    }
    window.addEventListener('popstate', syncFromUrl)
    return () => window.removeEventListener('popstate', syncFromUrl)
  }, [])

  const selectLane = useCallback((laneId: LaneId) => {
    if (laneId === activeLaneRef.current) return
    setActiveLane(laneId)
  }, [])

  const handleSelectSection = useCallback((id: string) => {
    skipLaneSyncRef.current = true
    const laneId = laneIdForSection(id)
    if (!laneId) return
    if (laneId === activeLaneRef.current) return
    setActiveLane(laneId)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (modal?.content || modal?.isClosing) return
      const target = event.target
      if (target instanceof HTMLElement) {
        const tag = target.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable) return
      }
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
      event.preventDefault()
      const index = LANES.findIndex((lane) => lane.id === activeLane)
      const next = event.key === 'ArrowRight' ? LANES[index + 1] : LANES[index - 1]
      if (next) selectLane(next.id)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeLane, modal?.content, modal?.isClosing, selectLane])

  const renderSectionBody = (section: SectionData, lane: LaneData) => {
    if (section.kind === 'intro') {
      return (
        <IntroHero
          word={lane.introWord}
          links={laneIntroLinks(lane)}
          listLabel={`Jump to ${lane.label.toLowerCase()}`}
        />
      )
    }
    if (section.kind === 'outro') return <EndPage word={lane.outroWord} />
    if (section.id === 'playpress') return <PlaypressSection />
    if (section.id === 'frontend-development') return <FrontendDevelopmentSection />
    if (section.id === 'pixel-portraits') return <PixelPortraitsSection />
    if (section.id === 'dayring') return <DayringSection />
    if (section.id === 'empires') return <EmpiresSection />
    if (section.id === 'doodloop') return <DoodloopSection />
    if (section.id === 'admin-ui') return <AdminUiSection />
    if (section.isQuotes) return <QuotesSection quotes={QUOTES} title={section.title} />
    if (section.isSummary) {
      return (
        <AboutSummarySection
          title={ABOUT_SUMMARY.title}
          label={ABOUT_SUMMARY.label}
          summary={ABOUT_SUMMARY.summary}
        />
      )
    }
    if (section.educationId) {
      return (
        <EducationSection
          date={EDUCATION.date}
          degree={EDUCATION.degree}
          details={EDUCATION.details}
          institution={EDUCATION.institution}
        />
      )
    }
    if (section.jobId) {
      const job = jobMap.get(section.jobId)
      if (!job) return <h1>{section.title}</h1>
      return (
        <JobSection
          jobId={section.jobId}
          company={job.company}
          date={job.date}
          description={job.description}
          jobTitle={job.jobTitle}
          images={job.images}
          cropPreview={job.cropPreview}
        />
      )
    }
    return <h1>{section.title}</h1>
  }

  return (
    <div
      className={styles.root}
      data-active-section={activeSection?.id}
      style={{
        backgroundColor,
        ['--corner-text-color' as string]: cornerTextColor,
        ['--corner-bg-color' as string]: backgroundColor,
      }}
    >
      <Modal />
      {settings.showGrid && <ColumnGrid navOpen={isNavOpen} />}
      <div
        className={styles.panelOverlay}
        data-open={isNavOpen}
        aria-hidden="true"
        style={{
          ['--overlay-bg' as string]: navPanelBackgroundColor ?? backgroundColor,
        }}
      />
      <BlurStrips />
      <CursorBlurOverlay />
      <CornerOverlay
        isNavOpen={isNavOpen}
        onMenuToggle={() => setIsNavOpen((open) => !open)}
      />
      <LaneNav lanes={LANES} activeId={activeLane} onChange={selectLane} />
      <ScrollDownArrow
        sectionIds={(LANES.find((lane) => lane.id === activeLane) ?? LANES[0]).sections.map((section) => section.id)}
        scrollContainerRef={activeScrollRef}
      />
      <PageNav
        sections={SECTIONS.map(({ id, title, backgroundColor: bg, navPlacement, navDescription }) => ({
          id,
          label: title,
          backgroundColor: bg,
          navPlacement,
          navDescription,
        }))}
        navPanelBackgroundColor={navPanelBackgroundColor}
        open={isNavOpen}
        onOpenChange={handleNavOpenChange}
        panelOpen={false}
        onSelectSection={handleSelectSection}
      />
      <div
        className={styles.viewport}
        data-nav-open={isNavOpen}
      >
        <div
          className={styles.track}
          style={{
            ['--lane-index' as string]: laneIndex,
          }}
        >
          {LANES.map((lane) => (
            <div
              key={lane.id}
              ref={(node) => {
                laneScrollRefs.current[lane.id] = node
              }}
              className={styles.lane}
              data-lane={lane.id}
              data-lane-scroll
              data-active={lane.id === activeLane}
              aria-label={`${lane.label} content`}
            >
              <main className={styles.main} data-active-section={activeSection?.id}>
                {lane.sections.map((section, sectionIdx) => (
                  <Section
                    key={section.id}
                    id={section.id}
                    backgroundColor={section.backgroundColor}
                    textColor={section.textColor}
                    navPanelBackgroundColor={section.navPanelBackgroundColor}
                    index={sectionIdx}
                    kind={section.kind}
                  >
                    <div className={sectionContentClass(section)}>
                      {renderSectionBody(section, lane)}
                    </div>
                  </Section>
                ))}
              </main>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
