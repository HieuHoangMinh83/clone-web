import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './IntroBoard.css'

const PER_PAGE_PORTRAIT = 3
const PER_PAGE_MOBILE = 1
const PORTRAIT_QUERY = '(orientation: portrait) and (max-width: 1199px)'
const MOBILE_QUERY = '(max-width: 499px)'

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

function PersonModal({ person, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return createPortal(
    <div className="intro-board__modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="intro-board__modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="intro-board__modal-close"
          onClick={onClose}
          aria-label="Đóng"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="intro-board__modal-photo">
          <img src={person.img} alt={person.name} />
        </div>
        <div className="intro-board__modal-info">
          <div className="intro-board__modal-role">{person.role}</div>
          <h3 className="intro-board__modal-name">{person.name}</h3>
          <div className="intro-board__modal-divider" />
          <p className="intro-board__modal-bio">{person.bio}</p>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default function IntroBoard({
  bg,
  titleTop,
  titleStrong,
  ceo,
  directors = [],
}) {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [selected, setSelected] = useState(null)
  const pickMode = () => {
    if (typeof window === 'undefined') return 'desktop'
    if (window.matchMedia(MOBILE_QUERY).matches) return 'mobile'
    if (window.matchMedia(PORTRAIT_QUERY).matches) return 'portrait'
    return 'desktop'
  }
  const [mode, setMode] = useState(pickMode)
  const [page, setPage] = useState(0)

  useEffect(() => {
    const mobileMq = window.matchMedia(MOBILE_QUERY)
    const portraitMq = window.matchMedia(PORTRAIT_QUERY)
    const update = () => {
      setMode(pickMode())
      setPage(0)
    }
    mobileMq.addEventListener('change', update)
    portraitMq.addEventListener('change', update)
    return () => {
      mobileMq.removeEventListener('change', update)
      portraitMq.removeEventListener('change', update)
    }
  }, [])

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

  const isNarrow = mode === 'mobile'
  const perPage = isNarrow ? PER_PAGE_MOBILE : mode === 'portrait' ? PER_PAGE_PORTRAIT : directors.length
  const totalPages = Math.ceil(directors.length / perPage)
  const visible = directors.slice(page * perPage, page * perPage + perPage)
  const hasPagination = mode !== 'desktop' && totalPages > 1

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
      className={`intro-sec intro-board ${inView ? 'is-in' : ''}`}
    >
      <div
        className="intro-sec__bg intro-board__bg"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="intro-board__pattern" aria-hidden="true" />

      <div className="intro-board__container">
        {ceo && (
          <div className="intro-board__featured">
            <div className="intro-board__title-block">
              <h2 className="intro-board__title">
                {titleTop}
                <br />
                <strong>{titleStrong}</strong>
              </h2>
              <div className="intro-board__title-accent" />
            </div>

            <div className="intro-board__avatar intro-board__avatar--lg">
              <img src={ceo.img} alt={ceo.name} loading="lazy" />
              <button
                type="button"
                className="intro-board__go"
                aria-label={`Xem chi tiết ${ceo.name}`}
                onClick={() => setSelected(ceo)}
              >
                <Arrow />
              </button>
            </div>

            <div className="intro-board__meta intro-board__meta--lg">
              <div className="intro-board__name">{ceo.name}</div>
              <div className="intro-board__role">{ceo.role}</div>
            </div>
          </div>
        )}

        <div className="intro-board__stage">
          {hasPagination && (
            <button
              type="button"
              className="intro-board__arrow intro-board__arrow--prev"
              onClick={prev}
              aria-label="Trang trước"
            >
              <Chevron dir="left" />
            </button>
          )}

          <div
            className={`intro-board__grid${isDragging ? ' is-dragging' : ''}`}
            key={page}
            style={{
              '--drag-x': `${dragX}px`,
              '--enter-x': enterDir > 0 ? '60px' : '-60px',
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {visible.map((d, i) => (
              <div
                className="intro-board__card"
                key={d.name}
                style={{ '--ci': i }}
              >
                <div className="intro-board__avatar">
                  <img src={d.img} alt={d.name} loading="lazy" />
                  <button
                    type="button"
                    className="intro-board__go"
                    aria-label={`Xem chi tiết ${d.name}`}
                    onClick={() => setSelected(d)}
                  >
                    <Arrow />
                  </button>
                </div>
                <div className="intro-board__meta">
                  <div className="intro-board__name">{d.name}</div>
                  <div className="intro-board__role">{d.role}</div>
                </div>
              </div>
            ))}
          </div>

          {hasPagination && (
            <button
              type="button"
              className="intro-board__arrow intro-board__arrow--next"
              onClick={next}
              aria-label="Trang sau"
            >
              <Chevron dir="right" />
            </button>
          )}
        </div>

        {isNarrow && totalPages > 1 && (
          <div className="intro-board__dots" role="tablist" aria-label="Phân trang">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === page}
                aria-label={`Trang ${i + 1}`}
                className={`intro-board__dot ${i === page ? 'is-active' : ''}`}
                onClick={() => {
                  setEnterDir(i > page ? 1 : -1)
                  setPage(i)
                }}
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
