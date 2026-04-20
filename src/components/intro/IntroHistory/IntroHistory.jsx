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

  const { clampedPage, perView, hasPrev, hasNext, prev, next } = useCarousel(
    milestones.length, 0, 0, BREAKPOINTS, true,
  )

  const itemW = perView > 0 && viewportW > 0
    ? (viewportW - (perView - 1) * GAP) / perView
    : 0
  const step = itemW + GAP
  const rawOffset = clampedPage * perView * step
  const maxOffset = Math.max(0, (milestones.length - perView) * step)
  const offset = Math.min(rawOffset, maxOffset)

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
          <div className="intro-history__viewport" ref={viewportRef}>
            <div
              className="intro-history__track"
              style={{ transform: `translateX(-${offset}px)` }}
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
        </div>
      </div>
    </section>
  )
}
