import { useEffect, useRef, useState } from 'react'
import './SearchFilter.css'

// Drag-to-scroll cho dải tabs: giữ chuột kéo ngang khi có quá nhiều tab.
// Trả về { bind } để spread vào container, và ref để attach.
// Chặn click onClick con nếu user đã kéo đủ xa (>5px) — tránh chọn nhầm tab.
function useDragScroll() {
  const ref = useRef(null)
  const state = useRef({ down: false, startX: 0, startScroll: 0, moved: 0 })

  const onPointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    const el = ref.current
    if (!el) return
    if (el.scrollWidth <= el.clientWidth) return // không cần scroll
    state.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft, moved: 0 }
    el.setPointerCapture?.(e.pointerId)
    el.classList.add('is-dragging')
  }

  const onPointerMove = (e) => {
    const el = ref.current
    const s = state.current
    if (!el || !s.down) return
    const dx = e.clientX - s.startX
    s.moved = Math.max(s.moved, Math.abs(dx))
    el.scrollLeft = s.startScroll - dx
  }

  const endDrag = (e) => {
    const el = ref.current
    if (!el) return
    state.current.down = false
    if (e?.pointerId != null) el.releasePointerCapture?.(e.pointerId)
    el.classList.remove('is-dragging')
  }

  const onClickCapture = (e) => {
    if (state.current.moved > 5) {
      e.preventDefault()
      e.stopPropagation()
      state.current.moved = 0
    }
  }

  return {
    ref,
    bind: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onPointerLeave: endDrag,
      onClickCapture,
    },
  }
}

// Custom dropdown — thay thế native <select> để kiểm soát padding/styling
// của popup panel. Hỗ trợ keyboard: Arrow Up/Down, Enter, Escape.
function CustomSelect({ value, onChange, options, ariaLabel, onOpenChange }) {
  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(
    Math.max(0, options.findIndex((o) => o.key === value)),
  )
  const rootRef = useRef(null)
  const current = options.find((o) => o.key === value) || options[0]

  useEffect(() => {
    onOpenChange?.(open)
  }, [open, onOpenChange])

  useEffect(() => {
    if (!open) return
    const onDocClick = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        rootRef.current?.querySelector('.search-filter__select-trigger')?.focus()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIdx((i) => Math.min(options.length - 1, i + 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIdx((i) => Math.max(0, i - 1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        onChange(options[activeIdx].key)
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, activeIdx, options, onChange])

  const toggle = () => {
    setOpen((o) => !o)
    setActiveIdx(Math.max(0, options.findIndex((o) => o.key === value)))
  }

  return (
    <div
      ref={rootRef}
      className={`search-filter__select ${open ? 'is-open' : ''}`}
    >
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <path d="M7 1c2.5 0 4.5 2 4.5 4.5C11.5 8.5 7 13 7 13S2.5 8.5 2.5 5.5C2.5 3 4.5 1 7 1Z" />
        <circle cx="7" cy="5.5" r="1.5" />
      </svg>
      <button
        type="button"
        className="search-filter__select-trigger"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
      >
        {current?.label}
      </button>
      <svg className="search-filter__select-caret" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {open && (
        <ul
          className="search-filter__select-panel"
          role="listbox"
          aria-label={ariaLabel}
        >
          {options.map((o, i) => (
            <li
              key={o.key}
              role="option"
              aria-selected={o.key === value}
              className={`search-filter__select-option${
                o.key === value ? ' is-selected' : ''
              }${i === activeIdx ? ' is-active' : ''}`}
              onMouseEnter={() => setActiveIdx(i)}
              onClick={() => {
                onChange(o.key)
                setOpen(false)
              }}
            >
              <span>{o.label}</span>
              {o.key === value && (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden>
                  <path
                    d="M1 5l3.5 3.5L11 1.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/**
 * SearchFilter — khối bộ lọc chuẩn dùng chung cho các trang có danh sách:
 * ô tìm kiếm + dải tab danh mục + dropdown địa điểm / phân loại phụ.
 *
 * Props:
 * - query / onQueryChange: giá trị ô tìm kiếm
 * - searchPlaceholder:     placeholder ô tìm kiếm (mặc định "Tìm kiếm…")
 * - tabValue / onTabChange: lựa chọn đang active ở dải tab
 * - tabs:                  [{ key, label }] — danh sách tab
 * - selectValue / onSelectChange: giá trị dropdown bên phải
 * - selectOptions:         [{ key, label }] — option của dropdown
 * - selectAriaLabel:       aria-label cho dropdown (mặc định "Lọc")
 * - tabsAriaLabel:         aria-label cho tablist (mặc định "Danh mục")
 * - active:                true → chạy animation fade-up (mặc định true)
 */
export default function SearchFilter({
  query,
  onQueryChange,
  searchPlaceholder = 'Tìm kiếm…',
  tabValue,
  onTabChange,
  tabs = [],
  selectValue,
  onSelectChange,
  selectOptions = [],
  selectAriaLabel = 'Lọc',
  tabsAriaLabel = 'Danh mục',
  active = true,
}) {
  const tabsDrag = useDragScroll()
  const [selectOpen, setSelectOpen] = useState(false)

  return (
    <div
      className={`search-filter ${active ? 'is-in' : ''}${
        selectOpen ? ' is-open-panel' : ''
      }`}
    >
      <div className="search-filter__search">
        <svg width="14" height="14" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="6.5" cy="6.5" r="4.5" />
          <line x1="10" y1="10" x2="13.5" y2="13.5" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
        />
        {query && (
          <button
            className="search-filter__search-clear"
            onClick={() => onQueryChange('')}
            aria-label="Xoá từ khoá"
            type="button"
          >
            ×
          </button>
        )}
      </div>

      {tabs.length > 0 && (
        <div
          className="search-filter__tabs"
          role="tablist"
          aria-label={tabsAriaLabel}
          ref={tabsDrag.ref}
          {...tabsDrag.bind}
        >
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`search-filter__tab ${tabValue === t.key ? 'is-active' : ''}`}
              onClick={() => onTabChange(t.key)}
              role="tab"
              aria-selected={tabValue === t.key}
              type="button"
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {selectOptions.length > 0 && (
        <CustomSelect
          value={selectValue}
          onChange={onSelectChange}
          options={selectOptions}
          ariaLabel={selectAriaLabel}
          onOpenChange={setSelectOpen}
        />
      )}
    </div>
  )
}

const DEMO_TABS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'build', label: 'Xây dựng' },
  { key: 'mep', label: 'Cơ điện' },
  { key: 'infra', label: 'Hạ tầng' },
  { key: 'interior', label: 'Nội thất' },
]

const DEMO_OPTIONS = [
  { key: 'all', label: 'Toàn quốc' },
  { key: 'hn', label: 'Hà Nội' },
  { key: 'hcm', label: 'TP. Hồ Chí Minh' },
  { key: 'dn', label: 'Đà Nẵng' },
]

export function SearchFilterDemo() {
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState('all')
  const [loc, setLoc] = useState('all')

  return (
    <div
      style={{
        minHeight: 480,
        display: 'grid',
        placeItems: 'center',
        padding: '64px 24px',
        background: 'linear-gradient(180deg, #fafcff 0%, #eef2f8 100%)',
      }}
    >
      <div style={{ width: '100%', maxWidth: 960, display: 'grid', gap: 40 }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              color: '#c6a15b',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.32em',
              marginBottom: 14,
              fontFamily: 'JetBrains Mono, ui-monospace, monospace',
            }}
          >
            DEMO · SEARCH FILTER
          </div>
          <div
            style={{
              fontFamily: 'serif',
              fontSize: 24,
              color: '#0a1938',
              fontStyle: 'italic',
            }}
          >
            Ô tìm kiếm · Tab danh mục · Dropdown phụ
          </div>
        </div>

        <SearchFilter
          query={query}
          onQueryChange={setQuery}
          searchPlaceholder="Tìm theo từ khoá…"
          tabValue={tab}
          onTabChange={setTab}
          tabs={DEMO_TABS}
          tabsAriaLabel="Danh mục"
          selectValue={loc}
          onSelectChange={setLoc}
          selectOptions={DEMO_OPTIONS}
          selectAriaLabel="Địa điểm"
        />

        <div
          style={{
            textAlign: 'center',
            color: '#5b6574',
            fontSize: 13,
            fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          }}
        >
          query: <strong>{query || '—'}</strong>
          {'  ·  '}
          tab: <strong>{tab}</strong>
          {'  ·  '}
          select: <strong>{loc}</strong>
        </div>

        <div
          style={{
            textAlign: 'center',
            color: '#8791a3',
            fontSize: 10.5,
            fontFamily: 'JetBrains Mono, ui-monospace, monospace',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
          }}
        >
          Variant · Search only
        </div>

        <SearchFilter
          query={query}
          onQueryChange={setQuery}
          searchPlaceholder="Chỉ ô tìm kiếm (không tabs / select)…"
        />
      </div>
    </div>
  )
}
