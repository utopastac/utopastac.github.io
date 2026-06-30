import { GitContributionsMap } from '@/components/GitContributionsMap'
import { useCursorTilt } from '@/hooks/useCursorTilt'
import styles from './index.module.css'

const TILT_DEG = 20

const DESCRIPTION =
  "I have been writing code since the glory days of Flash. I have always taken great joy in the learning cycle of development. I love using code to rapidly make things real, regardless of how it's generated."

export function FrontendDevelopmentSection() {
  const { enabled: isTiltEnabled, tiltRef, perspectiveRootRef } = useCursorTilt({
    maxTiltDeg: TILT_DEG,
  })

  return (
    <div className={styles.root}>
      <div className={styles.layout}>
        <div className={styles.contentColumn}>
          <h2 className={styles.title}>Development</h2>
          <p className={styles.subtitle}>Coding experience</p>
          <p className={styles.description}>{DESCRIPTION}</p>
        </div>

        <div
          ref={perspectiveRootRef}
          className={isTiltEnabled ? `${styles.mapColumn} ${styles.tiltRoot}` : styles.mapColumn}
        >
          <div
            ref={tiltRef}
            className={isTiltEnabled ? `${styles.mapWrap} ${styles.tiltPlane}` : styles.mapWrap}
          >
            <GitContributionsMap />
          </div>
        </div>
      </div>
    </div>
  )
}
