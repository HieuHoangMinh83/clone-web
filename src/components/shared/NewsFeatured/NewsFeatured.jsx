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
      className={`news-sec news-featured ${inView ? 'is-in' : ''}`}
    >


      <div className="news-container">
        <header className="news-featured__head">
          <div className="news-featured__head-left">
            <h2 className="news-featured__heading" aria-label="Tin nổi bật tuần này">
              <span className="news-featured__heading-mask">
                <CharReveal text="Tin nổi bật" baseDelay={260} stepMs={30} />
              </span>
              <span className="news-featured__heading-mask news-featured__heading-mask--accent">
                <CharReveal
                  text="tuần này"
                  className="news-featured__heading-row--accent"
                  baseDelay={640}
                  stepMs={36}
                />
                <span className="news-featured__heading-underline" aria-hidden />
              </span>
            </h2>
          </div>
          <a href="#/tin-tuc" className="news-featured__all">
            <span>Xem tất cả tin</span>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
              <path
                d="M1 6h13m0 0L9 1m5 5l-5 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </header>

        <div className="news-featured__grid">
          <article className="news-featured__hero">
            <a className="news-featured__hero-link" href={`#/tin-tuc/${FEATURED.slug}`}>
              <div className="news-featured__hero-media">
                <img src={FEATURED.image} alt={FEATURED.title} loading="lazy" />
                <span className="news-featured__hero-shine" aria-hidden />
                <span className="news-featured__hero-tag">{FEATURED.category}</span>
                <span className="news-featured__hero-datestamp" aria-hidden>
                  <span className="news-featured__hero-d">{heroDate.d}</span>
                  <span className="news-featured__hero-my">
                    TH{heroDate.m} · {heroDate.y}
                  </span>
                </span>
              </div>
              <div className="news-featured__hero-body">
                <span className="news-featured__hero-meta">
                  <span className="dot" aria-hidden />
                  <span>{FEATURED.author}</span>
                  <span className="sep" aria-hidden>·</span>
                  <span>{FEATURED.readTime}</span>
                </span>
                <h3 className="news-featured__hero-title">{FEATURED.title}</h3>
                <p className="news-featured__hero-excerpt">{FEATURED.excerpt}</p>
                <span className="news-featured__hero-cta">
                  <span>Đọc bài viết</span>
                  <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden>
                    <path
                      d="M1 6h19m0 0l-5-5m5 5l-5 5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </a>
          </article>

          <aside className="news-featured__side">
            <header className="news-featured__side-head">
              <span className="news-featured__side-eyebrow">Tin liên quan</span>
              <span className="news-featured__side-dash" aria-hidden />
            </header>
            <ol className="news-featured__side-list">
              {FEATURED_SUB.map((p, i) => {
                const dt = parseDate(p.date)
                return (
                  <li
                    key={p.slug}
                    className="news-featured__row"
                    style={{ '--i': i }}
                  >
                    <a className="news-featured__row-link" href={`#/tin-tuc/${p.slug}`}>
                      <span className="news-featured__row-num" aria-hidden>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="news-featured__row-thumb">
                        <img src={p.image} alt="" loading="lazy" />
                      </span>
                      <span className="news-featured__row-body">
                        <span className="news-featured__row-meta">
                          <span className="news-featured__row-cat">{p.category}</span>
                          <span className="sep" aria-hidden>·</span>
                          <span className="news-featured__row-date">
                            {dt.d}/{dt.m}/{dt.y}
                          </span>
                        </span>
                        <h4 className="news-featured__row-title">{p.title}</h4>
                      </span>
                      <span className="news-featured__row-arrow" aria-hidden>
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                          <path
                            d="M1 5h11m0 0L8 1m4 4l-4 4"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
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
