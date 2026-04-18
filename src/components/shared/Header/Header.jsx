import { useEffect, useRef, useState } from 'react'
import './Header.css'

const LINKS = [
  { key: 'home', href: '#/', label: 'Trang chủ' },
  { key: 'intro', href: '#/gioi-thieu', label: 'Giới thiệu' },
  { key: 'fields', href: '#/linh-vuc', label: 'Lĩnh vực hoạt động' },
  { key: 'projects', href: '#/du-an', label: 'Dự án' },
  { key: 'news', href: '#/tin-tuc', label: 'Tin tức' },
  { key: 'recruit', href: '#/tuyen-dung', label: 'Tuyển dụng' },
  { key: 'contact', href: '#/lien-he', label: 'Liên hệ' },
  { key: 'news-builder', href: '#/tin-tuc-builder', label: 'Thiết kế tin tức' },
]

function getRouteKey() {
  const h = (typeof window !== 'undefined' ? window.location.hash : '') || ''
  if (h.startsWith('#/gioi-thieu')) return 'intro'
  if (h.startsWith('#/linh-vuc')) return 'fields'
  if (h.startsWith('#/du-an')) return 'projects'
  if (h.startsWith('#/tin-tuc-builder')) return 'news-builder'
  if (h.startsWith('#/tin-tuc')) return 'news'
  if (h.startsWith('#/tuyen-dung')) return 'recruit'
  if (h.startsWith('#/lien-he')) return 'contact'
  return 'home'
}

const CLOSE_DELAY = 280

/**
 * Header
 * @param {string} variant - 'default' | 'navy' | 'dark' | 'light' | 'gold' | 'transparent'
 * @param {object} navStyle - inline style để override trực tiếp (vd set --nav-bg, color, height)
 */
export default function Header({ variant = 'default', navStyle }) {
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
      <header className={`nav nav--${variant}`} style={navStyle}>
        <div className="nav__inner">
          <a href="#/" className="nav__logo" aria-label="Trang chủ">
            <span className="nav__logo-mark">
              <svg className="nav__logo-n" viewBox="0 0 145.8 175" aria-hidden>
                <defs>
                  <linearGradient id="n-left" x1="0" y1="0" x2="0" y2="175" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="var(--teal-500)" />
                    <stop offset="100%" stopColor="#fff" />
                  </linearGradient>
                  <linearGradient id="n-right" x1="145.8" y1="175" x2="145.8" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="var(--teal-500)" />
                    <stop offset="100%" stopColor="#fff" />
                  </linearGradient>
                </defs>
                <polygon
                  className="nav__n-left"
                  points="43.74 21.87 102.06 117.3 102.06 76.34 55.4 0 0 0 0 174.96 21.87 174.96 54.67 174.96 54.67 153.09 21.87 153.09 21.87 21.87 43.74 21.87"
                  fill="url(#n-left)"
                />
                <polygon
                  className="nav__n-right"
                  points="102.06 153.09 43.74 57.66 43.74 98.61 90.39 174.96 145.8 174.96 145.8 0 123.93 0 91.12 0 91.12 21.87 123.93 21.87 123.93 153.09 102.06 153.09"
                  fill="url(#n-right)"
                />
              </svg>
            </span>
            <span className="nav__logo-text">
              {'NEWTECONS'.split('').map((ch, i) => (
                <span key={i} className="nav__logo-char" style={{ '--ci': i }}>
                  {ch}
                </span>
              ))}
              <span className="nav__logo-cursor" aria-hidden />
              <span className="nav__logo-shimmer" aria-hidden />
            </span>
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
        <svg className="nav-drawer__watermark" viewBox="0 0 145.8 175" aria-hidden>
          <polygon
            points="43.74 21.87 102.06 117.3 102.06 76.34 55.4 0 0 0 0 174.96 21.87 174.96 54.67 174.96 54.67 153.09 21.87 153.09 21.87 21.87 43.74 21.87"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <polygon
            points="102.06 153.09 43.74 57.66 43.74 98.61 90.39 174.96 145.8 174.96 145.8 0 123.93 0 91.12 0 91.12 21.87 123.93 21.87 123.93 153.09 102.06 153.09"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>

        <div className="nav-drawer__head">
          <button className="nav-drawer__icon" aria-label="Tìm kiếm">
            <svg width="18" height="18" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="6.5" cy="6.5" r="4.5" />
              <line x1="10" y1="10" x2="13.5" y2="13.5" strokeLinecap="round" />
            </svg>
          </button>
          <button
            className="nav-drawer__icon nav-drawer__close"
            aria-label="Đóng menu"
            onClick={() => setOpen(false)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
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
                  <span className="nav-drawer__item-label">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <footer className="nav-drawer__foot">
          <a className="nav-drawer__social" href="#" aria-label="Facebook">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.5-1.5h1.6V3.6c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8v3.1h2.7V21h2.8z"/>
            </svg>
          </a>
          <a className="nav-drawer__social" href="#" aria-label="YouTube">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8 1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z"/>
            </svg>
          </a>
          <a className="nav-drawer__social" href="#" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M6.9 8.4H4.1V20h2.8V8.4zM5.5 4a1.7 1.7 0 100 3.4 1.7 1.7 0 000-3.4zM20 13.6c0-2.7-1.7-3.8-3.3-3.8-1.6 0-2.4.9-2.7 1.5V8.4H11c0 .8 0 11.6 0 11.6h2.9v-6.5c0-.3 0-.5.1-.7.2-.5.7-1.1 1.5-1.1 1.1 0 1.5.8 1.5 2V20H20v-6.4z"/>
            </svg>
          </a>
        </footer>
      </aside>
    </>
  )
}
