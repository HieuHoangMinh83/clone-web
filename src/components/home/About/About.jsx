import { useEffect, useRef, useState } from 'react'
import './About.css'
import imgTower from '../../../assets/images/about/tower-newtecons.png'
import imgLogo from '../../../assets/images/about/logo-paper.png'

export default function About() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.2)
      },
      { threshold: [0, 0.2, 0.5] }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const onTileMove = (e) => {
    const tile = e.currentTarget
    const rect = tile.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    tile.style.setProperty('--mx', `${x * 12}px`)
    tile.style.setProperty('--my', `${y * 12}px`)
    tile.style.setProperty('--rx', `${-y * 4}deg`)
    tile.style.setProperty('--ry', `${x * 4}deg`)
    tile.style.setProperty('--gx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    tile.style.setProperty('--gy', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }

  const onTileLeave = (e) => {
    const tile = e.currentTarget
    tile.style.setProperty('--mx', `0px`)
    tile.style.setProperty('--my', `0px`)
    tile.style.setProperty('--rx', `0deg`)
    tile.style.setProperty('--ry', `0deg`)
  }

  const title = 'NEWTECONS'

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`about section ${inView ? 'is-in' : ''}`}
    >
      <div className="about__bg" aria-hidden>
        <span className="about__bg-orb about__bg-orb--a" />
        <span className="about__bg-orb about__bg-orb--b" />
        <span className="about__bg-grid" />
      </div>

      <div className="about__grid">
        <div className="about__intro">
          <div className="about__glyph" aria-hidden>
            <svg viewBox="0 0 100 120" fill="none" stroke="var(--navy-700)" strokeWidth="1">
              <path className="about__glyph-path" d="M10 110 L50 10 L90 110 Z" />
              <path className="about__glyph-path about__glyph-path--inner" d="M30 110 L50 60 L70 110" />
            </svg>
          </div>

          <span className="about__eyebrow">
            <span className="about__eyebrow-line" />
            Giới thiệu chung
          </span>

          <h2 className="about__title">
            <span className="about__title-mask">
              <span className="about__title-line">Giới thiệu</span>
            </span>
            <span className="about__title-mask">
              <strong className="about__title-brand">
                {title.split('').map((ch, i) => (
                  <span
                    key={i}
                    className="about__title-char"
                    style={{ '--i': i }}
                  >
                    {ch}
                  </span>
                ))}
              </strong>
            </span>
          </h2>

          <p className="about__tag reveal" style={{ '--d': '1.55s' }}>
            Build on Trust — Sự tin tưởng của bạn là chuẩn mực cho giá trị
            của chúng tôi
          </p>

          <p className="about__body reveal" style={{ '--d': '1.7s' }}>
            Bằng nhiệt huyết và tinh thần không ngừng đổi mới, công ty đã
            vươn mình khẳng định vị thế trên thị trường xây dựng Việt Nam.
            Với đội ngũ kỹ sư giàu kinh nghiệm cùng cam kết về chất lượng,
            chúng tôi tiên phong chinh phục những tầm cao mới.
          </p>

          <a href="#" className="about__cta reveal" style={{ '--d': '1.85s' }}>
            <span className="about__cta-label">Về chúng tôi</span>
            <span className="about__cta-arrow" aria-hidden>
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                <path d="M1 6h15m0 0L11 1m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>

        <div className="about__tiles">
          <a
            href="#"
            className="tile tile--1"
            onMouseMove={onTileMove}
            onMouseLeave={onTileLeave}
          >
            <div className="tile__media" aria-hidden>
              <img src={imgLogo} alt="" className="tile__img" />
              <span className="tile__overlay" />
              <span className="tile__glow" />
              <span className="tile__scan" />
            </div>

            <span className="tile__corner tile__corner--tl" aria-hidden />
            <span className="tile__corner tile__corner--tr" aria-hidden />
            <span className="tile__corner tile__corner--bl" aria-hidden />
            <span className="tile__corner tile__corner--br" aria-hidden />

            <span className="tile__title">
              <span className="tile__title-top">LỊCH SỬ</span>
              <span className="tile__title-bot">HÌNH THÀNH</span>
            </span>

            <span className="tile__cta" aria-hidden>
              Khám phá
              <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
                <path d="M1 5h19m0 0L16 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>

          <a
            href="#"
            className="tile tile--2"
            onMouseMove={onTileMove}
            onMouseLeave={onTileLeave}
          >
            <div className="tile__media" aria-hidden>
              <img src={imgTower} alt="" className="tile__img" />
              <span className="tile__overlay" />
              <span className="tile__glow" />
              <span className="tile__scan" />
            </div>

            <span className="tile__corner tile__corner--tl" aria-hidden />
            <span className="tile__corner tile__corner--tr" aria-hidden />
            <span className="tile__corner tile__corner--bl" aria-hidden />
            <span className="tile__corner tile__corner--br" aria-hidden />

            <span className="tile__title">
              <span className="tile__title-top">COMPANY</span>
              <span className="tile__title-bot">PROFILE</span>
            </span>

            <span className="tile__cta" aria-hidden>
              Tải hồ sơ
              <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
                <path d="M1 5h19m0 0L16 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
