import { GitContributionsMap } from '@/components/GitContributionsMap'
import { useCursorTilt } from '@/hooks/useCursorTilt'
import styles from './index.module.css'

const BACKGROUND_TILT_DEG = 20

const COPY_ARIA_LABEL =
  'I have been writing code since the glory days of Flash. I have always taken great joy in the learning cycle of development. I love using code to rapidly make things real, regardless of how it\'s generated.'

const COPY_LINES = [
  <>
    <span className={styles.tokenComment}>// </span>
    I have been writing <span className={styles.tokenKeyword}>code</span> since the glory days of{' '}
    <span className={styles.tokenString}>&quot;Flash&quot;</span>.
  </>,
  <>
    <span className={styles.tokenComment}>// </span>
    I have always taken great joy in the learning cycle of{' '}
    <span className={styles.tokenKeyword}>development</span>.
  </>,
  <>
    <span className={styles.tokenComment}>// </span>
    I love using <span className={styles.tokenKeyword}>code</span> to rapidly make things real,
  </>,
  <>
    <span className={styles.tokenComment}>// </span>
    regardless of how it&apos;s <span className={styles.tokenKeyword}>generated</span>.
  </>,
] as const

export function FrontendDevelopmentSection() {
  const { enabled: isTiltEnabled, tiltRef: foregroundTiltRef, perspectiveRootRef } = useCursorTilt()
  const { tiltRef: backgroundTiltRef } = useCursorTilt({
    enabled: isTiltEnabled,
    maxTiltDeg: BACKGROUND_TILT_DEG,
  })

  const copyPanel = (
    <div className={styles.copyBlock}>
      <div className={styles.editor} aria-label={COPY_ARIA_LABEL}>
        <div className={styles.titleBar}>
          <div className={styles.trafficLights} aria-hidden="true">
            <span className={styles.trafficLight} data-color="close" />
            <span className={styles.trafficLight} data-color="minimize" />
            <span className={styles.trafficLight} data-color="maximize" />
          </div>
          <span className={styles.tab}>story.ts</span>
        </div>
        <pre className={styles.code}>
          {COPY_LINES.map((line, index) => (
            <div key={index} className={styles.codeRow}>
              <span className={styles.lineNum} aria-hidden="true">
                {index + 1}
              </span>
              <span className={styles.codeContent}>{line}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )

  return (
    <div ref={perspectiveRootRef} className={isTiltEnabled ? `${styles.root} ${styles.tiltRoot}` : styles.root}>
      <div
        ref={isTiltEnabled ? backgroundTiltRef : undefined}
        className={
          isTiltEnabled ? `${styles.mapWrap} ${styles.tiltPlane}` : styles.mapWrap
        }
      >
        <div className={styles.mapBleed}>
          <GitContributionsMap />
        </div>
      </div>
      <div
        ref={isTiltEnabled ? foregroundTiltRef : undefined}
        className={
          isTiltEnabled
            ? `${styles.tiltPlane} ${styles.foregroundTilt}`
            : styles.foregroundTilt
        }
      >
        {copyPanel}
      </div>
    </div>
  )
}
