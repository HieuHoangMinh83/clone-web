import useInViewActive from '../useInViewActive'
import './FieldsConstruction.css'

const IconTeam = () => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden>
    <circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="22" cy="13" r="3" stroke="currentColor" strokeWidth="1.4" />
    <path d="M3 26c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M19 22c.8-2.5 3-4 5.5-4 2.5 0 4.5 1.5 5.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const IconBulb = () => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden>
    <path d="M16 3a9 9 0 0 0-5 16.5V23h10v-3.5A9 9 0 0 0 16 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M12 26h8M13 29h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M16 11v6M13 14h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const IconGear = () => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden>
    <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.4" />
    <path d="M16 2v4M16 26v4M2 16h4M26 16h4M6 6l3 3M23 23l3 3M6 26l3-3M23 9l3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const IconChart = () => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden>
    <rect x="4" y="4" width="24" height="24" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M9 22v-6M15 22v-10M21 22v-4M9 9h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="6.5" cy="9" r="0.8" fill="currentColor" />
  </svg>
)

const STRENGTH_ICONS = [IconTeam, IconBulb, IconGear, IconChart]

export default function FieldsConstruction({
  active,
  isSlide,
  bg,
  ariaLabel,
  markerNum,
  markerTotal,
  badge,
  dimStart,
  dimEnd,
  titleTop,
  titleBot,
  titleEm,
  lede,
  strengths = [],
}) {
  const { ref, mount } = useInViewActive(active, isSlide)

  // titleBot có thể chứa fragment cần <em>: "từ <em>móng đến mái</em>"
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
      className={`fp-sec fp-cons ${mount ? 'is-in' : ''}`}
      aria-label={ariaLabel}
    >
      <div className="fp-cons__bg" aria-hidden>
        <img src={bg} alt="" className="fp-cons__bgimg" />
        <div className="fp-cons__bgtint" />
      </div>

      <svg className="fp-cons__lines" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <path d="M0 220 L640 220 L780 90 L1920 90" />
        <path d="M0 920 L520 920 L660 1040 L1920 1040" />
      </svg>

      <span className="fp-marker" aria-hidden>{markerNum}<span className="fp-marker__small">{markerTotal}</span></span>
      <span className="fp-crosshair fp-crosshair--tl" aria-hidden />
      <span className="fp-crosshair fp-crosshair--bl" aria-hidden />

      <div className="fp-cons__inner">
        <div className="fp-cons__plate">
          <img src={bg} alt="" className="fp-cons__plate-img" />
          <span className="fp-cons__plate-frame" aria-hidden />
          <span className="fp-cons__badge">{badge}</span>
          <div className="fp-cons__dim" aria-hidden>
            <span>{dimStart}</span>
            <span className="fp-cons__dim-bar" />
            <span>{dimEnd}</span>
          </div>
        </div>

        <div className="fp-cons__head">
          <h2 className="fp-display fp-cons__title">
            <span className="fp-mask"><span className="fp-row" style={{ '--rd': 0 }}>{titleTop}</span></span>
            <span className="fp-mask"><span className="fp-row" style={{ '--rd': 1 }}>{renderTitleBot()}</span></span>
          </h2>
          <p className="fp-cons__lede">{lede}</p>

          <ol className="fp-cons__list">
            {strengths.map((s, i) => {
              const Icon = STRENGTH_ICONS[i]
              return (
                <li key={s.title} className="fp-cons__item" style={{ '--i': i }}>
                  <span className="fp-cons__node" aria-hidden>
                    {Icon && <Icon />}
                  </span>
                  <div className="fp-cons__item-body">
                    <h3 className="fp-cons__item-title">{s.title}</h3>
                    <p className="fp-cons__item-desc">{s.desc}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
