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
  .slice(0, 12)

export default function IntroPartners() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.25)
      },
      { threshold: [0, 0.25, 0.5] },
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
      <span className="intro-partners__orb intro-partners__orb--a" aria-hidden />
      <span className="intro-partners__orb intro-partners__orb--b" aria-hidden />

      <div className="intro-container">
        <div className="intro-partners__head">
          <span className="intro-partners__tag">— Build on trust</span>
          <h2 className="intro-partners__title">
            <span className="intro-partners__title-soft">KHÁCH HÀNG</span>
            <span className="intro-partners__title-amp">&amp;</span>
            <span className="intro-partners__title-strong">ĐỐI TÁC</span>
          </h2>
          <p className="intro-partners__lead">
            Newtecons lấy uy tín làm nền móng — kiến tạo mối quan hệ bền vững với đối tác và
            khách hàng trong và ngoài nước, vươn xa ra khu vực và thế giới.
          </p>
        </div>

        <figure className="intro-partners__testimonial">
          <span className="intro-partners__quote-mark" aria-hidden>"</span>
          <blockquote className="intro-partners__quote-body">
            <p>
              Với sự hợp tác tốt đẹp ở những dự án trước đây giữa Newtecons và Masterise Homes,
              cùng nền tảng kinh nghiệm triển khai các dự án quy mô lớn, sự am hiểu tiêu chuẩn
              khắt khe của những dự án đẳng cấp quốc tế, tôi tin rằng Newtecons sẽ quản lý, điều
              hành dự án đạt an toàn, chất lượng và tiến độ.
            </p>
            <figcaption className="intro-partners__attr">
              <span className="intro-partners__attr-avatar" aria-hidden>JT</span>
              <span>
                <span className="intro-partners__attr-name">Ông Jason Turnbull</span>
                <span className="intro-partners__attr-role">
                  Phó TGĐ kiêm GĐ Tài chính Masterise Homes
                </span>
              </span>
            </figcaption>
          </blockquote>
        </figure>

        <div className="intro-partners__marquee" aria-hidden>
          <div className="intro-partners__marquee-track">
            {[...LOGOS, ...LOGOS].map((src, i) => (
              <div key={i} className="intro-partners__logo">
                <img src={src} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
