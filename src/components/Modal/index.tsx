import { useContext } from 'react'
import { createPortal } from 'react-dom'
import { ModalContext } from '@/context/ModalContext'
import styles from './index.module.css'

/**
 * Renders the current modal content (from ModalContext) in a portal.
 * Place once in the app tree (e.g. in App); when openModal(content) is called,
 * content is shown in an overlay with backdrop, scrollable body, and close on overlay/escape.
 */
export function Modal() {
  const ctx = useContext(ModalContext)
  const content = ctx?.content ?? null
  const isClosing = ctx?.isClosing ?? false

  if (!content && !isClosing) return null

  const node = (
    <div
      className={`${styles.backdrop} ${isClosing ? styles.closing : ''}`}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.panel}>
        <div className={styles.closeButtonFade} aria-hidden />
        <div className={styles.body}>{content}</div>
        <button
          type="button"
          className={styles.closeButton}
          onClick={(e) => {
            e.stopPropagation()
            ctx?.closeModal()
          }}
          aria-label="Close"
        >
          close
        </button>
      </div>
    </div>
  )

  return createPortal(node, document.body)
}
