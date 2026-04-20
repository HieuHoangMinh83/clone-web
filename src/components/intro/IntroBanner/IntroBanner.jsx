import bg from '../../../assets/images/intro/bg/banner.png'
import './IntroBanner.css'

export default function IntroBanner() {
  return (
    <section className="intro-sec intro-banner">
      <div
        className="intro-sec__bg intro-banner__bg"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="intro-container">
        <div className="intro-banner__inner">
          <h1 className="intro-banner__heading">Giới thiệu</h1>
          <span className="intro-banner__mark" />
          <p className="intro-banner__subtitle">
            Tổng thầu xây dựng hàng đầu Việt Nam — hơn hai thập kỷ kiến tạo những công trình
            mang tầm vóc Việt.
          </p>
        </div>
      </div>
    </section>
  )
}
