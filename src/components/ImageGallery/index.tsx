import { JOBS, getCaptionFromPath } from '@/data/jobs'
import { JOB_IMAGE_CAPTIONS } from '@/data/job-image-captions.generated'
import { SECTIONS } from '@/data/sections'
import { MetaColumn } from '@/components/MetaColumn'
import styles from './index.module.css'

export function ImageGallery() {
  return (
    <div className={styles.root}>
      {JOBS.filter((job) => job.images?.length).map((job) => {
        const sectionIdx = SECTIONS.findIndex((s) => s.jobId === job.id)
        const indexLabel = sectionIdx >= 0 ? String(sectionIdx).padStart(2, '0') : ''

        return (
          <article key={job.id} id={job.id} className={styles.row}>
            <span className={styles.index} aria-hidden>{indexLabel}</span>
            <MetaColumn items={[
              { label: job.date, numeric: true },
              { label: job.company },
              { label: job.jobTitle },
            ]} />
            <div className={styles.images}>
              {job.images!.map((img) => {
                const alt = JOB_IMAGE_CAPTIONS[img.src] ?? img.caption ?? getCaptionFromPath(img.src)
                return (
                  <figure key={img.src} className={styles.figure}>
                    <img src={img.src} alt={alt} className={styles.image} loading="lazy" />
                  </figure>
                )
              })}
            </div>
          </article>
        )
      })}
    </div>
  )
}
