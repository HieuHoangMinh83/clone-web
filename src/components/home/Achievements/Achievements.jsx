import { useEffect, useRef, useState } from 'react'
import './Achievements.css'

function formatNumber(n, format) {
  if (format === 'thousands') {
    return Math.round(n).toLocaleString('de-DE')
  }
  return String(Math.round(n))
}

function CountUp({ to, inView, duration = 1600, format, prefix = '', suffix = '' }) {
  const [val, setVal] = useState(0)
  const rafRef = useRef(0)

  useEffect(() => {
    if (!inView) {
      setVal(0)
      return
    }
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(to * eased)
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView, to, duration])

  return (
    <>
      <span className="stat__num-inner">
        {prefix}
        {formatNumber(val, format)}
      </span>
      {suffix && <span className="stat__unit">{suffix.trim()}</span>}
    </>
  )
}

export default function Achievements({
  bgImage,
  bgAlt = '',
  quote = [],
  stats = [],
}) {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.3)
      },
      { threshold: [0, 0.3, 0.6] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`ach section ${inView ? 'is-in' : ''}`}
      id="achievements"
    >
      <div className="ach__bg" aria-hidden>
        {bgImage && <img src={bgImage} alt={bgAlt} className="ach__bg-img" />}
        <span className="ach__bg-veil" />
        <span className="ach__bg-grid" />
      </div>

      <div className="ach__frame" aria-hidden>
        <span className="ach__frame-tl" />
        <span className="ach__frame-tr" />
        <span className="ach__frame-bl" />
        <span className="ach__frame-br" />
      </div>

      <div className="ach__content">
        <div className="ach__quote">
          <span className="ach__quote-rule" aria-hidden />

          <h2 className="ach__quote-text">
            {quote.map((line, li) => (
              <span className="ach__line" key={li}>
                <span className="ach__line-inner">
                  {line.map((word, wi) => {
                    const flatIndex =
                      quote.slice(0, li).flat().length + wi
                    return (
                      <span
                        key={wi}
                        className="ach__word"
                        style={{ '--i': flatIndex }}
                      >
                        {word}
                        {wi < line.length - 1 ? '\u00A0' : ''}
                      </span>
                    )
                  })}
                </span>
              </span>
            ))}
          </h2>
        </div>

        <ul className="ach__stats">
          {stats.map((s, i) => (
            <li
              key={i}
              className="stat"
              style={{ '--d': `${0.85 + i * 0.12}s` }}
            >
              <span className="stat__num">
                <CountUp
                  to={s.value}
                  inView={inView}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  format={s.format}
                />
                <span className="stat__num-underline" aria-hidden />
              </span>
              <span className="stat__label">
                {s.label.split('\n').map((ln, li) => (
                  <span key={li} className="stat__label-line">
                    {ln}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
