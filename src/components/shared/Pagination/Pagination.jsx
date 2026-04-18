import { useState } from 'react'
import './Pagination.css'

function getPageRange(current, total, siblings = 1) {
  const totalSlots = siblings * 2 + 5
  if (total <= totalSlots) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const left = Math.max(current - siblings, 1)
  const right = Math.min(current + siblings, total)
  const showLeftDots = left > 2
  const showRightDots = right < total - 1

  if (!showLeftDots && showRightDots) {
    const range = Array.from({ length: 3 + siblings * 2 }, (_, i) => i + 1)
    return [...range, '…', total]
  }
  if (showLeftDots && !showRightDots) {
    const start = total - (3 + siblings * 2) + 1
    const range = Array.from({ length: 3 + siblings * 2 }, (_, i) => start + i)
    return [1, '…', ...range]
  }
  const middle = Array.from({ length: right - left + 1 }, (_, i) => left + i)
  return [1, '…', ...middle, '…', total]
}

export default function Pagination({
  current = 1,
  total = 1,
  onChange = () => {},
  siblings = 1,
  tone = 'light',
}) {
  if (total <= 1) return null
  const pages = getPageRange(current, total, siblings)
  const go = (p) => {
    if (p < 1 || p > total || p === current) return
    onChange(p)
  }

  return (
    <nav className={`pg pg--${tone}`} aria-label="Phân trang">
      <button
        type="button"
        className="pg__arrow"
        onClick={() => go(current - 1)}
        disabled={current === 1}
        aria-label="Trang trước"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden>
          <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <ol className="pg__list" role="list">
        {pages.map((p, i) =>
          p === '…' ? (
            <li key={`dots-${i}`} className="pg__dots" aria-hidden>…</li>
          ) : (
            <li key={p}>
              <button
                type="button"
                className={`pg__num${p === current ? ' is-active' : ''}`}
                onClick={() => go(p)}
                aria-current={p === current ? 'page' : undefined}
                aria-label={`Trang ${p}`}
              >
                {p}
              </button>
            </li>
          )
        )}
      </ol>

      <button
        type="button"
        className="pg__arrow"
        onClick={() => go(current + 1)}
        disabled={current === total}
        aria-label="Trang sau"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden>
          <path d="M10 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </nav>
  )
}

export function PaginationDemo() {
  const [page, setPage] = useState(3)
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
      <div style={{ width: '100%', maxWidth: 720, display: 'grid', gap: 56 }}>
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
            DEMO · PAGINATION
          </div>
          <div
            style={{
              fontFamily: 'serif',
              fontSize: 24,
              color: '#0a1938',
              fontStyle: 'italic',
            }}
          >
            Minimal one-line pagination
          </div>
        </div>

        <Pagination current={page} total={12} onChange={setPage} />

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
          Variant · Dark
        </div>
        <div style={{ background: '#0a1938', padding: '40px 24px', borderRadius: 4 }}>
          <Pagination current={page} total={12} onChange={setPage} tone="dark" />
        </div>
      </div>
    </div>
  )
}
