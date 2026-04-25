import styles from './index.module.css'

type JobRowProps = {
  date: string
  company: string
  title: string
  asButton?: boolean
  onClick?: () => void
  size?: 'md' | 'sm'
}

export function JobRow({ date, company, title, asButton = false, onClick, size = 'md' }: JobRowProps) {
  const sizeClass = size === 'sm' ? styles.rowSm : undefined

  const content = (
    <>
      
      <div className={styles.companyContainer}>
        <span className={styles.company}>{company}</span>
        <span className={styles.title}>{title}</span>
      </div>
      <span className={styles.date}>{date}</span>
    </>
  )

  if (asButton) {
    return (
      <button
        type="button"
        className={`${styles.rowButton} ${sizeClass ?? ''}`}
        onClick={onClick}
      >
        {content}
      </button>
    )
  }

  return <div className={`${styles.row} ${sizeClass ?? ''}`}>{content}</div>
}

