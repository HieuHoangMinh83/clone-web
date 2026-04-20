import './JobDetailHero.css'

function Info({ icon, label, value, highlight }) {
  return (
    <div className={`jd-info ${highlight ? 'jd-info--hl' : ''}`}>
      <span className="jd-info__icon">{icon}</span>
      <span className="jd-info__label">{label}</span>
      <span className="jd-info__value">{value}</span>
    </div>
  )
}

export default function JobDetailHero({ job, detail, mailtoApply }) {
  return (
    <section className="jd-hero">
      <span className="jd-hero__grid" aria-hidden />
      <span className="jd-hero__glow" aria-hidden />
      <div className="jd-hero__inner">
        <nav className="jd-crumb" aria-label="breadcrumb">
          <a href="/">Trang chủ</a>
          <span className="jd-crumb__sep">/</span>
          <a href="/tuyen-dung">Tuyển dụng</a>
          <span className="jd-crumb__sep">/</span>
          <strong>{job.deptLabel}</strong>
        </nav>

        <div className="jd-hero__tags">
          <span className="jd-chip jd-chip--level">{job.level}</span>
          <span className="jd-chip">{job.type}</span>
          {job.hot && <span className="jd-chip jd-chip--hot">HOT</span>}
        </div>

        <h1 className="jd-hero__title">{job.title}</h1>
        {job.summary && <p className="jd-hero__lead">{job.summary}</p>}

        {detail?.highlights?.length > 0 && (
          <ul className="jd-highlights" aria-label="Điểm nhấn vị trí">
            {detail.highlights.map((h, i) => (
              <li key={i} className="jd-highlight">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 7l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="jd-hero__bar">
          <Info
            icon={
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                <rect x="2" y="4" width="10" height="8" rx="1" />
                <path d="M5 4V2h4v2" />
              </svg>
            }
            label="Bộ phận"
            value={job.deptLabel}
          />
          <Info
            icon={
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                <path d="M7 1c2.5 0 4.5 2 4.5 4.5C11.5 8.5 7 13 7 13S2.5 8.5 2.5 5.5C2.5 3 4.5 1 7 1Z" />
                <circle cx="7" cy="5.5" r="1.5" />
              </svg>
            }
            label="Địa điểm"
            value={job.locationLabel}
          />
          <Info
            icon={
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                <circle cx="7" cy="7" r="5.5" />
                <path d="M7 4v3l2 1.5" strokeLinecap="round" />
              </svg>
            }
            label="Kinh nghiệm"
            value={job.exp}
          />
          <Info
            icon={
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                <path d="M7 1v12M2 4h7a2 2 0 010 4H5a2 2 0 000 4h7" strokeLinecap="round" />
              </svg>
            }
            label="Mức lương"
            value={job.salary}
            highlight
          />
          <Info
            icon={
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                <rect x="2" y="3" width="10" height="9" rx="1" />
                <path d="M2 6h10M5 2v2M9 2v2" strokeLinecap="round" />
              </svg>
            }
            label="Hạn nộp"
            value={job.deadline}
          />
        </div>

        <div className="jd-hero__ctas">
          <a href={mailtoApply} className="jd-btn jd-btn--primary">
            <span>Ứng tuyển ngay</span>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
              <path d="M1 5h11m0 0L8 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="/tuyen-dung" className="jd-btn jd-btn--ghost">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
              <path d="M13 5H2m0 0l4-4m-4 4l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Xem các vị trí khác</span>
          </a>
        </div>
      </div>
    </section>
  )
}
