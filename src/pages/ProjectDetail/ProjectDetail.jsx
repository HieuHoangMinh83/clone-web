import { useMemo } from 'react'
import Header from '../../components/shared/Header/Header.jsx'
import Contact from '../../components/shared/Contact/Contact.jsx'
import { contactData } from '../../data/contact.js'
import SectionIndicator from '../../components/shared/SectionIndicator/SectionIndicator.jsx'
import useFullpageScroll from '../../components/intro/useFullpageScroll.js'
import {
  findProjectBySlug,
  getRelatedProjects,
} from '../../components/projects/projectsData.js'
import '../../components/projects/projects-shared.css'
import './ProjectDetail.css'

const SECTION_LABELS = [
  'Hero',
  'Tổng quan',
  'Phạm vi',
  'Con số',
  'Trích dẫn',
  'Liên quan',
  'Liên hệ',
]
const SECTION_TONES = [
  'dark',
  'light',
  'paper',
  'dark',
  'dark',
  'paper',
  'light',
]

function NotFound() {
  return (
    <>
      <Header />
      <main className="pd pd--empty">
        <div className="pd__empty-box">
          <p className="pd__empty-kicker">404</p>
          <h1>Không tìm thấy dự án</h1>
          <p>Đường dẫn không tồn tại hoặc dự án đã được gỡ.</p>
          <a className="pd__empty-btn" href="/du-an">Về trang Dự án</a>
        </div>
      </main>
    </>
  )
}

export default function ProjectDetail({ slug }) {
  const project = useMemo(() => findProjectBySlug(slug), [slug])
  const related = useMemo(() => getRelatedProjects(slug, 3), [slug])
  const total = SECTION_LABELS.length
  const { index, goTo } = useFullpageScroll(total)

  if (!project) return <NotFound />

  return (
    <>
      <Header variant={index === 0 || index >= 3 && index <= 4 ? 'transparent' : 'default'} />
      <div
        className="fullpage"
        style={{ transform: `translateY(-${index * 100}vh)` }}
      >
        {/* Section 1 — Hero */}
        <section className="pd-sec pd-hero">
          <div className="pd-hero__bg">
            <img src={project.image} alt={project.title} />
            <div className="pd-hero__veil" aria-hidden />
          </div>
          <div className="pd-container pd-hero__container">
            <nav className="pd-hero__crumb" aria-label="breadcrumb">
              <a href="/du-an">Dự án</a>
              <span className="pd-hero__crumb-sep" aria-hidden>·</span>
              <span className="pd-hero__crumb-cat">{project.categoryLabel}</span>
            </nav>
            <span className="pd-hero__tag">
              <span className="pd-hero__tag-line" aria-hidden />
              <span>Công trình · {project.year}</span>
            </span>
            <h1 className="pd-hero__title">
              <span className="pd-hero__title-mask">
                <span className="pd-hero__title-row">
                  {project.title.split(' ').slice(0, -1).join(' ') || project.title}
                </span>
              </span>
              {project.title.split(' ').length > 1 && (
                <span className="pd-hero__title-mask">
                  <span className="pd-hero__title-row pd-hero__title-row--accent">
                    <em>{project.title.split(' ').slice(-1)[0]}</em>
                  </span>
                </span>
              )}
            </h1>
            <p className="pd-hero__lead">{project.excerpt}</p>
            <dl className="pd-hero__meta">
              <div>
                <dt>Chủ đầu tư</dt>
                <dd>{project.client}</dd>
              </div>
              <div>
                <dt>Địa điểm</dt>
                <dd>{project.location}</dd>
              </div>
              <div>
                <dt>Quy mô</dt>
                <dd>{project.scale}</dd>
              </div>
              <div>
                <dt>Vai trò</dt>
                <dd>{project.role}</dd>
              </div>
            </dl>
          </div>
          <span className="pd-hero__scroll" aria-hidden>
            <span>Scroll</span>
            <span className="pd-hero__scroll-line" />
          </span>
        </section>

        {/* Section 2 — Overview */}
        <section className="pd-sec pd-over">
          <div className="pd-container pd-over__container">
            <div className="pd-over__media">
              <img src={project.image} alt={project.title} />
             
              <span className="pd-over__media-cat">{project.categoryLabel}</span>
            </div>
            <div className="pd-over__body">
              <span className="pd-over__eyebrow">
                <span className="pd-over__eyebrow-line" aria-hidden />
                <span>Tổng quan dự án</span>
              </span>
              <h2 className="pd-over__title">
                Câu chuyện <em>công trình</em>
              </h2>
              <div className="pd-over__text">
                <p>
                  <span className="pd-over__dropcap">{project.title[0]}</span>
                  {project.excerpt} Công trình được Chủ đầu tư {project.client} tin
                  tưởng giao cho Newtecons với cam kết về chất lượng, tiến độ và
                  an toàn xuyên suốt quá trình triển khai.
                </p>
                <p>
                  Tại {project.location}, đội ngũ Newtecons bố trí nhân lực kỹ
                  thuật cao, huy động thiết bị chuyên dụng và áp dụng các giải
                  pháp thi công tiên tiến. Mỗi giai đoạn đều được quản trị bởi
                  Ban Chỉ huy Dự án giàu kinh nghiệm — đảm bảo chất lượng đạt
                  chuẩn quốc tế, đồng thời giữ vững tiến độ cam kết.
                </p>
              </div>
              <a className="pd-over__back" href="/du-an">
                <svg width="20" height="10" viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 5H1m0 0l4-4M1 5l4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Quay lại danh mục dự án</span>
              </a>
            </div>
          </div>
        </section>

        {/* Section 3 — Scope */}
        <section className="pd-sec pd-scope">
          <div className="pd-container pd-scope__container">
            <header className="pd-scope__head">
              <span className="pd-over__eyebrow">
                <span className="pd-over__eyebrow-line" aria-hidden />
                <span>Phạm vi Newtecons</span>
              </span>
              <h2 className="pd-scope__title">
                Những hạng mục <em>chính yếu</em>
              </h2>
              <p className="pd-scope__lead">
                Newtecons đảm nhận đa gói thầu trên cùng một công trường — cho
                phép kiểm soát giao diện thi công chặt chẽ, tối ưu tiến độ tổng
                thể và thống nhất tiêu chuẩn chất lượng.
              </p>
            </header>
            <ol className="pd-scope__list">
              {project.detail.scope.map((s, i) => (
                <li key={s.title} className="pd-scope__item" style={{ '--i': i }}>
                  <span className="pd-scope__n">{String(i + 1).padStart(2, '0')}</span>
                  <div className="pd-scope__stack">
                    <h3 className="pd-scope__item-title">{s.title}</h3>
                    <p className="pd-scope__item-note">{s.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Section 4 — Numbers */}
        <section className="pd-sec pd-nums">
          <div className="pd-nums__bg" aria-hidden>
            <img src={project.image} alt="" />
          </div>
          <div className="pd-container pd-nums__container">
            <header className="pd-nums__head">
              <span className="pd-nums__eyebrow">
                <span className="pd-nums__eyebrow-line" aria-hidden />
                <span>Con số · Biết nói</span>
              </span>
              <h2 className="pd-nums__title">
                Quy mô <em>ấn tượng</em>
              </h2>
            </header>
            <ol className="pd-nums__list">
              {project.detail.numbers.map((n, i) => (
                <li key={`${n.k}-${i}`} className="pd-nums__item" style={{ '--i': i }}>
                  <span className="pd-nums__k">{n.k}</span>
                  <span className="pd-nums__v">{n.v}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Section 5 — Quote */}
        <section className="pd-sec pd-quote">
          <div className="pd-container pd-quote__container">
            <svg className="pd-quote__mark" viewBox="0 0 100 80" aria-hidden>
              <path
                d="M30 10C15 20 8 35 8 55v15h28V40H20c0-12 5-22 16-28l-6-2zM80 10C65 20 58 35 58 55v15h28V40H70c0-12 5-22 16-28l-6-2z"
                fill="currentColor"
              />
            </svg>
            <blockquote className="pd-quote__text">
              <p>{project.detail.quote.text}</p>
            </blockquote>
            <footer className="pd-quote__by">
              <span className="pd-quote__by-line" aria-hidden />
              <span>{project.detail.quote.by}</span>
            </footer>
          </div>
        </section>

        {/* Section 6 — Related */}
        <section className="pd-sec pd-rel">
          <div className="pd-container pd-rel__container">
            <header className="pd-rel__head">
              <span className="pd-over__eyebrow">
                <span className="pd-over__eyebrow-line" aria-hidden />
                <span>Dự án liên quan</span>
              </span>
              <h2 className="pd-rel__title">
                Khám phá thêm <em>công trình</em>
              </h2>
            </header>
            <div className="pd-rel__grid">
              {related.map((r, i) => (
                <a
                  key={r.slug}
                  className="pd-rel__card"
                  href={`/du-an/${r.slug}`}
                  style={{ '--i': i }}
                >
                  <div className="pd-rel__media">
                    <img src={r.image} alt={r.title} />
                    <span className="pd-rel__cat">{r.categoryLabel}</span>
                  </div>
                  <div className="pd-rel__body">
                    <h3 className="pd-rel__name">{r.title}</h3>
                    <span className="pd-rel__meta">
                      <span>{r.client}</span>
                      <span className="pd-rel__meta-sep" aria-hidden />
                      <span>{r.year}</span>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7 — Contact */}
        <Contact {...contactData} />
      </div>
      <SectionIndicator
        current={index}
        total={total}
        onNav={goTo}
        labels={SECTION_LABELS}
        tone={SECTION_TONES[index]}
      />
    </>
  )
}
