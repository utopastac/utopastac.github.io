import { Monitor, Moon, Sun } from 'lucide-react'
import type { ColorScheme } from '@/settings/SettingsContext'
import { CornerIconButton } from '@/components/CornerIconButton'
import { Kbd } from '@/components/Kbd'

const COLOR_SCHEME_ORDER: readonly ColorScheme[] = ['system', 'light', 'dark']

const COLOR_SCHEME_LABELS: Record<ColorScheme, string> = {
  system: 'system',
  light: 'light',
  dark: 'dark',
}

type ThemeControlProps = {
  colorScheme: ColorScheme
  onChange: (colorScheme: ColorScheme) => void
}

export function nextColorScheme(current: ColorScheme): ColorScheme {
  const index = COLOR_SCHEME_ORDER.indexOf(current)
  return COLOR_SCHEME_ORDER[(index + 1) % COLOR_SCHEME_ORDER.length]
}

function ThemeIcon({ colorScheme }: { colorScheme: ColorScheme }) {
  if (colorScheme === 'light') return <Sun aria-hidden size={14} />
  if (colorScheme === 'dark') return <Moon aria-hidden size={14} />
  return <Monitor aria-hidden size={14} />
}

export function ThemeControl({ colorScheme, onChange }: ThemeControlProps) {
  const label = COLOR_SCHEME_LABELS[colorScheme]

  return (
    <CornerIconButton
      label={<>{label} <Kbd>⌘</Kbd><Kbd>⇧</Kbd><Kbd>D</Kbd></>}
      active={colorScheme !== 'system'}
      onClick={() => onChange(nextColorScheme(colorScheme))}
      aria-label={`${label}. Click to change theme.`}
    >
      <ThemeIcon colorScheme={colorScheme} />
    </CornerIconButton>
  )
}
