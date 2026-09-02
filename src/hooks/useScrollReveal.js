import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Observes an element and toggles visibility when it enters the viewport.
 */
export function useScrollReveal({
  once = true,
  threshold = 0.12,
  rootMargin = '0px 0px -48px 0px',
} = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const reduceMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reduceMotion) return undefined

    const element = ref.current
    if (!element) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.unobserve(element)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [once, threshold, rootMargin, reduceMotion])

  return { ref, visible: visible || reduceMotion, reduceMotion }
}
