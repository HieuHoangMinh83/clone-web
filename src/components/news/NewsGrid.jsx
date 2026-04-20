import { useEffect, useMemo, useState } from 'react'
import { CATEGORIES, NEWS_LIST } from './newsData.js'

// Tablet dọc dùng grid 2 cột → 4 tin lấp đầy 2×2. Desktop/landscape giữ 3 tin.
const TABLET_PORTRAIT_QUERY =
  '(min-width: 500px) and (max-width: 1199px) and (orientation: portrait)'

function usePerPage() {
  const getSize = () => {
    if (typeof window === 'undefined') return 3
    return window.matchMedia(TABLET_PORTRAIT_QUERY).matches ? 4 : 3
  }
  const [size, setSize] = useState(getSize)
  useEffect(() => {
    const mq = window.matchMedia(TABLET_PORTRAIT_QUERY)
    const handler = () => setSize(getSize())
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return size
}

function parseDate(s) {
  const [d, m, y] = s.split('/')
  return { d, m, y }
}

export default function NewsGrid() {
  const [page, setPage] = useState(1)
  const [cat, setCat] = useState('all')
  const [mount, setMount] = useState(false)
  const PER_PAGE = usePerPage()

  useEffect(() => {
    const r = requestAnimationFrame(() => setMount(true))
    return () => cancelAnimationFrame(r)
  }, [])

  const filtered = useMemo(() => {
    if (cat === 'all') return NEWS_LIST
    return NEWS_LIST.filter((p) => p.category === cat)
  }, [cat])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)

  const items = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE
    return filtered.slice(start, start + PER_PAGE)
  }, [filtered, currentPage])

  const onCat = (key) => {
    setCat(key)
    setPage(1)
  }

  return (
    <section className={`news-sec news-grid-sec section ${mount ? 'is-in' : ''}`}>
      <div className="news-grid__bg" aria-hidden>
        <span className="news-grid__bg-grid" />
        <span className="news-grid__bg-watermark">Newsroom</span>
      </div>

      <div className="news-container news-grid__container">
        <header className="news-grid__head">
          <div className="news-grid__head-left">
            
            <h2 className="news-grid__heading">
              Tin tức <em>Newtecons</em>
            </h2>
          </div>
          <div className="news-grid__tools">
            <div className="news-grid__filters" role="tablist">
              {CATEGORIES.map((c, i) => (
                <button
                  key={c.key}
                  className={`news-grid__filter${cat === c.key ? ' is-active' : ''}`}
                  style={{ '--i': i }}
                  onClick={() => onCat(c.key)}
                  role="tab"
                  aria-selected={cat === c.key}
                >
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="news-grid__list">
          {items.map((p, i) => {
            const dt = parseDate(p.date)
            return (
              <article key={p.slug} className="post-card" style={{ '--i': i }}>
                <a className="post-card__link" href={`/tin-tuc/${p.slug}`}>
                  <div className="post-card__media">
                    <img src={p.image} alt={p.title} loading="lazy" />
                    <span className="post-card__shine" aria-hidden />
                    <span className="post-card__date">
                      <span className="post-card__date-d">{dt.d}</span>
                      <span className="post-card__date-sep" aria-hidden />
                      <span className="post-card__date-my">{dt.m}.{dt.y}</span>
                    </span>
                  </div>
                  <div className="post-card__body">
                    <div className="post-card__kicker">
                      <span className="post-card__cat">{p.category}</span>
                      <span className="post-card__kicker-dot" aria-hidden />
                      <span className="post-card__rt">{p.readTime}</span>
                    </div>
                    <h3 className="post-card__title">{p.title}</h3>
                    <p className="post-card__excerpt">{p.excerpt}</p>
                    
                  </div>
                  <span className="post-card__rule" aria-hidden />
                </a>
              </article>
            )
          })}
          {items.length === 0 && (
            <p className="news-grid__empty">
              Chưa có bài viết cho chuyên mục này.
            </p>
          )}
        </div>

        {totalPages > 1 && (
          <nav className="news-grid__pager" aria-label="Phân trang">
            <button
              className="news-grid__pager-nav"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Trang trước"
            >
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 5H1m0 0l4-4M1 5l4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Trước</span>
            </button>
            <ol className="news-grid__pager-list">
              {Array.from({ length: totalPages }).map((_, i) => {
                const n = i + 1
                const active = currentPage === n
                return (
                  <li key={n}>
                    <button
                      className={`news-grid__pager-num${active ? ' is-active' : ''}`}
                      onClick={() => setPage(n)}
                      aria-current={active ? 'page' : undefined}
                    >
                      {n.toString().padStart(2, '0')}
                    </button>
                  </li>
                )
              })}
            </ol>
            <button
              className="news-grid__pager-nav"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Trang sau"
            >
              <span>Sau</span>
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 5h18m0 0l-4-4m4 4l-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </nav>
        )}
      </div>
    </section>
  )
}
