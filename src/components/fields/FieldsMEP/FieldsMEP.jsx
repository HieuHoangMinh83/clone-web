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

const SPECIALTY_ICONS = [IconBolt, IconAir, IconDrop, IconFlame, IconWrench]

export default function FieldsMEP({
  active,
  isSlide,
  ariaLabel,
  markerNum,
  markerTotal,
  coreLabel,
  titleTop,
  titleBot,
  titleEm,
  lede,
  specialties = [],
  standardsLabel,
  standards = [],
  techLabel,
  tech = [],
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
      className={`fp-sec fp-mep ${mount ? 'is-in' : ''}`}
      aria-label={ariaLabel}
    >
      <div className="fp-mep__bg" aria-hidden />
      <div className="fp-mep__grid" aria-hidden />

      <span className="fp-marker" aria-hidden>{markerNum}<span className="fp-marker__small">{markerTotal}</span></span>
      <span className="fp-crosshair fp-crosshair--tr" aria-hidden />
      <span className="fp-crosshair fp-crosshair--br" aria-hidden />

      <div className="fp-mep__inner">
        <div className="fp-mep__visual" aria-hidden>
          <svg className="fp-mep__rings" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="96" />
            <circle cx="100" cy="100" r="76" />
            <circle cx="100" cy="100" r="56" />
          </svg>
          <div className="fp-mep__core">{coreLabel}</div>
          <span className="fp-mep__node fp-mep__node--1" style={{ '--n': 0 }} />
          <span className="fp-mep__node fp-mep__node--2" style={{ '--n': 1 }} />
          <span className="fp-mep__node fp-mep__node--3" style={{ '--n': 2 }} />
          <span className="fp-mep__node fp-mep__node--4" style={{ '--n': 3 }} />
          <span className="fp-mep__node fp-mep__node--5" style={{ '--n': 4 }} />
        </div>

        <div className="fp-mep__head">
          <h2 className="fp-display fp-mep__title">
            <span className="fp-mask"><span className="fp-row" style={{ '--rd': 0 }}>{titleTop}</span></span>
            <span className="fp-mask"><span className="fp-row" style={{ '--rd': 1 }}>{renderTitleBot()}</span></span>
          </h2>
          <p className="fp-mep__lede">{lede}</p>

          <ul className="fp-mep__list" role="list">
            {specialties.map((s, i) => {
              const Icon = SPECIALTY_ICONS[i]
              return (
                <li key={s.title} className="fp-mep__item" style={{ '--i': i }}>
                  <span className="fp-mep__item-icon" aria-hidden>
                    {Icon && <Icon />}
                  </span>
                  <span className="fp-mep__item-body">
                    <span className="fp-mep__item-title">{s.title}</span>
                    <span className="fp-mep__item-hint">{s.hint}</span>
                  </span>
                </li>
              )
            })}
          </ul>

          <div className="fp-mep__std">
            <span className="fp-mep__std-label">{standardsLabel}</span>
            {standards.map((s) => (
              <span key={s} className="fp-mep__std-pill">{s}</span>
            ))}
          </div>

          <div className="fp-mep__tech">
            <span>{techLabel}</span>
            {tech.map((t) => (
              <span key={t} className="fp-mep__tech-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
