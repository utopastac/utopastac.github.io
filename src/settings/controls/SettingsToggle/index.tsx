import styles from './index.module.css'

type SettingsToggleProps = {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function SettingsToggle({ id, checked, onChange }: SettingsToggleProps) {
  return (
    <label className={styles.root} htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        className={styles.input}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.track} data-checked={checked} aria-hidden="true">
        <span className={styles.knob} />
      </span>
    </label>
  )
}
