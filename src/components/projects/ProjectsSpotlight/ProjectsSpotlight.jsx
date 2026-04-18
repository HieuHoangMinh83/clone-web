import { useEffect, useRef, useState } from 'react'
import { PROJECTS } from '../projectsData.js'
import './ProjectsSpotlight.css'

// Hand-picked landmark spotlight — Landmark 81 represents 2 decades peak
const SPOTLIGHT = PROJECTS.find((p) => p.slug === 'landmark-81') || PROJECTS[0]

export default function ProjectsSpotlight() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className={`prj-sec prj-spot ${inView ? 'is-in' : ''}`}
      aria-labelledby="prj-spot-title"
    >
      <div className="prj-spot__frame">
        <img
          className="prj-spot__img"
          src={SPOTLIGHT.image}
          alt={SPOTLIGHT.title}
          loading="lazy"
        />
        <div className="prj-spot__veil" aria-hidden />
      </div>

      <div className="prj-container prj-spot__container">
        <span className="prj-spot__eyebrow">
          <span className="prj-spot__eyebrow-line" aria-hidden />
          <span>Spotlight · Di sản</span>
        </span>

        <div className="prj-spot__body">
         
          <div className="prj-spot__stack">
            <h2 id="prj-spot-title" className="prj-spot__title">
              <span className="prj-spot__title-mask">
                <span className="prj-spot__title-row">Vinhomes</span>
              </span>
              <span className="prj-spot__title-mask">
                <span className="prj-spot__title-row prj-spot__title-row--accent">
                  <em>Landmark 81</em>
                </span>
              </span>
            </h2>
            <p className="prj-spot__lead">
              Toà tháp biểu tượng cao nhất Việt Nam — 461 m, 81 tầng.
              Newtecons đảm nhận gói thầu kết cấu phần thân siêu cao tầng,
              vượt qua thử thách thi công top-down trong điều kiện đô thị
              dày đặc bên sông Sài Gòn.
            </p>
          </div>
        </div>

        <div className="prj-spot__foot">
          <dl className="prj-spot__meta">
            <div>
              <dt>Chủ đầu tư</dt>
              <dd>{SPOTLIGHT.client}</dd>
            </div>
            <div>
              <dt>Địa điểm</dt>
              <dd>{SPOTLIGHT.location}</dd>
            </div>
            <div>
              <dt>Quy mô</dt>
              <dd>{SPOTLIGHT.scale}</dd>
            </div>
            <div>
              <dt>Hoàn thành</dt>
              <dd>{SPOTLIGHT.year}</dd>
            </div>
          </dl>
          <a className="prj-spot__cta" href={`/du-an/${SPOTLIGHT.slug}`}>
            <span>Khám phá dự án</span>
            <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden>
              <path d="M1 6h23m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
