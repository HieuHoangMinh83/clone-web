import { useEffect, useState } from 'react'
import bgImg from '../../../assets/images/projects/landmark-81.jpg'
import './FieldsDB.css'

const IconClock = () => (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden>
    <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.4" />
    <path d="M24 12v12l8 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M24 4v3M24 41v3M44 24h-3M7 24H4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const IconValue = () => (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden>
    <path d="M6 16c0-3.3 8-6 18-6s18 2.7 18 6-8 6-18 6S6 19.3 6 16Z" stroke="currentColor" strokeWidth="1.4" />
    <path d="M6 16v8c0 3.3 8 6 18 6s18-2.7 18-6v-8" stroke="currentColor" strokeWidth="1.4" />
    <path d="M6 24v8c0 3.3 8 6 18 6s18-2.7 18-6v-8" stroke="currentColor" strokeWidth="1.4" />
    <path d="M20 30l4 4 8-10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconSchedule = () => (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden>
    <rect x="6" y="10" width="36" height="32" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M6 18h36" stroke="currentColor" strokeWidth="1.4" />
    <path d="M14 6v8M34 6v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M12 25h14M12 32h20M12 38h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const IconShield = () => (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden>
    <path d="M24 5 8 11v11c0 9 6.8 17.4 16 21 9.2-3.6 16-12 16-21V11L24 5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="m16 24 5.5 5.5L32 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const BENEFITS = [
  {
    k: '01',
    Icon: IconClock,
    title: 'Tiết kiệm thời gian',
    desc: 'Hạn chế các thay đổi phát sinh, đảm bảo vận hành ăn ý theo yêu cầu CĐT và các tiêu chuẩn, quy chuẩn hiện hành.',
  },
  {
    k: '02',
    Icon: IconValue,
    title: 'Tối ưu vốn đầu tư',
    desc: 'Mang tới nhiều giải pháp xử lý công việc với duy nhất một đầu mối giúp tối ưu hoá chi phí và tăng hiệu quả kiểm soát dự án.',
  },
  {
    k: '03',
    Icon: IconSchedule,
    title: 'Chủ động thiết kế & tiến độ',
    desc: 'Giảm những công đoạn, thời gian chờ khi phải phân chia và điều phối nhiều gói thầu nhỏ gây ảnh hưởng tới tiến độ chung.',
  },
  {
    k: '04',
    Icon: IconShield,
    title: 'Đảm bảo chất lượng',
    desc: 'Tăng tính ràng buộc trách nhiệm chặt chẽ giữa Thiết kế và Thi công, giữa Xây dựng và Cơ điện — tối đa hoá hiệu quả dự án.',
  },
]

export default function FieldsDB({ active }) {
  const [mount, setMount] = useState(false)
  useEffect(() => {
    if (active) {
      const t = requestAnimationFrame(() => setMount(true))
      return () => cancelAnimationFrame(t)
    }
    setMount(false)
  }, [active])

  return (
    <section
      className={`fp-sec fp-db ${mount ? 'is-in' : ''}`}
      aria-label="Tổng thầu D&amp;B"
    >
      <div className="fp-db__bg" aria-hidden>
        <img src={bgImg} alt="" className="fp-db__bgimg" />
        <div className="fp-db__bgtint" />
      </div>

      <span className="fp-marker" aria-hidden>02<span className="fp-marker__small">/09</span></span>
      <span className="fp-crosshair fp-crosshair--tl" aria-hidden />
      <span className="fp-crosshair fp-crosshair--tr" aria-hidden />
      <span className="fp-crosshair fp-crosshair--bl" aria-hidden />
      <span className="fp-crosshair fp-crosshair--br" aria-hidden />

      <div className="fp-db__inner">
        <header className="fp-db__head">
         

          <h2 className="fp-display fp-db__title">
            <span className="fp-mask"><span className="fp-row" style={{ '--rd': 0 }}>TỔNG THẦU D&amp;B</span></span>
            <span className="fp-mask"><span className="fp-row fp-db__title--accent" style={{ '--rd': 1 }}>XÂY DỰNG <em>&amp;</em> CƠ ĐIỆN</span></span>
          </h2>

          <p className="fp-db__lede">
            Thiết kế và Thi công (D&amp;B) là mô hình tiên tiến được nhiều nhà
            thầu lớn trên thế giới áp dụng. Với quy mô lớn và phức tạp, D&amp;B
            đòi hỏi sự phối hợp nhịp nhàng giữa thiết kế và thi công, xây dựng
            và cơ điện. Newtecons đáp ứng những yêu cầu đó — thành viên Hội
            đồng Công trình Xanh Việt Nam, giàu kinh nghiệm với các dự án đạt
            tiêu chuẩn <strong>LEED (Mỹ)</strong>, <strong>LOTUS (Việt Nam)</strong>.
          </p>

          <div className="fp-db__headline" role="text">
            <span className="fp-db__headline-line" aria-hidden />
            <span className="fp-db__headline-text">
              Với mô hình D&amp;B, Newtecons giúp Chủ đầu tư{' '}
              <em>giảm 30% thời gian</em> và <em>10–15% chi phí</em>
            </span>
            <span className="fp-db__headline-line" aria-hidden />
          </div>
        </header>

        <ul className="fp-db__cards" role="list">
          {BENEFITS.map(({ k, Icon, title, desc }, i) => (
            <li key={k} className="fp-db__card" style={{ '--i': i }}>
              <span className="fp-db__card-icon" aria-hidden>
                <Icon />
              </span>
              <h3 className="fp-db__card-title">{title}</h3>
              <p className="fp-db__card-desc">{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
