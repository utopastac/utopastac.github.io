import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { SectionBackgroundContext } from '@/context/SectionBackgroundContext'
import { useSettings } from '@/settings/SettingsContext'
import { BlurStrips } from '@/components/BlurStrips'
import { ColumnGrid } from '@/components/ColumnGrid'
import { ImageGallery } from '@/components/ImageGallery'
import { CornerOverlay } from '@/components/CornerOverlay'
import { EducationSection } from '@/components/EducationSection'
import { EndPage } from '@/components/EndPage'
import { FrontendDevelopmentSection } from '@/components/FrontendDevelopmentSection'
import { IntroHero } from '@/components/IntroHero'
import { JobSection } from '@/components/JobSection'
import { Modal } from '@/components/Modal'
import { PageNav } from '@/components/PageNav'
import { PixelPortraitsSection } from '@/components/PixelPortraitsSection'
import { PlaypressSection } from '@/components/PlaypressSection'
import { QuotesSection } from '@/components/QuotesSection'
import { ScrollDownArrow } from '@/components/ScrollDownArrow'
import { Section } from '@/components/Section'
import { EDUCATION } from '@/data/education'
import { JOBS } from '@/data/jobs'
import { QUOTES } from '@/data/quotes'
import { SECTIONS } from '@/data/sections'
import styles from './index.module.css'

export function App() {
  // Preload all job section images so they don't jump in when scrolling into view
  useEffect(() => {
    const urls = JOBS.flatMap((job) => (job.images ?? []).map((img) => img.src))
    urls.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  const { settings } = useSettings()
  const ctx = useContext(SectionBackgroundContext)
  const backgroundColor = ctx?.backgroundColor ?? 'var(--color-bg)'
  const navPanelBackgroundColor = ctx?.navPanelBackgroundColor ?? null
  const activeSection = SECTIONS.find((s) => s.id === ctx?.activeSectionId)
  const cornerTextColor = activeSection?.textColor ?? 'var(--color-text)'
  const jobMap = new Map(JOBS.map((j) => [j.id, j]))
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const handleNavOpenChange = useCallback((open: boolean) => setIsNavOpen(open), [])

  return (
    <div
      className={styles.root}
      data-active-section={activeSection?.id}
      style={{
        backgroundColor,
        ['--corner-text-color' as string]: cornerTextColor,
      }}
    >
      <Modal />
      {settings.showGrid && <ColumnGrid />}
      <div
        className={styles.panelOverlay}
        data-open={isNavOpen}
        aria-hidden="true"
        style={{
          ['--overlay-bg' as string]: navPanelBackgroundColor ?? backgroundColor,
        }}
      />
      <BlurStrips />
      <CornerOverlay />
      <ScrollDownArrow
        sectionIds={SECTIONS.map((s) => s.id)}
        scrollContainerRef={scrollContainerRef}
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
        onOpenChange={handleNavOpenChange}
        panelOpen={false}
      />
      <div
        ref={scrollContainerRef}
        className={styles.scrollWrapper}
        role="region"
        aria-label="Page content"
        data-nav-open={isNavOpen}
        data-active-section={activeSection?.id}
      >
        {settings.showImages ? (
          <ImageGallery />
        ) : (
          <main
            className={styles.main}
            data-active-section={activeSection?.id}
          >
            {SECTIONS.map(({ id, backgroundColor: bg, textColor, navPanelBackgroundColor: navPanelBg, title, jobId, educationId, isQuotes }, sectionIdx) => {
              let content: React.ReactNode
              const sectionContentClass =
                id === 'intro'
                  ? `${styles.sectionContent} ${styles.sectionContentIntro}`
                  : id === 'pixel-portraits' || id === 'playpress' || id === 'frontend-development'
                    ? `${styles.sectionContent} ${styles.sectionContentFullHeight}`
                    : id === 'outro'
                      ? `${styles.sectionContent} ${styles.sectionContentOutro}`
                      : styles.sectionContent

              if (id === 'intro') {
                content = <IntroHero />
              } else if (id === 'outro') {
                content = <EndPage />
              } else if (id === 'playpress') {
                content = <PlaypressSection />
              } else if (id === 'frontend-development') {
                content = <FrontendDevelopmentSection />
              } else if (id === 'pixel-portraits') {
                content = <PixelPortraitsSection />
              } else if (isQuotes) {
                content = <QuotesSection quotes={QUOTES} title={title} />
              } else if (educationId) {
                content = (
                  <EducationSection
                    date={EDUCATION.date}
                    degree={EDUCATION.degree}
                    details={EDUCATION.details}
                    institution={EDUCATION.institution}
                  />
                )
              } else if (jobId) {
                const job = jobMap.get(jobId)
                content = job ? (
                  <JobSection
                    jobId={jobId}
                    company={job.company}
                    date={job.date}
                    description={job.description}
                    jobTitle={job.jobTitle}
                    images={job.images}
                  />
                ) : (
                  <h1>{title}</h1>
                )
              } else {
                content = <h1>{title}</h1>
              }
              return (
                <Section key={id} id={id} backgroundColor={bg} textColor={textColor} navPanelBackgroundColor={navPanelBg} index={sectionIdx}>
                  <div className={sectionContentClass}>
                    {content}
                  </div>
                </Section>
              )
            })}
          </main>
        )}
      </div>
    </div>
  )
}
