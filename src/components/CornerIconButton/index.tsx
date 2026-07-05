import { Tooltip } from '@/components/Tooltip'
import styles from './index.module.css'

type CornerIconButtonProps = {
  label: React.ReactNode
  active?: boolean
  expanded?: React.ReactNode
  'aria-label': string
  'aria-pressed'?: boolean
  'aria-expanded'?: boolean
  'aria-controls'?: string
  onClick: () => void
  children: React.ReactNode
}

export function CornerIconButton({
  label,
  active = false,
  expanded,
  'aria-label': ariaLabel,
  'aria-pressed': ariaPressed,
  'aria-expanded': ariaExpanded,
  'aria-controls': ariaControls,
  onClick,
  children,
}: CornerIconButtonProps) {
  if (expanded) {
    return (
      <Tooltip label={label}>
        <div className={styles.compound} data-active={active}>
          {expanded}
          <button
            type="button"
            className={styles.compoundButton}
            onClick={onClick}
            aria-label={ariaLabel}
            aria-pressed={ariaPressed}
            aria-expanded={ariaExpanded}
            aria-controls={ariaControls}
          >
            {children}
          </button>
        </div>
      </Tooltip>
    )
  }

  return (
    <Tooltip label={label}>
      <button
        type="button"
        className={styles.button}
        data-active={active}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-pressed={ariaPressed}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
      >
        {children}
      </button>
    </Tooltip>
  )
}
