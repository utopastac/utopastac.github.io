import { Blend } from 'lucide-react'
import { CornerIconButton } from '@/components/CornerIconButton'
import { Kbd } from '@/components/Kbd'
import styles from './index.module.css'

type BlurControlProps = {
  intensity: number
  onToggle: () => void
  onIntensityChange: (value: number) => void
}

export function BlurControl({ intensity, onToggle, onIntensityChange }: BlurControlProps) {
  const isOn = intensity > 0
  const blurValue = (intensity / 100).toFixed(1)

  return (
    <CornerIconButton
      label={isOn
        ? <>Blur <span className={styles.value}>{blurValue}</span> <Kbd>⌘</Kbd><Kbd>/</Kbd></>
        : <>Blur <Kbd>⌘</Kbd><Kbd>/</Kbd></>
      }
      active={isOn}
      expanded={isOn ? (
        <input
          type="range"
          className={styles.slider}
          min={1}
          max={100}
          step={1}
          value={intensity}
          onChange={(e) => onIntensityChange(Number(e.target.value))}
          aria-label="Blur intensity"
        />
      ) : undefined}
      onClick={onToggle}
      aria-label={isOn ? 'Turn off blur' : 'Turn on blur'}
      aria-pressed={isOn}
    >
      <Blend aria-hidden size={14} />
    </CornerIconButton>
  )
}
