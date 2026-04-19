import { useEffect, useState } from 'react'
import { WHY_PILLARS } from '../recruitData.js'

function PillarIcon({ name }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  switch (name) {
    case 'bricks':
      return (
        <svg {...common}>
          <rect x="3" y="20" width="26" height="8" />
          <rect x="3" y="12" width="26" height="8" />
          <path d="M10 12v8M22 12v8M6 20v8M16 20v8M26 20v8" />
          <path d="M10 4v8M22 4v8M3 4h26" />
        </svg>
      )
    case 'rocket':
      return (
        <svg {...common}>
          <path d="M16 3c5 5 8 10 8 15l-5 3h-6l-5-3c0-5 3-10 8-15Z" />
          <circle cx="16" cy="13" r="2.5" />
          <path d="M11 21l-3 5M21 21l3 5M13 26l-3 3M19 26l3 3" />
        </svg>
      )
    case 'gift':
      return (
        <svg {...common}>
          <rect x="4" y="12" width="24" height="16" rx="1" />
          <path d="M4 18h24M16 12v16" />
          <path d="M16 12c-3 0-6-1.5-6-4s3-3 4.5-1.5S16 10 16 12Z" />
          <path d="M16 12c3 0 6-1.5 6-4s-3-3-4.5-1.5S16 10 16 12Z" />
        </svg>
      )
    case 'tower':
      return (
        <svg {...common}>
          <path d="M10 29V11l6-8 6 8v18" />
          <path d="M10 29h12M14 15h4M14 20h4M14 25h4" />
        </svg>
      )
    default:
      return null
  }
}

export default function RecruitWhy() {
  const [mount, setMount] = useState(false)
  useEffect(() => {
    const r = requestAnimationFrame(() => setMount(true))
    return () => cancelAnimationFrame(r)
  }, [])

  return (
    <section className={`rec-sec rec-why ${mount ? 'is-in' : ''}`}>
      <div className="rec-why__bg" aria-hidden>
        <span className="rec-why__bg-grid" />
        <span className="rec-why__bg-orb" />
        <span className="rec-why__bg-line" />
      </div>

      <div className="rec-container">
        <header className="rec-why__head">
          <div className="rec-why__head-left">
            <span className="rec-why__eyebrow">
              <span className="rec-why__eyebrow-line" />
              TẠI SAO CHỌN NEWTECONS
            </span>
            <h2 className="rec-why__heading">
              <span className="rec-why__heading-mask">
                <span className="rec-why__heading-row">Nơi tài năng</span>
              </span>
              <span className="rec-why__heading-mask">
                <span className="rec-why__heading-row rec-why__heading-row--accent">
                  <em>được toả sáng</em>
                </span>
              </span>
            </h2>
          </div>
          <div className="rec-why__head-right">
            <p className="rec-why__lead">
              Chúng tôi tin rằng con người là tài sản quý giá nhất. Mỗi cá nhân tại
              Newtecons đều được đầu tư để phát triển đúng với thế mạnh riêng — trong
              một tổ chức đủ lớn để giao những cơ hội đáng giá.
            </p>
            <div className="rec-why__meta">
              <span className="rec-why__meta-k">04</span>
              <span className="rec-why__meta-v">Giá trị cốt lõi</span>
            </div>
          </div>
        </header>

        <div className="rec-why__grid">
          {WHY_PILLARS.map((p, i) => (
            <article key={p.no} className="rec-pillar" style={{ '--i': i }}>
              <span className="rec-pillar__no" aria-hidden>{p.no}</span>
              <div className="rec-pillar__icon" aria-hidden>
                <PillarIcon name={p.icon} />
              </div>
              <h3 className="rec-pillar__title">{p.title}</h3>
              <p className="rec-pillar__desc">{p.desc}</p>
              <ul className="rec-pillar__list">
                {p.bullets.map((b) => (
                  <li key={b}>
                    <span className="rec-pillar__dot" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
              <span className="rec-pillar__line" aria-hidden />
              <span className="rec-pillar__ghost" aria-hidden>{p.no}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
