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
  return (
    <div className={styles.root}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <ul className={styles.list}>
        {quotes.map((q, i) => (
          <li key={i} className={styles.quoteItem}>
            <blockquote className={styles.quote}>
              {q.text}
            </blockquote>
            {q.company && (
              <cite className={styles.cite}>— {q.company}</cite>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
