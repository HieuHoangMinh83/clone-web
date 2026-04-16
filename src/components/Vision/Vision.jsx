import './Vision.css'

export default function Vision() {
  return (
    <section className="vision section" aria-label="Tầm nhìn">
      <div className="vision__bg" aria-hidden />
      <div className="vision__overlay" aria-hidden />

      <div className="vision__glyph" aria-hidden>
        <svg viewBox="0 0 400 480" fill="none" stroke="#fff" strokeWidth="1.5">
          <ellipse cx="200" cy="240" rx="180" ry="100" strokeOpacity="0.35" />
          <circle cx="200" cy="240" r="54" strokeOpacity="0.5" />
          <circle cx="200" cy="240" r="22" strokeOpacity="0.7" fill="#fff" fillOpacity="0.3" />
        </svg>
      </div>

      <div className="vision__content">
        <p className="vision__eyebrow">02 — Our Vision</p>
        <h2 className="vision__title">TẦM NHÌN</h2>
        <p className="vision__body">
          Placeholder: Trở thành thương hiệu xây dựng hàng đầu khu vực — nơi
          hội tụ đội ngũ tinh nhuệ, công nghệ tiên tiến và những giá trị bền
          vững cho thế hệ mai sau.
        </p>
      </div>
    </section>
  )
}
