import { useEffect, useRef, useState, Fragment } from 'react'
import './IntroChairman.css'

// Wrap các đoạn nằm trong "..." bằng <em> để giữ visual quote emphasis.
function renderParagraph(text) {
  const parts = text.split(/("[^"]+")/g)
  return parts.map((p, i) =>
    p.startsWith('"') && p.endsWith('"') ? (
      <em key={i}>{p}</em>
    ) : (
      <Fragment key={i}>{p}</Fragment>
    ),
  )
}

export default function IntroChairman({
  bg,
  portrait,
  portraitAlt,
  watermark,
  titleSoft,
  titleStrong,
  paragraphs = [],
  signature,
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
      { threshold: [0, 0.25, 0.5] }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`intro-sec intro-chairman ${inView ? 'is-in' : ''}`}
    >
      <div
        className="intro-sec__bg"
        style={{
          backgroundImage: `linear-gradient(115deg, rgba(18,62,130,0.88) 0%, rgba(36,110,190,0.82) 55%, rgba(78,170,230,0.72) 100%), url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <span className="intro-chairman__watermark" aria-hidden>
        {watermark}
      </span>

      <figure className="intro-chairman__photo">
        <img src={portrait} alt={portraitAlt} loading="lazy" />
      </figure>

      <div className="intro-container">
        <div className="intro-chairman__copy">
          <h2 className="intro-chairman__title">
            <span className="intro-chairman__title-soft">{titleSoft}</span>
            <span className="intro-chairman__title-strong">{titleStrong}</span>
          </h2>
          <div className="intro-chairman__body">
            {paragraphs.map((p, i) => (
              <p key={i}>{renderParagraph(p)}</p>
            ))}
          </div>
          {signature && (
            <div className="intro-chairman__sig">
              <div>
                <div className="intro-chairman__sig-name">{signature.name}</div>
                <div className="intro-chairman__sig-role">{signature.role}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
