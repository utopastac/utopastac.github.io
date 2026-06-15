import styles from './index.module.css'

type JobRowProps = {
  date?: string
  company: string
  title: string
  asButton?: boolean
  onClick?: () => void
  size?: 'md' | 'sm'
}

const DATE_COLUMN_SPACER = '2025'

export function JobRow({
  date,
  company,
  title,
  asButton = false,
  onClick,
  size = 'md',
}: JobRowProps) {
  const sizeClass = size === 'sm' ? styles.rowSm : undefined
  const showDate = Boolean(date)

  const content = (
    <>
      <div className={styles.companyContainer}>
        <span className={styles.company}>{company}</span>
        {title ? <span className={styles.title}>{title}</span> : null}
      </div>
      <span
        className={`${styles.date} ${showDate ? '' : styles.dateHidden}`}
        aria-hidden={showDate ? undefined : true}
      >
        {date ?? DATE_COLUMN_SPACER}
      </span>
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

