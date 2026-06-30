import { createContext, useCallback, useContext, useEffect, useState } from 'react'

export type Settings = {
  animationIntensity: number // 0–100
  showGrid: boolean
}

const TILT_DEFAULTS = {
  perspective: 1000,
  foregroundZ: 30,
  backgroundZ: -30,
}

const DEFAULT_SETTINGS: Settings = {
  animationIntensity: 0,
  showGrid: false,
}

const STORAGE_KEY = 'portfolio-settings'

function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return DEFAULT_SETTINGS
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(stored) as Partial<Settings>) }
  } catch {
    return DEFAULT_SETTINGS
  }
}

type SettingsContextValue = {
  settings: Settings
  update: <K extends keyof Settings>(key: K, value: Settings[K]) => void
  reset: () => void
}

export const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(loadSettings)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      // localStorage unavailable
    }
  }, [settings])

  useEffect(() => {
    const t = settings.animationIntensity / 100
    const html = document.documentElement
    html.dataset.reduceMotion = String(settings.animationIntensity === 0)
    html.style.setProperty('--tilt-perspective', `${TILT_DEFAULTS.perspective}px`)
    html.style.setProperty('--tilt-foreground-z', `${TILT_DEFAULTS.foregroundZ * t}px`)
    html.style.setProperty('--tilt-background-z', `${TILT_DEFAULTS.backgroundZ * t}px`)
  }, [settings])

  const update = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }, [])

  const reset = useCallback(() => {
    setSettings(DEFAULT_SETTINGS)
  }, [])

  return (
    <SettingsContext value={{ settings, update, reset }}>
      {children}
    </SettingsContext>
  )
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider')
  return ctx
}
