import { useEffect, useState } from 'react'

/**
 * @param {number} itemCount   - total items
 * @param {number} cardWidth   - width of one card (px)
 * @param {number} gap         - gap between cards (px)
 * @param {number[]} breakpoints - [mobile, tablet, desktop] perView values
 *   e.g. [[640, 1], [1024, 2], [1280, 3], [Infinity, 4]]
 */
export default function useCarousel(itemCount, cardWidth, gap, breakpoints, startAtEnd = false) {
  const [page, setPage] = useState(startAtEnd ? Infinity : 0)
  const [perView, setPerView] = useState(breakpoints[breakpoints.length - 1][1])

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      for (const [maxW, count] of breakpoints) {
        if (w < maxW) {
          setPerView(count)
          return
        }
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [breakpoints])

  const maxPage = Math.max(0, Math.ceil(itemCount / perView) - 1)
  const clampedPage = Math.min(page, maxPage)
  const offset = clampedPage * perView * (cardWidth + gap)

  const prev = () => setPage(Math.max(0, clampedPage - 1))
  const next = () => setPage(Math.min(maxPage, clampedPage + 1))
  const goTo = (i) => setPage(Math.max(0, Math.min(maxPage, i)))

  return {
    offset,
    clampedPage,
    maxPage,
    perView,
    prev,
    next,
    goTo,
    hasPrev: clampedPage > 0,
    hasNext: clampedPage < maxPage,
  }
}
