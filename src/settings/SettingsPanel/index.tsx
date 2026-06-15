import { useContext, useEffect, useRef } from 'react'
import { useSettings } from '@/settings/SettingsContext'
import { SettingsSection } from '@/settings/SettingsSection'
import { SettingsRow } from '@/settings/SettingsRow'
import { SettingsToggle } from '@/settings/controls/SettingsToggle'
import { SettingsScrubber } from '@/settings/controls/SettingsScrubber'
import { SectionBackgroundContext } from '@/context/SectionBackgroundContext'
import styles from './index.module.css'

type SettingsPanelProps = {
  isOpen: boolean
  onClose: () => void
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { settings, update } = useSettings()
  const panelRef = useRef<HTMLDivElement>(null)
  const ctx = useContext(SectionBackgroundContext)
  const backgroundColor = ctx?.backgroundColor ?? 'var(--color-bg)'
  const navPanelBackgroundColor = ctx?.navPanelBackgroundColor ?? null

  useEffect(() => {
    if (!isOpen) return

    const prevFocused = document.activeElement as HTMLElement | null

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    const handlePointerDown = (e: PointerEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
      prevFocused?.focus()
    }
  }, [isOpen, onClose])

  return (
    <div
      className={styles.root}
      data-open={isOpen}
      aria-hidden={!isOpen}
    >
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-label="Settings"
        aria-modal="true"
        style={{
          ['--panel-bg' as string]: backgroundColor,
        }}
      >
        <div className={styles.content}>
          <SettingsSection>
            <SettingsRow label="Reduce motion" htmlFor="setting-reduce-motion">
              <SettingsToggle
                id="setting-reduce-motion"
                checked={settings.reduceMotion}
                onChange={(v) => update('reduceMotion', v)}
              />
            </SettingsRow>
          </SettingsSection>

          <SettingsSection>
            <SettingsRow label="Perspective">
              <SettingsScrubber
                value={settings.tiltPerspective}
                onChange={(v) => update('tiltPerspective', v)}
                min={50}
                max={2000}
                step={10}
                unit="px"
              />
            </SettingsRow>
            <SettingsRow label="Foreground Z">
              <SettingsScrubber
                value={settings.tiltForegroundZ}
                onChange={(v) => update('tiltForegroundZ', v)}
                min={0}
                max={200}
                step={1}
                unit="px"
              />
            </SettingsRow>
            <SettingsRow label="Background Z">
              <SettingsScrubber
                value={settings.tiltBackgroundZ}
                onChange={(v) => update('tiltBackgroundZ', v)}
                min={-200}
                max={0}
                step={1}
                unit="px"
              />
            </SettingsRow>
            <SettingsRow label="Max tilt angle">
              <SettingsScrubber
                value={settings.tiltMaxDeg}
                onChange={(v) => update('tiltMaxDeg', v)}
                min={1}
                max={45}
                step={1}
                unit="°"
              />
            </SettingsRow>
            <SettingsRow label="Lerp factor">
              <SettingsScrubber
                value={settings.tiltLerpFactor}
                onChange={(v) => update('tiltLerpFactor', v)}
                min={0.01}
                max={1}
                step={0.01}
                unit=""
              />
            </SettingsRow>
          </SettingsSection>

        </div>
      </div>
    </div>
  )
}
