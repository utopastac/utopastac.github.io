import { useContext, useEffect, useRef } from 'react'
import { DESKTOP_TILT_MEDIA } from '@/constants/breakpoints'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { SettingsContext } from '@/settings/SettingsContext'

export { DESKTOP_TILT_MEDIA }
const MAX_TILT_DEG = 11
const LERP_FACTOR = 0.07
const DEADZONE = 0.015

/** Default cursor influence radius for distance-based tilt falloff (viewport px). */
export const DEFAULT_MAX_INFLUENCE_RADIUS = 700

type CursorTiltOptions = {
  /** Override desktop detection (e.g. for tests). */
  enabled?: boolean
  /** Maximum tilt angle in degrees. Defaults to 11. */
  maxTiltDeg?: number
  /** Interpolation speed toward cursor target. Defaults to 0.07. */
  lerpFactor?: number
  /**
   * When set, tilt strength falls off with distance from the cursor.
   * Full response at the cursor; approaches zero at this radius (viewport px).
   */
  maxInfluenceRadius?: number
}

type TiltLayer = {
  node: HTMLDivElement
  maxTiltDeg: number
  lerpFactor: number
  maxInfluenceRadius?: number
  current: { x: number; y: number }
}

type PerspectiveRoot = {
  node: HTMLDivElement
  currentX: number
  currentY: number
}

let sharedTarget = { x: 0, y: 0 }
let sharedMouse = { x: 0, y: 0 }
const layers = new Set<TiltLayer>()
const perspectiveRoots = new Set<PerspectiveRoot>()
let rafId = 0
let activeHookCount = 0

function applyDeadzone(value: number): number {
  return Math.abs(value) < DEADZONE ? 0 : value
}

function clampUnit(value: number): number {
  return Math.max(-1, Math.min(1, value))
}

/** Smooth quadratic falloff: 1 at cursor, 0 at maxRadius. */
function computeDistanceAttenuation(distance: number, maxRadius: number): number {
  const t = Math.min(1, distance / maxRadius)
  return 1 - t * t
}

function resetLayer(layer: TiltLayer) {
  layer.current = { x: 0, y: 0 }
  layer.node.style.setProperty('--hero-tilt-x', '0deg')
  layer.node.style.setProperty('--hero-tilt-y', '0deg')
}

function computePerCellTarget(layer: TiltLayer): { x: number; y: number } {
  const maxRadius = layer.maxInfluenceRadius!
  const rect = layer.node.getBoundingClientRect()
  const centerX = rect.left + rect.width * 0.5
  const centerY = rect.top + rect.height * 0.5
  const dx = sharedMouse.x - centerX
  const dy = sharedMouse.y - centerY
  const distance = Math.hypot(dx, dy)
  const attenuation = computeDistanceAttenuation(distance, maxRadius)
  // Direction from cursor offset vs this cell; strength from distance falloff only.
  return {
    x: applyDeadzone(clampUnit(dx / maxRadius)) * attenuation,
    y: applyDeadzone(clampUnit(dy / maxRadius)) * attenuation,
  }
}

function animate() {
  for (const layer of layers) {
    const current = layer.current
    // Viewport-centered target suits a single hero layer. Grids pass maxInfluenceRadius:
    // scaling sharedTarget by cell distance was wrong — viewport target ≈ 0 near screen
    // center while center cells need strong tilt when the cursor is over them.
    const { x: targetX, y: targetY } =
      layer.maxInfluenceRadius !== undefined
        ? computePerCellTarget(layer)
        : { x: sharedTarget.x, y: sharedTarget.y }

    current.x += (targetX - current.x) * layer.lerpFactor
    current.y += (targetY - current.y) * layer.lerpFactor

    if (Math.abs(sharedTarget.x) < 0.001 && Math.abs(current.x) < 0.001) current.x = 0
    if (Math.abs(sharedTarget.y) < 0.001 && Math.abs(current.y) < 0.001) current.y = 0

    const rotateY = current.x * layer.maxTiltDeg
    const rotateX = -current.y * layer.maxTiltDeg
    layer.node.style.setProperty('--hero-tilt-x', `${rotateY.toFixed(2)}deg`)
    layer.node.style.setProperty('--hero-tilt-y', `${rotateX.toFixed(2)}deg`)
  }

  for (const root of perspectiveRoots) {
    const rect = root.node.getBoundingClientRect()
    const targetX = rect.width > 0 ? (sharedMouse.x - rect.left) / rect.width : 0.5
    const targetY = rect.height > 0 ? (sharedMouse.y - rect.top) / rect.height : 0.5
    root.currentX += (targetX - root.currentX) * LERP_FACTOR
    root.currentY += (targetY - root.currentY) * LERP_FACTOR
    root.node.style.setProperty('--tilt-perspective-x', `${(root.currentX * 100).toFixed(1)}%`)
    root.node.style.setProperty('--tilt-perspective-y', `${(root.currentY * 100).toFixed(1)}%`)
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
  sharedMouse = { x: event.clientX, y: event.clientY }
  sharedTarget = {
    x: applyDeadzone(clampUnit((event.clientX - centerX) / centerX)),
    y: applyDeadzone(clampUnit((event.clientY - centerY) / centerY)),
  }
}

function handleMouseLeave() {
  sharedTarget = { x: 0, y: 0 }
  sharedMouse = { x: 0, y: 0 }
  for (const root of perspectiveRoots) {
    root.currentX = 0.5
    root.currentY = 0.5
    root.node.style.setProperty('--tilt-perspective-x', '50%')
    root.node.style.setProperty('--tilt-perspective-y', '50%')
  }
}

function attachGlobalListeners() {
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  document.documentElement.addEventListener('mouseleave', handleMouseLeave)
}

function detachGlobalListeners() {
  window.removeEventListener('mousemove', handleMouseMove)
  document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
  sharedTarget = { x: 0, y: 0 }
  sharedMouse = { x: 0, y: 0 }
}

export function useCursorTilt({
  enabled: enabledOverride,
  maxTiltDeg = MAX_TILT_DEG,
  lerpFactor = LERP_FACTOR,
  maxInfluenceRadius,
}: CursorTiltOptions = {}) {
  const isDesktopPointer = useMediaQuery(DESKTOP_TILT_MEDIA)
  const settingsCtx = useContext(SettingsContext)
  const intensity = settingsCtx?.settings.animationIntensity ?? 100
  const enabled = intensity > 0 && (enabledOverride ?? isDesktopPointer)
  const tiltRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<TiltLayer | null>(null)
  const perspectiveRootRef = useRef<HTMLDivElement>(null)
  const perspRootRef = useRef<PerspectiveRoot | null>(null)

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
      maxTiltDeg: maxTiltDeg * (intensity / 100),
      lerpFactor,
      maxInfluenceRadius,
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
  }, [enabled, maxTiltDeg, lerpFactor, maxInfluenceRadius])

  // Live-update the layer's maxTiltDeg as the slider moves without re-registering
  useEffect(() => {
    if (layerRef.current) {
      layerRef.current.maxTiltDeg = maxTiltDeg * (intensity / 100)
    }
  }, [intensity, maxTiltDeg])

  useEffect(() => {
    const node = perspectiveRootRef.current
    if (!enabled || !node) {
      if (perspRootRef.current) {
        perspRootRef.current.node.style.setProperty('--tilt-perspective-x', '50%')
        perspRootRef.current.node.style.setProperty('--tilt-perspective-y', '50%')
        perspectiveRoots.delete(perspRootRef.current)
        perspRootRef.current = null
      }
      return
    }

    const perspRoot: PerspectiveRoot = { node, currentX: 0.5, currentY: 0.5 }
    perspRootRef.current = perspRoot
    perspectiveRoots.add(perspRoot)

    return () => {
      if (perspRootRef.current) {
        perspRootRef.current.node.style.setProperty('--tilt-perspective-x', '50%')
        perspRootRef.current.node.style.setProperty('--tilt-perspective-y', '50%')
        perspectiveRoots.delete(perspRootRef.current)
        perspRootRef.current = null
      }
    }
  }, [enabled])

  return { enabled, tiltRef, perspectiveRootRef }
}
