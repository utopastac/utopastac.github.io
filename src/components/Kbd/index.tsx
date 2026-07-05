import styles from './index.module.css'

interface KbdProps {
  children: React.ReactNode
}

export function Kbd({ children }: KbdProps) {
  return <kbd className={styles.root}>{children}</kbd>
}
