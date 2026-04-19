import { useEffect, useMemo, useState } from 'react'
import { PROJECTS } from '../projectsData.js'
import './ProjectsBanner.css'

const FEATURED = PROJECTS.filter((p) => p.featured).slice(0, 5)
const ROTATE_MS = 6500

export default function ProjectsBanner() {
  const [mount, setMount] = useState(false)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const r = requestAnimationFrame(() =>
      requestAnimationFrame(() => setMount(true)),
    )
    return () => cancelAnimationFrame(r)
  }, [])

  useEffect(() => {
    if (FEATURED.length <= 1) return
    const t = window.setInterval(() => {
      setIdx((i) => (i + 1) % FEATURED.length)
    }, ROTATE_MS)
    return () => window.clearInterval(t)
  }, [])

  const current = useMemo(() => FEATURED[idx] || PROJECTS[0], [idx])

  return (
    <section className={`prj-sec prj-hero ${mount ? 'is-in' : ''}`}>
      <div className="prj-hero__stage" aria-hidden>
        {FEATURED.map((p, i) => (
          <div
            key={p.slug}
            className={`prj-hero__slide${i === idx ? ' is-active' : ''}`}
          >
            <img src={p.image} alt="" />
          </div>
        ))}
      </div>
      <div className="prj-hero__veil" aria-hidden />
      <div className="prj-hero__grid" aria-hidden />

      <span className="prj-hero__side" aria-hidden>
        <span>Portfolio</span>
        <span className="prj-hero__side-dot" />
        <span>2004 — 2024</span>
        <span className="prj-hero__side-dot" />
        <span>Newtecons</span>
      </span>

      <div className="prj-container prj-hero__container">
        <div className="prj-hero__main">
          

          <h1 className="prj-hero__heading">
            <span className="prj-hero__heading-mask">
              <span className="prj-hero__heading-row">Những công trình</span>
            </span>
            <span className="prj-hero__heading-mask">
              <span className="prj-hero__heading-row prj-hero__heading-row--2">
                <em>định hình</em>
                <span className="prj-hero__heading-amp"> &amp; </span>
                <em>dấu ấn</em>
              </span>
            </span>
            <span className="prj-hero__heading-mask">
              <span className="prj-hero__heading-row prj-hero__heading-row--3">
                 một thời đại
              </span>
            </span>
          </h1>

          <p className="prj-hero__lead">
            Hơn hai thập kỷ, Newtecons đồng hành cùng các Chủ đầu tư hàng đầu
            Việt Nam trên mỗi gói thầu — từ siêu căn hộ, khu đô thị tới nhà máy
            công nghiệp và hạ tầng trọng điểm quốc gia.
          </p>

          <div className="prj-hero__cta-row">
            <a className="prj-hero__cta" href="#du-an-danh-muc">
              <span>Xem danh mục</span>
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden>
                <path d="M1 5h15m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </a>
            <a className="prj-hero__cta prj-hero__cta--ghost" href="/lien-he">
              <span>Liên hệ hợp tác</span>
            </a>
          </div>
        </div>

        <div className="prj-hero__feature-wrap">
          <aside className="prj-hero__feature" aria-live="polite">
            <div className="prj-hero__feature-head">

            </div>
            <h3 className="prj-hero__feature-title">
              {current.title.split(' ').slice(0, -1).join(' ')}{' '}
              <em>{current.title.split(' ').slice(-1)[0]}</em>
            </h3>
            <p className="prj-hero__feature-sub">{current.excerpt}</p>
            <dl className="prj-hero__feature-meta">
              <dt>Chủ đầu tư</dt>
              <dd>{current.client}</dd>
              <dt>Địa điểm</dt>
              <dd>{current.location}</dd>
              <dt>Quy mô</dt>
              <dd>{current.scale}</dd>
              <dt>Hoàn thành</dt>
              <dd>{current.year}</dd>
            </dl>
          </aside>
          <div className="prj-hero__feature-dots" role="tablist" aria-label="Chuyển dự án nổi bật">
            {FEATURED.map((p, i) => (
              <button
                key={p.slug}
                className={`prj-hero__feature-dot${i === idx ? ' is-active' : ''}`}
                onClick={() => setIdx(i)}
                aria-label={`Xem ${p.title}`}
                aria-selected={i === idx}
              />
            ))}
          </div>
        </div>

        <div className="prj-hero__foot">
          <p className="prj-hero__foot-tagline">
            <span className="prj-hero__foot-label">Build on Trust</span>
            Mỗi công trình là một lời cam kết với Chủ đầu tư, đối tác và cộng đồng — nơi Newtecons gửi trọn niềm tin.
          </p>
          <div>
            <span className="prj-hero__foot-label">Dự án đã bàn giao</span>
            <span className="prj-hero__stat-k">120<em>+</em></span>
          </div>
          <div>
            <span className="prj-hero__foot-label">Năm kinh nghiệm</span>
            <span className="prj-hero__stat-k"><em>20</em></span>
          </div>
          <div>
            <span className="prj-hero__foot-label">Kỹ sư &amp; công nhân</span>
            <span className="prj-hero__stat-k">6.500<em>+</em></span>
          </div>
        </div>
      </div>

    </section>
  )
}
