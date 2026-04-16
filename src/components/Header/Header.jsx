import { useEffect, useRef, useState } from 'react'
import './Header.css'

const LINKS = [
  { key: 'home', href: '#/', label: 'Trang chủ', desc: 'Tổng quan Newtecons' },
  { key: 'intro', href: '#/gioi-thieu', label: 'Giới thiệu', desc: 'Câu chuyện & đội ngũ' },
  { key: 'fields', href: '#/linh-vuc', label: 'Lĩnh vực', desc: 'Dịch vụ & năng lực' },
]

function getRouteKey() {
  const h = (typeof window !== 'undefined' ? window.location.hash : '') || ''
  if (h.startsWith('#/gioi-thieu')) return 'intro'
  if (h.startsWith('#/linh-vuc')) return 'fields'
  return 'home'
}

const CLOSE_DELAY = 280

export default function Header() {
  const [open, setOpen] = useState(false)
  const [activeKey, setActiveKey] = useState(getRouteKey)
  const closeTimer = useRef(null)

  useEffect(() => {
    const onHash = () => {
      setActiveKey(getRouteKey())
      setOpen(false)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY)
  }

  return (
    <>
      <header className="nav">
        <div className="nav__inner">
          <a href="#/" className="nav__logo" aria-label="Trang chủ">
            <span className="nav__logo-mark">N</span>
            <span className="nav__logo-text">NEWTECONS</span>
          </a>

          <div className="nav__actions">
            <button className="nav__icon" aria-label="Tìm kiếm">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="6.5" cy="6.5" r="4.5" />
                <line x1="10" y1="10" x2="13.5" y2="13.5" strokeLinecap="round" />
              </svg>
            </button>
            <button
              className={`nav__icon nav__burger${open ? ' is-open' : ''}`}
              aria-label={open ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={open}
              aria-controls="site-drawer"
              onMouseEnter={() => { cancelClose(); setOpen(true) }}
              onFocus={() => { cancelClose(); setOpen(true) }}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`nav-drawer-backdrop${open ? ' is-visible' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      <aside
        id="site-drawer"
        className={`nav-drawer${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Điều hướng chính"
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <div className="nav-drawer__head">
          <div className="nav-drawer__brand">
            <span className="nav-drawer__mark">N</span>
            <div>
              <div className="nav-drawer__brand-name">NEWTECONS</div>
              <div className="nav-drawer__brand-tag">Build on trust</div>
            </div>
          </div>
          <button
            className="nav-drawer__close"
            aria-label="Đóng menu"
            onClick={() => setOpen(false)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="nav-drawer__nav" aria-label="Menu">
          <ul>
            {LINKS.map((link, i) => (
              <li
                key={link.key}
                className={`nav-drawer__item${activeKey === link.key ? ' is-active' : ''}`}
                style={{ '--i': i }}
              >
                <a href={link.href} onClick={() => setOpen(false)}>
                  <span className="nav-drawer__item-idx">0{i + 1}</span>
                  <span className="nav-drawer__item-body">
                    <span className="nav-drawer__item-label">{link.label}</span>
                    <span className="nav-drawer__item-desc">{link.desc}</span>
                  </span>
                  <svg
                    className="nav-drawer__item-arrow"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <footer className="nav-drawer__foot">
          <div className="nav-drawer__foot-title">Liên hệ</div>
          <a href="tel:+842835146699">(+84) 28 3514 6699</a>
          <a href="mailto:contact@newtecons.vn">contact@newtecons.vn</a>
          <div className="nav-drawer__copy">© 2021 Newtecons</div>
        </footer>
      </aside>
    </>
  )
}
