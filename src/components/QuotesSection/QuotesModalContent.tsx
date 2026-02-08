import type { QuoteItem } from './index'
import styles from './index.module.css'

type QuotesModalContentProps = {
  quotes: readonly QuoteItem[]
  title: string
}

/**
 * Full list of quotes for the modal. Used when user clicks on the quotes section.
 */
export function QuotesModalContent({ quotes, title }: QuotesModalContentProps) {
  return (
    <div className={styles.modalContent}>
      <h2 className={styles.modalTitle}>{title}</h2>
      <ul className={styles.modalList}>
        {quotes.map((q, i) => (
          <li key={i} className={styles.modalQuoteItem}>
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
