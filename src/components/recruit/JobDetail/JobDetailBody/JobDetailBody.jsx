import { JOB_BENEFITS, JOB_PROCESS } from '../../../../data/recruit.js'
import './JobDetailBody.css'

function Block({ no, eyebrow, title, items, variant }) {
  return (
    <section className={`jd-block jd-reveal ${variant ? `jd-block--${variant}` : ''}`}>
      <header className="jd-block__head">
        <span className="jd-block__no">{no}</span>
        <div>
          <span className="jd-block__eyebrow">{eyebrow}</span>
          <h2 className="jd-block__title">{title}</h2>
        </div>
      </header>
      <ul className="jd-block__list">
        {items.map((item, i) => (
          <li
            key={i}
            className="jd-block__item jd-reveal"
            style={{ '--jd-reveal-i': i }}
          >
            <span className="jd-block__bullet" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function JobDetailBody({ job, detail, mailtoApply, related }) {
  return (
    <section className="jd-body">
      <div className="jd-body__inner">
        <article className="jd-main">
          {detail?.context && (
            <section className="jd-context jd-reveal">
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

          <section className="jd-process jd-reveal">
            <span className="jd-process__eyebrow">Quy trình ứng tuyển</span>
            <h2 className="jd-process__heading">
              Quy trình ứng tuyển tại Newtecons
            </h2>
            <ol className="jd-process__list">
              {JOB_PROCESS.map((p, i) => (
                <li key={p.k} className="jd-step jd-reveal" style={{ '--jd-reveal-i': i }}>
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
          <div className="jd-card jd-card--apply jd-reveal">
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
            <div className="jd-card jd-reveal">
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
            <div className="jd-card jd-reveal">
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
  )
}
