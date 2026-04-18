import { useEffect, useRef, useState } from 'react'
import INTRO_MILESTONES from '../../intro/milestones.js'
import useCarousel from '../../intro/useCarousel.js'
import CarouselControls from '../../intro/CarouselControls.jsx'
import './ProjectsMilestones.css'

const AWARD_REGEX = /(Top\s?\d+[^.,;]*)|(giải thưởng[^.,;]*)|(vinh danh[^.,;]*)|(bằng khen[^.,;]*)/gi
const GAP = 32
const BREAKPOINTS = [[640, 1], [1024, 2], [Infinity, 3]]

function extractAwards(desc) {
  const matches = desc.match(AWARD_REGEX)
  return matches ? matches.map((m) => m.trim()) : []
}

const MILESTONES = INTRO_MILESTONES.map((m) => ({
  year: String(m.year),
  img: m.img,
  desc: m.desc,
  awards: extractAwards(m.desc),
}))

export default function ProjectsMilestones() {
  const sectionRef = useRef(null)
  const viewportRef = useRef(null)
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
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const { clampedPage, perView, hasPrev, hasNext, prev, next } = useCarousel(
    MILESTONES.length, 0, 0, BREAKPOINTS, true,
  )

  const itemW = perView > 0 && viewportW > 0
    ? (viewportW - (perView - 1) * GAP) / perView
    : 0
  const offset = clampedPage * perView * (itemW + GAP)

  return (
    <section
      ref={sectionRef}
      className={`prj-sec prj-miles ${inView ? 'is-in' : ''}`}
      aria-labelledby="prj-miles-title"
    >
      <div className="prj-container">
        <header className="prj-miles__head">
          <span className="prj-miles__eyebrow">
            <span className="prj-miles__eyebrow-line" aria-hidden />
            <span>Hành trình · 2003 — 2024</span>
          </span>
          <h2 id="prj-miles-title" className="prj-miles__title">
            Hai thập kỷ <em>kiến tạo</em>
            <span className="prj-miles__title-amp"> &amp; </span>
            <em>thay đổi</em>
          </h2>
          <p className="prj-miles__lead">
            Từ một nhà thầu nhỏ năm 2003, Newtecons bước đi cùng các Chủ đầu tư
            qua mỗi chu kỳ — để mỗi cột mốc dưới đây trở thành một viên gạch
            cho hệ sinh thái Tổng thầu đa ngành hôm nay.
          </p>
        </header>

        <div className="prj-miles__carousel">
          <div className="prj-miles__viewport" ref={viewportRef}>
            <div
              className="prj-miles__track"
              style={{ transform: `translateX(-${offset}px)` }}
            >
              {MILESTONES.map((m, i) => {
                const imgFirst = i % 2 === 0
                return (
                  <article
                    key={m.year}
                    className={`prj-miles__item ${imgFirst ? 'is-img-top' : 'is-text-top'} ${m.awards.length ? 'has-awards' : ''}`}
                    style={{ flex: `0 0 ${itemW}px`, '--i': i }}
                  >
                    <div className="prj-miles__top">
                      {imgFirst ? (
                        <div className="prj-miles__img">
                          <img src={m.img} alt={`Cột mốc ${m.year}`} loading="lazy" />
                        </div>
                      ) : (
                        <TextBlock m={m} />
                      )}
                    </div>
                    <div className="prj-miles__axis">
                      <span className="prj-miles__dot" aria-hidden />
                    </div>
                    <div className="prj-miles__bottom">
                      {imgFirst ? (
                        <TextBlock m={m} />
                      ) : (
                        <div className="prj-miles__img">
                          <img src={m.img} alt={`Cột mốc ${m.year}`} loading="lazy" />
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

function TextBlock({ m }) {
  return (
    <div className="prj-miles__text">
      <div className="prj-miles__year">{m.year}</div>
      <p className="prj-miles__desc">{m.desc}</p>
      {m.awards.length > 0 && (
        <ul className="prj-miles__awards">
          {m.awards.map((a, j) => (
            <li key={j} className="prj-miles__award">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M6 1l1.5 3 3.3.3-2.5 2.3.7 3.2L6 8.5 3 9.8l.7-3.2L1.2 4.3 4.5 4 6 1z" fill="currentColor" />
              </svg>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
