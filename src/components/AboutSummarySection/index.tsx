import { MetaColumn } from '@/components/MetaColumn'
import styles from './index.module.css'

type AboutSummarySectionProps = {
  title: string
  label: string
  summary: string
}

export function AboutSummarySection({ title, label, summary }: AboutSummarySectionProps) {
  return (
    <div className={styles.root}>
      <MetaColumn items={[
        { label: title },
        { label, dimmed: true },
      ]} />
      <p className={styles.contentColumn}>{summary}</p>
    </div>
  )
}
