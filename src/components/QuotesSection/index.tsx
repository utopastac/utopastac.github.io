import { useContext } from 'react'
import { ModalContext } from '@/context/ModalContext'
import { useCursorTilt } from '@/hooks/useCursorTilt'
import { QuotesModalContent } from './QuotesModalContent'
import styles from './index.module.css'

export type QuoteItem = {
  text: string
  company?: string
}

type QuotesSectionProps = {
  quotes: readonly QuoteItem[]
  title?: string
}

export function QuotesSection({ quotes, title = 'What people say' }: QuotesSectionProps) {
  const modal = useContext(ModalContext)
  const { enabled: isTiltEnabled, tiltRef: foregroundTiltRef, perspectiveRootRef } = useCursorTilt()

  const openFullQuotes = () => {
    modal?.openModal(
      <QuotesModalContent quotes={quotes} title={title} />
    )
  }

  return (
    <div ref={perspectiveRootRef} className={isTiltEnabled ? `${styles.root} ${styles.tiltRoot}` : styles.root}>
      <div className={styles.container}>
        <div
          ref={isTiltEnabled ? foregroundTiltRef : undefined}
          className={isTiltEnabled ? `${styles.tiltPlane} ${styles.foregroundTilt}` : styles.foregroundTilt}
        >
          <div
            className={styles.cropWrapper}
            onClick={openFullQuotes}
            onKeyDown={(e) => e.key === 'Enter' && openFullQuotes()}
            role="button"
            tabIndex={0}
            aria-label="View all quotes"
          >
            <h2 className={styles.sectionLabel}>{title}</h2>
            <ul className={styles.list}>
              {quotes.map((q, i) => (
                <li key={i} className={styles.quoteItem}>
                  <blockquote className={styles.quote}>{q.text}</blockquote>
                  {q.company && (
                    <cite className={styles.cite}>— {q.company}</cite>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
