import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import bg from '../../../assets/images/intro/bg/board.png'
import ceo from '../../../assets/images/intro/managers/board-ceo.png'
import DIRECTORS from '../directors.js'
import './IntroBoard.css'

const CEO = {
  name: 'VÕ THANH LIÊM',
  role: 'Tổng Giám đốc',
  img: ceo,
  bio: 'Ông Võ Thanh Liêm là người đứng đầu Ban Điều hành Newtecons, định hướng chiến lược phát triển và dẫn dắt công ty trở thành Tổng thầu xây dựng hàng đầu Việt Nam. Với triết lý "Uy tín – Chuyên nghiệp – Tử tế", ông cùng đội ngũ không ngừng kiến tạo những công trình mang tầm vóc Việt.',
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

export default function IntroBoard() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [selected, setSelected] = useState(null)

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
        <div className="intro-board__featured">
          <div className="intro-board__title-block">
            <h2 className="intro-board__title">
              BAN
              <br />
              <strong>ĐIỀU HÀNH</strong>
            </h2>
            <div className="intro-board__title-accent" />
          </div>

          <div className="intro-board__avatar intro-board__avatar--lg">
            <img src={ceo} alt="Võ Thanh Liêm" loading="lazy" />
            <button
              type="button"
              className="intro-board__go"
              aria-label="Xem chi tiết Võ Thanh Liêm"
              onClick={() => setSelected(CEO)}
            >
              <Arrow />
            </button>
          </div>

          <div className="intro-board__meta intro-board__meta--lg">
            <div className="intro-board__name">VÕ THANH LIÊM</div>
            <div className="intro-board__role">Tổng Giám đốc</div>
          </div>
        </div>

        <div className="intro-board__grid">
          {DIRECTORS.map((d, i) => (
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
      </div>
      {selected && (
        <PersonModal person={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
