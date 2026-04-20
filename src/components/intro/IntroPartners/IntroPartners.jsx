import { useEffect, useRef, useState } from 'react'
import './IntroPartners.css'

export default function IntroPartners({
  bg,
  titleLine1,
  titleEm,
  titleTail,
  lead,
  stats = [],
  pullquote,
  logos = [],
}) {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.15)
      },
      { threshold: [0, 0.15, 0.3, 0.5] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`intro-sec intro-partners ${inView ? 'is-in' : ''}`}
    >
      <div
        className="intro-sec__bg intro-partners__bg"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="intro-partners__grain" aria-hidden />
      <span className="intro-partners__spine" aria-hidden />

      <div className="intro-container intro-partners__container">
        <header className="intro-partners__head">
          <h2 className="intro-partners__title">
            <span className="intro-partners__title-line intro-partners__title-line--1">
              {titleLine1}
            </span>
            <span className="intro-partners__title-line intro-partners__title-line--2">
              <em>{titleEm}</em> {titleTail}
            </span>
          </h2>

          <p className="intro-partners__lead">{lead}</p>
        </header>

        <section className="intro-partners__stats" aria-label="Thống kê">
          <span className="intro-partners__rule intro-partners__rule--top" aria-hidden />
          <div className="intro-partners__stats-row">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="intro-partners__stat"
                style={{ '--si': i }}
              >
                <div className="intro-partners__stat-value">{s.value}</div>
                <div className="intro-partners__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <span className="intro-partners__rule intro-partners__rule--bot" aria-hidden />
        </section>

        {pullquote && (
          <figure className="intro-partners__pullquote">
            <span className="intro-partners__pullquote-mark" aria-hidden>&ldquo;</span>
            <blockquote className="intro-partners__pullquote-body">
              {pullquote.body}
            </blockquote>
            <figcaption className="intro-partners__pullquote-attr">
              <span className="intro-partners__pullquote-name">{pullquote.name}</span>
              <span className="intro-partners__pullquote-role">{pullquote.role}</span>
            </figcaption>
          </figure>
        )}

        <div className="intro-partners__marquee-wrap" aria-hidden>
          <div className="intro-partners__marquee">
            <div className="intro-partners__marquee-track">
              {[...logos, ...logos].map((src, i) => (
                <div key={i} className="intro-partners__logo">
                  <img src={src} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
