import { useEffect, useRef, useState } from 'react'
import './Contact.css'

function PinIcon() {
  return (
    <svg width="13" height="17" viewBox="0 0 14 18" fill="none" aria-hidden>
      <path
        d="M7 1c3.31 0 6 2.6 6 5.8C13 11.2 7 17 7 17S1 11.2 1 6.8C1 3.6 3.69 1 7 1Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="7" cy="6.8" r="2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M9.5 16V9h2.2l.3-2.6H9.5V4.8c0-.7.2-1.2 1.3-1.2H12V1.1C11.7 1 11 1 10.2 1 8.4 1 7.2 2.1 7.2 4.5v1.9H5V9h2.2v7h2.3Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="1.5" y="1.5" width="13" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="11.6" cy="4.4" r="0.7" fill="currentColor" />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M14.7 4.6c-.2-.7-.7-1.3-1.4-1.5C12 2.7 8 2.7 8 2.7s-4 0-5.3.4c-.7.2-1.2.8-1.4 1.5C1 5.9 1 8 1 8s0 2.1.3 3.4c.2.7.7 1.3 1.4 1.5C4 13.3 8 13.3 8 13.3s4 0 5.3-.4c.7-.2 1.2-.8 1.4-1.5.3-1.3.3-3.4.3-3.4s0-2.1-.3-3.4ZM6.6 10.3V5.7L10.5 8l-3.9 2.3Z" />
    </svg>
  )
}

const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
}

export default function Contact({
  ariaLabel = 'Thông tin liên hệ',
  visualImage,
  visualAlt = '',
  titleTop = 'THÔNG TIN',
  titleStrong = 'LIÊN HỆ',
  groupTitle = 'LIÊN HỆ VỚI CHÚNG TÔI',
  subTitle = 'Thông tin bộ phận',
  subTitleTail = '',
  copyright = '',
  offices = [],
  primaryContacts = [],
  procurementContacts = [],
  socials = [],
}) {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.25)
      },
      { threshold: [0, 0.25, 0.5, 0.75] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`contact section ${inView ? 'is-in' : ''}`}
      id="contact"
      aria-label={ariaLabel}
    >
      <div className="contact__bg" aria-hidden>
        <span className="contact__bg-grad" />
        <span className="contact__bg-orb contact__bg-orb--a" />
        <span className="contact__bg-orb contact__bg-orb--b" />
        <span className="contact__bg-grid" />
      </div>

      <div className="contact__layout">
        {/* LEFT — info pane */}
        <div className="contact__pane">
         

          <h2 className="contact__title">
            <span className="contact__title-mask">
              <span className="contact__title-line">{titleTop}</span>
            </span>
            <span className="contact__title-mask">
              <strong className="contact__title-line contact__title-line--bold">
                {titleStrong}
              </strong>
            </span>
          </h2>

          <div className="contact__offices">
            {offices.map((o, i) => (
              <div
                key={o.label}
                className="contact__office reveal"
                style={{ '--d': `${0.55 + i * 0.1}s` }}
              >
                <span className="contact__office-head">
                  <PinIcon />
                  <span>{o.label.toUpperCase()}</span>
                </span>
                <p className="contact__office-body">{o.body}</p>
              </div>
            ))}
          </div>

          <div
            className="contact__divider reveal"
            style={{ '--d': '0.8s' }}
            aria-hidden
          />

          <div className="contact__group">
            <h3
              className="contact__group-title reveal"
              style={{ '--d': '0.9s' }}
            >
              {groupTitle}
            </h3>

            <ul className="contact__rows">
              {primaryContacts.map((c, i) => (
                <li
                  key={c.label}
                  className="contact__row reveal"
                  style={{ '--d': `${1 + i * 0.07}s` }}
                >
                  <span className="contact__row-label">{c.label}:</span>
                  <a className="contact__row-value" href={c.href}>
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="contact__group contact__group--sub">
            <h4
              className="contact__sub-title reveal"
              style={{ '--d': '1.25s' }}
            >
              {subTitle} {subTitleTail && <span>{subTitleTail}</span>}
            </h4>

            <ul className="contact__rows contact__rows--compact">
              {procurementContacts.map((c, i) => (
                <li
                  key={c.label}
                  className="contact__row reveal"
                  style={{ '--d': `${1.35 + i * 0.07}s` }}
                >
                  <span className="contact__row-label">{c.label}:</span>
                  <a className="contact__row-value" href={c.href}>
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="contact__footer">
            {socials.length > 0 && (
              <ul className="contact__social reveal" style={{ '--d': '1.6s' }}>
                {socials.map((s) => {
                  const Icon = SOCIAL_ICONS[s.type]
                  return (
                    <li key={s.type}>
                      <a href={s.href} aria-label={s.label}>
                        {Icon ? <Icon /> : null}
                      </a>
                    </li>
                  )
                })}
              </ul>
            )}

            {copyright && (
              <p className="contact__copy reveal" style={{ '--d': '1.75s' }}>
                {copyright}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT — visual pane */}
        <div className="contact__visual">
          <div className="contact__visual-frame" aria-hidden>
            {visualImage && (
              <img src={visualImage} alt={visualAlt} className="contact__visual-img" />
            )}
            <span className="contact__visual-overlay" />
            <span className="contact__visual-scan" />
          </div>
        </div>
      </div>
    </section>
  )
}
