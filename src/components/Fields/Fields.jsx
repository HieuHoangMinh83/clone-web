import { useEffect, useRef, useState } from 'react'
import './Fields.css'
import imgCivil from '../../assets/images/fields/civil.jpg'
import imgIndustrial from '../../assets/images/fields/industrial.jpg'
import imgInfra from '../../assets/images/fields/infrastructure.jpg'
import imgMep from '../../assets/images/fields/mep.jpg'
import imgRealEstate from '../../assets/images/fields/realestate.jpg'
import imgInterior from '../../assets/images/fields/interior.jpg'

const FIELDS = [
  {
    id: 'civil',
    num: '01',
    name: 'Xây dựng dân dụng',
    en: 'Civil Construction',
    tag: 'Cao ốc · Chung cư · Thương mại',
    desc: 'Tổng thầu thi công các công trình nhà ở cao tầng, văn phòng hạng A và tổ hợp thương mại — cam kết tiến độ, chất lượng và an toàn tuyệt đối.',
    img: imgCivil,
    accent: '#3681dd',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M10 42V16l14-8 14 8v26" />
        <path d="M18 42V26h12v16" />
        <path d="M22 14v4M26 14v4" />
      </svg>
    ),
  },
  {
    id: 'industrial',
    num: '02',
    name: 'Xây dựng công nghiệp',
    en: 'Industrial Construction',
    tag: 'Nhà máy · Kho vận · Khu công nghiệp',
    desc: 'Thi công nhà máy sản xuất, trung tâm logistics và hạ tầng khu công nghiệp đạt chuẩn quốc tế cho các tập đoàn FDI.',
    img: imgIndustrial,
    accent: '#1bcdd4',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M6 42V24l10 6V18l10 6V12l16 10v20z" />
        <path d="M14 34h4M22 34h4M30 34h4" />
      </svg>
    ),
  },
  {
    id: 'infra',
    num: '03',
    name: 'Hạ tầng giao thông',
    en: 'Transport Infrastructure',
    tag: 'Cầu đường · Sân bay · Cảng biển',
    desc: 'Năng lực triển khai các dự án hạ tầng trọng điểm quốc gia: cầu, đường cao tốc, sân bay, cảng biển với tiêu chuẩn kỹ thuật cao.',
    img: imgInfra,
    accent: '#dda969',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M4 36h40M12 36v-8M36 36v-8M20 28h8v8h-8z" />
        <path d="M6 20l18-10 18 10" />
      </svg>
    ),
  },
  {
    id: 'mep',
    num: '04',
    name: 'Cơ điện công trình',
    en: 'Mechanical & Electrical',
    tag: 'M&E · HVAC · PCCC · BMS',
    desc: 'Cung cấp giải pháp M&E trọn gói cho toà nhà thông minh: điện, HVAC, phòng cháy chữa cháy và hệ thống tự động hoá BMS.',
    img: imgMep,
    accent: '#cb232b',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M26 6l-14 22h10l-2 14 14-22H24z" />
      </svg>
    ),
  },
  {
    id: 'realestate',
    num: '05',
    name: 'Bất động sản',
    en: 'Real Estate Development',
    tag: 'Khu đô thị · Resort · Đầu tư',
    desc: 'Phát triển các khu đô thị tích hợp, resort nghỉ dưỡng và dự án đầu tư chiến lược — kiến tạo không gian sống chuẩn mực.',
    img: imgRealEstate,
    accent: '#7cc68d',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M6 42V20l18-12 18 12v22" />
        <path d="M20 42V28h8v14" />
        <circle cx="14" cy="24" r="2" />
        <circle cx="34" cy="24" r="2" />
      </svg>
    ),
  },
  {
    id: 'interior',
    num: '06',
    name: 'Nội thất cao cấp',
    en: 'Premium Interior',
    tag: 'Kiến trúc · Thiết kế · Hoàn thiện',
    desc: 'Tư vấn kiến trúc, thiết kế và thi công nội thất cao cấp — từ penthouse, văn phòng đến khách sạn boutique đậm chất riêng.',
    img: imgInterior,
    accent: '#b07bd9',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M6 28h36v10H6z" />
        <path d="M10 28v-8a6 6 0 016-6h16a6 6 0 016 6v8" />
        <path d="M10 38v4M38 38v4" />
      </svg>
    ),
  },
]

export default function Fields() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.2)
      },
      { threshold: [0, 0.2, 0.5] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const onCardMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    el.style.setProperty('--mx', `${(x - 0.5) * 18}px`)
    el.style.setProperty('--my', `${(y - 0.5) * 18}px`)
    el.style.setProperty('--rx', `${(0.5 - y) * 6}deg`)
    el.style.setProperty('--ry', `${(x - 0.5) * 6}deg`)
    el.style.setProperty('--gx', `${x * 100}%`)
    el.style.setProperty('--gy', `${y * 100}%`)
  }

  const onCardLeave = (e) => {
    const el = e.currentTarget
    el.style.setProperty('--mx', '0px')
    el.style.setProperty('--my', '0px')
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <section
      id="fields"
      ref={sectionRef}
      className={`fields section ${inView ? 'is-in' : ''}`}
      aria-label="Lĩnh vực hoạt động"
    >
      <div className="fields__bg" aria-hidden>
        <span className="fields__bg-grid" />
        <span className="fields__bg-orb fields__bg-orb--a" />
        <span className="fields__bg-orb fields__bg-orb--b" />
        <span className="fields__bg-orb fields__bg-orb--c" />
        <svg
          className="fields__bg-blueprint"
          viewBox="0 0 800 600"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            className="fields__bg-path"
            d="M40 520 L40 260 L180 260 L180 140 L360 140 L360 300 L520 300 L520 200 L680 200 L680 520 Z"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            className="fields__bg-path fields__bg-path--b"
            d="M100 520 L100 340 L240 340 L240 220 L420 220"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle className="fields__bg-dot" cx="180" cy="140" r="3" fill="currentColor" />
          <circle className="fields__bg-dot" cx="360" cy="300" r="3" fill="currentColor" />
          <circle className="fields__bg-dot" cx="520" cy="200" r="3" fill="currentColor" />
        </svg>
      </div>

      <div className="fields__inner">
        <header className="fields__head">
          <span className="fields__eyebrow">
            <span className="fields__eyebrow-line" />
            Lĩnh vực hoạt động
          </span>
          <h2 className="fields__title">
            <span className="fields__title-mask">
              <span className="fields__title-line">Kiến tạo</span>
            </span>
            <span className="fields__title-mask">
              <span className="fields__title-line fields__title-line--accent">
                <em>đa ngành, một tầm nhìn</em>
              </span>
            </span>
          </h2>
          <p className="fields__lede reveal" style={{ '--d': '1.25s' }}>
            Sáu trụ cột hoạt động — từ xây dựng dân dụng, công nghiệp, hạ tầng đến bất động sản
            và nội thất — tạo nên hệ sinh thái phát triển toàn diện.
          </p>
        </header>

        <ul className="fields__grid" role="list">
          {FIELDS.map((f, i) => {
            const isActive = i === active
            return (
              <li
                key={f.id}
                className={`fcard ${isActive ? 'is-active' : ''}`}
                style={{ '--i': i, '--accent': f.accent }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onMouseMove={onCardMove}
                onMouseLeave={onCardLeave}
              >
                <a className="fcard__hit" href={`#/linh-vuc`} aria-label={f.name}>
                  <div className="fcard__media" aria-hidden>
                    <img className="fcard__img" src={f.img} alt="" loading="lazy" />
                    <span className="fcard__tint" />
                    <span className="fcard__shade" />
                    <span className="fcard__glow" />
                    <span className="fcard__scan" />
                  </div>

                  <span className="fcard__corner fcard__corner--tl" aria-hidden />
                  <span className="fcard__corner fcard__corner--tr" aria-hidden />
                  <span className="fcard__corner fcard__corner--bl" aria-hidden />
                  <span className="fcard__corner fcard__corner--br" aria-hidden />

                  <div className="fcard__topline">
                    <span className="fcard__num">{f.num}</span>
                    <span className="fcard__dash" />
                    <span className="fcard__icon" aria-hidden>
                      {f.icon}
                    </span>
                  </div>

                  <div className="fcard__body">
                    <span className="fcard__tag">{f.tag}</span>
                    <h3 className="fcard__name">
                      {f.name.split(' ').map((w, idx) => (
                        <span key={idx} className="fcard__word" style={{ '--w': idx }}>
                          {w}&nbsp;
                        </span>
                      ))}
                    </h3>
                    <span className="fcard__en">{f.en}</span>
                    <p className="fcard__desc">{f.desc}</p>
                    <span className="fcard__more">
                      <span>Tìm hiểu thêm</span>
                      <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
                        <path
                          d="M1 5h19m0 0L16 1m4 4l-4 4"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>

                  <span className="fcard__edge" aria-hidden />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="fields__ticker reveal" style={{ '--d': '1.9s' }} aria-hidden>
          <div className="fields__ticker-track">
            {[...FIELDS, ...FIELDS].map((f, i) => (
              <span key={i} className="fields__ticker-item">
                <span className="fields__ticker-dot" style={{ background: f.accent }} />
                {f.en}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
