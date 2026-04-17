import { useMemo, useState } from 'react'
import { NEWS_LIST } from '../newsData.js'

const PER_PAGE = 6

export default function NewsGrid() {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(NEWS_LIST.length / PER_PAGE))

  const items = useMemo(() => {
    const start = (page - 1) * PER_PAGE
    return NEWS_LIST.slice(start, start + PER_PAGE)
  }, [page])

  return (
    <section className="news-sec news-grid-sec">
      <div className="news-container">
        <header className="news-grid__head">
          <div>
            <span className="news-grid__kicker">— Tất cả bài viết</span>
            <h2 className="news-grid__heading">
              <strong>Tin tức</strong>
            </h2>
          </div>
          <div className="news-grid__count">
            {NEWS_LIST.length} bài viết · Trang {page}/{totalPages}
          </div>
        </header>

        <div className="news-grid__list">
          {items.map((p) => (
            <article key={p.title} className="post-card">
              <a className="post-card__img" href="#">
                <img src={p.image} alt={p.title} loading="lazy" />
                <span className="post-card__scrim" />
              </a>
              <div className="post-card__body">
                <div className="post-card__date">
                  <span className="post-card__day">{p.date.split('/')[0]}</span>
                  <span className="post-card__ym">
                    {p.date.split('/')[1]}/{p.date.split('/')[2]}
                  </span>
                </div>
                <h3 className="post-card__title">
                  <a href="#">{p.title}</a>
                </h3>
              </div>
            </article>
          ))}
        </div>

        <nav className="news-grid__pager" aria-label="Phân trang">
          <button
            className="news-grid__pager-btn"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Trang trước"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const n = i + 1
            return (
              <button
                key={n}
                className={`news-grid__pager-btn${page === n ? ' is-active' : ''}`}
                onClick={() => setPage(n)}
                aria-current={page === n ? 'page' : undefined}
              >
                {n.toString().padStart(2, '0')}
              </button>
            )
          })}
          <button
            className="news-grid__pager-btn"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Trang sau"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </nav>
      </div>
    </section>
  )
}
