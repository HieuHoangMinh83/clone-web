import useInViewActive from '../useInViewActive'
import './FieldsHR.css'

const STAT_ICONS = [
  () => (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="22" cy="13" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 26c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M19 22c.8-2.5 3-4 5.5-4 2.5 0 4.5 1.5 5.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="5" y="7" width="22" height="20" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 13h22M11 4v6M21 4v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="16" cy="16" rx="5" ry="12" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 16h24" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M9 5h14v6a7 7 0 0 1-14 0V5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M9 8H5v3a4 4 0 0 0 4 4M23 8h4v3a4 4 0 0 1-4 4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M16 18v5M11 27h10M13 23h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
]

export default function FieldsHR({
  active,
  isSlide,
  ariaLabel,
  markerNum,
  markerTotal,
  titleTop,
  titleBot,
  titleEm,
  award,
  pullBody,
  pullEm,
  pullAttr,
  values = [],
  stats = [],
}) {
  const { ref, mount } = useInViewActive(active, isSlide)

  const renderTitleBot = () => {
    if (!titleEm || !titleBot.includes(titleEm)) return titleBot
    const parts = titleBot.split(titleEm)
    return <>{parts[0]}<em>{titleEm}</em>{parts[1]}</>
  }

  const renderPull = () => {
    if (!pullEm || !pullBody.includes(pullEm)) return pullBody
    const parts = pullBody.split(pullEm)
    return <>{parts[0]}<em>{pullEm}</em>{parts[1]}</>
  }

  return (
    <section
      ref={ref}
      className={`fp-sec fp-hr ${mount ? 'is-in' : ''}`}
      aria-label={ariaLabel}
    >
      <div className="fp-hr__grain" aria-hidden />
      <div className="fp-hr__glow fp-hr__glow--a" aria-hidden />
      <div className="fp-hr__glow fp-hr__glow--b" aria-hidden />

      <span className="fp-marker" aria-hidden>{markerNum}<span className="fp-marker__small">{markerTotal}</span></span>
      <span className="fp-crosshair fp-crosshair--tr" aria-hidden />
      <span className="fp-crosshair fp-crosshair--bl" aria-hidden />

      <div className="fp-hr__inner">
        <header className="fp-hr__head">
          <h2 className="fp-display fp-hr__title">
            <span className="fp-mask"><span className="fp-row" style={{ '--rd': 0 }}>{titleTop}</span></span>
            <span className="fp-mask"><span className="fp-row" style={{ '--rd': 1 }}>{renderTitleBot()}</span></span>
          </h2>
        </header>

        <div className="fp-hr__stage">
          <div className="fp-hr__award" aria-label={award?.ariaLabel}>
            <span className="fp-hr__award-ring" />
            <span className="fp-hr__award-ring fp-hr__award-ring--inner" />
            <span className="fp-hr__award-ring fp-hr__award-ring--outer" />
            <span className="fp-hr__award-laurel fp-hr__award-laurel--l" aria-hidden>
              <svg viewBox="0 0 40 100" fill="none">
                <path d="M30 5 C 8 25, 6 50, 8 75 C 12 90, 22 95, 30 95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M22 18 C 14 22, 12 30, 14 36 M18 32 C 10 36, 8 44, 10 50 M16 48 C 8 52, 6 60, 8 66 M18 64 C 10 68, 10 76, 14 80" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="fp-hr__award-laurel fp-hr__award-laurel--r" aria-hidden>
              <svg viewBox="0 0 40 100" fill="none">
                <path d="M10 5 C 32 25, 34 50, 32 75 C 28 90, 18 95, 10 95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M18 18 C 26 22, 28 30, 26 36 M22 32 C 30 36, 32 44, 30 50 M24 48 C 32 52, 34 60, 32 66 M22 64 C 30 68, 30 76, 26 80" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </span>
            <div className="fp-hr__award-body">
              <div className="fp-hr__award-org">{award?.org}</div>
              <div className="fp-hr__award-name">{award?.name}</div>
              <div className="fp-hr__award-rule" />
              <div className="fp-hr__award-year">{award?.year}</div>
            </div>
          </div>

          <div className="fp-hr__quote-block">
            <blockquote className="fp-hr__pull">
              <span className="fp-hr__pull-mark" aria-hidden>&ldquo;</span>
              {renderPull()}
              <span className="fp-hr__pull-attr">{pullAttr}</span>
            </blockquote>

            <ul className="fp-hr__values" role="list" aria-label="Giá trị cốt lõi">
              {values.map((v, i) => (
                <li key={v.label} className="fp-hr__value" style={{ '--v': i }}>
                  <span className="fp-hr__value-k">{v.k}</span>
                  <span className="fp-hr__value-l">{v.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="fp-hr__stats">
          {stats.map((s, i) => {
            const Icon = STAT_ICONS[i]
            return (
              <div key={s.v} className="fp-hr__stat" style={{ '--i': i }}>
                <span className="fp-hr__stat-icon" aria-hidden>{Icon && <Icon />}</span>
                <div className="fp-hr__stat-body">
                  <span className="fp-hr__stat-k">{s.k}</span>
                  <span className="fp-hr__stat-v">{s.v}</span>
                  <span className="fp-hr__stat-sub">{s.sub}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
