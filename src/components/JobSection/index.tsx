import { useCallback, useContext } from 'react'
import { ModalContext } from '@/context/ModalContext'
import { MetaColumn } from '@/components/MetaColumn'
import { useCursorTilt } from '@/hooks/useCursorTilt'
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
  const { enabled: isTiltEnabled, tiltRef, perspectiveRootRef } = useCursorTilt()

  const openImagesModal = useCallback(() => {
    if (!hasImages) return
    modal?.openModal(<JobImagesModalContent jobId={jobId} />)
  }, [jobId, hasImages, modal])

  return (
    <article className={styles.root}>
      <MetaColumn items={[
        { label: date, numeric: true },
        { label: company },
        { label: jobTitle },
      ]} />
      <p className={styles.descriptionColumn}>{description}</p>
      {hasImages && (() => {
        const img = images![0]
        const alt = JOB_IMAGE_CAPTIONS[img.src] ?? img.caption ?? getCaptionFromPath(img.src)
        return (
          <div
            ref={perspectiveRootRef}
            className={isTiltEnabled ? `${styles.imageColumn} ${styles.tiltRoot}` : styles.imageColumn}
            onClick={openImagesModal}
            onKeyDown={(e) => e.key === 'Enter' && openImagesModal()}
            role="button"
            tabIndex={0}
            aria-label={`View all images for ${company}`}
          >
            <img
              ref={isTiltEnabled ? tiltRef : undefined}
              className={isTiltEnabled ? `${styles.image} ${styles.tiltPlane}` : styles.image}
              src={img.src}
              alt={alt}
              title={alt}
              loading="lazy"
            />
          </div>
        )
      })()}
    </article>
  )
}
