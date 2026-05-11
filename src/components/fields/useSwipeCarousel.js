import { useEffect, useRef, useState } from 'react'

const DEFAULT_QUERY = '(max-width: 499px)'

export default function useSwipeCarousel(total, mediaQuery = DEFAULT_QUERY) {
  const [isNarrow, setIsNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(mediaQuery).matches,
  )
  const [page, setPage] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [enterDir, setEnterDir] = useState(1)
  const touchRef = useRef({ x: 0, y: 0, locked: 'none' })

  useEffect(() => {
    const mq = window.matchMedia(mediaQuery)
    const handler = (e) => {
      setIsNarrow(e.matches)
      setPage(0)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [mediaQuery])

  const goTo = (i) => {
    setEnterDir(i > page ? 1 : -1)
    setPage(Math.max(0, Math.min(total - 1, i)))
  }

  const onTouchStart = (e) => {
    if (!isNarrow || total <= 1) return
    const t = e.touches[0]
    touchRef.current = { x: t.clientX, y: t.clientY, locked: 'none' }
    setIsDragging(true)
  }
  const onTouchMove = (e) => {
    if (!isDragging) return
    const t = e.touches[0]
    const dx = t.clientX - touchRef.current.x
    const dy = t.clientY - touchRef.current.y
    if (touchRef.current.locked === 'none') {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
      touchRef.current.locked = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
    }
    if (touchRef.current.locked !== 'x') return
    setDragX(dx)
  }
  const onTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    const dx = dragX
    setDragX(0)
    if (touchRef.current.locked !== 'x' || total <= 1) return
    if (Math.abs(dx) < 50) return
    const delta = dx < 0 ? 1 : -1
    setEnterDir(delta)
    setPage((p) => (p + delta + total) % total)
  }

  return {
    isNarrow,
    page,
    goTo,
    isDragging,
    bind: { onTouchStart, onTouchMove, onTouchEnd },
    style: {
      '--drag-x': `${dragX}px`,
      '--enter-x': enterDir > 0 ? '60px' : '-60px',
    },
  }
}
