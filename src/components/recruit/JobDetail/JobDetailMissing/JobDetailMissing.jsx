import './JobDetailMissing.css'

export default function JobDetailMissing() {
  return (
    <main className="jd jd--missing">
      <div className="jd-missing__box">
        <span className="jd-missing__kicker">404 · Không tìm thấy vị trí</span>
        <h1 className="jd-missing__title">Vị trí ứng tuyển không còn mở</h1>
        <p className="jd-missing__text">
          Vị trí bạn tìm kiếm có thể đã hết hạn hoặc đường dẫn không chính xác.
          Vui lòng quay lại danh sách tuyển dụng hoặc gửi CV tự do cho HR.
        </p>
        <div className="jd-missing__ctas">
          <a href="/tuyen-dung" className="jd-btn jd-btn--primary">
            <span>Về danh sách vị trí</span>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
              <path d="M1 5h11m0 0L8 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="mailto:recruitment@newtecons.vn"
            className="jd-btn jd-btn--ghost"
          >
            Gửi CV tự do
          </a>
        </div>
      </div>
    </main>
  )
}
