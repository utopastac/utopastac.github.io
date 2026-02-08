import { useContext } from 'react'
import { SectionBackgroundContext } from '../../context/SectionBackgroundContext'
import { JOBS } from '../../data/jobs'
import { QUOTES } from '../../data/quotes'
import { SECTIONS } from '../../data/sections'
import { CornerOverlay } from '../CornerOverlay'
import { IntroHero } from '../IntroHero'
import { JobSection } from '../JobSection'
import { PageNav } from '../PageNav'
import { QuotesSection } from '../QuotesSection'
import { ScrollDownArrow } from '../ScrollDownArrow'
import { Section } from '../Section'
import styles from './index.module.css'

export function App() {
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
        {SECTIONS.map(({ id, backgroundColor: bg, title, jobId, isQuotes }) => {
          let content: React.ReactNode
          if (id === 'intro') {
            content = <IntroHero />
          } else if (isQuotes) {
            content = <QuotesSection quotes={QUOTES} title={title} />
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
            <Section key={id} id={id} backgroundColor={bg}>
              <div className={styles.sectionContent}>{content}</div>
            </Section>
          )
        })}
      </main>
    </div>
  )
}
