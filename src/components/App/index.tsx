import { useContext } from 'react'
import { SectionBackgroundContext } from '@/context/SectionBackgroundContext'
import { CornerOverlay } from '@/components/CornerOverlay'
import { EducationSection } from '@/components/EducationSection'
import { IntroHero } from '@/components/IntroHero'
import { JobSection } from '@/components/JobSection'
import { PageNav } from '@/components/PageNav'
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

  if (isSmallViewport) {
    return <SimplePage />
  }

  const ctx = useContext(SectionBackgroundContext)
  const backgroundColor = ctx?.backgroundColor ?? 'var(--color-bg)'
  const jobMap = new Map(JOBS.map((j) => [j.id, j]))

  return (
    <div className={styles.root} style={{ backgroundColor }}>
      <CornerOverlay />
      <ScrollDownArrow sectionIds={SECTIONS.map((s) => s.id)} />
      <PageNav
        sections={SECTIONS.map(({ id, title }) => ({ id, label: title }))}
      />
      <main className={styles.main}>
        {SECTIONS.map(({ id, backgroundColor: bg, textColor, title, jobId, educationId, isQuotes }) => {
          let content: React.ReactNode
          if (id === 'intro') {
            content = <IntroHero />
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
                company={job.company}
                date={job.date}
                description={job.description}
                jobTitle={job.jobTitle}
              />
            ) : (
              <h1>{title}</h1>
            )
          } else {
            content = <h1>{title}</h1>
          }
          return (
            <Section key={id} id={id} backgroundColor={bg} textColor={textColor}>
              <div className={styles.sectionContent}>{content}</div>
            </Section>
          )
        })}
      </main>
    </div>
  )
}
