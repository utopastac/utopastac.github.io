import { useContext, useEffect, useRef } from 'react'
import { SectionBackgroundContext } from '@/context/SectionBackgroundContext'
import { BlurStrips } from '@/components/BlurStrips'
import { CornerOverlay } from '@/components/CornerOverlay'
import { EducationSection } from '@/components/EducationSection'
import { EndPage } from '@/components/EndPage'
import { IntroHero } from '@/components/IntroHero'
import { JobSection } from '@/components/JobSection'
import { Modal } from '@/components/Modal'
import { PageNav } from '@/components/PageNav'
import { PixelPortraitsSection } from '@/components/PixelPortraitsSection'
import { PlaypressSection } from '@/components/PlaypressSection'
import { QuotesSection } from '@/components/QuotesSection'
import { ScrollDownArrow } from '@/components/ScrollDownArrow'
import { Section } from '@/components/Section'
import { SimplePage } from '@/components/SimplePage'
import { EDUCATION } from '@/data/education'
import { JOBS } from '@/data/jobs'
import { QUOTES } from '@/data/quotes'
import { SECTIONS } from '@/data/sections'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from './index.module.css'

const SMALL_VIEWPORT_MEDIA = '(max-width: 639px)'

export function App() {
  const isSmallViewport = useMediaQuery(SMALL_VIEWPORT_MEDIA)

  // Preload all job section images so they don’t jump in when scrolling into view
  useEffect(() => {
    const urls = JOBS.flatMap((job) => (job.images ?? []).map((img) => img.src))
    urls.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  if (isSmallViewport) {
    return <SimplePage />
  }

  const ctx = useContext(SectionBackgroundContext)
  const backgroundColor = ctx?.backgroundColor ?? 'var(--color-bg)'
  const navPanelBackgroundColor = ctx?.navPanelBackgroundColor ?? null
  const activeSection = SECTIONS.find((s) => s.id === ctx?.activeSectionId)
  const cornerTextColor = activeSection?.textColor ?? 'var(--color-text)'
  const jobMap = new Map(JOBS.map((j) => [j.id, j]))
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className={styles.root}
      style={{
        backgroundColor,
        ['--corner-text-color' as string]: cornerTextColor,
      }}
    >
      <Modal />
      {/* <BlurStrips /> */}
      <CornerOverlay />
      <ScrollDownArrow
        sectionIds={SECTIONS.map((s) => s.id)}
        scrollContainerRef={scrollContainerRef}
      />
      <PageNav
        sections={SECTIONS.map(({ id, title, backgroundColor: bg, navPlacement }) => ({
          id,
          label: title,
          backgroundColor: bg,
          navPlacement,
        }))}
        navPanelBackgroundColor={navPanelBackgroundColor}
      />
      <div
        ref={scrollContainerRef}
        className={styles.scrollWrapper}
        role="region"
        aria-label="Page content"
      >
      <main className={styles.main} style={{ height: `${SECTIONS.length * 100}vh` }}>
        {SECTIONS.map(({ id, backgroundColor: bg, textColor, navPanelBackgroundColor: navPanelBg, title, jobId, educationId, isQuotes }) => {
          let content: React.ReactNode
          if (id === 'intro') {
            content = <IntroHero />
          } else if (id === 'outro') {
            content = <EndPage />
          } else if (id === 'playpress') {
            content = <PlaypressSection />
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
            <Section key={id} id={id} backgroundColor={bg} textColor={textColor} navPanelBackgroundColor={navPanelBg}>
              <div
                className={
                  isQuotes || jobId || id === 'pixel-portraits' || id === 'playpress'
                    ? `${styles.sectionContent} ${styles.sectionContentFullHeight}`
                    : styles.sectionContent
                }
              >
                {content}
              </div>
            </Section>
          )
        })}
      </main>
      </div>
    </div>
  )
}
