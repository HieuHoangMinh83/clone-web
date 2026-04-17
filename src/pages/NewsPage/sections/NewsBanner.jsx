import bg from '../../../assets/images/news/bg/banner-bg.jpg'

export default function NewsBanner() {
  return (
    <section className="news-sec news-banner">
      <div
        className="news-sec__bg news-banner__bg"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="news-container">
        <div className="news-banner__inner">
          <p className="news-banner__kicker">NEWTECONS · NEWSROOM</p>
          <h1 className="news-banner__heading">Tin tức</h1>
          <span className="news-banner__mark" />
          <p className="news-banner__subtitle">
            Cập nhật những sự kiện, dự án, hoạt động và dấu mốc mới nhất của Newtecons — Tổng
            thầu xây dựng hàng đầu Việt Nam.
          </p>
          <nav className="news-banner__crumb" aria-label="Breadcrumb">
            <a href="#/">Trang chủ</a>
            <span className="sep">/</span>
            <strong>Tin tức</strong>
          </nav>
        </div>
      </div>
    </section>
  )
}
