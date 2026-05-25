type ScrollTarget = HTMLElement | Window

type AnimateScrollToOptions = {
  duration?: number
  ease?: (t: number) => number
}

/** Base scroll animation duration for one viewport height (one section). */
export const SCROLL_DURATION_MS_PER_SCREEN = 450

/** Minimum duration for very short scroll distances. */
export const SCROLL_DURATION_MS_MIN = 280

/** Maximum duration so long multi-section jumps stay snappy. */
export const SCROLL_DURATION_MS_MAX = 1200

/** GSAP Power2 easeInOut equivalent */
export function easePower2InOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

function getScrollY(target: ScrollTarget): number {
  return target === window ? window.scrollY : target.scrollTop
}

function setScrollY(target: ScrollTarget, y: number): void {
  if (target === window) {
    window.scrollTo(0, y)
  } else {
    target.scrollTop = y
  }
}

function getScrollParent(element: HTMLElement): ScrollTarget {
  let node: HTMLElement | null = element.parentElement
  while (node) {
    const { overflowY } = getComputedStyle(node)
    if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') {
      return node
    }
    node = node.parentElement
  }
  return window
}

export function getScrollViewportHeight(target: ScrollTarget): number {
  return target === window ? window.innerHeight : target.clientHeight
}

export function getScrollTopForElement(target: ScrollTarget, element: HTMLElement): number {
  if (target === window) {
    return window.scrollY + element.getBoundingClientRect().top
  }
  const containerRect = target.getBoundingClientRect()
  const elementRect = element.getBoundingClientRect()
  return target.scrollTop + (elementRect.top - containerRect.top)
}

export function getScrollDurationForDistance(
  distancePx: number,
  viewportHeight: number,
  durationPerScreen = SCROLL_DURATION_MS_PER_SCREEN,
): number {
  if (viewportHeight <= 0) return durationPerScreen
  const screens = distancePx / viewportHeight
  const scaled = durationPerScreen * Math.sqrt(screens)
  return Math.round(
    Math.min(SCROLL_DURATION_MS_MAX, Math.max(SCROLL_DURATION_MS_MIN, scaled)),
  )
}

export function animateScrollToElement(
  target: ScrollTarget,
  element: HTMLElement,
  {
    duration,
    durationPerScreen = SCROLL_DURATION_MS_PER_SCREEN,
    ease = easePower2InOut,
  }: AnimateScrollToOptions & { durationPerScreen?: number } = {},
): () => void {
  const fromY = getScrollY(target)
  const toY = getScrollTopForElement(target, element)
  const distance = Math.abs(toY - fromY)
  const viewportHeight = getScrollViewportHeight(target)
  const resolvedDuration =
    duration ?? getScrollDurationForDistance(distance, viewportHeight, durationPerScreen)
  return animateScrollTo(target, toY, { duration: resolvedDuration, ease })
}

export function scrollToSectionElement(
  element: HTMLElement,
  scrollContainer?: HTMLElement | null,
): () => void {
  const target = scrollContainer ?? getScrollParent(element)
  return animateScrollToElement(target, element)
}

export function animateScrollTo(
  target: ScrollTarget,
  toY: number,
  { duration = SCROLL_DURATION_MS_PER_SCREEN, ease = easePower2InOut }: AnimateScrollToOptions = {},
): () => void {
  const fromY = getScrollY(target)
  const startTime = performance.now()
  let rafId = 0

  const cancel = () => {
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = 0
    }
  }

  const tick = (now: number) => {
    const t = Math.min((now - startTime) / duration, 1)
    setScrollY(target, fromY + (toY - fromY) * ease(t))
    if (t < 1) {
      rafId = requestAnimationFrame(tick)
    } else {
      rafId = 0
    }
  }

  rafId = requestAnimationFrame(tick)
  return cancel
}
