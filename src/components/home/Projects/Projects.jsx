import { useState, useEffect, useRef } from 'react'
import './Projects.css'

export default function Projects({
  ariaLabel,
  headerTop,
  headerBold,
  ctaLabel,
  ctaHref = '#',
  moreLabel,
  items = [],
}) {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="projects"
      ref={ref}
      className={`projects section ${visible ? 'is-visible' : ''}`}
      aria-label={ariaLabel}
    >
      <header className="projects__head">
        <div className="projects__head-inner">
          <h2 className="projects__title">
            {headerTop}
            <br />
            <strong>{headerBold}</strong>
          </h2>
          <a className="projects__cta" href={ctaHref}>
            {ctaLabel}
            <svg width="18" height="8" viewBox="0 0 18 8" fill="none">
              <path d="M1 4h15m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </header>

      <ul className="projects__rail">
        {items.map((p, i) => (
          <li
            key={p.id}
            className={`pcard ${i === active ? 'is-active' : ''}`}
            style={{ '--i': i }}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <button className="pcard__hit" aria-label={p.title.replace('\n', ' ')}>
              <div className="pcard__media" aria-hidden>
                <img className="pcard__img" src={p.img} alt="" />
                <div className="pcard__shade" />
              </div>

              <div className="pcard__body">
                <span className="pcard__cat">{p.cat}</span>
                <h3 className="pcard__title">
                  {p.title.split('\n').map((line, idx) => (
                    <span key={idx}>
                      {line}
                      {idx === 0 && p.title.includes('\n') && <br />}
                    </span>
                  ))}
                </h3>
                <span className="pcard__more" aria-hidden>
                  {moreLabel}
                  <svg width="18" height="8" viewBox="0 0 18 8" fill="none">
                    <path d="M1 4h15m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>

              <span className="pcard__vlabel" aria-hidden>
                {p.title.split('\n').map((line, idx) => (
                  <span key={idx}>
                    {line}
                    {idx === 0 && <br />}
                  </span>
                ))}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
