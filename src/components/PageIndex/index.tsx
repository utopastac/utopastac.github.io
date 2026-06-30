import { useContext } from 'react'
import { SectionBackgroundContext } from '@/context/SectionBackgroundContext'
import { SECTIONS } from '@/data/sections'
import styles from './index.module.css'

export function PageIndex() {
  const ctx = useContext(SectionBackgroundContext)
  const idx = SECTIONS.findIndex((s) => s.id === ctx?.activeSectionId)
  const label = idx >= 0 ? String(idx).padStart(2, '0') : '00'

  return (
    <div className={styles.root} aria-hidden>
      {label}
    </div>
  )
}
