import { useEffect, useRef, useState } from 'react'

interface SpringOptions {
  stiffness?: number
  damping?: number
}

export function useSpringFollow({ stiffness = 0.015, damping = 0.88 }: SpringOptions = {}) {
  const [displayPos, setDisplayPos] = useState({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const velRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const animate = () => {
      const target = targetRef.current
      const current = currentRef.current
      const vel = velRef.current

      vel.x += (target.x - current.x) * stiffness
      vel.y += (target.y - current.y) * stiffness
      vel.x *= damping
      vel.y *= damping

      current.x += vel.x
      current.y += vel.y

      if (Math.abs(vel.x) > 0.01 || Math.abs(vel.y) > 0.01) {
        setDisplayPos({ x: current.x, y: current.y })
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [stiffness, damping])

  const setTarget = (x: number, y: number) => {
    targetRef.current = { x, y }
  }

  return { displayPos, setTarget }
}
