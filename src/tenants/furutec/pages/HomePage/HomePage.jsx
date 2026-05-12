// Furutec — Home page (Editorial industrial, dark premium B2B)
// Standalone, KHÔNG dùng component shared.
import { useEffect, useState } from 'react'
import './HomePage.css'

// ---- Slide assets (PDF render placeholder) ----
import slide03 from '../../../../assets/images/furutec/slides/page-03.png'
import slide09 from '../../../../assets/images/furutec/slides/page-09.png'
import slide11 from '../../../../assets/images/furutec/slides/page-11.png'
import slide18 from '../../../../assets/images/furutec/slides/page-18.png'
import slide24 from '../../../../assets/images/furutec/slides/page-24.png'
import slide28 from '../../../../assets/images/furutec/slides/page-28.png'
import slide29 from '../../../../assets/images/furutec/slides/page-29.png'
import slide30 from '../../../../assets/images/furutec/slides/page-30.png'
import slide32 from '../../../../assets/images/furutec/slides/page-32.png'
import slide33 from '../../../../assets/images/furutec/slides/page-33.png'
import slide34 from '../../../../assets/images/furutec/slides/page-34.png'

// ============================================================
// Content
// ============================================================
const COUNTRIES = [
  'Malaysia', 'Vietnam', 'Singapore', 'Thailand', 'Philippines', 'Indonesia',
  'UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman', 'Taiwan',
  'Hong Kong', 'Bangladesh', 'Pakistan', 'India', 'Myanmar', 'Cambodia',
]

const PRODUCTS = [
  {
    num: '01',
    tag: 'INDOOR',
    name: 'Compact\nSandwich',
    photo: slide11,
    desc: 'Conductor đồng/nhôm, vỏ nhôm 3mm. Lắp ráp tự động bằng rivet — IP65 / IK10.',
    specs: [
      ['Rating', '500A – 6300A'],
      ['Voltage', '1000V'],
      ['Standard', 'IEC 61439-6 / UL 857'],
      ['Protection', 'IP65 · IK10'],
    ],
  },
  {
    num: '02',
    tag: 'OUTDOOR',
    name: 'Cast\nResin',
    photo: slide18,
    desc: 'Nhựa đúc cho môi trường khắc nghiệt. Chịu nắng mưa trực tiếp, không cần vỏ bảo vệ — IP68.',
    specs: [
      ['Rating', '400A – 6300A'],
      ['Voltage', '1000V'],
      ['Standard', 'IEC 61439-6'],
      ['Protection', 'IP68 · IK10'],
    ],
  },
  {
    num: '03',
    tag: 'DATA CENTRE',
    name: 'i-DC\nBusduct',
    photo: slide24,
    desc: 'Phân phối điện cho data centre. Cơ chế Turn & Lock tap-off, giảm cabling, đảm bảo continuity.',
    specs: [
      ['Rating', '250A – 630A'],
      ['Voltage', '1000V'],
      ['Standard', 'IEC 61439-6'],
      ['Tap-off', 'Turn & Lock'],
    ],
  },
]

const WHY_PILLARS = [
  {
    big: '01',
    title: 'Flexibility',
    desc: 'Modular, mở rộng dễ dàng. Tap-off unit thay nóng không cần dừng tải.',
  },
  {
    big: '02',
    title: 'Safety & Performance',
    desc: 'UBC Seismic Zone 4. 100% FAT trước xuất xưởng. TMS giám sát nhiệt độ realtime.',
  },
  {
    big: '03',
    title: 'Investment',
    desc: 'TCO thấp hơn cable hệ thống lớn. Lắp đặt nhanh, bảo trì tối thiểu, vòng đời 30+ năm.',
  },
  {
    big: '04',
    title: 'Sustainability',
    desc: 'Singapore Green Building Product certified. Tuân thủ RoHS. Tiết kiệm vật liệu.',
  },
]

const CERTS = [
  { abbr: 'UL', full: 'UL 857' },
  { abbr: 'DEKRA', full: 'Test Certificate' },
  { abbr: 'KEMA', full: 'Quality Test' },
  { abbr: 'IEC', full: '61439-6' },
  { abbr: 'TÜV', full: 'PSB Singapore' },
  { abbr: 'INTERTEK', full: 'Conformity' },
  { abbr: 'SGBP', full: 'Singapore Green' },
  { abbr: 'ISO', full: '9001 Quality' },
  { abbr: 'SIRIM', full: 'Quality Award' },
]

const VN_PROJECTS = [
  { tag: 'Nhà ở', name: 'Riviera Point 1C', loc: 'TP. Hồ Chí Minh · 2024', img: slide28, cat: 'res' },
  { tag: 'Nhà ở', name: 'Akari City', loc: 'TP. Hồ Chí Minh · 2020', img: slide29, cat: 'res' },
  { tag: 'Nhà ở', name: 'ParkCity Hanoi', loc: 'Hà Nội · 2022', img: slide29, cat: 'res' },
  { tag: 'Công nghiệp', name: 'Damen Shipyard', loc: 'Hải Phòng · 2025', img: slide32, cat: 'ind' },
  { tag: 'Công nghiệp', name: 'Sanofi Factory', loc: 'TP. Hồ Chí Minh · 2013', img: slide33, cat: 'ind' },
]

const MARKET_REGIONS = [
  { label: 'East Asia', countries: ['Taiwan', 'Hong Kong', 'Macau'] },
  { label: 'South West Asia', countries: ['UAE', 'Kuwait', 'Saudi Arabia', 'Qatar', 'Oman'] },
  { label: 'South Asia', countries: ['Bangladesh', 'Pakistan', 'India'] },
  {
    label: 'South East Asia',
    countries: ['Vietnam', 'Malaysia', 'Singapore', 'Philippines', 'Indonesia', 'Thailand', 'Myanmar', 'Cambodia'],
  },
]

const EITA_SUBSIDIARIES = [
  'Furutec Electrical', 'EITA Elevator', 'EITA-Schneider',
  'EITA Power System', 'EITA Technologies', 'Sigriner Automation', 'TransSystem',
]

// ============================================================
// MAIN
// ============================================================
export default function FurutecHomePage() {
  // body scroll mode (override fullpage default)
  useEffect(() => {
    document.body.classList.add('is-scroll-page')
    document.documentElement.classList.add('is-scroll-page')
    return () => {
      document.body.classList.remove('is-scroll-page')
      document.documentElement.classList.remove('is-scroll-page')
    }
  }, [])

  // scroll progress bar
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="t-furutec furu">
      <div className="furu-progress" style={{ width: `${progress}%` }} aria-hidden />
      <FuruHeader />
      <FuruHero />
      <FuruMarquee />
      <FuruAbout />
      <FuruProducts />
      <FuruWhy />
      <FuruCerts />
      <FuruProjects />
      <FuruMarket />
      <FuruContact />
      <FuruFooter />
    </div>
  )
}

// ============================================================
// HEADER
// ============================================================
function FuruHeader() {
  return (
    <header className="furu-header">
      <div className="furu-header__inner">
        <a href="/furutec" className="furu-logo" aria-label="Furutec — Trang chủ">
          <span className="furu-logo__mark">
            FURUTEC<sup className="furu-logo__r">®</sup>
          </span>
          <span className="furu-logo__divider" aria-hidden />
          <span className="furu-logo__tag">Busduct System</span>
        </a>

        <nav className="furu-nav" aria-label="Menu chính">
          <a href="/furutec" className="is-active">Tổng quan</a>
          <a href="#products">Sản phẩm</a>
          <a href="#projects">Dự án</a>
          <a href="#contact">Liên hệ</a>
        </nav>

        <div className="furu-header__eita">
          A MEMBER OF <strong>EITA</strong> RESOURCES
        </div>
      </div>
    </header>
  )
}

// ============================================================
// HERO — editorial, massive type, asymmetric
// ============================================================
function FuruHero() {
  return (
    <section className="furu-hero">
      <div className="furu__container furu-hero__inner">
        <div className="furu-hero__meta">
          <span>EST.&nbsp;1996</span>
          <span className="furu-hero__meta-dot" />
          <strong>BURSA MALAYSIA LISTED</strong>
          <span className="furu-hero__meta-dot" />
          <span>30 YEARS · 20+ COUNTRIES</span>
        </div>

        <div className="furu-hero__layout">
          <div>
            <h1 className="furu-hero__title">
              Engineered
              <em>busduct systems</em>
              for Asia.
            </h1>
            <p className="furu-hero__sub">
              30 năm sản xuất và R&amp;D busduct cho hạ tầng điện thương mại,
              công nghiệp và data centre. Compact Sandwich · Cast Resin · i-DC —
              IEC 61439-6, UL 857, được tin dùng tại hơn 20 quốc gia.
            </p>
            <div className="furu-hero__cta">
              <a href="#products" className="furu-btn">
                Xem sản phẩm
                <span className="furu-btn__arrow">→</span>
              </a>
              <a href="#contact" className="furu-btn furu-btn--ghost">
                Liên hệ tư vấn
              </a>
            </div>
          </div>

          <div className="furu-hero__visual">
            <div className="furu-hero__visual-card">
              <img src={slide09} alt="Furutec busduct application overview" />
              <span className="furu-hero__visual-tag">Busduct Application Map</span>
            </div>
          </div>
        </div>

        <div className="furu-hero__stats">
          <div className="furu-hero__stat">
            <p className="furu-hero__stat-num">
              <em>30</em>
              <small>+ năm</small>
            </p>
            <p className="furu-hero__stat-lbl">R&amp;D · Manufacturing</p>
          </div>
          <div className="furu-hero__stat">
            <p className="furu-hero__stat-num">
              <em>20,000</em>
              <small>m / tháng</small>
            </p>
            <p className="furu-hero__stat-lbl">Production capacity</p>
          </div>
          <div className="furu-hero__stat">
            <p className="furu-hero__stat-num">
              <em>20</em>
              <small>+ countries</small>
            </p>
            <p className="furu-hero__stat-lbl">Asia · Middle East</p>
          </div>
          <div className="furu-hero__stat">
            <p className="furu-hero__stat-num">
              <em>6,300</em>
              <small>A · 1000V</small>
            </p>
            <p className="furu-hero__stat-lbl">Max rating</p>
          </div>
        </div>

        <span className="furu-hero__bigword" aria-hidden>FURUTEC</span>
      </div>
    </section>
  )
}

// ============================================================
// MARQUEE — auto-scroll countries
// ============================================================
function FuruMarquee() {
  const items = [...COUNTRIES, ...COUNTRIES] // duplicate for seamless loop
  return (
    <section className="furu-marquee" aria-label="Thị trường phủ sóng">
      <div className="furu-marquee__track">
        {items.map((c, i) => (
          <span key={i} className="furu-marquee__item">{c}</span>
        ))}
      </div>
    </section>
  )
}

// ============================================================
// ABOUT — editorial quote + 3 fact stack
// ============================================================
function FuruAbout() {
  return (
    <section className="furu-section">
      <div className="furu__container">
        <header className="furu-section__head">
          <span className="furu-index">01 · Về chúng tôi</span>
        </header>

        <div className="furu-about__layout">
          <div>
            <blockquote className="furu-about__quote">
              <em>FURUTEC</em> là thành viên của EITA Resources Berhad —
              niêm yết Bursa Malaysia 2012, hơn 30 năm chuyên sản xuất
              busduct cho hạ tầng điện châu Á.
            </blockquote>
            <p className="furu-about__body">
              Hai nhà máy tại Penang với công suất trên 20.000 mét mỗi tháng.
              R&amp;D nội bộ đảm bảo tuân thủ IEC 61439-6, UL 857 và các tiêu chuẩn
              quốc tế. Khách hàng trải dài ASEAN, Đông Á, Nam Á và Trung Đông.
            </p>
            <div className="furu-about__chips">
              {EITA_SUBSIDIARIES.map((name) => (
                <span key={name} className="furu-about__chip">{name}</span>
              ))}
            </div>
          </div>

          <aside className="furu-about__side">
            <div className="furu-about__fact">
              <p className="furu-about__fact-num">
                <em>1996</em>
              </p>
              <p className="furu-about__fact-lbl">Năm thành lập</p>
            </div>
            <div className="furu-about__fact">
              <p className="furu-about__fact-num">
                2 <small>plants</small>
              </p>
              <p className="furu-about__fact-lbl">Penang, Malaysia</p>
            </div>
            <div className="furu-about__fact">
              <p className="furu-about__fact-num">
                <em>650</em><small>+ staff</small>
              </p>
              <p className="furu-about__fact-lbl">EITA Group workforce</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// PRODUCTS — 3 horizontal dark feature cards
// ============================================================
function FuruProducts() {
  return (
    <section id="products" className="furu-section furu-section--dark furu--dark">
      <div className="furu__container">
        <header className="furu-section__head furu-section__head--split">
          <div>
            <span className="furu-index">02 · Sản phẩm</span>
            <h2 className="furu-display" style={{ marginTop: 18 }}>
              Ba dòng busduct
              <br />
              cho mọi <em>ứng dụng</em>.
            </h2>
          </div>
          <p className="furu-lead">
            Từ tòa nhà thương mại đến nhà máy công nghiệp và data centre —
            Furutec có dòng sản phẩm phù hợp cho từng môi trường lắp đặt.
          </p>
        </header>

        <div className="furu-prods">
          {PRODUCTS.map((p) => (
            <a key={p.num} href="#contact" className="furu-prod">
              <header className="furu-prod__head">
                <span className="furu-prod__num">{p.num}</span>
                <span className="furu-prod__tag">{p.tag}</span>
              </header>
              <div className="furu-prod__photo">
                <img src={p.photo} alt={p.name.replace('\n', ' ')} loading="lazy" />
              </div>
              <h3 className="furu-prod__title">
                {p.name.split('\n').map((line, i) => (
                  <span key={i} style={{ display: 'block' }}>{line}</span>
                ))}
              </h3>
              <p className="furu-prod__desc">{p.desc}</p>
              <div className="furu-prod__specs">
                {p.specs.map(([k, v]) => (
                  <div key={k} className="furu-prod__spec">
                    <span className="furu-prod__spec-lbl">{k}</span>
                    <span className="furu-prod__spec-val">{v}</span>
                  </div>
                ))}
              </div>
              <span className="furu-prod__cta">
                Xem chi tiết
                <span className="furu-prod__cta-arrow">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// WHY — 4 numbered tiles, big numerals
// ============================================================
function FuruWhy() {
  return (
    <section className="furu-section">
      <div className="furu__container">
        <header className="furu-section__head">
          <span className="furu-index">03 · Tại sao Furutec</span>
          <h2 className="furu-display">
            Bốn lý do <em>các nhà thầu hàng đầu</em>
            <br />tin dùng busduct Furutec.
          </h2>
          <p className="furu-lead">
            Được kiểm chứng qua hàng trăm dự án dân dụng, công nghiệp và data
            centre suốt 30 năm tại Châu Á — Thái Bình Dương.
          </p>
        </header>

        <div className="furu-why__grid">
          {WHY_PILLARS.map((w) => (
            <div key={w.big} className="furu-why__tile">
              <span className="furu-why__num">REASON {w.big}</span>
              <div className="furu-why__num-big">{w.big}</div>
              <h3 className="furu-why__title">{w.title}</h3>
              <p className="furu-why__desc">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// CERTS — marquee logos on dark band
// ============================================================
function FuruCerts() {
  const items = [...CERTS, ...CERTS]
  return (
    <section className="furu-certs furu--dark">
      <div className="furu__container">
        <header className="furu-certs__head">
          <span className="furu-index">04 · Chứng chỉ</span>
          <h2 className="furu-display">
            Được công nhận bởi <em>các tổ chức kiểm định</em> quốc tế.
          </h2>
        </header>
      </div>

      <div className="furu-certs__marquee">
        <div className="furu-certs__track">
          {items.map((c, i) => (
            <span key={i} className="furu-cert">
              <span className="furu-cert__abbr">{c.abbr}</span>
              <span className="furu-cert__full">{c.full}</span>
            </span>
          ))}
        </div>
      </div>

      <p className="furu-certs__note">
        Tested for <strong>UBC Seismic Zone 4</strong> (PGA &gt; 0.4g) ·
        <strong> 100% Factory Acceptance Test</strong> trước khi xuất xưởng
      </p>
    </section>
  )
}

// ============================================================
// PROJECTS — bento grid, grayscale-to-color on hover
// ============================================================
function FuruProjects() {
  const [filter, setFilter] = useState('all')
  const filtered =
    filter === 'all' ? VN_PROJECTS : VN_PROJECTS.filter((p) => p.cat === filter)

  return (
    <section id="projects" className="furu-section furu-section--paper">
      <div className="furu__container">
        <header className="furu-projects__head">
          <div>
            <span className="furu-index">05 · Dự án Việt Nam</span>
            <h2 className="furu-display" style={{ marginTop: 18 }}>
              Đồng hành cùng <em>các chủ đầu tư</em>
              <br />tại Việt Nam.
            </h2>
          </div>
          <div className="furu-projects__filters" role="tablist">
            <button
              type="button"
              role="tab"
              className={`furu-projects__filter ${filter === 'all' ? 'is-active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Tất cả
            </button>
            <button
              type="button"
              role="tab"
              className={`furu-projects__filter ${filter === 'res' ? 'is-active' : ''}`}
              onClick={() => setFilter('res')}
            >
              Nhà ở
            </button>
            <button
              type="button"
              role="tab"
              className={`furu-projects__filter ${filter === 'ind' ? 'is-active' : ''}`}
              onClick={() => setFilter('ind')}
            >
              Công nghiệp
            </button>
          </div>
        </header>

        <div className="furu-projects__bento">
          {filtered.map((p, i) => (
            <article key={`${p.name}-${i}`} className="furu-proj">
              <img src={p.img} alt={p.name} loading="lazy" />
              <span className="furu-proj__overlay" aria-hidden />
              <span className="furu-proj__tag">{p.tag}</span>
              <div className="furu-proj__body">
                <h3 className="furu-proj__name">{p.name}</h3>
                <p className="furu-proj__loc">{p.loc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// MARKET — BIG numeric stat + region pills
// ============================================================
function FuruMarket() {
  return (
    <section className="furu-section">
      <div className="furu__container">
        <header className="furu-section__head">
          <span className="furu-index">06 · Thị trường</span>
        </header>

        <div className="furu-market__layout">
          <div>
            <div className="furu-market__big">
              20<span className="furu-market__big-plus">+</span>
            </div>
            <p className="furu-market__big-lbl">Quốc gia đang phục vụ</p>
            <p className="furu-lead" style={{ maxWidth: 380 }}>
              Hiện diện tại 4 khu vực chính: Đông Á, Đông Nam Á, Nam Á
              và Trung Đông — phục vụ thị trường dân dụng, công nghiệp
              và data centre.
            </p>
          </div>

          <div className="furu-market__regions">
            {MARKET_REGIONS.map((r) => (
              <div key={r.label} className="furu-market__region">
                <h4>{r.label}</h4>
                <ul>
                  {r.countries.map((c) => (
                    <li key={c} className={c === 'Vietnam' ? 'is-vn' : ''}>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// CONTACT — dark closing CTA, generous editorial space
// ============================================================
function FuruContact() {
  return (
    <section id="contact" className="furu-contact furu--dark">
      <div className="furu__container furu-contact__inner">
        <span className="furu-index">07 · Liên hệ</span>
        <h2 className="furu-contact__title">
          Cần tư vấn busduct
          <em>cho dự án của bạn?</em>
        </h2>
        <p className="furu-contact__lead">
          Đại diện kinh doanh Furutec tại Việt Nam sẵn sàng hỗ trợ khảo sát,
          tính toán phương án và báo giá cho dự án dân dụng, công nghiệp
          hoặc data centre.
        </p>

        <div className="furu-contact__grid">
          <div className="furu-contact__col">
            <h5>Vietnam Sales</h5>
            <a href="tel:+84906139089">(+84) 906 139 089</a>
            <a href="tel:+84772011180">(+84) 772 011 180</a>
            <a href="mailto:trungdang@furutec.com.my">trungdang@furutec.com.my</a>
          </div>
          <div className="furu-contact__col">
            <h5>Headquarters</h5>
            <p className="muted">
              Plot 89 Lorong Perindustrian Bukit Minyak 11,<br />
              Kawasan Perindustrian Bukit Minyak MK13,<br />
              14100 Seberang Perai Tengah, Penang, Malaysia
            </p>
          </div>
          <div className="furu-contact__col">
            <h5>Online</h5>
            <a href="https://www.furutec.com.my" target="_blank" rel="noreferrer">
              www.furutec.com.my
            </a>
            <p className="muted" style={{ marginTop: 12 }}>
              A member of EITA Resources Berhad — niêm yết Bursa Malaysia.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// FOOTER
// ============================================================
function FuruFooter() {
  return (
    <footer className="furu-footer">
      <div className="furu-footer__inner">
        <span className="furu-footer__brand">
          FURUTEC<sup>®</sup> Busduct System · A member of <strong>EITA</strong> Resources Berhad
        </span>
        <span>© 2026 Furutec Electrical Sdn Bhd. All rights reserved.</span>
      </div>
    </footer>
  )
}
