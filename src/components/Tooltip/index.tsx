import styles from './index.module.css'

interface TooltipProps {
  label: React.ReactNode
  children: React.ReactNode
}

export function Tooltip({ label, children }: TooltipProps) {
  return (
    <div className={styles.root}>
      <span className={styles.label} aria-hidden="true">{label}</span>
      {children}
    </div>
  )
}
