import styles from './index.module.css'

type SettingsSectionProps = {
  title?: string
  children: React.ReactNode
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <section className={styles.root}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.rows}>{children}</div>
    </section>
  )
}
