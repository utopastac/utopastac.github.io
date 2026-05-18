import { useSpringFollow } from '@/hooks/useSpringFollow'
import styles from './index.module.css'

const PIXEL_PORTRAIT_SRCS = Array.from({ length: 50 }, (_, i) => ({
  src: `/images/p${i + 1}.PNG`,
  alt: `Pixel portrait ${i + 1}`,
}))

export function PixelPortraitsSection() {
  const { displayPos, setTarget } = useSpringFollow()

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTarget(e.clientX - rect.left, e.clientY - rect.top)
  }

  return (
    <a
      href="https://pixelator.f-90.co.uk"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.wrapper}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.grid}>
        {PIXEL_PORTRAIT_SRCS.map(({ src, alt }, i) => (
          <img key={i} src={src} alt={alt} className={styles.image} />
        ))}
      </div>
      <div
        className={styles.hoverCard}
        aria-hidden="true"
        style={{ left: displayPos.x, top: displayPos.y }}
      >
        <p className={styles.hoverCardUrl}>pixelator.f-90.co.uk</p>
      </div>
    </a>
  )
}
