import useInViewActive from '../useInViewActive'
import './FieldsISO.css'

const CERTS = [
  {
    num: '9001',
    year: '2015',
    name: 'Quản lý chất lượng',
    desc: 'Hệ thống quản lý chất lượng xuyên suốt từ thiết kế, mua sắm, thi công đến bàn giao.',
    tag: 'Active',
    tone: 'navy',
  },
  {
    num: '14001',
    year: '2015',
    name: 'Quản lý môi trường',
    desc: 'Kiểm soát phát thải, xử lý chất thải xây dựng và bảo vệ hệ sinh thái khu vực dự án.',
    tag: 'Active',
    tone: 'green',
  },
  {
    num: '45001',
    year: '2018',
    name: 'An toàn sức khoẻ',
    desc: 'Quản lý an toàn lao động & sức khoẻ nghề nghiệp theo chuẩn quốc tế.',
    tag: 'Active',
    tone: 'red',
  },
]

const PILLARS = [
  { k: '01', label: 'Hoạch định', desc: 'Plan' },
  { k: '02', label: 'Triển khai', desc: 'Do' },
  { k: '03', label: 'Kiểm tra',   desc: 'Check' },
  { k: '04', label: 'Cải tiến',   desc: 'Act' },
]

export default function FieldsISO({ active, isSlide }) {
  const { ref, mount } = useInViewActive(active, isSlide)

  return (
    <section
      ref={ref}
      className={`fp-sec fp-sec--paper fp-iso ${mount ? 'is-in' : ''}`}
      aria-label="Hệ thống quản lý"
    >
      <div className="fp-iso__bg" aria-hidden />
      <div className="fp-iso__grid" aria-hidden />

      <span className="fp-marker" aria-hidden>08<span className="fp-marker__small">/09</span></span>
      <span className="fp-crosshair fp-crosshair--tl" aria-hidden />
      <span className="fp-crosshair fp-crosshair--br" aria-hidden />

      <div className="fp-iso__inner">
        <header className="fp-iso__head">
         
          <h2 className="fp-display fp-iso__title">
            <span className="fp-mask"><span className="fp-row" style={{ '--rd': 0 }}>Tuân thủ chuẩn</span></span>
            <span className="fp-mask"><span className="fp-row" style={{ '--rd': 1 }}><em>quốc tế</em>.</span></span>
          </h2>
          <p className="fp-iso__lede">
            Ba chứng nhận ISO chính — nền tảng quản trị xuyên suốt mọi dự án Newtecons triển khai
            theo vòng cải tiến liên tục PDCA.
          </p>
        </header>

        <div className="fp-iso__cards">
          {CERTS.map((c, i) => (
            <article
              key={c.num}
              className={`fp-iso__card fp-iso__card--${c.tone}`}
              style={{ '--i': i }}
            >
              <span className="fp-iso__card-corner" aria-hidden />

              <div className="fp-iso__card-medal" aria-hidden>
                <span className="fp-iso__card-medal-ring" />
                <span className="fp-iso__card-medal-ring fp-iso__card-medal-ring--inner" />
                <div className="fp-iso__card-medal-body">
                  <span className="fp-iso__card-medal-iso">ISO</span>
                  <span className="fp-iso__card-medal-num">{c.num}</span>
                </div>
              </div>

              <div className="fp-iso__card-year">: {c.year}</div>
              <h3 className="fp-iso__card-name">{c.name}</h3>
              <span className="fp-iso__card-rule" />
              <p className="fp-iso__card-desc">{c.desc}</p>
              <span className="fp-iso__card-tag">{c.tag} certified</span>
            </article>
          ))}
        </div>

        <div className="fp-iso__pdca" aria-label="Chu trình PDCA">
          <span className="fp-iso__pdca-label">Chu trình quản trị · PDCA</span>
          <ul className="fp-iso__pdca-list" role="list">
            {PILLARS.map((p, i) => (
              <li key={p.k} className="fp-iso__pdca-item" style={{ '--p': i }}>
                <span className="fp-iso__pdca-k">{p.k}</span>
                <div className="fp-iso__pdca-text">
                  <span className="fp-iso__pdca-l">{p.label}</span>
                  <span className="fp-iso__pdca-d">{p.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <footer className="fp-iso__foot">
          <span>Cam kết tuân thủ <strong>luật pháp Việt Nam</strong> &amp; yêu cầu HSSE</span>
          <span className="fp-iso__foot-dot" aria-hidden>·</span>
          <span>Audit định kỳ: <strong>BSI · TÜV · DNV</strong></span>
        </footer>
      </div>
    </section>
  )
}
