import { useEffect, useRef, useState } from 'react'
import { FEATURED, FEATURED_SUB } from '../../news/newsData.js'
import './NewsFeatured.css'

function parseDate(s) {
  const [d, m, y] = s.split('/')
  return { d, m, y }
}

function CharReveal({ text, className = '', baseDelay = 0, stepMs = 28 }) {
  return (
    <span className={`nf-chars ${className}`} aria-hidden>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className="nf-chars__ch"
          style={{
            '--i': i,
            animationDelay: `${baseDelay + i * stepMs}ms`,
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  )
}

export default function NewsFeatured() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setInView(false)
          requestAnimationFrame(() =>
            requestAnimationFrame(() => setInView(true)),
          )
        } else {
          setInView(false)
        }
      },
      { threshold: 0.28 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const heroDate = parseDate(FEATURED.date)

  return (
    <section
      ref={sectionRef}
      className={`news-sec news-featured section ${inView ? 'is-in' : ''}`}
    >
      <div className="news-featured__bg" aria-hidden>
        <span className="news-featured__bg-grid" />
        <span className="news-featured__bg-orb" />
        <span className="news-featured__bg-n">N</span>
        <span className="news-featured__bg-n news-featured__bg-n--outline">N</span>
      </div>

      <div className="news-container">
        <header className="news-featured__head">
          <div className="news-featured__head-left">
            <h2 className="news-featured__heading" aria-label="Tin tức Newtecons">
              <span className="news-featured__heading-mask news-featured__heading-mask--single">
                <CharReveal text="TIN TỨC " baseDelay={260} stepMs={30} />
                <CharReveal
                  text="NEWTECONS"
                  className="news-featured__heading-row--accent"
                  baseDelay={540}
                  stepMs={30}
                />
              </span>
            </h2>
          </div>
          <a href="/tin-tuc" className="news-featured__all">
            <span className="news-featured__all-label">Xem tất cả tin</span>
            <span className="news-featured__all-arrow" aria-hidden>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path
                  d="M1 6h13m0 0L9 1m5 5l-5 5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </header>

        <div className="news-featured__grid">
          <article className="news-featured__hero">
            <a className="news-featured__hero-link" href={`/tin-tuc/${FEATURED.slug}`}>
              <div className="news-featured__hero-media">
                <img src={FEATURED.image} alt={FEATURED.title} loading="lazy" />
                <span className="news-featured__hero-shine" aria-hidden />
                <span className="news-featured__hero-tag">{FEATURED.category}</span>
              </div>
              <div className="news-featured__hero-body">
                <h3 className="news-featured__hero-title">{FEATURED.title}</h3>
                <span className="news-featured__hero-divider" aria-hidden />
                <p className="news-featured__hero-excerpt">{FEATURED.excerpt}</p>
                <div className="news-featured__hero-footer">
                  <span className="news-featured__hero-date">
                    {heroDate.d} Tháng {heroDate.m}, {heroDate.y}
                  </span>
                  <span className="news-featured__hero-arrow" aria-hidden>
                    <svg width="16" height="14" viewBox="0 0 20 14" fill="none">
                      <path
                        d="M1 7h17m0 0l-6-6m6 6l-6 6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          </article>

          <aside className="news-featured__side">
            <header className="news-featured__side-head">
              <span className="news-featured__side-eyebrow">Tin liên quan</span>
              <span className="news-featured__side-dash" aria-hidden />
            </header>
            <ol className="news-featured__side-list">
              {FEATURED_SUB.slice(0, 2).map((p, i) => {
                const dt = parseDate(p.date)
                return (
                  <li
                    key={p.slug}
                    className="news-featured__row"
                    style={{ '--i': i }}
                  >
                    <a className="news-featured__row-link" href={`/tin-tuc/${p.slug}`}>
                      <span className="news-featured__row-thumb">
                        <img src={p.image} alt="" loading="lazy" />
                        <span className="news-featured__row-shade" aria-hidden />
                      </span>
                      <span className="news-featured__row-body">
                        <span className="news-featured__row-date">
                          {dt.d} Tháng {dt.m}, {dt.y}
                        </span>
                        <h4 className="news-featured__row-title">{p.title}</h4>
                      </span>
                    </a>
                  </li>
                )
              })}
            </ol>
          </aside>
        </div>
      </div>
    </section>
  )
}
