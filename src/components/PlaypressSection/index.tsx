import { useSpringFollow } from '@/hooks/useSpringFollow'
import styles from './index.module.css'

const PP2_SRC = '/images/pp-2.jpg'

/** 3×3 grid. a0–a4, a6–a7 single; a5 = merged right column (2 rows), pp-2. */
const CELL_SOURCES = [
  '/images/pp-1.jpg',
  '/images/pp-3.jpg',
  '/images/pp-4.jpg',
  '/images/pp-5.jpg',
  '/images/pp-8.jpg',
  '/images/pp-6.jpg',
  PP2_SRC,
  '/images/pp-7.jpg',
  '/images/pp-10.jpg',
]

export function PlaypressSection() {
  const { displayPos, setTarget } = useSpringFollow()

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTarget(e.clientX - rect.left, e.clientY - rect.top)
  }

  return (
    <div className={styles.root} onMouseMove={handleMouseMove}>
      <img src="/images/pp-logo.png" alt="Playpress" className={styles.logo} />
      <div className={styles.grid}>
        {CELL_SOURCES.map((src, i) => (
          <div key={i} className={styles.cell} style={{ gridArea: `a${i}` }}>
            <a href="https://playpresstoys.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
              <img src={src} alt="" className={styles.image} />
            </a>
          </div>
        ))}
      </div>
      <div
        className={styles.hoverCard}
        aria-hidden="true"
        style={{ left: displayPos.x, top: displayPos.y }}
      >
        <p className={styles.hoverCardUrl}>playpresstoys.com</p>
      </div>
    </div>
  )
}
