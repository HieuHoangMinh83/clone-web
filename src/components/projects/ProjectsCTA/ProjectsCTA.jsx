import './ProjectsCTA.css'

export default function ProjectsCTA() {
  return (
    <section className="prj-sec prj-cta" aria-labelledby="prj-cta-title">
      <div className="prj-container prj-cta__container">
        <div>
          <span className="prj-cta__kicker">
            <span className="prj-cta__kicker-line" aria-hidden />
            <span>Sẵn sàng đồng hành</span>
          </span>
          <h2 id="prj-cta-title" className="prj-cta__title">
            Bạn đang tìm thầu cho <em>dự án kế tiếp?</em>
          </h2>
          <p className="prj-cta__lead">
            Đội ngũ Newtecons sẵn sàng lắng nghe ý tưởng của Chủ đầu tư và
            cùng xây dựng một phương án thi công bài bản — từ phần ngầm,
            kết cấu, cơ điện tới hoàn thiện.
          </p>
        </div>
        <div className="prj-cta__actions">
          <a className="prj-cta__btn" href="/lien-he">
            <span>Liên hệ tư vấn</span>
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden>
              <path d="M1 6h19m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </a>
          <a className="prj-cta__btn prj-cta__btn--ghost" href="/gioi-thieu">
            <span>Hồ sơ năng lực</span>
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden>
              <path d="M1 6h19m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
