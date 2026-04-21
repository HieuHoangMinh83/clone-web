import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './IntroManagers.css'

const PER_PAGE_DEFAULT = 5
const PER_PAGE_PORTRAIT = 3
const PER_PAGE_MOBILE = 1
const PORTRAIT_QUERY = '(orientation: portrait) and (max-width: 1199px)'
const MOBILE_QUERY = '(max-width: 499px)'
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
  const pickPerPage = () => {
    if (typeof window === 'undefined') return PER_PAGE_DEFAULT
    if (window.matchMedia(MOBILE_QUERY).matches) return PER_PAGE_MOBILE
    if (window.matchMedia(PORTRAIT_QUERY).matches) return PER_PAGE_PORTRAIT
    return PER_PAGE_DEFAULT
  }
  const [perPage, setPerPage] = useState(pickPerPage)

  useEffect(() => {
    const mobileMq = window.matchMedia(MOBILE_QUERY)
    const portraitMq = window.matchMedia(PORTRAIT_QUERY)
    const update = () => {
      setPerPage(pickPerPage())
      setPage(0)
    }
    mobileMq.addEventListener('change', update)
    portraitMq.addEventListener('change', update)
    return () => {
      mobileMq.removeEventListener('change', update)
      portraitMq.removeEventListener('change', update)
    }
  }, [])

  const totalPages = Math.ceil(items.length / perPage)
  const visible = items.slice(page * perPage, page * perPage + perPage)
  const isShortPage = visible.length < perPage
  const isNarrow = perPage === PER_PAGE_MOBILE

  const touchRef = useRef({ x: 0, y: 0, locked: 'none' })
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [enterDir, setEnterDir] = useState(1)
  const onTouchStart = (e) => {
    if (!isNarrow || totalPages <= 1) return
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
    if (touchRef.current.locked !== 'x' || totalPages <= 1) return
    if (Math.abs(dx) < 50) return
    const delta = dx < 0 ? 1 : -1
    setEnterDir(delta)
    setPage((p) => (p + delta + totalPages) % totalPages)
  }

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
    if (!inView || paused || selected || totalPages <= 1 || isDragging) return
    const id = window.setInterval(() => {
      setEnterDir(1)
      setPage((p) => (p + 1) % totalPages)
    }, AUTO_MS)
    return () => window.clearInterval(id)
  }, [inView, paused, selected, totalPages, isDragging])

  const prev = () => {
    setEnterDir(-1)
    setPage((p) => (p - 1 + totalPages) % totalPages)
  }
  const next = () => {
    setEnterDir(1)
    setPage((p) => (p + 1) % totalPages)
  }

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
            className={`intro-mgr__row${isShortPage ? ' intro-mgr__row--short' : ''}${isDragging ? ' is-dragging' : ''}`}
            style={{
              ...(isShortPage ? { '--n': visible.length } : {}),
              '--drag-x': `${dragX}px`,
              '--enter-x': enterDir > 0 ? '60px' : '-60px',
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
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
