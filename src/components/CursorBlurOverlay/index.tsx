import { useCursorBlur } from '@/hooks/useCursorBlur'
import styles from './index.module.css'

export function CursorBlurOverlay() {
  const { enabled } = useCursorBlur()

  if (!enabled) {
    return null
  }

  return <div className={styles.root} aria-hidden />
}
