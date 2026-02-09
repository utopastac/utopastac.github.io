import { useContext } from 'react'
import { ModalContext } from '@/context/ModalContext'
import { JobImagesModalContent } from './JobImagesModalContent'
import styles from './index.module.css'

type JobSectionProps = {
  date: string
  jobTitle: string
  company: string
  description: string
  /** Optional image paths for the left column (vertical stack). */
  images?: readonly string[]
}

export function JobSection({
  date,
  jobTitle,
  company,
  description,
  images,
}: JobSectionProps) {
  const modal = useContext(ModalContext)
  const hasImages = images && images.length > 0

  const openImagesModal = () => {
    if (hasImages) {
      modal?.openModal(
        <JobImagesModalContent images={images!} />
      )
    }
  }

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
              {images!.map((src, i) => (
                <img
                  key={i}
                  className={styles.image}
                  src={src}
                  alt=""
                  loading="lazy"
                />
              ))}
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
