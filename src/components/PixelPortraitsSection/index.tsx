import styles from './index.module.css'

const PIXEL_PORTRAIT_SRCS = Array.from({ length: 50 }, (_, i) => ({
  src: `/images/p${i + 1}.PNG`,
  alt: `Pixel portrait ${i + 1}`,
}))

export function PixelPortraitsSection() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {PIXEL_PORTRAIT_SRCS.map(({ src, alt }, i) => (
          <img key={i} src={src} alt={alt} className={styles.image} />
        ))}
      </div>
    </div>
  )
}
