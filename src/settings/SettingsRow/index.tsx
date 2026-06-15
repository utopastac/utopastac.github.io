import styles from './index.module.css'

type SettingsRowProps = {
  label: string
  htmlFor?: string
  children: React.ReactNode
}

export function SettingsRow({ label, htmlFor, children }: SettingsRowProps) {
  return (
    <div className={styles.root}>
      {label && (
        htmlFor
          ? <label className={styles.label} htmlFor={htmlFor}>{label}</label>
          : <span className={styles.label}>{label}</span>
      )}
      <div className={styles.control}>{children}</div>
    </div>
  )
}
