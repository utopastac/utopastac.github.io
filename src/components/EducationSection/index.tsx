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
  return (
    <article className={styles.root}>
      <p className={styles.meta}>
        <span className={styles.date}>{date}</span>
        <span className={styles.separator}> / </span>
        <span>{institution}</span>
      </p>
      <h2 className={styles.title}>{degree}</h2>
      {details && <p className={styles.details}>{details}</p>}
    </article>
  )
}
