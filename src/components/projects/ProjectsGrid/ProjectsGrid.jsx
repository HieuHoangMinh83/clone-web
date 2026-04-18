import { useMemo, useState } from 'react'
import { CATEGORIES, PROJECTS } from '../projectsData.js'
import './ProjectsGrid.css'

const PER_PAGE = 9

// Editorial bento pattern — 9 cards per page, visual rhythm:
// Row 1-2: [ BIG 7×2 ]  [ small 5 ]
//                       [ small 5 ]
// Row 3-4: [ small 5 ]  [ BIG 7×2 ]   (mirror)
//          [ small 5 ]
// Row 5:   [ third 4 ] [ third 4 ] [ third 4 ]
// Sizes: big (7col × 2row), small (5col × 1row), third (4col × 1row)
const SIZE_PATTERN = [
  'big',
  'small',
  'small',
  'small',
  'big',
  'small',
  'third',
  'third',
  'third',
]

export default function ProjectsGrid() {
  const [cat, setCat] = useState('all')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (cat === 'all') return PROJECTS
    return PROJECTS.filter((p) => p.category === cat)
  }, [cat])

  const categoryCounts = useMemo(() => {
    const counts = { all: PROJECTS.length }
    for (const c of CATEGORIES) {
      if (c.key === 'all') continue
      counts[c.key] = PROJECTS.filter((p) => p.category === c.key).length
    }
    return counts
  }, [])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)

  const items = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE
    return filtered.slice(start, start + PER_PAGE)
  }, [filtered, currentPage])

  const globalIndex = (i) => (currentPage - 1) * PER_PAGE + i

  const onCat = (key) => {
    setCat(key)
    setPage(1)
  }

  return (
    <section id="du-an-danh-muc" className="prj-sec prj-mag">
      <div className="prj-container">
        <header className="prj-mag__head">
          <div>
            <span className="prj-mag__eyebrow">
              <span className="prj-mag__eyebrow-line" aria-hidden />
              <span>Danh mục công trình</span>
            </span>
            <h2 className="prj-mag__heading">
              Tinh tuyển <em>công trình</em>
              <span className="prj-mag__heading-amp"> · </span>
              <em>một thập kỷ</em>
            </h2>
          </div>
          <div>
            <p className="prj-mag__intro">
              Mỗi công trình là một câu chuyện riêng — về Chủ đầu tư đã đặt
              niềm tin, về kỹ sư Newtecons đã dồn tâm huyết, và về một góc
              đô thị được kiến tạo.
            </p>
            <span className="prj-mag__intro-sign">
              — Ban Truyền thông Newtecons
            </span>
          </div>
        </header>

        <div className="prj-mag__filters" role="tablist">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={`prj-mag__filter${cat === c.key ? ' is-active' : ''}`}
              onClick={() => onCat(c.key)}
              role="tab"
              aria-selected={cat === c.key}
              data-count={String(categoryCounts[c.key] ?? 0).padStart(2, '0')}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="prj-mag__grid">
          {items.map((p, i) => {
            const size = SIZE_PATTERN[i % SIZE_PATTERN.length]
            const gi = globalIndex(i)
            return (
              <a
                key={p.slug}
                href={`/du-an/${p.slug}`}
                className={`prj-card prj-card--${size}`}
                style={{ '--i': i }}
              >
                <div className="prj-card__frame">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <span className="prj-card__shine" aria-hidden />
                  <span className="prj-card__no">
                    <em>N°</em>
                    {String(gi + 1).padStart(2, '0')}
                  </span>
                  <span className="prj-card__cat-chip">{p.categoryLabel}</span>
                  <div className="prj-card__overlay">
                    <span className="prj-card__location">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path d="M12 21s-7-7.5-7-12a7 7 0 1114 0c0 4.5-7 12-7 12z" strokeLinejoin="round" />
                        <circle cx="12" cy="9" r="2.2" />
                      </svg>
                      <span>{p.location}</span>
                    </span>
                    <h3 className="prj-card__title">{p.title}</h3>
                  </div>
                </div>
                <div className="prj-card__body">
                  <div className="prj-card__meta">
                    <span className="prj-card__client">{p.client}</span>
                    <span className="prj-card__role">{p.role} · {p.scale}</span>
                  </div>
                  <span className="prj-card__year">
                    <em>Year</em>
                    {p.year}
                  </span>
                </div>
              </a>
            )
          })}
        </div>

        {totalPages > 1 && (
          <nav className="prj-mag__pager" aria-label="Phân trang">
            <button
              className="prj-mag__pager-nav"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 5H1m0 0l4-4M1 5l4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Trang trước</span>
            </button>
            <span className="prj-mag__pager-count">
              <strong>{String(currentPage).padStart(2, '0')}</strong>
              <span>/ {String(totalPages).padStart(2, '0')}</span>
            </span>
            <button
              className="prj-mag__pager-nav"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <span>Trang sau</span>
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
