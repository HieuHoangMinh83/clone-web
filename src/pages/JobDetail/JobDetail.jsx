import { useEffect, useMemo, useState } from 'react'
import Header from '../../components/shared/Header/Header.jsx'
import Contact from '../../components/shared/Contact/Contact.jsx'
import {
  JOBS,
  JOB_DETAILS,
  JOB_BENEFITS,
  JOB_PROCESS,
} from '../../components/recruit/recruitData.js'
import './JobDetail.css'

export default function JobDetail({ jobId }) {
  const job = useMemo(() => JOBS.find((j) => j.id === jobId), [jobId])
  const detail = job ? JOB_DETAILS[job.id] : null

  const [mount, setMount] = useState(false)
  useEffect(() => {
    document.documentElement.classList.add('is-scroll-page')
    document.body.classList.add('is-scroll-page')
    window.scrollTo(0, 0)
    const r = requestAnimationFrame(() => setMount(true))
    return () => {
      cancelAnimationFrame(r)
      document.documentElement.classList.remove('is-scroll-page')
      document.body.classList.remove('is-scroll-page')
    }
  }, [jobId])

  const related = useMemo(() => {
    if (!job) return []
    return JOBS.filter((j) => j.id !== job.id && j.dept === job.dept).slice(0, 3)
  }, [job])

  if (!job) {
    return (
      <>
        <Header variant="default" />
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
        <Contact />
      </>
    )
  }

  const mailtoApply = `mailto:recruitment@newtecons.vn?subject=${encodeURIComponent(
    `Ung tuyen - ${job.title} (${job.id.toUpperCase()})`,
  )}&body=${encodeURIComponent(
    `Kính gửi Phòng Tuyển dụng Newtecons,\n\nTôi xin ứng tuyển vị trí "${job.title}".\n\n— Họ tên:\n— Email / SĐT:\n— Kinh nghiệm nổi bật:\n\nCV đính kèm vui lòng xem file bên dưới.\n\nTrân trọng,`,
  )}`

  return (
    <>
      <Header variant="default" />
      <main className={`jd ${mount ? 'is-in' : ''}`}>
        {/* ---------- HERO ---------- */}
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

        {/* ---------- BODY ---------- */}
        <section className="jd-body">
          <div className="jd-body__inner">
            <article className="jd-main">
              {detail?.context && (
                <section className="jd-context">
                  <span className="jd-context__eyebrow">Bối cảnh vị trí</span>
                  <p className="jd-context__text">{detail.context}</p>
                </section>
              )}

              {detail?.responsibilities && (
                <Block
                  no="01"
                  eyebrow="Mô tả công việc"
                  title="Trách nhiệm chính của vị trí"
                  items={detail.responsibilities}
                />
              )}

              {detail?.requirements && (
                <Block
                  no="02"
                  eyebrow="Yêu cầu bắt buộc"
                  title="Điều kiện ứng tuyển"
                  items={detail.requirements}
                />
              )}

              {detail?.niceToHave?.length > 0 && (
                <Block
                  no="03"
                  eyebrow="Ưu tiên"
                  title="Ưu tiên ứng viên có"
                  items={detail.niceToHave}
                  variant="accent"
                />
              )}

              <Block
                no="04"
                eyebrow="Quyền lợi"
                title="Quyền lợi dành cho vị trí"
                items={JOB_BENEFITS}
                variant="gold"
              />

              <section className="jd-process">
                <span className="jd-process__eyebrow">Quy trình ứng tuyển</span>
                <h2 className="jd-process__heading">
                  Quy trình ứng tuyển tại Newtecons
                </h2>
                <ol className="jd-process__list">
                  {JOB_PROCESS.map((p) => (
                    <li key={p.k} className="jd-step">
                      <span className="jd-step__no">{p.k}</span>
                      <div>
                        <h3 className="jd-step__label">{p.label}</h3>
                        <p className="jd-step__body">{p.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </article>

            <aside className="jd-side">
              <div className="jd-card jd-card--apply">
                <span className="jd-card__eyebrow">Sẵn sàng ứng tuyển?</span>
                <h3 className="jd-card__title">Gửi hồ sơ trước hạn {job.deadline}</h3>
                <p className="jd-card__text">
                  Gửi CV tới HR hoặc liên hệ trực tiếp để được tư vấn chi tiết về vị trí này.
                </p>
                <a href={mailtoApply} className="jd-btn jd-btn--primary jd-btn--block">
                  <span>Ứng tuyển ngay</span>
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
                    <path d="M1 5h11m0 0L8 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <div className="jd-card__contact">
                  <a href="mailto:recruitment@newtecons.vn">recruitment@newtecons.vn</a>
                  <a href="tel:+842822223333">(+84) 28 2222 3333</a>
                </div>
              </div>

              {job.skills?.length > 0 && (
                <div className="jd-card">
                  <span className="jd-card__eyebrow">Kỹ năng trọng yếu</span>
                  <ul className="jd-chips">
                    {job.skills.map((s) => (
                      <li key={s} className="jd-chip jd-chip--skill">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {related.length > 0 && (
                <div className="jd-card">
                  <span className="jd-card__eyebrow">Vị trí liên quan</span>
                  <ul className="jd-related">
                    {related.map((r) => (
                      <li key={r.id}>
                        <a href={`/tuyen-dung/${r.id}`} className="jd-related__item">
                          <span className="jd-related__title">{r.title}</span>
                          <span className="jd-related__meta">
                            {r.locationLabel} · {r.exp}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </section>

        <section className="jd-cta">
          <span className="jd-cta__grid" aria-hidden />
          <div className="jd-cta__inner">
            <div className="jd-cta__text">
              <span className="jd-cta__kicker">Build on Trust</span>
              <h2 className="jd-cta__title">
                Cùng Newtecons kiến tạo những công trình biểu tượng
              </h2>
              <p className="jd-cta__lead">
                Hơn 4.500 cán bộ nhân viên trên toàn hệ thống đang cùng triển khai 150+ dự án trọng điểm.
                Hồ sơ ứng tuyển được tiếp nhận và phản hồi trong 3–5 ngày làm việc.
              </p>
            </div>
            <div className="jd-cta__actions">
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
      </main>
      <Contact />
    </>
  )
}

function Info({ icon, label, value, highlight }) {
  return (
    <div className={`jd-info ${highlight ? 'jd-info--hl' : ''}`}>
      <span className="jd-info__icon">{icon}</span>
      <span className="jd-info__label">{label}</span>
      <span className="jd-info__value">{value}</span>
    </div>
  )
}

function Block({ no, eyebrow, title, items, variant }) {
  return (
    <section className={`jd-block ${variant ? `jd-block--${variant}` : ''}`}>
      <header className="jd-block__head">
        <span className="jd-block__no">{no}</span>
        <div>
          <span className="jd-block__eyebrow">{eyebrow}</span>
          <h2 className="jd-block__title">{title}</h2>
        </div>
      </header>
      <ul className="jd-block__list">
        {items.map((item, i) => (
          <li key={i} className="jd-block__item">
            <span className="jd-block__bullet" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
