import { useContext, useEffect } from 'react'
import { DESKTOP_TILT_MEDIA } from '@/constants/breakpoints'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { SettingsContext } from '@/settings/SettingsContext'

const LERP_FACTOR = 0.1

let sharedMouse = { x: 0, y: 0 }
let currentPos = { x: 0, y: 0 }
let rafId = 0
let activeHookCount = 0

function animate() {
  currentPos.x += (sharedMouse.x - currentPos.x) * LERP_FACTOR
  currentPos.y += (sharedMouse.y - currentPos.y) * LERP_FACTOR

  document.documentElement.style.setProperty('--cursor-blur-x', `${currentPos.x.toFixed(1)}px`)
  document.documentElement.style.setProperty('--cursor-blur-y', `${currentPos.y.toFixed(1)}px`)

  rafId = requestAnimationFrame(animate)
}

function startAnimation() {
  if (rafId === 0) {
    rafId = requestAnimationFrame(animate)
  }
}

function stopAnimation() {
  if (rafId !== 0) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }
}

function resetCursorVars() {
  document.documentElement.style.setProperty('--cursor-blur-x', '50vw')
  document.documentElement.style.setProperty('--cursor-blur-y', '50vh')
  currentPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
}

function handleMouseMove(event: MouseEvent) {
  sharedMouse = { x: event.clientX, y: event.clientY }
}

function handleMouseLeave() {
  sharedMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
}

function attachGlobalListeners() {
  sharedMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
  currentPos = { ...sharedMouse }
  resetCursorVars()
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  document.documentElement.addEventListener('mouseleave', handleMouseLeave)
}

function detachGlobalListeners() {
  window.removeEventListener('mousemove', handleMouseMove)
  document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
  resetCursorVars()
}

export function useCursorBlur() {
  const isDesktopPointer = useMediaQuery(DESKTOP_TILT_MEDIA)
  const settingsCtx = useContext(SettingsContext)
  const intensity = settingsCtx?.settings.blurIntensity ?? 0
  const enabled = intensity > 0 && isDesktopPointer

  useEffect(() => {
    if (!enabled) {
      return
    }

    if (activeHookCount === 0) {
      attachGlobalListeners()
      startAnimation()
    }
    activeHookCount++

    return () => {
      activeHookCount = Math.max(0, activeHookCount - 1)
      if (activeHookCount === 0) {
        detachGlobalListeners()
        stopAnimation()
      }
    }
  }, [enabled])

  return { enabled, intensity }
}
