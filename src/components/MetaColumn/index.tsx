import styles from './index.module.css'

export type MetaItem = {
  label: string
  numeric?: boolean
  dimmed?: boolean
}

type MetaColumnProps = {
  items: MetaItem[]
}

export function MetaColumn({ items }: MetaColumnProps) {
  return (
    <div className={styles.root}>
      {items.map((item, i) => (
        <span
          key={i}
          className={[
            styles.item,
            item.numeric ? styles.numeric : '',
            item.dimmed ? styles.dimmed : '',
          ].filter(Boolean).join(' ')}
        >
          {item.label}
        </span>
      ))}
    </div>
  )
}
