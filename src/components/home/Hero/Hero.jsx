import { useEffect, useRef, useState } from 'react'
import './Hero.css'

export default function Hero({
  slides = [],
  autoplayMs = 7000,
  ariaLabel,
  dotsLabel,
}) {
  const [index, setIndex] = useState(0)
  const pausedRef = useRef(false)

  useEffect(() => {
    if (slides.length <= 1) return
    const id = window.setInterval(() => {
      if (pausedRef.current) return
      setIndex((i) => (i + 1) % slides.length)
    }, autoplayMs)
    return () => window.clearInterval(id)
  }, [slides.length, autoplayMs])

  const jumpTo = (i) => setIndex(i)

  return (
    <section
      className="hero section"
      aria-label={ariaLabel}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div
        className="hero__track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div key={s.id} className="hero__slide">
            <img
              className="hero__image"
              src={s.src}
              alt={s.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <ol className="hero__dots" aria-label={dotsLabel}>
          {slides.map((s, i) => (
            <li key={s.id}>
              <button
                className={i === index ? 'is-active' : ''}
                onClick={() => jumpTo(i)}
                aria-label={`Slide ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
              />
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
