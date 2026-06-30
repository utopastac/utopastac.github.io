import { MetaColumn } from '@/components/MetaColumn'
import styles from './index.module.css'

type EducationSectionProps = {
  degree: string
  institution: string
  date: string
  details?: string
}

export function EducationSection({
  degree,
  institution,
  date,
  details,
}: EducationSectionProps) {
  return (
    <div className={styles.root}>
      <MetaColumn items={[
        { label: date, numeric: true },
        { label: institution },
        { label: degree },
      ]} />
      {details && <p className={styles.contentColumn}>{details}</p>}
    </div>
  )
}
