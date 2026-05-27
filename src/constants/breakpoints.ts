/** Keep pixel values in sync with `src/styles/breakpoints.css`. */
export const BREAKPOINT_MOBILE_MAX_PX = 639 as const
export const BREAKPOINT_DESKTOP_MIN_PX = 640 as const

export const BREAKPOINT_MOBILE_MEDIA = `(max-width: ${BREAKPOINT_MOBILE_MAX_PX}px)` as const
export const BREAKPOINT_DESKTOP_MEDIA = `(min-width: ${BREAKPOINT_DESKTOP_MIN_PX}px)` as const

export const DESKTOP_TILT_MEDIA =
  `${BREAKPOINT_DESKTOP_MEDIA} and (hover: hover) and (pointer: fine)` as const
