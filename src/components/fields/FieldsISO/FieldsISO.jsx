import useInViewActive from '../useInViewActive'
import './FieldsISO.css'

export default function FieldsISO({
  active,
  isSlide,
  ariaLabel = 'Hệ thống quản lý',
  markerNum = '08',
  markerTotal = '/09',
  titleTop = '',
  titleBot = '',
  titleEm = '',
  lede = '',
  certs = [],
  pdcaLabel = '',
  pdcaAriaLabel = 'Chu trình PDCA',
  pillars = [],
  footLeftText = '',
  footLeftStrong = '',
  footLeftTail = '',
  footRightText = '',
  footRightStrong = '',
}) {
  const { ref, mount } = useInViewActive(active, isSlide)

  // Render titleBot with <em>titleEm</em> inline (split and wrap)
  const renderTitleBot = () => {
    if (!titleEm || !titleBot.includes(titleEm)) return titleBot
    const [before, after] = titleBot.split(titleEm)
    return (
      <>
        {before}
        <em>{titleEm}</em>
        {after}
      </>
    )
  }

  return (
    <section
      ref={ref}
      className={`fp-sec fp-sec--paper fp-iso ${mount ? 'is-in' : ''}`}
      aria-label={ariaLabel}
    >
      <div className="fp-iso__bg" aria-hidden />
      <div className="fp-iso__grid" aria-hidden />

      <span className="fp-marker" aria-hidden>{markerNum}<span className="fp-marker__small">{markerTotal}</span></span>
      <span className="fp-crosshair fp-crosshair--tl" aria-hidden />
      <span className="fp-crosshair fp-crosshair--br" aria-hidden />

      <div className="fp-iso__inner">
        <header className="fp-iso__head">
          <h2 className="fp-display fp-iso__title">
            <span className="fp-mask"><span className="fp-row" style={{ '--rd': 0 }}>{titleTop}</span></span>
            <span className="fp-mask"><span className="fp-row" style={{ '--rd': 1 }}>{renderTitleBot()}</span></span>
          </h2>
          {lede && <p className="fp-iso__lede">{lede}</p>}
        </header>

        <div className="fp-iso__cards">
          {certs.map((c, i) => (
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

        {pillars.length > 0 && (
          <div className="fp-iso__pdca" aria-label={pdcaAriaLabel}>
            {pdcaLabel && <span className="fp-iso__pdca-label">{pdcaLabel}</span>}
            <ul className="fp-iso__pdca-list" role="list">
              {pillars.map((p, i) => (
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
        )}

        {(footLeftText || footRightText) && (
          <footer className="fp-iso__foot">
            {footLeftText && (
              <span>
                {footLeftText} {footLeftStrong && <strong>{footLeftStrong}</strong>} {footLeftTail}
              </span>
            )}
            {footLeftText && footRightText && (
              <span className="fp-iso__foot-dot" aria-hidden>·</span>
            )}
            {footRightText && (
              <span>
                {footRightText} {footRightStrong && <strong>{footRightStrong}</strong>}
              </span>
            )}
          </footer>
        )}
      </div>
    </section>
  )
}
