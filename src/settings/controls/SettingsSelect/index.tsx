import styles from './index.module.css'

type SettingsSelectProps = {
  id: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}

export function SettingsSelect({ id, value, options, onChange }: SettingsSelectProps) {
  return (
    <select
      id={id}
      className={styles.root}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}
