import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

export type ModalContent = ReactNode

const CLOSE_ANIMATION_MS = 200

export type ModalContextValue = {
  /** Currently shown modal content, or null if closed. */
  content: ModalContent | null
  /** True while the close animation is running (modal still visible, fading out). */
  isClosing: boolean
  /** Open a modal with the given content. Replaces any open modal. */
  openModal: (content: ModalContent) => void
  /** Close the current modal (runs fade-out animation then clears content). */
  closeModal: () => void
}

export const ModalContext = createContext<ModalContextValue | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ModalContent | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  const previousActiveElement = useRef<HTMLElement | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openModal = useCallback((next: ModalContent) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    previousActiveElement.current =
      typeof document !== 'undefined' ? (document.activeElement as HTMLElement | null) : null
    setContent(next)
    setIsClosing(false)
  }, [])

  const closeModal = useCallback(() => {
    if (!content || isClosing) return
    setIsClosing(true)
    closeTimeoutRef.current = setTimeout(() => {
      closeTimeoutRef.current = null
      setContent(null)
      setIsClosing(false)
      if (previousActiveElement.current?.focus) {
        previousActiveElement.current.focus()
      }
    }, CLOSE_ANIMATION_MS)
  }, [content, isClosing])

  useEffect(() => {
    if (!content) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [content, closeModal])

  const value: ModalContextValue = {
    content,
    isClosing,
    openModal,
    closeModal,
  }

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  )
}
