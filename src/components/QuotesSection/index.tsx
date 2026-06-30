import { useContext } from 'react'
import { ModalContext } from '@/context/ModalContext'
import { MetaColumn } from '@/components/MetaColumn'
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

  const openFullQuotes = () => {
    modal?.openModal(
      <QuotesModalContent quotes={quotes} title={title} />
    )
  }

  return (
    <div className={styles.root}>
      <MetaColumn items={[{ label: title }]} />
      <ul
        className={styles.list}
        onClick={openFullQuotes}
        onKeyDown={(e) => e.key === 'Enter' && openFullQuotes()}
        role="button"
        tabIndex={0}
        aria-label="View all quotes"
      >
        {quotes.slice(0, 5).map((q, i) => (
          <li key={i} className={styles.quoteItem}>
            <blockquote className={styles.quote}>{q.text}</blockquote>
            {q.company && (
              <cite className={styles.cite}>— {q.company}</cite>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
