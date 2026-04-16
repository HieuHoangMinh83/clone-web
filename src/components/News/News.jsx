import { useEffect, useRef, useState } from 'react'
import './News.css'

const featured = {
  badge: 'N',
  category: 'Sự kiện nổi bật',
  title: 'NEWTECONS TRIỂN KHAI THI CÔNG HẠ TẦNG KỸ THUẬT KCN VÀM CỎNG QUY MÔ GẦN 200 HA',
  date: '30 Tháng 12, 2025',
  excerpt:
    'Ngày 30/12/2026, Newtecons phối hợp cùng Chủ đầu tư T&T Group khởi công dự án Đầu tư xây dựng và kinh doanh kết cấu hạ tầng Khu công nghiệp Vàm Cống tại phường Mỹ Thới, tỉnh An Giang. Tham dự buổi lễ có các lãnh đạo địa phương...',
  art: 'event',
}

const sideArticles = [
  {
    id: 1,
    category: 'Hoạt động nội bộ',
    title: 'NEWTECONS – GẮN KẾT YÊU THƯƠNG VỚI ĐỒNG BÀO VÙNG LŨ',
    art: 'charity',
  },
  {
    id: 2,
    category: 'Dự án',
    title: 'GỬI NIỀM TIN QUA DỰ ÁN CỦA NEWTECONS',
    art: 'tower',
  },
]

function FakeArt({ kind }) {
  if (kind === 'event') {
    return (
      <svg className="news-art" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id="sky-ev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f4c27a" />
            <stop offset=".5" stopColor="#e58a4a" />
            <stop offset="1" stopColor="#8c3b1e" />
          </linearGradient>
          <linearGradient id="stage" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffe9b0" />
            <stop offset="1" stopColor="#c0471e" />
          </linearGradient>
          <radialGradient id="spot" cx=".5" cy=".2" r=".7">
            <stop offset="0" stopColor="#fff4c2" stopOpacity=".9" />
            <stop offset="1" stopColor="#fff4c2" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#sky-ev)" />
        <circle cx="400" cy="150" r="260" fill="url(#spot)" />
        {/* backdrop banner */}
        <rect x="120" y="80" width="560" height="260" fill="#a73320" opacity=".95" />
        <rect x="120" y="80" width="560" height="50" fill="#7a1f10" />
        <text x="400" y="115" fill="#ffe9b0" fontSize="22" fontWeight="700" textAnchor="middle" fontFamily="Montserrat, sans-serif">
          LỄ KHỞI CÔNG
        </text>
        <text x="400" y="175" fill="#ffd77a" fontSize="34" fontWeight="800" textAnchor="middle" fontFamily="Montserrat, sans-serif">
          KCN VÀM CỎNG
        </text>
        <text x="400" y="215" fill="#f4c27a" fontSize="14" fontWeight="500" textAnchor="middle" fontFamily="Montserrat, sans-serif" letterSpacing="3">
          NEWTECONS × T&amp;T GROUP
        </text>
        {/* stage */}
        <rect x="60" y="340" width="680" height="160" fill="url(#stage)" />
        {/* people silhouettes */}
        {Array.from({ length: 14 }).map((_, i) => {
          const cx = 80 + i * 50
          return (
            <g key={i} fill="#2a0e06" opacity=".85">
              <circle cx={cx} cy="400" r="10" />
              <rect x={cx - 14} y="412" width="28" height="70" rx="6" />
            </g>
          )
        })}
        {/* spotlight rays */}
        <g opacity=".4" stroke="#fff4c2" strokeWidth="1">
          <line x1="400" y1="0" x2="150" y2="340" />
          <line x1="400" y1="0" x2="650" y2="340" />
          <line x1="400" y1="0" x2="400" y2="340" />
        </g>
      </svg>
    )
  }
  if (kind === 'charity') {
    return (
      <svg className="news-art" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id="sky-ch" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#cfe8ff" />
            <stop offset="1" stopColor="#a8c9e8" />
          </linearGradient>
        </defs>
        <rect width="400" height="260" fill="url(#sky-ch)" />
        {/* water */}
        <rect y="170" width="400" height="90" fill="#5b8bb3" />
        <path d="M0 170 Q100 160 200 170 T400 170 V180 H0 Z" fill="#3f6a91" />
        {/* boat */}
        <path d="M110 170 L290 170 L270 200 L130 200 Z" fill="#b6452c" />
        <rect x="180" y="140" width="6" height="30" fill="#7a2914" />
        <path d="M186 140 L230 165 L186 165 Z" fill="#f5b25c" />
        {/* people with boxes */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${150 + i * 40},130)`}>
            <circle cx="10" cy="10" r="8" fill="#2a2a2a" />
            <rect x="0" y="20" width="20" height="20" fill="#d33f2c" />
          </g>
        ))}
        {/* red-roof houses distant */}
        <rect x="20" y="150" width="40" height="30" fill="#f1d9b4" />
        <path d="M20 150 L40 135 L60 150 Z" fill="#c0432a" />
        <rect x="330" y="155" width="40" height="25" fill="#f1d9b4" />
        <path d="M330 155 L350 140 L370 155 Z" fill="#c0432a" />
      </svg>
    )
  }
  // tower
  return (
    <svg className="news-art" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="sky-tw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6c98f" />
          <stop offset="1" stopColor="#ca6a3c" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b4766" />
          <stop offset="1" stopColor="#0f2238" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#sky-tw)" />
      <circle cx="310" cy="80" r="38" fill="#ffd77a" opacity=".8" />
      {/* towers */}
      <rect x="70" y="60" width="60" height="200" fill="url(#glass)" />
      <rect x="140" y="30" width="90" height="230" fill="url(#glass)" />
      <rect x="240" y="90" width="70" height="170" fill="url(#glass)" />
      {/* windows */}
      {Array.from({ length: 24 }).map((_, i) => {
        const col = i % 4
        const row = Math.floor(i / 4)
        return (
          <rect
            key={i}
            x={148 + col * 20}
            y={50 + row * 30}
            width="12"
            height="18"
            fill="#f7d79a"
            opacity=".75"
          />
        )
      })}
      {Array.from({ length: 12 }).map((_, i) => {
        const col = i % 2
        const row = Math.floor(i / 2)
        return (
          <rect
            key={`l-${i}`}
            x={80 + col * 22}
            y={80 + row * 28}
            width="14"
            height="18"
            fill="#f4c27a"
            opacity=".7"
          />
        )
      })}
    </svg>
  )
}

export default function News() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="news"
      ref={sectionRef}
      className={`news section ${inView ? 'is-in' : ''}`}
      aria-label="Tin tức Newtecons"
    >
      <div className="news__bg" aria-hidden>
        <span className="news__bg-orb" />
        <span className="news__bg-grid" />
      </div>

      <div className="news__container">
        <header className="news__head">
          <h2 className="news__title" aria-label="Tin tức Newtecons">
            {'TIN TỨC NEWTECONS'.split('').map((ch, i) => (
              <span
                key={i}
                className={`news__title-ch ${ch === ' ' ? 'is-space' : ''}`}
                style={{ '--i': i }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
            <span className="news__title-underline" aria-hidden />
          </h2>
          <a href="#" className="news__all">
            <span>XEM TẤT CẢ TIN</span>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
              <path d="M1 5h11m0 0L8 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </header>

        <div className="news__grid">
          <article className="news-feat reveal" style={{ '--d': '.1s' }}>
            <a href="#" className="news-feat__link">
              <div className="news-feat__media">
                <FakeArt kind={featured.art} />
                <span className="news-feat__badge" aria-hidden>
                  {featured.badge}
                </span>
                <span className="news-feat__shine" aria-hidden />
                <span className="news-feat__cat">{featured.category}</span>
              </div>

              <div className="news-feat__body">
                <h3 className="news-feat__title">{featured.title}</h3>
                <div className="news-feat__meta">
                  <span className="news-feat__date">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke="currentColor" />
                      <path d="M4 1v3M10 1v3M1.5 6H12.5" stroke="currentColor" strokeLinecap="round" />
                    </svg>
                    {featured.date}
                  </span>
                </div>
                <p className="news-feat__excerpt">{featured.excerpt}</p>
                <span className="news-feat__more" aria-hidden>
                  Đọc tiếp
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                    <path d="M1 5h13m0 0L10 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </a>
          </article>

          <div className="news-side">
            {sideArticles.map((a, i) => (
              <article
                key={a.id}
                className="news-card reveal"
                style={{ '--d': `${0.2 + i * 0.12}s` }}
              >
                <a href="#" className="news-card__link">
                  <div className="news-card__media">
                    <FakeArt kind={a.art} />
                    <span className="news-card__shine" aria-hidden />
                  </div>
                  <div className="news-card__body">
                    <span className="news-card__cat">{a.category}</span>
                    <h4 className="news-card__title">{a.title}</h4>
                    <span className="news-card__more" aria-hidden>
                      <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
                        <path d="M1 5h19m0 0L16 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
