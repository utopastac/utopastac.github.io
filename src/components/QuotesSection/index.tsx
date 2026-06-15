import { useContext } from 'react'
import { ModalContext } from '@/context/ModalContext'
import { ScaledHero } from '@/components/ScaledHero'
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

const BACKGROUND_TILT_DEG = 20

export function QuotesSection({ quotes, title = 'What people say' }: QuotesSectionProps) {
  const modal = useContext(ModalContext)
  const { enabled: isTiltEnabled, tiltRef: foregroundTiltRef, perspectiveRootRef } = useCursorTilt()
  const { tiltRef: backgroundTiltRef } = useCursorTilt({
    enabled: isTiltEnabled,
    maxTiltDeg: BACKGROUND_TILT_DEG,
  })

  const openFullQuotes = () => {
    modal?.openModal(
      <QuotesModalContent quotes={quotes} title={title} />
    )
  }

  return (
    <div ref={perspectiveRootRef} className={isTiltEnabled ? `${styles.root} ${styles.tiltRoot}` : styles.root}>
      <div className={styles.container}>
          <div
            ref={isTiltEnabled ? backgroundTiltRef : undefined}
            className={
              isTiltEnabled
                ? `${styles.backgroundWord} ${styles.tiltPlane}`
                : styles.backgroundWord
            }
            aria-hidden
          >
            <ScaledHero
              as="div"
              measureText={title}
              wrapperClassName={styles.watermarkWrapper}
              titleClassName={styles.watermarkTitle}
            >
              {title}
            </ScaledHero>
          </div>
          <div
            ref={isTiltEnabled ? foregroundTiltRef : undefined}
            className={
              isTiltEnabled
                ? `${styles.tiltPlane} ${styles.foregroundTilt}`
                : styles.foregroundTilt
            }
          >
            <div
              className={styles.cropWrapper}
              onClick={openFullQuotes}
              onKeyDown={(e) => e.key === 'Enter' && openFullQuotes()}
              role="button"
              tabIndex={0}
              aria-label="View all quotes"
            >
              {/* {title && <h2 className={styles.title}>{title}</h2>} */}
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
        </div>
      </div>
    </div>
  )
}
