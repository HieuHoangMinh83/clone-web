import '../_shared.css'
import './NewsRelated.css'

/**
 * Khối "Đọc tiếp — Có thể bạn quan tâm".
 * Dùng chung cho: NewsDetail (fullpage S6), NewsBuilder preview, BlockShowcase.
 *
 * Props:
 * - articles:   mảng bài viết (bắt buộc) — { slug, title, image, category, date, readTime }
 * - active:     true → kích hoạt animation fade-up (mặc định true)
 * - kicker:     nhãn nhỏ phía trên tiêu đề (mặc định "Đọc tiếp")
 * - heading:    JSX cho tiêu đề H2 (mặc định "Có thể bạn quan tâm")
 * - showAll:    { href, label } — nút CTA; truyền null để ẩn
 * - className:  class bổ sung cho <section> root
 */
export default function NewsRelated({
  articles = [],
  active = true,
  kicker,
  heading,
  showAll = { href: '#/tin-tuc', label: 'Xem tất cả tin' },
  className = '',
}) {
  if (!articles.length) return null
  return (
    <section
      className={`nd-sec news-related ${active ? 'is-in' : ''} ${className}`.trim()}
    >
      <div className="news-related__bg" aria-hidden>
        <span className="news-related__watermark">More</span>
      </div>
      <div className="news-related__inner">
        <header className="news-related__head">
          <div className="news-related__head-text">
            {kicker && <span className="news-related__kicker">{kicker}</span>}
            <h2 className="news-related__heading">
              {heading || (
                <>
                  Có thể bạn <em>quan tâm</em>
                </>
              )}
            </h2>
          </div>
          {showAll && (
            <a className="news-related__all" href={showAll.href}>
              <span>{showAll.label}</span>
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden>
                <path
                  d="M1 5h15m0 0L12 1m4 4l-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </header>
        <div className="news-related__grid">
          {articles.map((a, i) => (
            <RelatedCard key={a.slug} article={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function RelatedCard({ article, index }) {
  const [d, m, y] = (article.date || '').split('/')
  return (
    <article className="news-related__card" style={{ '--i': index }}>
      <a className="news-related__link" href={`#/tin-tuc/${article.slug}`}>
        <div className="news-related__media">
          <img src={article.image} alt={article.title} loading="lazy" />
          <span className="news-related__cat">{article.category}</span>
        </div>
        <div className="news-related__body">
          <span className="news-related__date">
            {d}/{m}/{y}
            {article.readTime ? ` · ${article.readTime}` : ''}
          </span>
          <h3 className="news-related__title">{article.title}</h3>
          <span className="news-related__more">
            <span>Đọc tiếp</span>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
              <path
                d="M1 5h13m0 0L10 1m4 4l-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </a>
    </article>
  )
}
