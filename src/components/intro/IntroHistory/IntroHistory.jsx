import { useEffect, useRef, useState } from 'react'
import useCarousel from '../useCarousel.js'
import CarouselControls from '../CarouselControls.jsx'
import './IntroHistory.css'

const GAP = 32
const BREAKPOINTS = [[500, 1], [900, 3], [Infinity, 4]]

export default function IntroHistory({
  bg,
  title,
  titleTrail,
  lead,
  milestoneAltTemplate = 'Cột mốc {year}',
  milestones = [],
}) {
  const viewportRef = useRef(null)
  const sectionRef = useRef(null)
  const [viewportW, setViewportW] = useState(0)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const update = () => {
      if (viewportRef.current) setViewportW(viewportRef.current.clientWidth)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.15)
      },
      { threshold: [0, 0.15, 0.3, 0.5] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const { clampedPage, perView, maxPage, hasPrev, hasNext, prev, next, goTo } = useCarousel(
    milestones.length, 0, 0, BREAKPOINTS, true,
  )

  const touchRef = useRef({ x: 0, y: 0, locked: 'none' })
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const onTouchStart = (e) => {
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
    const resistance = (!hasPrev && dx > 0) || (!hasNext && dx < 0) ? 0.35 : 1
    setDragX(dx * resistance)
  }
  const onTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    const dx = dragX
    setDragX(0)
    if (touchRef.current.locked !== 'x') return
    if (Math.abs(dx) < 50) return
    if (dx < 0) next()
    else prev()
  }

  const itemW = perView > 0 && viewportW > 0
    ? (viewportW - (perView - 1) * GAP) / perView
    : 0
  const step = itemW + GAP
  const rawOffset = clampedPage * perView * step
  const maxOffset = Math.max(0, (milestones.length - perView) * step)
  const offset = Math.min(rawOffset, maxOffset)
  const totalPages = maxPage + 1

  return (
    <section ref={sectionRef} className={`intro-sec intro-history ${inView ? 'is-in' : ''}`}>
      <div
        className="intro-sec__bg intro-history__bg"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="intro-container">
        <div className="intro-history__head">
          <h2 className="intro-title">
            <strong>{title}</strong> {titleTrail}
          </h2>
          <p className="intro-lead">{lead}</p>
        </div>
        <div className="intro-history__carousel">
          <div
            className="intro-history__viewport"
            ref={viewportRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className={`intro-history__track ${isDragging ? 'is-dragging' : ''}`}
              style={{ transform: `translateX(${-offset + dragX}px)` }}
            >
              {milestones.map((m, i) => {
                const imgFirst = i % 2 === 0
                const alt = milestoneAltTemplate.replace('{year}', m.year)
                return (
                  <article
                    className={`intro-history__item ${imgFirst ? 'is-img-top' : 'is-text-top'}`}
                    key={m.year}
                    style={{ flex: `0 0 ${itemW}px`, '--i': i }}
                  >
                    <div className="intro-history__top">
                      {imgFirst ? (
                        <div className="intro-history__img">
                          <img src={m.img} alt={alt} loading="lazy" />
                        </div>
                      ) : (
                        <div className="intro-history__text">
                          <div className="intro-history__year">{m.year}</div>
                          <p className="intro-history__desc">{m.desc}</p>
                        </div>
                      )}
                    </div>
                    <div className="intro-history__axis">
                      <span className="intro-history__dot" aria-hidden />
                    </div>
                    <div className="intro-history__bottom">
                      {imgFirst ? (
                        <div className="intro-history__text">
                          <div className="intro-history__year">{m.year}</div>
                          <p className="intro-history__desc">{m.desc}</p>
                        </div>
                      ) : (
                        <div className="intro-history__img">
                          <img src={m.img} alt={alt} loading="lazy" />
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
          <CarouselControls onPrev={prev} onNext={next} hasPrev={hasPrev} hasNext={hasNext} />
          {totalPages > 1 && (
            <ol className="intro-history__dots" aria-label="Điều hướng mốc lịch sử">
              {Array.from({ length: totalPages }).map((_, i) => (
                <li key={i}>
                  <button
                    type="button"
                    className={i === clampedPage ? 'is-active' : ''}
                    onClick={() => goTo(i)}
                    aria-label={`Mốc ${i + 1}`}
                    aria-current={i === clampedPage ? 'true' : undefined}
                  />
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  )
}
