import { MetaColumn } from '@/components/MetaColumn'
import { ProjectHoverTooltip } from '@/components/ProjectHoverTooltip'
import { DESKTOP_TILT_MEDIA, useCursorTilt } from '@/hooks/useCursorTilt'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useSpringFollow } from '@/hooks/useSpringFollow'
import styles from './index.module.css'

const ADMIN_UI_URL = 'https://admin-ui.f-90.co.uk'
const HERO_SRC = '/images/admin-ui-hero.png'

export function AdminUiSection() {
  const { displayPos, setTarget } = useSpringFollow()
  const isTiltEnabled = useMediaQuery(DESKTOP_TILT_MEDIA)
  const { tiltRef, perspectiveRootRef } = useCursorTilt({ enabled: isTiltEnabled })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTarget(e.clientX - rect.left, e.clientY - rect.top)
  }

  return (
    <div className={styles.root}>
      <MetaColumn items={[
        { label: 'Admin UI' },
        { label: 'Personal project' },
      ]} />

      <p className={styles.descriptionColumn}>
        A React component library and design system for building admin tools and prototypes.{' '}
        <a
          href={ADMIN_UI_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.siteLink}
        >
          admin-ui.f-90.co.uk ↗
        </a>
      </p>

      <a
        href={ADMIN_UI_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={isTiltEnabled ? `${styles.mediaColumn} ${styles.tiltEnabled}` : styles.mediaColumn}
        onMouseMove={handleMouseMove}
      >
        <div
          ref={perspectiveRootRef}
          className={isTiltEnabled ? `${styles.scene} ${styles.tiltRoot}` : styles.scene}
        >
          <div
            ref={tiltRef}
            className={isTiltEnabled ? `${styles.band} ${styles.tiltPlane}` : styles.band}
          >
            <div className={styles.frame}>
              <img
                className={styles.screen}
                src={HERO_SRC}
                alt="Admin UI component catalog"
                width={2320}
                height={370}
              />
            </div>
          </div>
        </div>
        <ProjectHoverTooltip
          label="admin-ui.f-90.co.uk"
          aboveTilt={isTiltEnabled}
          style={{ left: displayPos.x, top: displayPos.y }}
        />
      </a>
    </div>
  )
}
