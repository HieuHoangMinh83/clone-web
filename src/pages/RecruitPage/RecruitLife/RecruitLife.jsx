import { useEffect, useState } from 'react'
import { LIFE_GALLERY, LIFE_STATS } from '../recruitData.js'

export default function RecruitLife() {
  const [mount, setMount] = useState(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const r = requestAnimationFrame(() => setMount(true))
    return () => cancelAnimationFrame(r)
  }, [])

  const current = LIFE_GALLERY[active]

  return (
    <section className={`rec-sec rec-life ${mount ? 'is-in' : ''}`}>
      <div className="rec-life__bg" aria-hidden>
        <span className="rec-life__bg-grad" />
        <span className="rec-life__bg-watermark">LIFE</span>
      </div>

      <div className="rec-container">
        <header className="rec-life__head">
          <div className="rec-life__head-left">
            <span className="rec-life__eyebrow">
              <span className="rec-life__eyebrow-line" />
              ĐỜI SỐNG TẠI NEWTECONS
            </span>
            <h2 className="rec-life__heading">
              <span className="rec-life__heading-mask">
                <span className="rec-life__heading-row">Hơn cả một</span>
              </span>
              <span className="rec-life__heading-mask">
                <span className="rec-life__heading-row rec-life__heading-row--accent">
                  <em>công việc</em>
                </span>
              </span>
            </h2>
          </div>
          <ul className="rec-life__stats" aria-label="Văn hoá đội ngũ">
            {LIFE_STATS.map((s, i) => (
              <li key={s.v} className="rec-life__stat" style={{ '--i': i }}>
                <span className="rec-life__stat-k">{s.k}</span>
                <span className="rec-life__stat-v">{s.v}</span>
              </li>
            ))}
          </ul>
        </header>

        <div className="rec-life__stage">
          <div className="rec-life__stage-frame">
            {LIFE_GALLERY.map((g, i) => (
              <img
                key={g.title}
                src={g.image}
                alt={g.title}
                className={`rec-life__stage-img ${i === active ? 'is-active' : ''}`}
                loading="lazy"
              />
            ))}
            <span className="rec-life__stage-scrim" aria-hidden />
            <span className="rec-life__stage-corner rec-life__stage-corner--tl" aria-hidden />
            <span className="rec-life__stage-corner rec-life__stage-corner--br" aria-hidden />

            <div className="rec-life__stage-caption">
              <span className="rec-life__stage-tag">{current.tag}</span>
              <h3 className="rec-life__stage-title">{current.title}</h3>
              <p className="rec-life__stage-text">{current.caption}</p>
            </div>

            <div className="rec-life__counter" aria-hidden>
              <strong>{String(active + 1).padStart(2, '0')}</strong>
              <span>/</span>
              <em>{String(LIFE_GALLERY.length).padStart(2, '0')}</em>
            </div>
          </div>

          <ul className="rec-life__thumbs" role="tablist">
            {LIFE_GALLERY.map((g, i) => (
              <li key={g.title}>
                <button
                  className={`rec-life__thumb ${i === active ? 'is-active' : ''}`}
                  style={{ '--i': i }}
                  onClick={() => setActive(i)}
                  role="tab"
                  aria-selected={i === active}
                >
                  <span className="rec-life__thumb-img">
                    <img src={g.image} alt="" aria-hidden />
                  </span>
                  <span className="rec-life__thumb-body">
                    <span className="rec-life__thumb-tag">{g.tag}</span>
                    <span className="rec-life__thumb-title">{g.title}</span>
                  </span>
                  <span className="rec-life__thumb-bar" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
