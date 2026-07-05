import { Rotate3D } from 'lucide-react'
import { CornerIconButton } from '@/components/CornerIconButton'
import { Kbd } from '@/components/Kbd'
import styles from './index.module.css'

type TiltControlProps = {
  intensity: number
  onToggle: () => void
  onIntensityChange: (value: number) => void
}

export function TiltControl({ intensity, onToggle, onIntensityChange }: TiltControlProps) {
  const isOn = intensity > 0
  const tiltValue = (intensity / 100).toFixed(1)

  return (
    <CornerIconButton
      label={isOn
        ? <>Tilt <span className={styles.value}>{tiltValue}</span> <Kbd>⌘</Kbd><Kbd>.</Kbd></>
        : <>Tilt <Kbd>⌘</Kbd><Kbd>.</Kbd></>
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
          aria-label="Tilt intensity"
        />
      ) : undefined}
      onClick={onToggle}
      aria-label={isOn ? 'Turn off tilt' : 'Turn on tilt'}
      aria-pressed={isOn}
    >
      <Rotate3D aria-hidden size={14} />
    </CornerIconButton>
  )
}
