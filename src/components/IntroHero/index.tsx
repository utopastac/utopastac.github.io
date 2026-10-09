import { useState } from 'react'
import { JOBS } from '@/data/jobs'
import { scrollToSectionElement } from '@/utils/animateScrollTo'
import { useCursorTilt } from '@/hooks/useCursorTilt'
import styles from './index.module.css'

const FOREGROUND_TILT_DEG = 20

type TabId = 'resume' | 'personal'

type LinkItem = {
  id: string
  label: string
  iconSrc?: string
}

const PERSONAL_LINKS: readonly LinkItem[] = [
  { id: 'playpress', label: 'Playpress', iconSrc: '/images/playpress-pete.svg' },
  { id: 'pixel-portraits', label: 'Pixelator', iconSrc: '/images/pixelator-icon.png' },
  { id: 'dayring', label: 'Dayring', iconSrc: '/images/dayring-icon.png' },
]

const TABS: readonly { id: TabId; label: string }[] = [
  { id: 'resume', label: 'Resume' },
  { id: 'personal', label: 'Personal' },
]

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) scrollToSectionElement(el)
}

export function IntroHero() {
  const { enabled: isTiltEnabled, tiltRef, perspectiveRootRef } = useCursorTilt({ maxTiltDeg: FOREGROUND_TILT_DEG })
  const [activeTab, setActiveTab] = useState<TabId>('resume')

  const links: readonly LinkItem[] =
    activeTab === 'resume'
      ? JOBS.map((job) => ({ id: job.id, label: job.company }))
      : PERSONAL_LINKS

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
          <div className={styles.linkPanel}>
            <div className={styles.tabs} role="tablist" aria-label="Home links">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  className={activeTab === tab.id ? `${styles.tab} ${styles.tabActive}` : styles.tab}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <nav
              className={styles.companyList}
              aria-label={activeTab === 'resume' ? 'Jump to company section' : 'Jump to personal section'}
            >
              {links.map((link, i) => (
                <button
                  key={link.id}
                  type="button"
                  className={styles.companyRow}
                  onClick={() => scrollToSection(link.id)}
                >
                  <span className={styles.companyIndex}>
                    {link.iconSrc ? (
                      <img src={link.iconSrc} alt="" className={styles.companyIcon} />
                    ) : (
                      String(i + 1).padStart(2, '0')
                    )}
                  </span>
                  <span className={styles.companyName}>{link.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
