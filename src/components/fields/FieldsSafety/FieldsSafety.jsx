import useInViewActive from '../useInViewActive'
import './FieldsSafety.css'

const COMMITMENT_ICONS = [
  () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 3l9 4-9 4-9-4 9-4z" strokeLinejoin="round" />
      <path d="M5 9v5c0 2 3 4 7 4s7-2 7-4V9" />
      <path d="M21 7v5" strokeLinecap="round" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 3l10 18H2L12 3z" strokeLinejoin="round" />
      <path d="M12 10v5M12 18v.5" strokeLinecap="round" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="3" y="6" width="18" height="13" rx="1.5" />
      <path d="M12 10v5M9.5 12.5h5" strokeLinecap="round" />
      <path d="M9 6V4h6v2" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16l5 5" strokeLinecap="round" />
      <path d="M11 8v6M8 11h6" strokeLinecap="round" />
    </svg>
  ),
]

export default function FieldsSafety({
  active,
  isSlide,
  bg,
  ariaLabel,
  markerNum,
  markerTotal,
  titleTop,
  titleBot,
  titleEm,
  pullAccents = [],
  pullTail,
  lede,
  stats = [],
  commitments = [],
  seal,
}) {
  const { ref, mount } = useInViewActive(active, isSlide)

  const renderTitleBot = () => {
    if (!titleEm || !titleBot.includes(titleEm)) return titleBot
    const parts = titleBot.split(titleEm)
    return (
      <>
        {parts[0]}<em>{titleEm}</em>{parts[1]}
      </>
    )
  }

  return (
    <section
      ref={ref}
      className={`fp-sec fp-safe ${mount ? 'is-in' : ''}`}
      aria-label={ariaLabel}
    >
      <div className="fp-safe__bg" aria-hidden>
        <img src={bg} alt="" className="fp-safe__bgimg" />
        <div className="fp-safe__bgtint" />
      </div>
      <div className="fp-safe__tape" aria-hidden />

      <span className="fp-marker" aria-hidden>{markerNum}<span className="fp-marker__small">{markerTotal}</span></span>
      <span className="fp-crosshair fp-crosshair--bl" aria-hidden />
      <span className="fp-crosshair fp-crosshair--br" aria-hidden />

      <div className="fp-safe__inner">
        <div className="fp-safe__quote">
          <span className="fp-safe__qmark" aria-hidden>&ldquo;</span>

          <h2 className="fp-display fp-safe__title">
            <span className="fp-mask"><span className="fp-row" style={{ '--rd': 0 }}>{titleTop}</span></span>
            <span className="fp-mask"><span className="fp-row" style={{ '--rd': 1 }}>{renderTitleBot()}</span></span>
          </h2>
          <p className="fp-safe__pull">
            {pullAccents.map((a, i) => (
              <span key={i}>
                <span className="fp-safe__pull-accent">{a}</span>
                {i < pullAccents.length - 1 && <span className="fp-safe__pull-amp"> &amp; </span>}
              </span>
            ))}
            <br />
            <span className="fp-safe__pull-tail">{pullTail}</span>
          </p>
          <p className="fp-safe__lede">{lede}</p>

          <ul className="fp-safe__stats" role="list">
            {stats.map((s, i) => (
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
            {commitments.map((c, i) => {
              const Icon = COMMITMENT_ICONS[i]
              return (
                <li key={c.title} className="fp-safe__item" style={{ '--i': i }}>
                  <span className="fp-safe__item-num" aria-hidden>{c.k}</span>
                  <span className="fp-safe__item-icon" aria-hidden>{Icon && <Icon />}</span>
                  <h3 className="fp-safe__item-title">{c.title}</h3>
                  <p className="fp-safe__item-desc">{c.desc}</p>
                  <span className="fp-safe__item-corner" aria-hidden />
                </li>
              )
            })}
          </ul>

          {seal && (
            <div className="fp-safe__seal" aria-label={seal.ariaLabel}>
              <span className="fp-safe__seal-medal" aria-hidden>
                <span className="fp-safe__seal-ring" />
                <span className="fp-safe__seal-mark">{seal.mark}</span>
              </span>
              <div className="fp-safe__seal-body">
                <span className="fp-safe__seal-label">{seal.label}</span>
                <span className="fp-safe__seal-name">{seal.name}</span>
                <span className="fp-safe__seal-issuer">{seal.issuer}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
