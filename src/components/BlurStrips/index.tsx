import styles from './index.module.css'

/**
 * Two fixed blur strips at top and bottom of the viewport.
 * Rendered at app level so they span full width and avoid hard edges with section content.
 */
export function BlurStrips() {
  return (
    <>
      {/* <div className={styles.blurTop} aria-hidden /> */}
      <div className={styles.blurBottom} aria-hidden />
    </>
  )
}
