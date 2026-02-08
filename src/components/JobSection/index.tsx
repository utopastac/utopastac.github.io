import styles from './index.module.css'

type JobSectionProps = {
  date: string
  jobTitle: string
  company: string
  description: string
}

export function JobSection({
  date,
  jobTitle,
  company,
  description,
}: JobSectionProps) {
  return (
    <article className={styles.root}>
      <p className={styles.meta}>
        <span className={styles.date}>{date}</span>
        <span className={styles.separator}> · </span>
        <span className={styles.company}>{company}</span>
      </p>
      <h2 className={styles.title}>{jobTitle}</h2>
      <p className={styles.description}>{description}</p>
    </article>
  )
}
