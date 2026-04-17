import { useEffect, useRef, useState } from 'react'
import './Achievements.css'
import bgEngineers from '../../../assets/images/achievements/bg-engineers.png'

const QUOTE_WORDS = [
  ['Cùng', 'nhau', 'chúng', 'tôi', 'kiến', 'tạo'],
  ['nên', 'những', 'công', 'trình', 'biểu', 'tượng'],
]

const STATS = [
  { prefix: '+', value: 1000, label: 'NHÂN SỰ' },
  { prefix: '', value: 21, label: 'NĂM\nHOẠT ĐỘNG' },
  { prefix: '+', value: 150, label: 'DỰ ÁN' },
  {
    prefix: '',
    value: 11500,
    suffix: ' tỷ đồng',
    format: 'thousands',
    label: 'TỔNG DOANH THU\nNĂM 2023',
  },
]

function formatNumber(n, format) {
  if (format === 'thousands') {
    return Math.round(n).toLocaleString('de-DE')
  }
  return String(Math.round(n))
}

function CountUp({ to, inView, duration = 1600, format, prefix = '', suffix = '' }) {
  const [val, setVal] = useState(0)
  const rafRef = useRef(0)

  useEffect(() => {
    if (!inView) {
      setVal(0)
      return
    }
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(to * eased)
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView, to, duration])

  return (
    <>
      <span className="stat__num-inner">
        {prefix}
        {formatNumber(val, format)}
      </span>
      {suffix && <span className="stat__unit">{suffix.trim()}</span>}
    </>
  )
}

export default function Achievements() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.3)
      },
      { threshold: [0, 0.3, 0.6] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`ach section ${inView ? 'is-in' : ''}`}
      id="achievements"
    >
      <div className="ach__bg" aria-hidden>
        <img src={bgEngineers} alt="" className="ach__bg-img" />
        <span className="ach__bg-veil" />
        <span className="ach__bg-grid" />
      </div>

      <div className="ach__frame" aria-hidden>
        <span className="ach__frame-tl" />
        <span className="ach__frame-tr" />
        <span className="ach__frame-bl" />
        <span className="ach__frame-br" />
      </div>

      <div className="ach__content">
        <div className="ach__quote">
          <span className="ach__quote-rule" aria-hidden />
          <svg
            className="ach__quote-mark"
            viewBox="0 0 40 32"
            fill="none"
            aria-hidden
          >
            <path
              d="M2 18C2 9 8 2 18 2v6c-5 0-9 3-9 10h9v12H2V18zm20 0c0-9 6-16 16-16v6c-5 0-9 3-9 10h9v12H22V18z"
              fill="currentColor"
            />
          </svg>

          <h2 className="ach__quote-text">
            {QUOTE_WORDS.map((line, li) => (
              <span className="ach__line" key={li}>
                <span className="ach__line-inner">
                  {line.map((word, wi) => {
                    const flatIndex =
                      QUOTE_WORDS.slice(0, li).flat().length + wi
                    return (
                      <span
                        key={wi}
                        className="ach__word"
                        style={{ '--i': flatIndex }}
                      >
                        {word}
                        {wi < line.length - 1 ? '\u00A0' : ''}
                      </span>
                    )
                  })}
                </span>
              </span>
            ))}
          </h2>
        </div>

        <ul className="ach__stats">
          {STATS.map((s, i) => (
            <li
              key={i}
              className="stat"
              style={{ '--d': `${0.85 + i * 0.12}s` }}
            >
              <span className="stat__num">
                <CountUp
                  to={s.value}
                  inView={inView}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  format={s.format}
                />
                <span className="stat__num-underline" aria-hidden />
              </span>
              <span className="stat__label">
                {s.label.split('\n').map((ln, li) => (
                  <span key={li} className="stat__label-line">
                    {ln}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
