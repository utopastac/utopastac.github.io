import { JOBS } from '@/data/jobs'
import { scrollToSectionElement } from '@/utils/animateScrollTo'
import { useCursorTilt } from '@/hooks/useCursorTilt'
import styles from './index.module.css'

const FOREGROUND_TILT_DEG = 20

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) scrollToSectionElement(el)
}

export function IntroHero() {
  const { enabled: isTiltEnabled, tiltRef, perspectiveRootRef } = useCursorTilt({ maxTiltDeg: FOREGROUND_TILT_DEG })

  return (
    <div className={styles.root}>
      <div ref={perspectiveRootRef} className={styles.tiltRoot}>
        <div
          ref={isTiltEnabled ? tiltRef : undefined}
          className={isTiltEnabled ? `${styles.content} ${styles.tiltPlane}` : styles.content}
        >
          <p className={styles.bio}>
            Designer.
          </p>
          <nav className={styles.companyList} aria-label="Jump to company section">
            {JOBS.map((job, i) => (
              <button
                key={job.id}
                type="button"
                className={styles.companyRow}
                onClick={() => scrollToSection(job.id)}
              >
                <span className={styles.companyIndex}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.companyName}>{job.company}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
