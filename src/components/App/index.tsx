import { useContext } from 'react'
import { SectionBackgroundContext } from '../../context/SectionBackgroundContext'
import { SECTIONS } from '../../data/sections'
import { CornerOverlay } from '../CornerOverlay'
import { IntroHero } from '../IntroHero'
import { PageNav } from '../PageNav'
import { ScrollDownArrow } from '../ScrollDownArrow'
import { Section } from '../Section'
import styles from './index.module.css'

export function App() {
  const ctx = useContext(SectionBackgroundContext)
  const backgroundColor = ctx?.backgroundColor ?? 'var(--color-bg)'

  return (
    <div className={styles.root} style={{ backgroundColor }}>
      <CornerOverlay />
      <ScrollDownArrow sectionIds={SECTIONS.map((s) => s.id)} />
      <PageNav
        sections={SECTIONS.map(({ id, title }) => ({ id, label: title }))}
      />
      <main className={styles.main}>
        {SECTIONS.map(({ id, backgroundColor: bg, title }) => (
          <Section key={id} id={id} backgroundColor={bg}>
            <div className={styles.sectionContent}>
              {id === 'intro' ? (
                <IntroHero />
              ) : (
                <h1>{title}</h1>
              )}
            </div>
          </Section>
        ))}
      </main>
    </div>
  )
}
