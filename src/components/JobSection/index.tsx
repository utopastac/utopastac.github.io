import { useCallback, useContext } from 'react'
import { ModalContext } from '@/context/ModalContext'
import type { JobImage } from '@/data/jobs'
import { getCaptionFromPath } from '@/data/jobs'
import { JOB_IMAGE_CAPTIONS } from '@/data/job-image-captions.generated'
import { JobImagesModalContent } from './JobImagesModalContent'
import styles from './index.module.css'

type JobSectionProps = {
  jobId: string
  date: string
  jobTitle: string
  company: string
  description: string
  /** Optional images for the left column (vertical stack). */
  images?: readonly JobImage[]
}

export function JobSection({
  jobId,
  date,
  jobTitle,
  company,
  description,
  images,
}: JobSectionProps) {
  const modal = useContext(ModalContext)
  const hasImages = images && images.length > 0

  const openImagesModal = useCallback(() => {
    if (!hasImages) return
    modal?.openModal(<JobImagesModalContent jobId={jobId} />)
  }, [jobId, hasImages, modal])

  return (
    <article className={styles.root}>
      <div className={hasImages ? styles.columns : styles.singleColumn}>
        {hasImages && (
          <div
            className={styles.imageColumn}
            onClick={openImagesModal}
            onKeyDown={(e) => e.key === 'Enter' && openImagesModal()}
            role="button"
            tabIndex={0}
            aria-label={`View all images for ${company}`}
          >
            <div className={styles.imageStack}>
              {images!.map((img) => {
                const alt = JOB_IMAGE_CAPTIONS[img.src] ?? img.caption ?? getCaptionFromPath(img.src)
                return (
                  <img
                    key={img.src}
                    className={styles.image}
                    src={img.src}
                    alt={alt}
                    title={alt}
                    loading="lazy"
                  />
                )
              })}
            </div>
          </div>
        )}
        <div className={styles.contentColumn}>
          <h1 className={styles.company}>{company}</h1>
          <div className={styles.companyContainer}>
            <p className={styles.meta}>
              <span className={styles.date}>{date}</span>
            </p>
            <span className={styles.separator}>/</span>
            <h2 className={styles.title}>{jobTitle}</h2>
          </div>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </article>
  )
}
