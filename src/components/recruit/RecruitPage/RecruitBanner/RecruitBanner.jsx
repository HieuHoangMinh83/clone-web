import { useEffect, useState } from 'react'
import { RECRUIT_BANNER_BG, BANNER_STATS, BANNER_QUOTE } from '../../../../data/recruit.js'
import cardImg from '../../../../assets/images/projects/grand-marina-saigon.jpg'
import '../recruit-shared.css'
import './RecruitBanner.css'

export default function RecruitBanner() {
  const [mount, setMount] = useState(false)
  useEffect(() => {
    const r = requestAnimationFrame(() => setMount(true))
    return () => cancelAnimationFrame(r)
  }, [])

  return (
    <section className={`rec-sec rec-banner ${mount ? 'is-in' : ''}`}>
      <div
        className="rec-sec__bg rec-banner__bg"
        style={{ backgroundImage: `url(${RECRUIT_BANNER_BG})` }}
      />
      <div className="rec-banner__grid" aria-hidden />
      <div className="rec-banner__glow" aria-hidden />
      <div className="rec-banner__noise" aria-hidden />

      <div className="rec-banner__watermark" aria-hidden>
        <span>CAREERS</span>
        <span>2026</span>
      </div>

      <div className="rec-container rec-banner__container">


        <div className="rec-banner__main">
          <div className="rec-banner__left">
            <div className="rec-banner__kicker-row">
              <span className="rec-banner__kicker">
                <span className="rec-banner__kicker-line" />
                Career · Life · Growth
              </span>
              <span className="rec-banner__live-tag">
                <span className="rec-banner__live-tag-dot" />
                <strong>25+</strong> vị trí đang tuyển
              </span>
            </div>

            <h1 className="rec-banner__heading">
              <span className="rec-banner__heading-mask">
                <span className="rec-banner__heading-row">Gia nhập</span>
              </span>
              <span className="rec-banner__heading-mask">
                <span className="rec-banner__heading-row rec-banner__heading-row--accent">
                  <em>Newtecons</em>
                </span>
              </span>
            </h1>

            <span className="rec-banner__mark" />

            <p className="rec-banner__subtitle">
              Cùng kiến tạo những công trình biểu tượng — nơi tài năng được trao cơ hội,
              nỗ lực được ghi nhận và mỗi ngày làm việc đều là một chương đáng nhớ
              trong hành trình sự nghiệp của bạn.
            </p>

            <div className="rec-banner__ctas">
              <a href="#jobs" className="rec-banner__cta rec-banner__cta--primary">
                <span>Xem vị trí tuyển dụng</span>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
                  <path
                    d="M1 6h13m0 0L9 1m5 5L9 11"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="mailto:recruitment@newtecons.vn"
                className="rec-banner__cta rec-banner__cta--ghost"
              >
                <span>Gửi CV ứng tuyển</span>
              </a>
            </div>
          </div>

          <aside className="rec-banner__right" aria-hidden>
            <div className="rec-banner__portrait">
              <img src={cardImg} alt="" />
              <span className="rec-banner__portrait-scrim" />
              <span className="rec-banner__portrait-corner rec-banner__portrait-corner--tl" />
              <span className="rec-banner__portrait-corner rec-banner__portrait-corner--br" />

              <div className="rec-banner__badge">
                <span className="rec-banner__badge-dot" />
                <strong>Newtecons</strong>
                <span>Build on Trust</span>
              </div>

              <figure className="rec-banner__quote">
                <svg width="24" height="20" viewBox="0 0 22 18" fill="currentColor" aria-hidden>
                  <path d="M0 18V9.3C0 4.2 3 1 8.4 0l.9 2.6C6.2 3.7 4.6 5.8 4.6 9h4.1V18H0zm13 0V9.3c0-5.1 3-8.3 8.4-9.3l.9 2.6c-3.1 1.1-4.7 3.2-4.7 6.4h4.1V18H13z" />
                </svg>
                <blockquote>{BANNER_QUOTE.text}</blockquote>
                <figcaption>
                  <strong>{BANNER_QUOTE.author}</strong>
                  <span>{BANNER_QUOTE.role}</span>
                </figcaption>
              </figure>
            </div>
          </aside>
        </div>

        <ul className="rec-banner__stats" aria-label="Thống kê nhân sự">
          {BANNER_STATS.map((s, i) => (
            <li key={s.v} className="rec-banner__stat" style={{ '--i': i }}>
              <span className="rec-banner__stat-no">{String(i + 1).padStart(2, '0')}</span>
              <span className="rec-banner__stat-k">{s.k}</span>
              <span className="rec-banner__stat-v">{s.v}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
