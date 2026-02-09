import { JOBS, getCaptionFromPath } from '@/data/jobs'
import { JOB_IMAGE_CAPTIONS } from '@/data/job-image-captions.generated'
import styles from './index.module.css'

type JobImagesModalContentProps = {
  jobId: string
}

/**
 * Full list of job images for the modal. Looks up job by id so the correct images always show.
 * Uses caption (or auto-generated from path) for alt, title, and visible caption.
 */
export function JobImagesModalContent({ jobId }: JobImagesModalContentProps) {
  const job = JOBS.find((j) => j.id === jobId)
  const images = job?.images ?? []

  if (images.length === 0) return null

  return (
    <div className={styles.jobImagesModalContent}>
      <div className={styles.jobImagesModalList}>
        {images.map((img) => {
          const caption = JOB_IMAGE_CAPTIONS[img.src] ?? img.caption ?? getCaptionFromPath(img.src)
          return (
            <figure key={img.src} className={styles.jobImagesModalFigure}>
              <img
                className={styles.jobImagesModalImage}
                src={img.src}
                alt={caption}
                title={caption}
                loading="lazy"
              />
              <figcaption className={styles.jobImagesModalCaption}>
                {caption}
              </figcaption>
            </figure>
          )
        })}
      </div>
    </div>
  )
}
