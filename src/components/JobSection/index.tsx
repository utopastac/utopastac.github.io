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
      <h1 className={styles.company}>{company}</h1>
      <div className={styles.companyContainer}>
        <p className={styles.meta}>
          <span className={styles.date}>{date}</span>
        </p>
        <span className={styles.separator}>/</span>
        <h2 className={styles.title}>{jobTitle}</h2>
      </div>
      
      <p className={styles.description}>{description}</p>
    </article>
  )
}
