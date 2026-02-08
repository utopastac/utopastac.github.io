import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

type SectionInfo = { id: string; color: string }

type SectionBackgroundContextValue = {
  backgroundColor: string
  activeSectionId: string | null
  registerSection: (id: string, color: string, node: HTMLElement) => void
  unregisterSection: (id: string) => void
}

export const SectionBackgroundContext = createContext<SectionBackgroundContextValue | null>(null)

const observerOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: [0, 0.25, 0.5, 0.75, 1],
}

export function SectionBackgroundProvider({ children }: { children: ReactNode }) {
  const [backgroundColor, setBackgroundColor] = useState<string>('var(--color-bg)')
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)
  const sectionMapRef = useRef<Map<HTMLElement, SectionInfo>>(new Map())
  const observerRef = useRef<IntersectionObserver | null>(null)

  const registerSection = useCallback((id: string, color: string, node: HTMLElement) => {
    sectionMapRef.current.set(node, { id, color })
    observerRef.current?.observe(node)
  }, [])

  const unregisterSection = useCallback((id: string) => {
    for (const [node, info] of sectionMapRef.current) {
      if (info.id === id) {
        observerRef.current?.unobserve(node)
        sectionMapRef.current.delete(node)
        break
      }
    }
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      let maxRatio = 0
      let best: SectionInfo | null = null
      for (const entry of entries) {
        const info = sectionMapRef.current.get(entry.target as HTMLElement)
        if (info && entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio
          best = info
        }
      }
      if (best) {
      setBackgroundColor(best.color)
      setActiveSectionId(best.id)
    }
    }, observerOptions)

    const map = sectionMapRef.current
    map.forEach((_, node) => observerRef.current?.observe(node))

    return () => {
      observerRef.current?.disconnect()
      observerRef.current = null
    }
  }, [])

  const value: SectionBackgroundContextValue = {
    backgroundColor,
    activeSectionId,
    registerSection,
    unregisterSection,
  }

  return (
    <SectionBackgroundContext.Provider value={value}>
      {children}
    </SectionBackgroundContext.Provider>
  )
}
