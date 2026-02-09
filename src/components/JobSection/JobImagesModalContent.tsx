import styles from './index.module.css'

type JobImagesModalContentProps = {
  images: readonly string[]
}

/**
 * Full list of job images for the modal. Used when user clicks the image column in a job section.
 */
export function JobImagesModalContent({ images }: JobImagesModalContentProps) {
  return (
    <div className={styles.jobImagesModalContent}>
      <div className={styles.jobImagesModalList}>
        {images.map((src, i) => (
          <img
            key={i}
            className={styles.jobImagesModalImage}
            src={src}
            alt=""
            loading="lazy"
          />
        ))}
      </div>
    </div>
  )
}
