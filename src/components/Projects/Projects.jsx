import { useEffect, useMemo, useRef, useState } from 'react'
import './Projects.css'

import imgHero from '../../assets/images/projects/hero-city-skyline.jpg'
import imgAirport from '../../assets/images/projects/airport-long-thanh.jpg'
import imgKcn from '../../assets/images/projects/kcn-long-thanh.jpg'
import imgGreen from '../../assets/images/projects/green-planet-dc.jpg'
import imgGrandbay from '../../assets/images/projects/grandbay-halong.jpg'
import imgTtCity from '../../assets/images/projects/tt-city-millennia.jpg'
import imgFlora from '../../assets/images/projects/flora-panorama.jpg'
import imgSora from '../../assets/images/projects/sora-gardens.jpg'
import imgBw from '../../assets/images/projects/bw-hai-duong.jpg'
import imgTtmDakmil from '../../assets/images/projects/ttthuongmai-dakmil.jpg'
import imgViettel from '../../assets/images/projects/viettel-hoalac.jpg'
import imgKhuPhucHop from '../../assets/images/projects/khu-phuc-hop-angiang.jpg'
import imgOneCentral from '../../assets/images/projects/one-central-hcm.jpg'
import imgTechcom from '../../assets/images/projects/techcombank-saigon.jpg'
import imgMasteri from '../../assets/images/projects/masteri-waterfront.jpg'
import imgLandmark from '../../assets/images/projects/landmark-81.jpg'
import imgGrandMarina from '../../assets/images/projects/grand-marina-saigon.jpg'
import imgTheNine from '../../assets/images/projects/the-nine.jpg'
import imgLumiere from '../../assets/images/projects/lumiere-riverside.jpg'
import imgNamHoiAn from '../../assets/images/projects/namhoian-casino.jpg'
import imgDewey from '../../assets/images/projects/dewey-schools.jpg'
import imgFlamingo from '../../assets/images/projects/flamingo-dailai.jpg'

/*
 Bento grid (desktop):
    4 cols x 3 rows. "A" featured tile spans 2x2.
    Layout:
      A A  B  C
      A A  D  E
      F G  H  I
 Accent colors taken from brand tokens (navy/blue/teal/gold/red).
*/
const ALL_PAGES = [
  // Page 1 — tiêu biểu
  [
    { id: 'airport', tag: 'Hạ tầng', name: 'Sân bay Quốc tế Long Thành', place: 'Long Thành, Đồng Nai', year: '2025', img: imgAirport, span: 'feat', accent: '#3681dd' },
    { id: 'kcn', tag: 'Công nghiệp', name: 'KCN Công nghệ cao Long Thành', place: 'Long Thành, Đồng Nai', year: '2024', img: imgKcn, accent: '#1bcdd4' },
    { id: 'tt-city', tag: 'Khu đô thị', name: 'T&T City Millennia', place: 'Cần Giuộc, Long An', year: '2023', img: imgTtCity, accent: '#dda969' },
    { id: 'grand-marina', tag: 'Khu đô thị', name: 'Grand Marina, Saigon', place: 'Quận 1, TP.HCM', year: '2024', img: imgGrandMarina, accent: '#cb232b' },
    { id: 'khu-phuc-hop', tag: 'Phức hợp', name: 'Khu phức hợp TMDV An Giang', place: 'Mỹ Bình, Long Xuyên', year: '2023', img: imgKhuPhucHop, accent: '#245692' },
    { id: 'one-central', tag: 'Cao ốc', name: 'One Central HCM', place: 'Bến Thành, Q.1, TP.HCM', year: '2024', img: imgOneCentral, accent: '#3681dd' },
    { id: 'techcom', tag: 'Văn phòng', name: 'Techcombank Saigon Tower', place: 'Lê Duẩn, Q.1, TP.HCM', year: '2023', img: imgTechcom, accent: '#1bcdd4' },
    { id: 'the-nine', tag: 'Cao ốc', name: 'The Nine', place: 'Phạm Văn Đồng, Hà Nội', year: '2023', img: imgTheNine, accent: '#dda969' },
    { id: 'dewey', tag: 'Giáo dục', name: 'The Dewey Schools', place: 'Hồ Tây, Hà Nội', year: '2022', img: imgDewey, accent: '#7cc68d' },
  ],
  // Page 2
  [
    { id: 'grandbay', tag: 'Khu đô thị', name: 'Grandbay Halong', place: 'Hạ Long, Quảng Ninh', year: '2023', img: imgGrandbay, span: 'feat', accent: '#1bcdd4' },
    { id: 'flora', tag: 'Căn hộ', name: 'Flora Panorama', place: 'Q.9, TP.HCM', year: '2023', img: imgFlora, accent: '#dda969' },
    { id: 'sora', tag: 'Căn hộ', name: 'Sora Gardens SC', place: 'Bình Dương', year: '2022', img: imgSora, accent: '#cb232b' },
    { id: 'landmark', tag: 'Biểu tượng', name: 'The Landmark 81', place: 'Q. Bình Thạnh, TP.HCM', year: '2021', img: imgLandmark, accent: '#3681dd' },
    { id: 'masteri', tag: 'Căn hộ', name: 'Masteri Waterfront', place: 'Gia Lâm, Hà Nội', year: '2023', img: imgMasteri, accent: '#245692' },
    { id: 'flamingo', tag: 'Nghỉ dưỡng', name: 'Flamingo Đại Lải Resort', place: 'Phúc Yên, Vĩnh Phúc', year: '2022', img: imgFlamingo, accent: '#7cc68d' },
    { id: 'namhoian', tag: 'Nghỉ dưỡng', name: 'Nam Hội An Casino Resort', place: 'Thăng Bình, Quảng Nam', year: '2023', img: imgNamHoiAn, accent: '#1bcdd4' },
    { id: 'lumiere', tag: 'Căn hộ', name: 'Lumière Riverside', place: 'An Phú, Q.2, TP.HCM', year: '2022', img: imgLumiere, accent: '#dda969' },
    { id: 'viettel', tag: 'Công nghệ', name: 'TT Kỹ thuật Viettel Hòa Lạc', place: 'Thạch Thất, Hà Nội', year: '2024', img: imgViettel, accent: '#cb232b' },
  ],
  // Page 3
  [
    { id: 'green', tag: 'Công nghiệp', name: 'Green Planet DC', place: 'Tân Uyên, Bình Dương', year: '2024', img: imgGreen, span: 'feat', accent: '#7cc68d' },
    { id: 'bw', tag: 'Công nghiệp', name: 'Dự án BW Hải Dương', place: 'Cẩm Giàng, Hải Dương', year: '2023', img: imgBw, accent: '#3681dd' },
    { id: 'ttm-dakmil', tag: 'Thương mại', name: 'TTTM Đắk Mil', place: 'Đắk Mil, Đắk Nông', year: '2023', img: imgTtmDakmil, accent: '#dda969' },
    { id: 'airport2', tag: 'Hạ tầng', name: 'Sân bay Quốc tế Long Thành', place: 'Long Thành, Đồng Nai', year: '2025', img: imgAirport, accent: '#3681dd' },
    { id: 'grandbay2', tag: 'Khu đô thị', name: 'Grandbay Halong', place: 'Hạ Long, Quảng Ninh', year: '2023', img: imgGrandbay, accent: '#1bcdd4' },
    { id: 'grand-marina2', tag: 'Khu đô thị', name: 'Grand Marina, Saigon', place: 'Quận 1, TP.HCM', year: '2024', img: imgGrandMarina, accent: '#cb232b' },
    { id: 'khu-phuc-hop2', tag: 'Phức hợp', name: 'Khu phức hợp TMDV An Giang', place: 'Mỹ Bình, Long Xuyên', year: '2023', img: imgKhuPhucHop, accent: '#245692' },
    { id: 'flamingo2', tag: 'Nghỉ dưỡng', name: 'Flamingo Đại Lải Resort', place: 'Phúc Yên, Vĩnh Phúc', year: '2022', img: imgFlamingo, accent: '#7cc68d' },
    { id: 'dewey2', tag: 'Giáo dục', name: 'The Dewey Schools', place: 'Hồ Tây, Hà Nội', year: '2022', img: imgDewey, accent: '#7cc68d' },
  ],
]

export default function Projects() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [page, setPage] = useState(0)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.2),
      { threshold: [0, 0.2, 0.5] }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const items = ALL_PAGES[page]

  const onTileMove = (e) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--px', `${(px - 0.5) * 24}px`)
    el.style.setProperty('--py', `${(py - 0.5) * 24}px`)
    el.style.setProperty('--gx', `${px * 100}%`)
    el.style.setProperty('--gy', `${py * 100}%`)
    el.style.setProperty('--rx', `${(py - 0.5) * -6}deg`)
    el.style.setProperty('--ry', `${(px - 0.5) * 6}deg`)
  }
  const onTileLeave = (e) => {
    const el = e.currentTarget
    el.style.setProperty('--px', `0px`)
    el.style.setProperty('--py', `0px`)
    el.style.setProperty('--rx', `0deg`)
    el.style.setProperty('--ry', `0deg`)
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`projects section ${inView ? 'is-in' : ''}`}
      aria-label="Dự án tiêu biểu"
    >
      {/* Background decorations */}
      <div className="projects__bg" aria-hidden>
        <span className="projects__bg-grid" />
        <span className="projects__bg-orb projects__bg-orb--a" />
        <span className="projects__bg-orb projects__bg-orb--b" />
      </div>

      {/* Top hero banner */}
      <header className="projects__banner" aria-hidden={false}>
        <div className="projects__banner-media">
          <img src={imgHero} alt="" className="projects__banner-img" />
          <span className="projects__banner-tint" />
          <span className="projects__banner-fade" />
        </div>

        <div className="projects__banner-content">
          <div className="projects__eyebrow">
            <span className="projects__eyebrow-dot" />
            <span>PORTFOLIO</span>
          </div>

          <h2 className="projects__title">
            <span className="projects__title-mask"><span className="projects__title-line">DỰ ÁN</span></span>
            <span className="projects__title-mask"><span className="projects__title-line projects__title-line--accent">TIÊU BIỂU</span></span>
          </h2>

          <p className="projects__lede">
            Cùng nhau kiến tạo những công trình biểu tượng,
            nâng tầm chất lượng sống và hạ tầng quốc gia.
          </p>

          <div className="projects__banner-actions">
            <a href="#" className="projects__all">
              <span>Xem tất cả dự án</span>
              <svg width="24" height="12" viewBox="0 0 24 12" fill="none" aria-hidden>
                <path d="M1 6h21m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <div className="projects__pager" role="tablist" aria-label="Trang dự án">
              {ALL_PAGES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === page}
                  className={`projects__pager-dot ${i === page ? 'is-on' : ''}`}
                  onClick={() => setPage(i)}
                >
                  <span className="projects__pager-num">0{i + 1}</span>
                  <span className="projects__pager-bar" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mosaic bento grid */}
      <div className="projects__mosaic" key={page}>
        {items.map((p, i) => (
          <article
            key={p.id}
            className={`ptile ${p.span === 'feat' ? 'ptile--feat' : ''} ${hovered === p.id ? 'is-hover' : ''}`}
            style={{ '--accent': p.accent, '--i': i }}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
            onMouseMove={onTileMove}
            onMouseOut={onTileLeave}
          >
            <a className="ptile__hit" href="#" aria-label={p.name}>
              <div className="ptile__media" aria-hidden>
                <img src={p.img} alt="" className="ptile__img" loading="lazy" />
                <span className="ptile__tint" />
                <span className="ptile__shade" />
                <span className="ptile__glow" />
              </div>

              <span className="ptile__corner" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 13 L13 1 M5 1 H13 V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>

              <div className="ptile__body">
                <div className="ptile__row">
                  <span className="ptile__tag">{p.tag}</span>
                  <span className="ptile__dot" />
                  <span className="ptile__year">{p.year}</span>
                </div>
                <h3 className="ptile__name">{p.name}</h3>
                <div className="ptile__place">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M6 11s4-3.6 4-6.6A4 4 0 0 0 2 4.4C2 7.4 6 11 6 11z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                    <circle cx="6" cy="4.6" r="1.3" stroke="currentColor" strokeWidth="1"/>
                  </svg>
                  <span>{p.place}</span>
                </div>

                <span className="ptile__line" />
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
