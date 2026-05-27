import styles from './index.module.css'

/**
 * Fixed full-viewport dot grid rendered behind page content.
 */
export function DotGrid() {
  return <div className={styles.grid} aria-hidden />
}
