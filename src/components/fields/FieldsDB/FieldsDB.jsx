import useInViewActive from '../useInViewActive'
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

const BENEFIT_ICONS = [IconClock, IconValue, IconSchedule, IconShield]

// Wrap các substring có trong `strongs` bằng <strong>
function highlight(text, strongs = []) {
  if (!strongs.length) return text
  const pattern = new RegExp(`(${strongs.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
  const parts = text.split(pattern)
  return parts.map((p, i) =>
    strongs.includes(p) ? <strong key={i}>{p}</strong> : p,
  )
}

export default function FieldsDB({
  active,
  isSlide,
  bg,
  ariaLabel,
  markerNum,
  markerTotal,
  titleTop,
  titleBot,
  lede,
  ledeStrongs = [],
  headline,
  benefits = [],
}) {
  const { ref, mount } = useInViewActive(active, isSlide)

  return (
    <section
      ref={ref}
      className={`fp-sec fp-db ${mount ? 'is-in' : ''}`}
      aria-label={ariaLabel}
    >
      <div className="fp-db__bg" aria-hidden>
        <img src={bg} alt="" className="fp-db__bgimg" />
        <div className="fp-db__bgtint" />
      </div>

      <span className="fp-marker" aria-hidden>{markerNum}<span className="fp-marker__small">{markerTotal}</span></span>
      <span className="fp-crosshair fp-crosshair--tl" aria-hidden />
      <span className="fp-crosshair fp-crosshair--tr" aria-hidden />
      <span className="fp-crosshair fp-crosshair--bl" aria-hidden />
      <span className="fp-crosshair fp-crosshair--br" aria-hidden />

      <div className="fp-db__inner">
        <header className="fp-db__head">
          <h2 className="fp-display fp-db__title">
            <span className="fp-mask"><span className="fp-row" style={{ '--rd': 0 }}>{titleTop}</span></span>
            <span className="fp-mask"><span className="fp-row fp-db__title--accent" style={{ '--rd': 1 }}>{titleBot}</span></span>
          </h2>

          <p className="fp-db__lede">{highlight(lede, ledeStrongs)}</p>

          {headline && (
            <div className="fp-db__headline" role="text">
              <span className="fp-db__headline-line" aria-hidden />
              <span className="fp-db__headline-text">
                {headline.text}{' '}
                {headline.highlights?.map((h, i) => (
                  <span key={i}>
                    <em>{h}</em>
                    {i < headline.highlights.length - 1 && ` ${headline.join || 'và'} `}
                  </span>
                ))}
              </span>
              <span className="fp-db__headline-line" aria-hidden />
            </div>
          )}
        </header>

        <ul className="fp-db__cards" role="list">
          {benefits.map((b, i) => {
            const Icon = BENEFIT_ICONS[i]
            return (
              <li key={b.k} className="fp-db__card" style={{ '--i': i }}>
                <span className="fp-db__card-icon" aria-hidden>
                  {Icon && <Icon />}
                </span>
                <h3 className="fp-db__card-title">{b.title}</h3>
                <p className="fp-db__card-desc">{b.desc}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
