import { useEffect, useState } from 'react'
import { FEATURED, FEATURED_SUB } from './newsData.js'

export default function NewsFeatured() {
  const [mount, setMount] = useState(false)
  useEffect(() => {
    const r = requestAnimationFrame(() => setMount(true))
    return () => cancelAnimationFrame(r)
  }, [])

  return (
    <section className={`news-sec news-featured ${mount ? 'is-in' : ''}`}>
      <div className="news-featured__bg" aria-hidden>
        <span className="news-featured__bg-orb" />
        <span className="news-featured__bg-grid" />
      </div>

      <div className="news-container">
        <header className="news-featured__head">
          <div className="news-featured__head-left">
            <span className="news-featured__eyebrow">
              <span className="news-featured__eyebrow-line" />
              NỔI BẬT
            </span>
            <h2 className="news-featured__heading" aria-label="Tin tức nổi bật">
              <span className="news-featured__heading-mask">
                <span className="news-featured__heading-row">Điểm tin</span>
              </span>
              <span className="news-featured__heading-mask">
                <span className="news-featured__heading-row news-featured__heading-row--accent">
                  <em>nổi bật</em>
                </span>
              </span>
            </h2>
          </div>
          <a href="#" className="news-featured__all">
            <span>XEM TẤT CẢ TIN</span>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
              <path
                d="M1 5h11m0 0L8 1m4 4l-4 4"
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
            <a className="news-featured__hero-link" href="#">
              <div className="news-featured__hero-media">
                <img src={FEATURED.image} alt={FEATURED.title} loading="lazy" />
                <span className="news-featured__hero-badge" aria-hidden>N</span>
                <span className="news-featured__hero-cat">{FEATURED.category}</span>
                <span className="news-featured__hero-shine" aria-hidden />
              </div>
              <div className="news-featured__hero-body">
                <time className="news-featured__hero-date">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke="currentColor" />
                    <path d="M4 1v3M10 1v3M1.5 6H12.5" stroke="currentColor" strokeLinecap="round" />
                  </svg>
                  {FEATURED.date}
                </time>
                <h3 className="news-featured__hero-title">{FEATURED.title}</h3>
                <p className="news-featured__hero-excerpt">{FEATURED.excerpt}</p>
                <span className="news-featured__hero-more">
                  Đọc tiếp
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
                    <path
                      d="M1 5h13m0 0L10 1m4 4l-4 4"
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

          <div className="news-featured__side">
            {FEATURED_SUB.map((p, i) => (
              <article
                key={p.title}
                className="news-featured__mini"
                style={{ '--i': i }}
              >
                <a className="news-featured__mini-link" href="#">
                  <div className="news-featured__mini-media">
                    <img src={p.image} alt={p.title} loading="lazy" />
                    <span className="news-featured__mini-shine" aria-hidden />
                  </div>
                  <div className="news-featured__mini-body">
                    <time className="news-featured__mini-date">{p.date}</time>
                    <h4 className="news-featured__mini-title">{p.title}</h4>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
