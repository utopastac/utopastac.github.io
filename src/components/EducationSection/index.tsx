import { useCursorTilt } from '@/hooks/useCursorTilt'
import styles from './index.module.css'

type EducationSectionProps = {
  degree: string
  institution: string
  date: string
  details?: string
}

export function EducationSection({
  degree,
  institution,
  date,
  details,
}: EducationSectionProps) {
  const { enabled: isTiltEnabled, tiltRef, perspectiveRootRef } = useCursorTilt()

  return (
    <div ref={perspectiveRootRef} className={isTiltEnabled ? styles.tiltRoot : undefined}>
      <div
        ref={isTiltEnabled ? tiltRef : undefined}
        className={isTiltEnabled ? `${styles.container} ${styles.tiltPlane}` : styles.container}
      >
        <h2 className={styles.sectionLabel}>{institution}</h2>
        <article className={styles.content}>
          <p className={styles.meta}>
            <span className={styles.date}>{date}</span>
            <span className={styles.separator}> / </span>
            <span>{institution}</span>
          </p>
          <h3 className={styles.title}>{degree}</h3>
          {details && <p className={styles.details}>{details}</p>}
        </article>
      </div>
    </div>
  )
}
