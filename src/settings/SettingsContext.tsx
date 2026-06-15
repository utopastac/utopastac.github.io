import { createContext, useCallback, useContext, useEffect, useState } from 'react'

export type Settings = {
  reduceMotion: boolean
  tiltPerspective: number
  tiltForegroundZ: number
  tiltBackgroundZ: number
  tiltMaxDeg: number
  tiltLerpFactor: number
}

const TILT_DEFAULTS = {
  tiltPerspective: 1000,
  tiltForegroundZ: 30,
  tiltBackgroundZ: -30,
  tiltMaxDeg: 11,
  tiltLerpFactor: 0.07,
}

const DEFAULT_SETTINGS: Settings = {
  reduceMotion: false,
  ...TILT_DEFAULTS,
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
      const { tiltPerspective: _p, tiltForegroundZ: _f, tiltBackgroundZ: _b, tiltMaxDeg: _m, tiltLerpFactor: _l, ...persistable } = settings
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable))
    } catch {
      // localStorage unavailable
    }
  }, [settings])

  useEffect(() => {
    const html = document.documentElement
    html.dataset.reduceMotion = String(settings.reduceMotion)
    html.style.setProperty('--tilt-perspective', `${settings.tiltPerspective}px`)
    html.style.setProperty('--tilt-foreground-z', `${settings.tiltForegroundZ}px`)
    html.style.setProperty('--tilt-background-z', `${settings.tiltBackgroundZ}px`)
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
