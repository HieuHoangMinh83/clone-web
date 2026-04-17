import { useEffect, useRef, useState } from 'react'
import bg from '../../../assets/images/intro/bg/managers.png'
import MANAGERS from '../managers.js'
import './IntroManagers.css'

const PER_PAGE = 4

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function IntroManagers() {
  const [page, setPage] = useState(0)
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const featured = MANAGERS[0]
  const rest = MANAGERS.slice(1)
  const totalPages = Math.ceil(rest.length / PER_PAGE)
  const visible = rest.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  return (
    <section
      ref={sectionRef}
      className={`intro-sec intro-mgr ${inView ? 'is-in' : ''}`}
    >
      <div
        className="intro-sec__bg intro-mgr__bg"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="intro-mgr__pattern" aria-hidden="true" />

      <div className="intro-mgr__container">
        <aside className="intro-mgr__title-block">
          <h2 className="intro-mgr__title">
            CÁN BỘ
            <br />
            <strong>QUẢN LÝ</strong>
          </h2>
          <div className="intro-mgr__title-accent" />
        </aside>

        <div className="intro-mgr__stage">
          <div className="intro-mgr__featured">
            <div className="intro-mgr__avatar intro-mgr__avatar--lg">
              <img src={featured.img} alt={featured.name} loading="lazy" />
              <button
                type="button"
                className="intro-mgr__go"
                aria-label={`Xem chi tiết ${featured.name}`}
              >
                <Arrow />
              </button>
            </div>
            <div className="intro-mgr__meta intro-mgr__meta--lg">
              <div className="intro-mgr__name">{featured.name}</div>
              <div className="intro-mgr__role">{featured.role}</div>
            </div>
          </div>

          <div className="intro-mgr__grid" key={page}>
            {visible.map((m, i) => (
              <div
                className="intro-mgr__card"
                key={m.name}
                style={{ '--ci': i }}
              >
                <div className="intro-mgr__avatar">
                  <img src={m.img} alt={m.name} loading="lazy" />
                  <button
                    type="button"
                    className="intro-mgr__go"
                    aria-label={`Xem chi tiết ${m.name}`}
                  >
                    <Arrow />
                  </button>
                </div>
                <div className="intro-mgr__meta">
                  <div className="intro-mgr__name">{m.name}</div>
                  <div className="intro-mgr__role">{m.role}</div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="intro-mgr__dots">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`intro-mgr__dot ${i === page ? 'is-active' : ''}`}
                  onClick={() => setPage(i)}
                  aria-label={`Trang ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
