import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './IntroManagers.css'

const PER_PAGE_DEFAULT = 5
const PER_PAGE_PORTRAIT = 3
const PORTRAIT_QUERY = '(orientation: portrait) and (max-width: 1199px)'
const AUTO_MS = 5000

function Chevron({ dir = 'right' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === 'right' ? 'M9 5l7 7-7 7' : 'M15 5l-7 7 7 7'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PersonModal({ person, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return createPortal(
    <div className="intro-mgr__modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="intro-mgr__modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="intro-mgr__modal-close"
          onClick={onClose}
          aria-label="Đóng"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="intro-mgr__modal-photo">
          <img src={person.img} alt={person.name} />
        </div>
        <div className="intro-mgr__modal-info">
          <div className="intro-mgr__modal-role">{person.role}</div>
          <h3 className="intro-mgr__modal-name">{person.name}</h3>
          <div className="intro-mgr__modal-divider" />
          <p className="intro-mgr__modal-bio">{person.bio}</p>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default function IntroManagers({
  bg,
  titleTop,
  titleStrong,
  desc,
  items = [],
}) {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)
  const [selected, setSelected] = useState(null)
  const [perPage, setPerPage] = useState(() => {
    if (typeof window === 'undefined') return PER_PAGE_DEFAULT
    return window.matchMedia(PORTRAIT_QUERY).matches ? PER_PAGE_PORTRAIT : PER_PAGE_DEFAULT
  })

  useEffect(() => {
    const mq = window.matchMedia(PORTRAIT_QUERY)
    const handler = (e) => {
      setPerPage(e.matches ? PER_PAGE_PORTRAIT : PER_PAGE_DEFAULT)
      setPage(0)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const totalPages = Math.ceil(items.length / perPage)
  const visible = items.slice(page * perPage, page * perPage + perPage)
  const isShortPage = visible.length < perPage

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

  useEffect(() => {
    if (!inView || paused || selected || totalPages <= 1) return
    const id = window.setInterval(() => {
      setPage((p) => (p + 1) % totalPages)
    }, AUTO_MS)
    return () => window.clearInterval(id)
  }, [inView, paused, selected, totalPages])

  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages)
  const next = () => setPage((p) => (p + 1) % totalPages)

  return (
    <section
      ref={sectionRef}
      className={`intro-sec intro-mgr ${inView ? 'is-in' : ''}`}
    >
      <div
        className="intro-sec__bg intro-mgr__bg"
        style={{ backgroundImage: `url(${bg})` }}
      />

      <div className="intro-mgr__container">
        <header className="intro-mgr__head">
          <h2 className="intro-mgr__title">
            <span className="intro-mgr__title-dash" aria-hidden>—</span>
            <span className="intro-mgr__title-text">
              {titleTop} <strong>{titleStrong}</strong>
            </span>
            <span className="intro-mgr__title-dash" aria-hidden>—</span>
          </h2>
          <p className="intro-mgr__desc">{desc}</p>
        </header>

        <div
          className="intro-mgr__stage"
          key={page}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            type="button"
            className="intro-mgr__arrow intro-mgr__arrow--prev"
            onClick={prev}
            aria-label="Trang trước"
            disabled={totalPages <= 1}
          >
            <Chevron dir="left" />
          </button>

          <div
            className={`intro-mgr__row${isShortPage ? ' intro-mgr__row--short' : ''}`}
            style={isShortPage ? { '--n': visible.length } : undefined}
          >
            {visible.map((m, i) => (
              <article
                key={m.name}
                className={`intro-mgr__card intro-mgr__card--${i % 2 === 0 ? 'up' : 'down'}`}
                style={{ '--ci': i }}
                onClick={() => setSelected(m)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelected(m)
                  }
                }}
              >
                <div className="intro-mgr__photo">
                  <img src={m.img} alt={m.name} loading="lazy" />
                  <span className="intro-mgr__photo-overlay" aria-hidden />
                </div>
                <div className="intro-mgr__meta">
                  <h3 className="intro-mgr__name">{m.name}</h3>
                  <p className="intro-mgr__role">{m.role}</p>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="intro-mgr__arrow intro-mgr__arrow--next"
            onClick={next}
            aria-label="Trang sau"
            disabled={totalPages <= 1}
          >
            <Chevron dir="right" />
          </button>
        </div>

        {totalPages > 1 && (
          <div className="intro-mgr__dots" role="tablist" aria-label="Phân trang">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === page}
                aria-label={`Trang ${i + 1}`}
                className={`intro-mgr__dot ${i === page ? 'is-active' : ''}`}
                onClick={() => setPage(i)}
              />
            ))}
          </div>
        )}
      </div>

      {selected && (
        <PersonModal person={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
