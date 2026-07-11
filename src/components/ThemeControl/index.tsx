import { useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'
import type { ColorScheme } from '@/settings/SettingsContext'
import { CornerIconButton } from '@/components/CornerIconButton'
import { Kbd } from '@/components/Kbd'

type ResolvedColorScheme = 'light' | 'dark'

function subscribeToSystemScheme(onChange: () => void) {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

function getSystemScheme(): ResolvedColorScheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function useSystemColorScheme(): ResolvedColorScheme {
  return useSyncExternalStore(subscribeToSystemScheme, getSystemScheme, () => 'light')
}

export function resolveColorScheme(colorScheme: ColorScheme, systemScheme: ResolvedColorScheme): ResolvedColorScheme {
  if (colorScheme === 'light' || colorScheme === 'dark') return colorScheme
  return systemScheme
}

export function isSystemColorScheme(colorScheme: ColorScheme, systemScheme: ResolvedColorScheme): boolean {
  if (colorScheme === 'system') return true
  return colorScheme === systemScheme
}

export function nextColorScheme(
  current: ColorScheme,
  systemScheme: ResolvedColorScheme,
): ColorScheme {
  const resolved = resolveColorScheme(current, systemScheme)
  return resolved === 'dark' ? 'light' : 'dark'
}

function getThemeLabel(colorScheme: ColorScheme, systemScheme: ResolvedColorScheme): string {
  const resolved = resolveColorScheme(colorScheme, systemScheme)
  const label = resolved === 'dark' ? 'Dark' : 'Light'
  return isSystemColorScheme(colorScheme, systemScheme) ? `${label} (system)` : label
}

export function toggleColorScheme(current: ColorScheme): ColorScheme {
  return nextColorScheme(current, getSystemScheme())
}

type ThemeControlProps = {
  colorScheme: ColorScheme
  onChange: (colorScheme: ColorScheme) => void
}

function ThemeIcon({ resolvedScheme }: { resolvedScheme: ResolvedColorScheme }) {
  if (resolvedScheme === 'light') return <Sun aria-hidden size={14} />
  return <Moon aria-hidden size={14} />
}

export function ThemeControl({ colorScheme, onChange }: ThemeControlProps) {
  const systemScheme = useSystemColorScheme()
  const resolvedScheme = resolveColorScheme(colorScheme, systemScheme)
  const label = getThemeLabel(colorScheme, systemScheme)
  const isExplicitOverride = colorScheme !== 'system' && !isSystemColorScheme(colorScheme, systemScheme)

  return (
    <CornerIconButton
      label={<>{label} <Kbd>⌘</Kbd><Kbd>⇧</Kbd><Kbd>D</Kbd></>}
      active={isExplicitOverride}
      onClick={() => onChange(nextColorScheme(colorScheme, systemScheme))}
      aria-label={`${label}. Click to change theme.`}
    >
      <ThemeIcon resolvedScheme={resolvedScheme} />
    </CornerIconButton>
  )
}
