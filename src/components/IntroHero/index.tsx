import { scrollToSectionElement } from '@/utils/animateScrollTo'
import { useCursorTilt } from '@/hooks/useCursorTilt'
import styles from './index.module.css'

const FOREGROUND_TILT_DEG = 20

const LINK_ICONS: Readonly<Record<string, string>> = {
  playpress: '/images/playpress-pete.svg',
  'pixel-portraits': '/images/pixelator-icon.png',
  dayring: '/images/dayring-icon.png',
  empires: '/images/empires-icon.png',
  doodloop: '/images/doodloop-icon.png',
  'admin-ui': '/images/admin-ui-icon.png',
}

type IntroLink = {
  id: string
  label: string
}

type IntroHeroProps = {
  word: string
  links: readonly IntroLink[]
  listLabel: string
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) scrollToSectionElement(el)
}

export function IntroHero({ word, links, listLabel }: IntroHeroProps) {
  const { enabled: isTiltEnabled, tiltRef, perspectiveRootRef } = useCursorTilt({ maxTiltDeg: FOREGROUND_TILT_DEG })

  return (
    <div className={styles.root}>
      <div ref={perspectiveRootRef} className={styles.tiltRoot}>
        <div
          ref={isTiltEnabled ? tiltRef : undefined}
          className={isTiltEnabled ? `${styles.content} ${styles.tiltPlane}` : styles.content}
        >
          <p className={styles.bio}>
            {word}
          </p>
          <div className={styles.linkPanel}>
            <nav className={styles.companyList} aria-label={listLabel}>
              {links.map((link, i) => {
                const iconSrc = LINK_ICONS[link.id]
                return (
                  <button
                    key={link.id}
                    type="button"
                    className={styles.companyRow}
                    onClick={() => scrollToSection(link.id)}
                  >
                    <span className={styles.companyIndex}>
                      {iconSrc ? (
                        <img src={iconSrc} alt="" className={styles.companyIcon} />
                      ) : (
                        String(i + 1).padStart(2, '0')
                      )}
                    </span>
                    <span className={styles.companyName}>{link.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
