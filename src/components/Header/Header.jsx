import './Header.css'

export default function Header() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <a href="#" className="nav__logo" aria-label="Trang chủ">
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
          <button className="nav__icon nav__burger" aria-label="Mở menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
