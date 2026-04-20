import useInViewActive from '../useInViewActive'
import './FieldsOutro.css'

export default function FieldsOutro({
  active,
  isSlide,
  bg,
  ariaLabel = 'Liên hệ hợp tác',
  markerNum = '09',
  markerTotal = '/09',
  eyebrow = '',
  titleTop = '',
  titleBot = '',
  lede = '',
  ctas = {},
  info = [],
  footer = '',
}) {
  const { ref, mount } = useInViewActive(active, isSlide)

  return (
    <section
      ref={ref}
      className={`fp-sec fp-outro ${mount ? 'is-in' : ''}`}
      aria-label={ariaLabel}
    >
      {bg && (
        <div
          className="fp-outro__bg"
          style={{ backgroundImage: `url(${bg})` }}
        />
      )}
      <div className="fp-outro__scrim" />

      <span className="fp-marker" aria-hidden>{markerNum}<span className="fp-marker__small">{markerTotal}</span></span>
      <span className="fp-crosshair fp-crosshair--tl" aria-hidden />
      <span className="fp-crosshair fp-crosshair--tr" aria-hidden />
      <span className="fp-crosshair fp-crosshair--bl" aria-hidden />

      <div className="fp-outro__inner">
        <div className="fp-outro__copy">
          {eyebrow && (
            <span className="fp-outro__eyebrow">
              <span className="fp-outro__eyebrow-line" />
              {eyebrow}
            </span>
          )}
          <h2 className="fp-outro__title">
            <span className="fp-outro__title-mask">
              <span className="fp-outro__title-row">{titleTop}</span>
            </span>
            <span className="fp-outro__title-mask">
              <span className="fp-outro__title-row fp-outro__title-row--accent">
                <em>{titleBot}</em>
              </span>
            </span>
          </h2>
          {lede && <p className="fp-outro__lede">{lede}</p>}

          {(ctas.primary || ctas.secondary) && (
            <div className="fp-outro__ctas">
              {ctas.primary && (
                <a className="fp-outro__cta fp-outro__cta--primary" href={ctas.primary.href}>
                  <span>{ctas.primary.label}</span>
                  <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
                    <path
                      d="M1 5h19m0 0L16 1m4 4l-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              )}
              {ctas.secondary && (
                <a className="fp-outro__cta fp-outro__cta--ghost" href={ctas.secondary.href}>
                  <span>{ctas.secondary.label}</span>
                </a>
              )}
            </div>
          )}
        </div>

        {info.length > 0 && (
          <ul className="fp-outro__info" role="list">
            {info.map((it, i) => (
              <li key={it.k} className="fp-outro__info-item" style={{ '--i': i }}>
                <span className="fp-outro__info-k">{it.k}</span>
                <span className="fp-outro__info-v">
                  {it.v.split('\n').map((line, idx, arr) => (
                    <span key={idx}>
                      {line}
                      {idx < arr.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {footer && (
        <div className="fp-outro__footer" aria-hidden>
          {footer}
        </div>
      )}
    </section>
  )
}
