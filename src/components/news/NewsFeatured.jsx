import { useState } from 'react'
import { FEATURED, FEATURED_SUB, CATEGORIES } from './newsData.js'

export default function NewsFeatured() {
  const [active, setActive] = useState('all')

  return (
    <section className="news-sec news-featured">
      <div className="news-container">
        <header className="news-featured__head">
          <div>
            <span className="news-featured__kicker">— Nổi bật</span>
            <h2 className="news-featured__heading">
              <span>Tin tức</span> <strong>& sự kiện</strong>
            </h2>
          </div>
          <nav className="news-featured__tabs" aria-label="Danh mục tin tức">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                className={`news-featured__tab${active === c.key ? ' is-active' : ''}`}
                onClick={() => setActive(c.key)}
              >
                {c.label}
              </button>
            ))}
          </nav>
        </header>

        <div className="news-featured__grid">
          <article className="news-featured__hero">
            <a className="news-featured__hero-img" href="#">
              <img src={FEATURED.image} alt={FEATURED.title} loading="lazy" />
              <span className="news-featured__hero-badge">{FEATURED.category}</span>
            </a>
            <div className="news-featured__hero-body">
              <time className="news-featured__date">{FEATURED.date}</time>
              <h3 className="news-featured__hero-title">
                <a href="#">{FEATURED.title}</a>
              </h3>
              <p className="news-featured__hero-excerpt">{FEATURED.excerpt}</p>
              <a href="#" className="news-featured__more">
                Đọc tiếp
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </article>

          <div className="news-featured__side">
            {FEATURED_SUB.map((p) => (
              <article key={p.title} className="news-featured__mini">
                <a className="news-featured__mini-img" href="#">
                  <img src={p.image} alt={p.title} loading="lazy" />
                </a>
                <div className="news-featured__mini-body">
                  <time className="news-featured__date">{p.date}</time>
                  <h4 className="news-featured__mini-title">
                    <a href="#">{p.title}</a>
                  </h4>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
