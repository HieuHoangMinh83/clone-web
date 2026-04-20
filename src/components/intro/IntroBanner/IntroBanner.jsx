import './IntroBanner.css'

export default function IntroBanner({ bg, heading, subtitle }) {
  return (
    <section className="intro-sec intro-banner">
      <div
        className="intro-sec__bg intro-banner__bg"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="intro-container">
        <div className="intro-banner__inner">
          <h1 className="intro-banner__heading">{heading}</h1>
          <span className="intro-banner__mark" />
          <p className="intro-banner__subtitle">{subtitle}</p>
        </div>
      </div>
    </section>
  )
}
