import { useEffect, useState } from 'react'
import bg from '../../assets/images/news/bg/banner-bg.jpg'

export default function NewsBanner() {
  const [mount, setMount] = useState(false)
  useEffect(() => {
    const r = requestAnimationFrame(() => setMount(true))
    return () => cancelAnimationFrame(r)
  }, [])

  return (
    <section className={`news-sec news-banner ${mount ? 'is-in' : ''}`}>
      <div
        className="news-sec__bg news-banner__bg"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="news-banner__grid" aria-hidden />

      <div className="news-container">
        <div className="news-banner__inner">
          <p className="news-banner__kicker">
            <span className="news-banner__kicker-line" />
            NEWTECONS · NEWSROOM
          </p>
          <h1 className="news-banner__heading">
            <span className="news-banner__heading-mask">
              <span className="news-banner__heading-row">Tin tức</span>
            </span>
            <span className="news-banner__heading-mask">
              <span className="news-banner__heading-row news-banner__heading-row--accent">
                <em>& sự kiện</em>
              </span>
            </span>
          </h1>
          <span className="news-banner__mark" />
          <p className="news-banner__subtitle">
            Cập nhật những sự kiện, dự án, hoạt động và dấu mốc mới nhất của
            Newtecons — Tổng thầu xây dựng hàng đầu Việt Nam.
          </p>
          <nav className="news-banner__crumb" aria-label="Breadcrumb">
            <a href="#/">Trang chủ</a>
            <span className="sep">/</span>
            <strong>Tin tức</strong>
          </nav>
        </div>

        <div className="news-banner__scroll" aria-hidden>
          <span className="news-banner__scroll-label">Cuộn xuống</span>
          <span className="news-banner__scroll-line" />
        </div>
      </div>
    </section>
  )
}
