import { useEffect, useRef, useState, Fragment } from 'react'
import './IntroVisionMission.css'

function SplitWords({ text }) {
  const words = text.split(' ')
  return words.map((w, i) => (
    <Fragment key={i}>
      <span className="intro-vm__word" style={{ '--wi': i }}>
        {w}
      </span>
      {i < words.length - 1 ? ' ' : ''}
    </Fragment>
  ))
}

export default function IntroVisionMission({ bg, columns = [] }) {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.15)
      },
      { threshold: [0, 0.15, 0.3, 0.5] }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`intro-sec intro-vm ${inView ? 'is-in' : ''}`}
    >
      <div
        className="intro-sec__bg intro-vm__bg"
        style={{ backgroundImage: `url(${bg})` }}
      />

      <div className="intro-container">
        <div className="intro-vm__grid">
          {columns.map((c, idx) => (
            <Fragment key={idx}>
              <article className="intro-vm__col" style={{ '--d': `${0.25 + idx * 0.2}s` }}>
                <div className="intro-vm__icon">
                  <img src={c.icon} alt="" />
                </div>
                <p className="intro-vm__eyebrow">{c.eyebrow}</p>
                <h3 className="intro-vm__heading">{c.heading}</h3>
                <span className="intro-vm__line" />
                <p className="intro-vm__text">
                  <SplitWords text={c.text} />
                </p>
              </article>
              {idx < columns.length - 1 && (
                <span className="intro-vm__divider" aria-hidden />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
