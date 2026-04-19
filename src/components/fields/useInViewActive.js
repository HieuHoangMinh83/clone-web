import { useEffect, useRef, useState } from 'react'

/**
 * Slide mode (landscape/fullpage): `mount` bám theo `active` — khớp với index hiện tại.
 * Scroll mode (portrait): dùng IntersectionObserver để bật/tắt `mount` theo viewport
 * → animation @keyframes replay mỗi khi section vào khung hình.
 */
export default function useInViewActive(active, isSlide, options = {}) {
  const { threshold = 0.25, rootMargin = '0px 0px -10% 0px' } = options
  const ref = useRef(null)
  const [mount, setMount] = useState(false)

  useEffect(() => {
    if (isSlide) {
      if (active) {
        const t = requestAnimationFrame(() => setMount(true))
        return () => cancelAnimationFrame(t)
      }
      setMount(false)
      return
    }

    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => setMount(entry.isIntersecting),
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [active, isSlide, threshold, rootMargin])

  return { ref, mount }
}
