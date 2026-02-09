import { useEffect, useRef, useState } from 'react'

const MEASURE_FONT_SIZE = 100

/**
 * Measures a hidden element at a fixed font size, then computes a font size
 * so that the same text would fill the wrapper width. Use with a wrapper ref
 * and a measure span that contains the text to scale to.
 */
export function useFontSizeToFillWidth() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const [fontSize, setFontSize] = useState<number | null>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const measureEl = measureRef.current
    if (!wrapper || !measureEl) return

    const updateFontSize = () => {
      const targetWidth = wrapper.offsetWidth
      measureEl.style.fontSize = `${MEASURE_FONT_SIZE}px`
      void measureEl.offsetWidth // force reflow
      const measuredWidth = measureEl.offsetWidth
      measureEl.style.fontSize = ''
      if (measuredWidth > 0) {
        const newSize = (MEASURE_FONT_SIZE * targetWidth) / measuredWidth
        setFontSize(newSize)
      }
    }

    updateFontSize()

    const resizeObserver = new ResizeObserver(updateFontSize)
    resizeObserver.observe(wrapper)

    return () => resizeObserver.disconnect()
  }, [])

  return { wrapperRef, measureRef, fontSize }
}
