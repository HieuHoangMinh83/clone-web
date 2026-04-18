import '../_shared.css'
import './NewsStats.css'

/**
 * Khối Con số (S4) — lưới 4 ô stats.
 *
 * Props:
 * - items:    [{ k, u, v }] — số chính, đơn vị, mô tả
 * - active:   true → animation (default true)
 * - kicker:   nhãn (default "Những con số")
 * - heading:  React node (default "Quy mô & tác động")
 * - subtitle: mô tả phụ (optional)
 */
export default function NewsStats({
  items = [],
  active = true,
  kicker,
  heading,
  subtitle,
}) {
  return (
    <section className={`nd-sec nd-s4 ${active ? 'is-in' : ''}`}>
      <div className="nd-s4__bg" aria-hidden>
        <span className="nd-s4__grid" />
        <span className="nd-s4__watermark">Figures</span>
      </div>
      <div className="nd-container nd-s4__inner">
        <header className="nd-s4__head">
          {kicker && <span className="nd-kicker nd-kicker--gold">{kicker}</span>}
          <h2 className="nd-s4__heading">
            {heading || (<>Quy mô &amp; <em>tác động</em></>)}
          </h2>
          {subtitle && <p className="nd-s4__subtitle">{subtitle}</p>}
        </header>
        <ul className="nd-s4__grid-list" role="list">
          {items.map((s, i) => (
            <li key={i} className="nd-s4__cell" style={{ '--i': i }}>
              <span className="nd-s4__idx">0{i + 1}</span>
              <span className="nd-s4__k">
                {s.k}
                {s.u && <em>{s.u}</em>}
              </span>
              <span className="nd-s4__v">{s.v}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
