import { useEffect, useState } from 'react'
import './FieldsPanel.css'

export default function FieldsPanel({ field, index, total, active, reversed }) {
  const [mount, setMount] = useState(false)

  useEffect(() => {
    if (active) {
      const t = requestAnimationFrame(() => setMount(true))
      return () => cancelAnimationFrame(t)
    }
  }, [active])

  const onMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    el.style.setProperty('--mx', `${(x - 0.5) * 20}px`)
    el.style.setProperty('--my', `${(y - 0.5) * 20}px`)
  }

  const onLeave = (e) => {
    e.currentTarget.style.setProperty('--mx', '0px')
    e.currentTarget.style.setProperty('--my', '0px')
  }

  return (
    <section
      className={`fp-sec fp-panel ${mount ? 'is-in' : ''} ${reversed ? 'is-reversed' : ''}`}
      style={{ '--accent': field.accent }}
      aria-label={field.name}
    >
      <div className="fp-panel__bg" aria-hidden>
        <img src={field.img} alt="" className="fp-panel__bgimg" />
        <span className="fp-panel__bgtint" />
        <span className="fp-panel__bggrad" />
        <span className="fp-panel__bggrid" />
      </div>

      <div className="fp-panel__inner" onMouseMove={onMove} onMouseLeave={onLeave}>
        <div className="fp-panel__copy">
          <div className="fp-panel__topline">
            <span className="fp-panel__counter">
              <b>{String(index).padStart(2, '0')}</b>
              <span>/ {String(total).padStart(2, '0')}</span>
            </span>
            <span className="fp-panel__rule" />
            <span className="fp-panel__tag">{field.tag}</span>
          </div>

          <h2 className="fp-panel__title">
            <span className="fp-panel__title-mask">
              {field.name.split(' ').map((w, i, arr) => (
                <span
                  key={i}
                  className="fp-panel__title-word"
                  style={{ '--w': i }}
                >
                  {w}
                  {i < arr.length - 1 ? '\u00A0' : ''}
                </span>
              ))}
            </span>
          </h2>

          <span className="fp-panel__en">{field.en}</span>

          <p className="fp-panel__desc">{field.desc}</p>

          {field.stats && (
            <ul className="fp-panel__stats" role="list">
              {field.stats.map((s, i) => (
                <li key={i} className="fp-panel__stat" style={{ '--s': i }}>
                  <span className="fp-panel__stat-k">{s.k}</span>
                  <span className="fp-panel__stat-v">{s.v}</span>
                </li>
              ))}
            </ul>
          )}

          <a className="fp-panel__cta" href="#">
            <span>Xem dự án tiêu biểu</span>
            <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
              <path
                d="M1 5h19m0 0L16 1m4 4l-4 4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className="fp-panel__visual" aria-hidden>
          <div className="fp-panel__frame">
            <img src={field.imgAlt || field.img} alt="" className="fp-panel__frame-img" />
            <span className="fp-panel__frame-overlay" />
            <span className="fp-panel__frame-corner fp-panel__frame-corner--tl" />
            <span className="fp-panel__frame-corner fp-panel__frame-corner--br" />
          </div>

          <span className="fp-panel__big-num" aria-hidden>
            {String(index).padStart(2, '0')}
          </span>

          <svg
            className="fp-panel__glyph"
            viewBox="0 0 160 160"
            fill="none"
            aria-hidden
          >
            <circle
              className="fp-panel__glyph-ring"
              cx="80"
              cy="80"
              r="76"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              className="fp-panel__glyph-tick"
              d="M80 4 L80 24"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              className="fp-panel__glyph-tick fp-panel__glyph-tick--b"
              d="M156 80 L136 80"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              className="fp-panel__glyph-tick fp-panel__glyph-tick--c"
              d="M80 156 L80 136"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              className="fp-panel__glyph-tick fp-panel__glyph-tick--d"
              d="M4 80 L24 80"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>

      <div className="fp-panel__watermark" aria-hidden>
        {field.en}
      </div>
    </section>
  )
}
