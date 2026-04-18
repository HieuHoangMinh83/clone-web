import { useEffect, useState } from 'react'
import bgImg from '../../../assets/images/fields/figma-f3.png'
import './FieldsSafety.css'

const COMMITMENTS = [
  {
    k: '01',
    title: 'Huấn luyện trước dự án',
    desc: 'Đào tạo an toàn lao động bắt buộc cho toàn bộ kỹ sư & công nhân trước khi vào công trường.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 3l9 4-9 4-9-4 9-4z" strokeLinejoin="round" />
        <path d="M5 9v5c0 2 3 4 7 4s7-2 7-4V9" />
        <path d="M21 7v5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    k: '02',
    title: 'Đánh giá rủi ro HIRA',
    desc: 'Phân tích, nhận diện và kiểm soát các rủi ro tiềm ẩn theo quy trình HIRA chặt chẽ.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 3l10 18H2L12 3z" strokeLinejoin="round" />
        <path d="M12 10v5M12 18v.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    k: '03',
    title: 'Sơ cấp cứu định kỳ',
    desc: 'Bồi dưỡng sơ cấp cứu định kỳ — trang bị thiết bị y tế tại tất cả công trường.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="6" width="18" height="13" rx="1.5" />
        <path d="M12 10v5M9.5 12.5h5" strokeLinecap="round" />
        <path d="M9 6V4h6v2" />
      </svg>
    ),
  },
  {
    k: '04',
    title: 'Giám sát HSSE 24/7',
    desc: 'Đội ngũ HSSE hiện diện toàn thời gian, audit ngẫu nhiên — báo cáo trực tiếp ban lãnh đạo.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="11" cy="11" r="6" />
        <path d="M16 16l5 5" strokeLinecap="round" />
        <path d="M11 8v6M8 11h6" strokeLinecap="round" />
      </svg>
    ),
  },
]

const STATS = [
  { num: '1.000.000+', unit: 'giờ công an toàn', sub: 'Lũy kế toàn hệ thống' },
  { num: '0', unit: 'LTI', sub: 'Lost Time Injury · 12 tháng' },
  { num: '200+', unit: 'dự án zero accident', sub: 'Bàn giao trong 5 năm gần nhất' },
]

export default function FieldsSafety({ active }) {
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
      className={`fp-sec fp-safe ${mount ? 'is-in' : ''}`}
      aria-label="Văn hoá an toàn"
    >
      <div className="fp-safe__bg" aria-hidden>
        <img src={bgImg} alt="" className="fp-safe__bgimg" />
        <div className="fp-safe__bgtint" />
      </div>
      <div className="fp-safe__tape" aria-hidden />

      <span className="fp-marker" aria-hidden>05<span className="fp-marker__small">/09</span></span>
      <span className="fp-crosshair fp-crosshair--bl" aria-hidden />
      <span className="fp-crosshair fp-crosshair--br" aria-hidden />

      <div className="fp-safe__inner">
        <div className="fp-safe__quote">
          <span className="fp-safe__qmark" aria-hidden>&ldquo;</span>
          <span className="fp-kicker fp-safe__kicker">
            <span className="fp-kicker__rule" />
            05 — Văn hoá an toàn
          </span>
          <h2 className="fp-display fp-safe__title">
            <span className="fp-mask"><span className="fp-row" style={{ '--rd': 0 }}>Hai điều</span></span>
            <span className="fp-mask"><span className="fp-row" style={{ '--rd': 1 }}>không <em>thoả hiệp</em></span></span>
          </h2>
          <p className="fp-safe__pull">
            <span className="fp-safe__pull-accent">Chất lượng</span>
            <span className="fp-safe__pull-amp"> &amp; </span>
            <span className="fp-safe__pull-accent">An toàn</span>
            <br />
            <span className="fp-safe__pull-tail">— hai trụ cột Newtecons không bao giờ đánh đổi.</span>
          </p>
          <p className="fp-safe__lede">
            Mọi quyết định thi công của chúng tôi đều được cân nhắc trên hai trụ cột này
            — bất kể tiến độ hay áp lực ngân sách.
          </p>

          <ul className="fp-safe__stats" role="list">
            {STATS.map((s, i) => (
              <li key={s.unit} className="fp-safe__stat" style={{ '--s': i }}>
                <span className="fp-safe__stat-num">{s.num}</span>
                <span className="fp-safe__stat-unit">{s.unit}</span>
                <span className="fp-safe__stat-sub">{s.sub}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="fp-safe__right">
          <ul className="fp-safe__list" role="list">
            {COMMITMENTS.map((c, i) => (
              <li key={c.title} className="fp-safe__item" style={{ '--i': i }}>
                <span className="fp-safe__item-num" aria-hidden>{c.k}</span>
                <span className="fp-safe__item-icon" aria-hidden>{c.icon}</span>
                <h3 className="fp-safe__item-title">{c.title}</h3>
                <p className="fp-safe__item-desc">{c.desc}</p>
                <span className="fp-safe__item-corner" aria-hidden />
              </li>
            ))}
          </ul>

          <div className="fp-safe__seal" aria-label="ISO 45001:2018 certified">
            <span className="fp-safe__seal-medal" aria-hidden>
              <span className="fp-safe__seal-ring" />
              <span className="fp-safe__seal-mark">ISO</span>
            </span>
            <div className="fp-safe__seal-body">
              <span className="fp-safe__seal-label">Certified · OH&amp;S</span>
              <span className="fp-safe__seal-name">45001 : 2018</span>
              <span className="fp-safe__seal-issuer">BSI · TÜV · DNV</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
