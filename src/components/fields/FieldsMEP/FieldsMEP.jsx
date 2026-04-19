import useInViewActive from '../useInViewActive'
import './FieldsMEP.css'

const IconBolt = () => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden>
    <path d="M18 3 7 18h7l-2 11 11-15h-7l2-11Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
)

const IconAir = () => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden>
    <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.4" />
    <path d="M16 13c0-4 2-7 5-7s5 2 5 5-2 5-5 5h-5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M16 19c0 4-2 7-5 7s-5-2-5-5 2-5 5-5h5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M19 16c4 0 7 2 7 5s-2 5-5 5-5-2-5-5v-5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M13 16c-4 0-7-2-7-5s2-5 5-5 5 2 5 5v5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
)

const IconDrop = () => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden>
    <path d="M16 3s10 11 10 18a10 10 0 1 1-20 0c0-7 10-18 10-18Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M11 21a5 5 0 0 0 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const IconFlame = () => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden>
    <path d="M16 3c2 3 3 5 3 8 1-1 2-2 2-4 3 3 5 6 5 10a10 10 0 1 1-20 0c0-3 1-5 3-7 1 2 2 3 3 3-1-4 2-7 4-10Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M13 22a3 3 0 0 0 6 0c0-2-1.5-3-3-5-1.5 2-3 3-3 5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
)

const IconWrench = () => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden>
    <path d="M21 4a7 7 0 0 0-6 11l-9 9a2.8 2.8 0 1 0 4 4l9-9a7 7 0 0 0 9-8l-4 4-4-1-1-4 4-4a7 7 0 0 0-2-2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
)

const SPECIALTIES = [
  { Icon: IconBolt,   title: 'Hệ thống điện & điện nhẹ',         hint: 'Trung – hạ thế · trạm biến áp · điện nhẹ' },
  { Icon: IconAir,    title: 'Điều hoà không khí & thông gió',  hint: 'HVAC · phòng sạch · hút ẩm' },
  { Icon: IconDrop,   title: 'Cấp thoát nước',                   hint: 'Cấp nước sinh hoạt · xử lý nước thải' },
  { Icon: IconFlame,  title: 'Phòng cháy chữa cháy',             hint: 'Sprinkler · báo cháy · chữa khí' },
  { Icon: IconWrench, title: 'Hệ thống phụ trợ',                 hint: 'Khí nén · gas · nồi hơi · RO' },
]

const STANDARDS = ['IEC', 'NFPA', 'UL/FM', 'SMACNA']

export default function FieldsMEP({ active, isSlide }) {
  const { ref, mount } = useInViewActive(active, isSlide)

  return (
    <section
      ref={ref}
      className={`fp-sec fp-mep ${mount ? 'is-in' : ''}`}
      aria-label="Tổng thầu thi công cơ điện"
    >
      <div className="fp-mep__bg" aria-hidden />
      <div className="fp-mep__grid" aria-hidden />

      <span className="fp-marker" aria-hidden>04<span className="fp-marker__small">/09</span></span>
      <span className="fp-crosshair fp-crosshair--tr" aria-hidden />
      <span className="fp-crosshair fp-crosshair--br" aria-hidden />

      <div className="fp-mep__inner">
        <div className="fp-mep__visual" aria-hidden>
          <svg className="fp-mep__rings" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="96" />
            <circle cx="100" cy="100" r="76" />
            <circle cx="100" cy="100" r="56" />
          </svg>
          <div className="fp-mep__core">M&amp;E</div>
          <span className="fp-mep__node fp-mep__node--1" style={{ '--n': 0 }} />
          <span className="fp-mep__node fp-mep__node--2" style={{ '--n': 1 }} />
          <span className="fp-mep__node fp-mep__node--3" style={{ '--n': 2 }} />
          <span className="fp-mep__node fp-mep__node--4" style={{ '--n': 3 }} />
          <span className="fp-mep__node fp-mep__node--5" style={{ '--n': 4 }} />
        </div>

        <div className="fp-mep__head">
          
          <h2 className="fp-display fp-mep__title">
            <span className="fp-mask"><span className="fp-row" style={{ '--rd': 0 }}>Hệ M&amp;E</span></span>
            <span className="fp-mask"><span className="fp-row" style={{ '--rd': 1 }}>vận hành <em>thông minh</em></span></span>
          </h2>
          <p className="fp-mep__lede">
            Gần hai thập kỷ thiết kế, cung cấp vật tư, thi công và bảo trì các hệ thống cơ điện
            cho công trình dân dụng & công nghiệp — vận hành ổn định, tiết kiệm năng lượng.
          </p>

          <ul className="fp-mep__list" role="list">
            {SPECIALTIES.map(({ Icon, title, hint }, i) => (
              <li key={title} className="fp-mep__item" style={{ '--i': i }}>
                <span className="fp-mep__item-icon" aria-hidden>
                  <Icon />
                </span>
                <span className="fp-mep__item-body">
                  <span className="fp-mep__item-title">{title}</span>
                  <span className="fp-mep__item-hint">{hint}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="fp-mep__std">
            <span className="fp-mep__std-label">Tiêu chuẩn</span>
            {STANDARDS.map((s) => (
              <span key={s} className="fp-mep__std-pill">{s}</span>
            ))}
          </div>

          <div className="fp-mep__tech">
            <span>Công nghệ</span>
            <span className="fp-mep__tech-tag">BIM · Revit</span>
            <span className="fp-mep__tech-tag">VR Walkthrough</span>
          </div>
        </div>
      </div>
    </section>
  )
}
