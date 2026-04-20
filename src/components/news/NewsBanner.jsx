import { useEffect, useState } from 'react'
import bg from '../../assets/images/news/bg/banner-bg.jpg'

const TABS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'company', label: 'Tin công ty' },
  { key: 'project', label: 'Tin dự án' },
  { key: 'event', label: 'Sự kiện' },
  { key: 'mag', label: 'E-magazine' },
]

const STATS = [
  { k: '250+', v: 'Bài viết' },
  { k: '18', v: 'Chủ đề' },
  { k: '04', v: 'Chuyên mục' },
  { k: '2024', v: 'Năm xuất bản' },
]

export default function NewsBanner() {
  const [mount, setMount] = useState(false)
  const [tab, setTab] = useState('all')
  useEffect(() => {
    const r = requestAnimationFrame(() => setMount(true))
    return () => cancelAnimationFrame(r)
  }, [])

  return (
    <section className={`news-sec news-banner section ${mount ? 'is-in' : ''}`}>
      <div
        className="news-sec__bg news-banner__bg"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="news-banner__veil" aria-hidden />
      <div className="news-banner__grid" aria-hidden />

      <div className="news-container news-banner__container">
        <h1 className="news-banner__heading">
          <span className="news-banner__heading-mask">
            <span className="news-banner__heading-row">Tin tức</span>
          </span>
          <span className="news-banner__heading-mask">
            <span className="news-banner__heading-row news-banner__heading-row--accent">
              &amp; <em>sự kiện</em>
            </span>
          </span>
        </h1>

        <p className="news-banner__lead">
          Cập nhật hoạt động, dự án và những dấu mốc quan trọng trên hành trình
          xây dựng niềm tin của Newtecons.
        </p>

       

        <ul className="news-banner__stats" aria-label="Tổng quan chuyên mục">
          {STATS.map((s, i) => (
            <li key={s.v} className="news-banner__stat" style={{ '--i': i }}>
              <span className="news-banner__stat-k">{s.k}</span>
              <span className="news-banner__stat-v">{s.v}</span>
            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}
