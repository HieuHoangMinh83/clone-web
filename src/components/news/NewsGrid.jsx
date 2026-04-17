import { useEffect, useMemo, useState } from 'react'
import { NEWS_LIST } from './newsData.js'

const PER_PAGE = 6

export default function NewsGrid() {
  const [page, setPage] = useState(1)
  const [mount, setMount] = useState(false)
  const totalPages = Math.max(1, Math.ceil(NEWS_LIST.length / PER_PAGE))

  useEffect(() => {
    const r = requestAnimationFrame(() => setMount(true))
    return () => cancelAnimationFrame(r)
  }, [])

  const items = useMemo(() => {
    const start = (page - 1) * PER_PAGE
    return NEWS_LIST.slice(start, start + PER_PAGE)
  }, [page])

  return (
    <section className={`news-sec news-grid-sec ${mount ? 'is-in' : ''}`}>
      <div className="news-grid__bg" aria-hidden>
        <span className="news-grid__bg-grid" />
        <span className="news-grid__bg-watermark">N</span>
      </div>

      <div className="news-container">
        <header className="news-grid__head">
          <div className="news-grid__head-left">
            <span className="news-grid__eyebrow">
              <span className="news-grid__eyebrow-line" />
              TẤT CẢ BÀI VIẾT
            </span>
            <h2 className="news-grid__heading">
              <span>Bản tin</span> <strong>Newtecons</strong>
            </h2>
          </div>
          <div className="news-grid__meta">
            <span className="news-grid__meta-k">{NEWS_LIST.length.toString().padStart(2, '0')}</span>
            <span className="news-grid__meta-v">
              bài viết · Trang {page.toString().padStart(2, '0')}/{totalPages.toString().padStart(2, '0')}
            </span>
          </div>
        </header>

        <div className="news-grid__list">
          {items.map((p, i) => (
            <article key={p.title} className="post-card" style={{ '--i': i }}>
              <a className="post-card__link" href="#">
                <div className="post-card__media">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <span className="post-card__scrim" />
                  <span className="post-card__date">
                    <span className="post-card__day">{p.date.split('/')[0]}</span>
                    <span className="post-card__ym">
                      {p.date.split('/')[1]}/{p.date.split('/')[2]}
                    </span>
                  </span>
                </div>
                <div className="post-card__body">
                  <h3 className="post-card__title">{p.title}</h3>
                  <span className="post-card__more">
                    Đọc tiếp
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
                      <path
                        d="M1 5h11m0 0L8 1m4 4l-4 4"
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
          ))}
        </div>

        <nav className="news-grid__pager" aria-label="Phân trang">
          <button
            className="news-grid__pager-btn news-grid__pager-btn--nav"
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
            className="news-grid__pager-btn news-grid__pager-btn--nav"
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
