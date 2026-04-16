import './Mission.css'

export default function Mission() {
  return (
    <section className="mission section" aria-label="Sứ mệnh">
      <div className="mission__bg" aria-hidden />
      <div className="mission__overlay" aria-hidden />

      <div className="mission__glyph" aria-hidden>
        <svg viewBox="0 0 200 240" fill="none" stroke="#fff" strokeWidth="1.5">
          <circle cx="100" cy="80" r="36" strokeOpacity="0.5" />
          <path d="M100 116 L100 200" strokeOpacity="0.4" />
          <path d="M60 200 L140 200" strokeOpacity="0.4" />
        </svg>
      </div>

      <div className="mission__content">
        <p className="mission__eyebrow">01 — Our Mission</p>
        <h2 className="mission__title">
          SỨ MỆNH
        </h2>
        <p className="mission__body">
          Placeholder: Đặt chất lượng và sự tử tế làm nền tảng, chúng tôi kiến
          tạo những công trình biểu tượng — góp phần nâng tầm cuộc sống và
          niềm tin của cộng đồng.
        </p>
      </div>
    </section>
  )
}
