import FieldsEquipmentMap from './FieldsEquipmentMap'
import useInViewActive from '../useInViewActive'
import './FieldsEquipment.css'

const EQUIPMENT_ICONS = [
  () => (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M16 4v24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M16 6 4 10l12 4 12-4-12-4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M4 10v4l12 4 12-4v-4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M10 22h12M11 26h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M6 4v24M26 4v24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <rect x="10" y="14" width="12" height="10" stroke="currentColor" strokeWidth="1.4" />
      <path d="M16 4v10M12 8h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="4" y="4" width="24" height="24" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 12h24M4 20h24M12 4v24M20 4v24" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M5 4v24M16 4v24M27 4v24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M5 11h22M5 21h22" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 11l11 10M16 11l11 10M5 21l11-10M16 21l11-10" stroke="currentColor" strokeWidth="1" opacity="0.55" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M5 6v20M27 6v20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M5 11h22M5 21h22" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="5" cy="11" r="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="27" cy="11" r="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="5" cy="21" r="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="27" cy="21" r="2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="13" y="4" width="6" height="24" stroke="currentColor" strokeWidth="1.4" />
      <path d="M16 4v24" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M19 10h9M19 14h7M19 18h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="9" y="6" width="14" height="22" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 12h14M9 18h14M9 24h14" stroke="currentColor" strokeWidth="1.2" />
      <path d="M16 6v22" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M6 28 22 4M10 28 26 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M4 24h26" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M6 8h6M14 8h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
]

export default function FieldsEquipment({
  active,
  isSlide,
  ariaLabel,
  markerNum,
  markerTotal,
  titleTop,
  titleBot,
  titleEm,
  lede,
  items = [],
  mapHeadLabel,
  mapHeadSum,
  mapFootK,
  mapFootKUnit,
  mapFootV,
  mapAriaLabel,
}) {
  const { ref, mount } = useInViewActive(active, isSlide)

  const renderTitleBot = () => {
    if (!titleEm || !titleBot.includes(titleEm)) return titleBot
    const parts = titleBot.split(titleEm)
    return <>{parts[0]}<em>{titleEm}</em>{parts[1]}</>
  }

  return (
    <section
      ref={ref}
      className={`fp-sec fp-eq ${mount ? 'is-in' : ''}`}
      aria-label={ariaLabel}
    >
      <div className="fp-eq__bg" aria-hidden />
      <div className="fp-eq__grid" aria-hidden />

      <span className="fp-marker" aria-hidden>{markerNum}<span className="fp-marker__small">{markerTotal}</span></span>
      <span className="fp-crosshair fp-crosshair--tl" aria-hidden />
      <span className="fp-crosshair fp-crosshair--br" aria-hidden />

      <div className="fp-eq__inner">
        <div className="fp-eq__head">
          <h2 className="fp-display fp-eq__title">
            <span className="fp-mask"><span className="fp-row" style={{ '--rd': 0 }}>{titleTop}</span></span>
            <span className="fp-mask"><span className="fp-row" style={{ '--rd': 1 }}>{renderTitleBot()}</span></span>
          </h2>
          <p className="fp-eq__lede">{lede}</p>

          <ul className="fp-eq__list" role="list">
            {items.map((it, i) => {
              const Icon = EQUIPMENT_ICONS[i]
              return (
                <li key={it.name} className="fp-eq__item" style={{ '--i': i }}>
                  <span className="fp-eq__item-icon" aria-hidden>{Icon && <Icon />}</span>
                  <span className="fp-eq__item-body">
                    <span className="fp-eq__item-name">{it.name}</span>
                    <span className="fp-eq__item-tag">{it.tag}</span>
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="fp-eq__map" aria-label={mapAriaLabel}>
          <div className="fp-eq__map-head">
            <span className="fp-eq__map-label">{mapHeadLabel}</span>
            <span className="fp-eq__map-sum">{mapHeadSum}</span>
          </div>
          <FieldsEquipmentMap />
          <div className="fp-eq__map-foot">
            <span className="fp-eq__map-foot-k">{mapFootK}<span>{mapFootKUnit}</span></span>
            <span className="fp-eq__map-foot-v">{mapFootV}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
