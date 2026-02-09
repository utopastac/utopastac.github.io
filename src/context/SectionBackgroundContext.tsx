import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

type SectionInfo = { id: string; color: string; navPanelBackgroundColor?: string }

type SectionBackgroundContextValue = {
  backgroundColor: string
  navPanelBackgroundColor: string | null
  activeSectionId: string | null
  registerSection: (id: string, color: string, node: HTMLElement, navPanelBackgroundColor?: string) => void
  unregisterSection: (id: string) => void
  /** Call when navigating to a section (e.g. nav click) so that section stays active until scroll settles. */
  navigateToSection: (id: string, color?: string, navPanelBackgroundColor?: string) => void
}

export const SectionBackgroundContext = createContext<SectionBackgroundContextValue | null>(null)

const observerOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: [0, 0.25, 0.5, 0.75, 1],
}

export function SectionBackgroundProvider({ children }: { children: ReactNode }) {
  const [backgroundColor, setBackgroundColor] = useState<string>('var(--color-bg)')
  const [navPanelBackgroundColor, setNavPanelBackgroundColor] = useState<string | null>(null)
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)
  const sectionMapRef = useRef<Map<HTMLElement, SectionInfo>>(new Map())
  const ratioMapRef = useRef<Map<string, number>>(new Map())
  const pinnedSectionIdRef = useRef<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const registerSection = useCallback((id: string, color: string, node: HTMLElement, navPanelBackgroundColor?: string) => {
    sectionMapRef.current.set(node, { id, color, navPanelBackgroundColor })
    ratioMapRef.current.set(id, 0)
    observerRef.current?.observe(node)
  }, [])

  const unregisterSection = useCallback((id: string) => {
    for (const [node, info] of sectionMapRef.current) {
      if (info.id === id) {
        observerRef.current?.unobserve(node)
        sectionMapRef.current.delete(node)
        ratioMapRef.current.delete(id)
        if (pinnedSectionIdRef.current === id) pinnedSectionIdRef.current = null
        break
      }
    }
  }, [])

  const navigateToSection = useCallback((id: string, color?: string, navPanelBg?: string) => {
    for (const info of sectionMapRef.current.values()) {
      if (info.id === id) {
        pinnedSectionIdRef.current = id
        setBackgroundColor(info.color)
        setNavPanelBackgroundColor(info.navPanelBackgroundColor ?? null)
        setActiveSectionId(id)
        return
      }
    }
    pinnedSectionIdRef.current = id
    if (color) setBackgroundColor(color)
    if (navPanelBg) setNavPanelBackgroundColor(navPanelBg)
    else setNavPanelBackgroundColor(null)
    setActiveSectionId(id)
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      const sectionMap = sectionMapRef.current
      const ratioMap = ratioMapRef.current
      const pinnedId = pinnedSectionIdRef.current
      for (const entry of entries) {
        const info = sectionMap.get(entry.target as HTMLElement)
        if (info) {
          const ratio = entry.isIntersecting ? entry.intersectionRatio : 0
          ratioMap.set(info.id, ratio)
        }
      }
      if (pinnedId !== null) {
        const pinnedRatio = ratioMap.get(pinnedId) ?? 0
        if (pinnedRatio >= 0.99) {
          pinnedSectionIdRef.current = null
        } else {
          return
        }
      }
      let maxRatio = 0
      let best: SectionInfo | null = null
      for (const [node, info] of sectionMap) {
        const r = ratioMap.get(info.id) ?? 0
        if (r > maxRatio) {
          maxRatio = r
          best = info
        }
      }
      if (best) {
        setBackgroundColor(best.color)
        setNavPanelBackgroundColor(best.navPanelBackgroundColor ?? null)
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
    navPanelBackgroundColor,
    activeSectionId,
    registerSection,
    unregisterSection,
    navigateToSection,
  }

  return (
    <SectionBackgroundContext.Provider value={value}>
      {children}
    </SectionBackgroundContext.Provider>
  )
}
