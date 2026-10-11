import { useContext } from 'react'
import { SectionBackgroundContext } from '@/context/SectionBackgroundContext'
import { LANES } from '@/data/sections'
import styles from './index.module.css'

export function PageIndex() {
  const ctx = useContext(SectionBackgroundContext)
  const lane = LANES.find((item) => item.sections.some((section) => section.id === ctx?.activeSectionId))
  const idx = lane ? lane.sections.findIndex((section) => section.id === ctx?.activeSectionId) : -1
  const label = idx >= 0 ? String(idx).padStart(2, '0') : '00'

  return (
    <div className={styles.root} aria-hidden>
      {label}
    </div>
  )
}
