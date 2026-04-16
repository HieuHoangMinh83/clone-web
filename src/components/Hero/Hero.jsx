import { useEffect, useRef, useState } from 'react'
import banner1 from '../../assets/images/hero/banner-main.png'
import banner2 from '../../assets/images/hero/cover-web.png'
import './Hero.css'

const slides = [
  { id: 1, src: banner1, alt: 'Banner 1' },
  { id: 2, src: banner2, alt: 'Banner 2' },
  { id: 3, src: banner1, alt: 'Banner 3' },
  { id: 4, src: banner2, alt: 'Banner 4' },
  { id: 5, src: banner1, alt: 'Banner 5' },
  { id: 6, src: banner2, alt: 'Banner 6' },
]

const AUTOPLAY_MS = 7000

export default function Hero() {
  const [index, setIndex] = useState(0)
  const pausedRef = useRef(false)

  useEffect(() => {
    if (slides.length <= 1) return
    const id = window.setInterval(() => {
      if (pausedRef.current) return
      setIndex((i) => (i + 1) % slides.length)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [])

  const jumpTo = (i) => setIndex(i)

  return (
    <section
      className="hero section"
      aria-label="Banner giới thiệu"
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
        <ol className="hero__dots" aria-label="Chọn slide">
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
