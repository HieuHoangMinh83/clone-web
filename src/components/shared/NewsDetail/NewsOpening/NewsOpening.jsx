import '../_shared.css'
import './NewsOpening.css'

/**
 * Khối mở đầu — 2 cột văn bản + facts 4 ô (S2).
 *
 * Props:
 * - sections: [{ num, kicker, title, paragraphs[] }] — các cột
 * - facts:    [{ label, value }] — thông tin nhanh (optional)
 * - active:   true → animation is-in (default true)
 * - kicker:   nhãn trên tiêu đề (default "Phần mở đầu")
 * - heading:  React node cho H2 (default "Bối cảnh & nội dung")
 * - subtitle: mô tả phụ dưới heading (optional)
 */
export default function NewsOpening({
  sections = [],
  facts = [],
  active = true,
  kicker,
  heading,
  subtitle,
}) {
  return (
    <section className={`nd-sec nd-s2 ${active ? 'is-in' : ''}`}>
      <div className="nd-s2__bg" aria-hidden>
        <span className="nd-s2__watermark">01 · 02</span>
        <span className="nd-s2__grid" />
      </div>
      <div className="nd-container nd-s2__inner">
        <header className="nd-s2__head">
          {kicker && <span className="nd-kicker">{kicker}</span>}
          <h2 className="nd-s2__heading">
            {heading || (<>Bối cảnh &amp; <em>nội dung</em></>)}
          </h2>
          {subtitle && <p className="nd-s2__subtitle">{subtitle}</p>}
        </header>
        <div className="nd-s2__cols">
          {sections.map((sec, si) => (
            <article key={sec.id || si} className="nd-col" style={{ '--ci': si }}>
              <header className="nd-col__head">
                <span className="nd-col__num">{sec.num}</span>
                <div>
                  <span className="nd-col__kicker">{sec.kicker}</span>
                  <h3 className="nd-col__title">{sec.title}</h3>
                </div>
              </header>
              <div className="nd-col__body">
                {sec.paragraphs.map((p, pi) => <p key={pi}>{p}</p>)}
              </div>
            </article>
          ))}
        </div>
        {facts.length > 0 && (
          <aside className="nd-s2__facts" aria-label="Thông tin chính">
            {facts.map((f, i) => (
              <div key={i} className="nd-s2__fact" style={{ '--fi': i }}>
                <span className="nd-s2__fact-k">{f.label}</span>
                <span className="nd-s2__fact-v">{f.value}</span>
              </div>
            ))}
          </aside>
        )}
      </div>
    </section>
  )
}
