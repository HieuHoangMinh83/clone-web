import { useEffect, useRef, useState } from 'react'
import bg from '../../../assets/images/intro/bg/partners.png'
import './IntroPartners.css'

const logos = import.meta.glob(
  '../../../assets/images/intro/partners/logo-*.png',
  { eager: true, import: 'default' },
)
const LOGOS = Object.entries(logos)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src)

const STATS = [
  { value: '20+', label: 'Năm kinh nghiệm' },
  { value: '150+', label: 'Đối tác toàn cầu' },
  { value: '500+', label: 'Dự án đã thực hiện' },
  { value: '05', label: 'Quốc gia hoạt động' },
]

export default function IntroPartners() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.15)
      },
      { threshold: [0, 0.15, 0.3, 0.5] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`intro-sec intro-partners ${inView ? 'is-in' : ''}`}
    >
      <div
        className="intro-sec__bg intro-partners__bg"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="intro-partners__grain" aria-hidden />
      <span className="intro-partners__spine" aria-hidden />

      <div className="intro-container intro-partners__container">
        <header className="intro-partners__head">
          <h2 className="intro-partners__title">
            <span className="intro-partners__title-line intro-partners__title-line--1">
              Niềm tin kiến tạo
            </span>
            <span className="intro-partners__title-line intro-partners__title-line--2">
              <em>giá trị</em> vượt thời gian.
            </span>
          </h2>

          <p className="intro-partners__lead">
            Newtecons được tin chọn bởi những thương hiệu hàng đầu trong và ngoài nước —
            cùng kiến tạo những công trình biểu tượng, bền vững và vượt thời gian.
          </p>
        </header>

        <section className="intro-partners__stats" aria-label="Thống kê">
          <span className="intro-partners__rule intro-partners__rule--top" aria-hidden />
          <div className="intro-partners__stats-row">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="intro-partners__stat"
                style={{ '--si': i }}
              >
                <div className="intro-partners__stat-value">{s.value}</div>
                <div className="intro-partners__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <span className="intro-partners__rule intro-partners__rule--bot" aria-hidden />
        </section>

        <figure className="intro-partners__pullquote">
          <span className="intro-partners__pullquote-mark" aria-hidden>&ldquo;</span>
          <blockquote className="intro-partners__pullquote-body">
            Với nền tảng kinh nghiệm triển khai các dự án quy mô lớn và sự am hiểu
            tiêu chuẩn quốc tế, Newtecons sẽ quản lý, điều hành dự án đạt an toàn,
            chất lượng và tiến độ.
          </blockquote>
          <figcaption className="intro-partners__pullquote-attr">
            <span className="intro-partners__pullquote-name">Jason Turnbull</span>
            <span className="intro-partners__pullquote-role">
              Phó TGĐ kiêm GĐ Tài chính, Masterise Homes
            </span>
          </figcaption>
        </figure>

        <div className="intro-partners__marquee-wrap" aria-hidden>
          <div className="intro-partners__marquee">
            <div className="intro-partners__marquee-track">
              {[...LOGOS, ...LOGOS].map((src, i) => (
                <div key={i} className="intro-partners__logo">
                  <img src={src} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
