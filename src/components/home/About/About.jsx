import { useEffect, useRef, useState } from 'react'
import './About.css'

export default function About({
  eyebrow,
  titleTop,
  brand,
  tag,
  body,
  cta,
  tiles = [],
}) {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.2)
      },
      { threshold: [0, 0.2, 0.5] }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const onTileMove = (e) => {
    const tile = e.currentTarget
    const rect = tile.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    tile.style.setProperty('--mx', `${x * 12}px`)
    tile.style.setProperty('--my', `${y * 12}px`)
    tile.style.setProperty('--rx', `${-y * 4}deg`)
    tile.style.setProperty('--ry', `${x * 4}deg`)
    tile.style.setProperty('--gx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    tile.style.setProperty('--gy', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }

  const onTileLeave = (e) => {
    const tile = e.currentTarget
    tile.style.setProperty('--mx', `0px`)
    tile.style.setProperty('--my', `0px`)
    tile.style.setProperty('--rx', `0deg`)
    tile.style.setProperty('--ry', `0deg`)
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`about section ${inView ? 'is-in' : ''}`}
    >
      <div className="about__bg" aria-hidden>
        <span className="about__bg-orb about__bg-orb--a" />
        <span className="about__bg-orb about__bg-orb--b" />
        <span className="about__bg-grid" />
      </div>

      <div className="about__grid">
        <div className="about__intro">
          <div className="about__glyph" aria-hidden>
            <svg viewBox="0 0 100 120" fill="none" stroke="var(--navy-700)" strokeWidth="1">
              <path className="about__glyph-path" d="M10 110 L50 10 L90 110 Z" />
              <path className="about__glyph-path about__glyph-path--inner" d="M30 110 L50 60 L70 110" />
            </svg>
          </div>

          <span className="about__eyebrow">
            <span className="about__eyebrow-line" />
            {eyebrow}
          </span>

          <h2 className="about__title">
            <span className="about__title-mask">
              <span className="about__title-line">{titleTop}</span>
            </span>
            <span className="about__title-mask">
              <strong className="about__title-brand">
                {brand.split('').map((ch, i) => (
                  <span
                    key={i}
                    className="about__title-char"
                    style={{ '--i': i }}
                  >
                    {ch}
                  </span>
                ))}
              </strong>
            </span>
          </h2>

          <p className="about__tag reveal" style={{ '--d': '1.55s' }}>
            {tag}
          </p>

          <p className="about__body reveal" style={{ '--d': '1.7s' }}>
            {body}
          </p>

          <a href={cta?.href || '#'} className="about__cta reveal" style={{ '--d': '1.85s' }}>
            <span className="about__cta-label">{cta?.label}</span>
            <span className="about__cta-arrow" aria-hidden>
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                <path d="M1 6h15m0 0L11 1m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>

        <div className="about__tiles">
          {tiles.map((t, idx) => (
            <a
              key={t.id}
              href={t.href || '#'}
              className={`tile tile--${idx + 1}`}
              onMouseMove={onTileMove}
              onMouseLeave={onTileLeave}
            >
              <div className="tile__media" aria-hidden>
                <img src={t.img} alt="" className="tile__img" />
                <span className="tile__overlay" />
                <span className="tile__glow" />
                <span className="tile__scan" />
              </div>

              <span className="tile__corner tile__corner--tl" aria-hidden />
              <span className="tile__corner tile__corner--tr" aria-hidden />
              <span className="tile__corner tile__corner--bl" aria-hidden />
              <span className="tile__corner tile__corner--br" aria-hidden />

              <span className="tile__title">
                <span className="tile__title-top">{t.titleTop}</span>
                <span className="tile__title-bot">{t.titleBot}</span>
              </span>

              <span className="tile__cta" aria-hidden>
                {t.cta}
                <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
                  <path d="M1 5h19m0 0L16 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
