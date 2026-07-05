import { useCallback, useContext } from 'react'
import { ModalContext } from '@/context/ModalContext'
import { MetaColumn } from '@/components/MetaColumn'
import { Kbd } from '@/components/Kbd'
import { ProjectHoverTooltip } from '@/components/ProjectHoverTooltip'
import { useCursorTilt } from '@/hooks/useCursorTilt'
import { useSpringFollow } from '@/hooks/useSpringFollow'
import { useSettings } from '@/settings/SettingsContext'
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
  const { settings } = useSettings()
  const hasImages = images && images.length > 0
  const { enabled: isTiltEnabled, tiltRef, perspectiveRootRef } = useCursorTilt()
  const { displayPos, setTarget } = useSpringFollow()

  const openImagesModal = useCallback(() => {
    if (!hasImages) return
    modal?.openModal(<JobImagesModalContent jobId={jobId} />)
  }, [jobId, hasImages, modal])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTarget(e.clientX - rect.left, e.clientY - rect.top)
  }

  // showImages mode: all images stacked, no description
  if (settings.showImages && hasImages) {
    return (
      <article className={styles.root}>
        <MetaColumn items={[
          { label: date, numeric: true },
          { label: company },
          { label: jobTitle },
        ]} />
        <div className={styles.allImagesColumn}>
          {images!.map((img) => {
            const alt = JOB_IMAGE_CAPTIONS[img.src] ?? img.caption ?? getCaptionFromPath(img.src)
            return (
              <figure key={img.src} className={styles.allImagesFigure}>
                <img src={img.src} alt={alt} loading="lazy" />
              </figure>
            )
          })}
        </div>
      </article>
    )
  }

  const firstImg = hasImages ? images![0] : null
  const firstAlt = firstImg
    ? JOB_IMAGE_CAPTIONS[firstImg.src] ?? firstImg.caption ?? getCaptionFromPath(firstImg.src)
    : ''
  const imageCount = hasImages ? images!.length : 0

  return (
    <article className={styles.root}>
      <MetaColumn items={[
        { label: date, numeric: true },
        { label: company },
        { label: jobTitle },
      ]} />
      <p className={styles.descriptionColumn}>{description}</p>
      {firstImg && (
        <div
          ref={perspectiveRootRef}
          className={isTiltEnabled ? `${styles.imageColumn} ${styles.tiltRoot}` : styles.imageColumn}
          onClick={openImagesModal}
          onKeyDown={(e) => e.key === 'Enter' && openImagesModal()}
          onMouseMove={handleMouseMove}
          role="button"
          tabIndex={0}
          aria-label={`View all images for ${company}`}
        >
          <img
            ref={isTiltEnabled ? tiltRef : undefined}
            className={isTiltEnabled ? `${styles.image} ${styles.tiltPlane}` : styles.image}
            src={firstImg.src}
            alt={firstAlt}
            title={firstAlt}
            loading="lazy"
          />
          <ProjectHoverTooltip
            aboveTilt={isTiltEnabled}
            style={{ left: displayPos.x, top: displayPos.y }}
          >
            Gallery <Kbd>{imageCount}</Kbd>
          </ProjectHoverTooltip>
        </div>
      )}
    </article>
  )
}
