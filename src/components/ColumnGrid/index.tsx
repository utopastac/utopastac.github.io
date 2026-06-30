import styles from './index.module.css'

const COLS = 10

export function ColumnGrid() {
  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.grid}>
        {Array.from({ length: COLS }, (_, i) => (
          <div key={i} className={styles.col} />
        ))}
      </div>
    </div>
  )
}
