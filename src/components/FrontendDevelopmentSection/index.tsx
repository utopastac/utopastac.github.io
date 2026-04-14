import { GitContributionsMap } from '@/components/GitContributionsMap'
import styles from './index.module.css'

export function FrontendDevelopmentSection() {
  return (
    <div className={styles.root}>
      <div className={styles.columns}>
        <div className={styles.mapWrap}>
          <div className={styles.mapCanvas}>
            <GitContributionsMap />
          </div>
        </div>
        <div className={styles.copyColumn}>
          <p className={styles.copy}>
            I have been writing code since the glory days of Flash. I have always taken great joy in the learning cycle of development. I love using code to rapidly make things real, regardless of how it's generated.
          </p>
        </div>
      </div>
    </div>
  )
}
