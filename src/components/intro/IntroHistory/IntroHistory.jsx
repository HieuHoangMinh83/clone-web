import { useEffect, useRef, useState } from 'react'
import bg from '../../../assets/images/intro/bg/history.png'
import MILESTONES from '../milestones.js'
import useCarousel from '../useCarousel.js'
import CarouselControls from '../CarouselControls.jsx'
import './IntroHistory.css'

const GAP = 32
const BREAKPOINTS = [[640, 1], [1024, 2], [Infinity, 3]]

export default function IntroHistory() {
  const viewportRef = useRef(null)
  const [viewportW, setViewportW] = useState(0)

  useEffect(() => {
    const update = () => {
      if (viewportRef.current) setViewportW(viewportRef.current.clientWidth)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const { clampedPage, perView, hasPrev, hasNext, prev, next } = useCarousel(
    MILESTONES.length, 0, 0, BREAKPOINTS, true,
  )

  const itemW = perView > 0 && viewportW > 0
    ? (viewportW - (perView - 1) * GAP) / perView
    : 0
  const offset = clampedPage * perView * (itemW + GAP)

  return (
    <section className="intro-sec intro-history">
      <div
        className="intro-sec__bg intro-history__bg"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="intro-container">
        <div className="intro-history__head">
          <h2 className="intro-title">
            <strong>Lịch sử</strong> hình thành
          </h2>
          <p className="intro-lead">
            Công ty Cổ phần Đầu tư Xây dựng NEWTECONS được thành lập vào ngày 23/10/2003, là
            một trong những đơn vị uy tín trong lĩnh vực thi công xây dựng với đa dạng các loại
            hình công trình.
          </p>
        </div>
        <div className="intro-history__carousel">
          <div className="intro-history__viewport" ref={viewportRef}>
            <div
              className="intro-history__track"
              style={{ transform: `translateX(-${offset}px)` }}
            >
              {MILESTONES.map((m, i) => {
                const imgFirst = i % 2 === 0
                return (
                  <article
                    className={`intro-history__item ${imgFirst ? 'is-img-top' : 'is-text-top'}`}
                    key={m.year}
                    style={{ flex: `0 0 ${itemW}px` }}
                  >
                    <div className="intro-history__top">
                      {imgFirst ? (
                        <div className="intro-history__img">
                          <img src={m.img} alt={`Cột mốc ${m.year}`} loading="lazy" />
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
