import './JobDetailCta.css'

export default function JobDetailCta({ job, mailtoApply }) {
  return (
    <section className="jd-cta">
      <span className="jd-cta__grid" aria-hidden />
      <div className="jd-cta__inner">
        <div className="jd-cta__text jd-reveal">
          <span className="jd-cta__kicker">Build on Trust</span>
          <h2 className="jd-cta__title">
            Cùng Newtecons kiến tạo những công trình biểu tượng
          </h2>
          <p className="jd-cta__lead">
            Hơn 4.500 cán bộ nhân viên trên toàn hệ thống đang cùng triển khai 150+ dự án trọng điểm.
            Hồ sơ ứng tuyển được tiếp nhận và phản hồi trong 3–5 ngày làm việc.
          </p>
        </div>
        <div className="jd-cta__actions jd-reveal" style={{ '--jd-reveal-i': 1 }}>
          <a href={mailtoApply} className="jd-btn jd-btn--primary">
            <span>Ứng tuyển {job.id.toUpperCase()}</span>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
              <path d="M1 5h11m0 0L8 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="/tuyen-dung" className="jd-btn jd-btn--ghost">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
              <path d="M13 5H2m0 0l4-4m-4 4l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Xem tất cả vị trí</span>
          </a>
        </div>
      </div>
    </section>
  )
}
