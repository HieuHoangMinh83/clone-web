import { useEffect, useMemo, useRef, useState } from 'react'
import SearchFilter from '../../components/shared/SearchFilter/SearchFilter.jsx'
import { CATEGORIES, COMPONENTS } from './registry.jsx'
import './ComponentLibrary.css'

// ============================================================
// ComponentLibrary — trang quản lý toàn bộ component hệ thống.
// Library view: grid card + category filter + pagination.
// Detail view: full-screen render + sidebar + toggle UI.
// ============================================================

const PAGE_SIZE = 6 // 3 cols × 2 rows

export default function ComponentLibrary() {
  const [activeId, setActiveId] = useState(null)

  // ESC / arrow keys để navigate detail view
  useEffect(() => {
    if (!activeId) return
    const list = COMPONENTS
    const onKey = (e) => {
      if (e.key === 'Escape') setActiveId(null)
      if (e.key === 'ArrowLeft') {
        const i = list.findIndex((c) => c.id === activeId)
        if (i > 0) setActiveId(list[i - 1].id)
      }
      if (e.key === 'ArrowRight') {
        const i = list.findIndex((c) => c.id === activeId)
        if (i < list.length - 1) setActiveId(list[i + 1].id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeId])

  if (activeId) {
    return <DetailView activeId={activeId} setActiveId={setActiveId} />
  }
  return <LibraryView setActiveId={setActiveId} />
}

// ============================================================
// Library view — Grid cards + Category filter + Pagination
// ============================================================
function LibraryView({ setActiveId }) {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)

  const filterTabs = useMemo(
    () =>
      CATEGORIES.map((c) => {
        const count =
          c.id === 'all'
            ? COMPONENTS.length
            : COMPONENTS.filter((x) => x.category === c.id).length
        return { key: c.id, label: `${c.label} · ${count}` }
      }),
    [],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return COMPONENTS.filter((c) => {
      if (category !== 'all' && c.category !== category) return false
      if (q) {
        const hay = `${c.name} ${c.tag} ${c.subtitle || ''} ${c.desc || ''}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [category, query])
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const visible = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  // reset page khi đổi category / query
  useEffect(() => {
    setPage(0)
  }, [category, query])

  return (
    <div className="cl">
      <header className="cl__bar">
        <div className="cl__bar-filter">
          <SearchFilter
            query={query}
            onQueryChange={setQuery}
            searchPlaceholder="Tìm theo tên, tag, mô tả…"
            tabValue={category}
            onTabChange={setCategory}
            tabs={filterTabs}
            tabsAriaLabel="Danh mục"
          />
        </div>
      </header>

      <main className="cl__grid" key={`${category}-${page}`}>
        {visible.map((comp) => (
          <div
            key={comp.id}
            role="button"
            tabIndex={0}
            className="cl__card"
            onClick={() => setActiveId(comp.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setActiveId(comp.id)
              }
            }}
          >
            <div className="cl__card-thumb">
              <ComponentMiniPreview component={comp} />
            </div>
            <div className="cl__card-body">
              <div className="cl__card-head">
                <span className="cl__card-tag">&lt;{comp.tag} /&gt;</span>
                <h3 className="cl__card-name">{comp.name}</h3>
              </div>
              <p className="cl__card-sub">{comp.subtitle}</p>
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <p className="cl__empty">Chưa có component nào trong danh mục này.</p>
        )}
      </main>

      {totalPages > 1 && (
        <nav className="cl__pager" aria-label="Phân trang">
          <button
            type="button"
            className="cl__pager-btn"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            aria-label="Trang trước"
          >
            ←
          </button>
          <div className="cl__pager-dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`cl__pager-dot ${i === page ? 'is-active' : ''}`}
                onClick={() => setPage(i)}
                aria-current={i === page ? 'page' : undefined}
              >
                {String(i + 1).padStart(2, '0')}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="cl__pager-btn"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            aria-label="Trang sau"
          >
            →
          </button>
        </nav>
      )}
    </div>
  )
}

// ============================================================
// Detail view — Full-screen render + Sidebar + Collapse toggle
// ============================================================
function DetailView({ activeId, setActiveId }) {
  const current = COMPONENTS.find((c) => c.id === activeId) || COMPONENTS[0]
  const idx = COMPONENTS.findIndex((c) => c.id === activeId)
  const prev = idx > 0 ? COMPONENTS[idx - 1] : null
  const next = idx < COMPONENTS.length - 1 ? COMPONENTS[idx + 1] : null

  const [uiCollapsed, setUiCollapsed] = useState(false)

  // F để toggle fullscreen
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        setUiCollapsed((c) => !c)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Nhóm sidebar theo category
  const groups = useMemo(() => {
    const map = new Map()
    CATEGORIES.filter((c) => c.id !== 'all').forEach((c) => map.set(c.id, { ...c, items: [] }))
    COMPONENTS.forEach((comp) => {
      const g = map.get(comp.category)
      if (g) g.items.push(comp)
    })
    return Array.from(map.values()).filter((g) => g.items.length > 0)
  }, [])

  return (
    <div className={`cl-det ${uiCollapsed ? 'is-collapsed' : ''}`}>
      <header className="cl-det__bar">
        <div className="cl-det__bar-left">
          <button className="cl-det__back" onClick={() => setActiveId(null)}>
            ← Thư viện
          </button>
          <div className="cl-det__title">
            <span className="cl-det__tag">&lt;{current.tag} /&gt;</span>
            <h2>{current.name}</h2>
            <span className="cl-det__sub">{current.subtitle}</span>
          </div>
        </div>
        <div className="cl-det__nav">
          <button
            className="cl-det__nav-btn"
            disabled={!prev}
            onClick={() => prev && setActiveId(prev.id)}
            title={prev ? `Trước: ${prev.name}` : 'Đầu'}
          >
            ←
          </button>
          <span className="cl-det__nav-count">{idx + 1} / {COMPONENTS.length}</span>
          <button
            className="cl-det__nav-btn"
            disabled={!next}
            onClick={() => next && setActiveId(next.id)}
            title={next ? `Sau: ${next.name}` : 'Cuối'}
          >
            →
          </button>
          <span className="cl-det__nav-sep" aria-hidden />
          <button
            className="cl-det__nav-btn cl-det__nav-btn--fs"
            onClick={() => setUiCollapsed(true)}
            title="Ẩn bảng điều khiển (F)"
            aria-label="Ẩn bảng điều khiển"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M1 5V1h4M13 5V1H9M1 9v4h4M13 9v4H9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </header>

      <div className="cl-det__body">
        <aside className="cl-det__side" aria-label="Danh sách component">
          {groups.map((g) => (
            <div key={g.id} className="cl-det__group">
              <div className="cl-det__group-head">{g.label}</div>
              <ul>
                {g.items.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      className={`cl-det__side-item ${c.id === activeId ? 'is-active' : ''}`}
                      onClick={() => setActiveId(c.id)}
                    >
                      <span className="cl-det__side-tag">&lt;{c.tag}&gt;</span>
                      <strong>{c.name}</strong>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="cl-det__side-foot">
            <span className="cl-det__side-kicker">Về component</span>
            <p>{current.desc}</p>
            <span className="cl-det__side-path">{current.path}</span>
          </div>
        </aside>

        <main className="cl-det__stage" key={activeId}>
          {current.render()}
        </main>
      </div>

      {uiCollapsed && (
        <button
          type="button"
          className="cl-det__expand"
          onClick={() => setUiCollapsed(false)}
          title="Hiện bảng điều khiển (F)"
          aria-label="Hiện bảng điều khiển"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M6 2H2v4M14 6V2h-4M2 10v4h4M10 14h4v-4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

// ============================================================
// ComponentMiniPreview — scale render thật xuống thumbnail
// ============================================================
function ComponentMiniPreview({ component }) {
  const hostRef = useRef(null)
  const [scale, setScale] = useState(0.22)
  const [playKey, setPlayKey] = useState(0)

  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    const update = () => {
      const w = el.getBoundingClientRect().width
      if (w > 0) setScale(w / 1440)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const replay = () => setPlayKey((k) => k + 1)

  return (
    <div
      ref={hostRef}
      className="cl-mini"
      onMouseEnter={replay}
      onFocus={replay}
      aria-hidden
    >
      <div className="cl-mini__stage" style={{ transform: `scale(${scale})` }}>
        <div key={playKey}>{component.render()}</div>
      </div>
    </div>
  )
}
