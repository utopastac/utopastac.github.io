import { useEffect, useRef } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const DESKTOP_TILT_MEDIA = '(min-width: 640px) and (hover: hover) and (pointer: fine)'
const MAX_TILT_DEG = 11
const LERP_FACTOR = 0.07
const DEADZONE = 0.015

type CursorTiltOptions = {
  /** Override desktop detection (e.g. for tests). */
  enabled?: boolean
}

function applyDeadzone(value: number): number {
  return Math.abs(value) < DEADZONE ? 0 : value
}

function clampUnit(value: number): number {
  return Math.max(-1, Math.min(1, value))
}

export function useCursorTilt({ enabled: enabledOverride }: CursorTiltOptions = {}) {
  const isDesktopPointer = useMediaQuery(DESKTOP_TILT_MEDIA)
  const enabled = enabledOverride ?? isDesktopPointer
  const tiltRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const resetTilt = () => {
      targetRef.current = { x: 0, y: 0 }
      currentRef.current = { x: 0, y: 0 }
      const node = tiltRef.current
      if (node) {
        node.style.setProperty('--hero-tilt-x', '0deg')
        node.style.setProperty('--hero-tilt-y', '0deg')
      }
    }

    if (!enabled) {
      resetTilt()
      return
    }

    const animate = () => {
      const target = targetRef.current
      const current = currentRef.current

      current.x += (target.x - current.x) * LERP_FACTOR
      current.y += (target.y - current.y) * LERP_FACTOR

      if (Math.abs(target.x) < 0.001 && Math.abs(current.x) < 0.001) current.x = 0
      if (Math.abs(target.y) < 0.001 && Math.abs(current.y) < 0.001) current.y = 0

      const node = tiltRef.current
      if (node) {
        const rotateY = current.x * MAX_TILT_DEG
        const rotateX = -current.y * MAX_TILT_DEG
        node.style.setProperty('--hero-tilt-x', `${rotateY.toFixed(2)}deg`)
        node.style.setProperty('--hero-tilt-y', `${rotateX.toFixed(2)}deg`)
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    const handleMouseMove = (event: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      targetRef.current = {
        x: applyDeadzone(clampUnit((event.clientX - centerX) / centerX)),
        y: applyDeadzone(clampUnit((event.clientY - centerY) / centerY)),
      }
    }

    const handleMouseLeave = () => {
      targetRef.current = { x: 0, y: 0 }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      resetTilt()
    }
  }, [enabled])

  return { enabled, tiltRef }
}
