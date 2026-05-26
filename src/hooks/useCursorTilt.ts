import { useEffect, useRef } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const DESKTOP_TILT_MEDIA = '(min-width: 640px) and (hover: hover) and (pointer: fine)'
const MAX_TILT_DEG = 11
const LERP_FACTOR = 0.07
const DEADZONE = 0.015

type CursorTiltOptions = {
  /** Override desktop detection (e.g. for tests). */
  enabled?: boolean
  /** Maximum tilt angle in degrees. Defaults to 11. */
  maxTiltDeg?: number
}

type TiltLayer = {
  node: HTMLDivElement
  maxTiltDeg: number
  current: { x: number; y: number }
}

let sharedTarget = { x: 0, y: 0 }
const layers = new Set<TiltLayer>()
let rafId = 0
let activeHookCount = 0

function applyDeadzone(value: number): number {
  return Math.abs(value) < DEADZONE ? 0 : value
}

function clampUnit(value: number): number {
  return Math.max(-1, Math.min(1, value))
}

function resetLayer(layer: TiltLayer) {
  layer.current = { x: 0, y: 0 }
  layer.node.style.setProperty('--hero-tilt-x', '0deg')
  layer.node.style.setProperty('--hero-tilt-y', '0deg')
}

function animate() {
  for (const layer of layers) {
    const current = layer.current

    current.x += (sharedTarget.x - current.x) * LERP_FACTOR
    current.y += (sharedTarget.y - current.y) * LERP_FACTOR

    if (Math.abs(sharedTarget.x) < 0.001 && Math.abs(current.x) < 0.001) current.x = 0
    if (Math.abs(sharedTarget.y) < 0.001 && Math.abs(current.y) < 0.001) current.y = 0

    const rotateY = current.x * layer.maxTiltDeg
    const rotateX = -current.y * layer.maxTiltDeg
    layer.node.style.setProperty('--hero-tilt-x', `${rotateY.toFixed(2)}deg`)
    layer.node.style.setProperty('--hero-tilt-y', `${rotateX.toFixed(2)}deg`)
  }

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

function handleMouseMove(event: MouseEvent) {
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2
  sharedTarget = {
    x: applyDeadzone(clampUnit((event.clientX - centerX) / centerX)),
    y: applyDeadzone(clampUnit((event.clientY - centerY) / centerY)),
  }
}

function handleMouseLeave() {
  sharedTarget = { x: 0, y: 0 }
}

function attachGlobalListeners() {
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  document.documentElement.addEventListener('mouseleave', handleMouseLeave)
}

function detachGlobalListeners() {
  window.removeEventListener('mousemove', handleMouseMove)
  document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
  sharedTarget = { x: 0, y: 0 }
}

export function useCursorTilt({
  enabled: enabledOverride,
  maxTiltDeg = MAX_TILT_DEG,
}: CursorTiltOptions = {}) {
  const isDesktopPointer = useMediaQuery(DESKTOP_TILT_MEDIA)
  const enabled = enabledOverride ?? isDesktopPointer
  const tiltRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<TiltLayer | null>(null)

  useEffect(() => {
    const node = tiltRef.current

    if (!enabled || !node) {
      if (layerRef.current) {
        resetLayer(layerRef.current)
        layers.delete(layerRef.current)
        layerRef.current = null
      }
      return
    }

    const layer: TiltLayer = {
      node,
      maxTiltDeg,
      current: { x: 0, y: 0 },
    }
    layerRef.current = layer
    layers.add(layer)

    if (activeHookCount === 0) {
      attachGlobalListeners()
      startAnimation()
    }
    activeHookCount++

    return () => {
      if (layerRef.current) {
        resetLayer(layerRef.current)
        layers.delete(layerRef.current)
        layerRef.current = null
      }

      activeHookCount = Math.max(0, activeHookCount - 1)
      if (activeHookCount === 0) {
        detachGlobalListeners()
        stopAnimation()
      }
    }
  }, [enabled, maxTiltDeg])

  return { enabled, tiltRef }
}
