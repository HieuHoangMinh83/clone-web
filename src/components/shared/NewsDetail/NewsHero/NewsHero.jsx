import '../_shared.css'
import './NewsHero.css'

/**
 * Khối Hero — banner đầu bài viết (S1).
 *
 * Props:
 * - article:    { title, image, excerpt, category, date, author, readTime }
 * - active:     true → chạy animation is-in (mặc định true)
 * - crumb:      React node hiển thị breadcrumb (optional)
 * - showScroll: hiển thị "Cuộn để đọc" (mặc định true)
 */
export default function NewsHero({ article, active = true, crumb, showScroll = true }) {
  if (!article) return null
  const d = parseDate(article.date)
  const titleWords = (article.title || '').split(' ')
  return (
    <section className={`nd-sec nd-s1 ${active ? 'is-in' : ''}`}>
      <div className="nd-s1__bg" aria-hidden>
        {article.image && <img src={article.image} alt="" />}
      </div>
      <span className="nd-s1__veil" aria-hidden />
      <span className="nd-s1__grid" aria-hidden />
      <div className="nd-container nd-s1__inner">
        {crumb && (
          <nav className="nd-s1__crumb" aria-label="Breadcrumb">
            {crumb}
          </nav>
        )}
        <div className="nd-s1__stamp">
          <span className="nd-s1__stamp-cat">{article.category}</span>
          <span className="nd-s1__stamp-dash" />
          {d.d && <span className="nd-s1__stamp-date">{d.d}.{d.m}.{d.y}</span>}
        </div>
        <h1 className="nd-s1__title">
          {titleWords.map((w, i) => (
            <span key={i} className="nd-s1__word" style={{ '--wi': i }}>
              <span>{w}&nbsp;</span>
            </span>
          ))}
        </h1>
        {article.excerpt && <p className="nd-s1__lead">{article.excerpt}</p>}
        <div className="nd-s1__meta-row">
          <div className="nd-s1__byline">
            <span className="nd-s1__avatar" aria-hidden>{authorInitials(article.author)}</span>
            <div className="nd-s1__byline-text">
              <span className="nd-s1__byline-name">{article.author}</span>
              <span className="nd-s1__byline-meta">{article.readTime} · {article.category}</span>
            </div>
          </div>
          {showScroll && (
            <div className="nd-s1__scroll" aria-hidden>
              <span>Cuộn để đọc</span>
              <span className="nd-s1__scroll-line" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function parseDate(s) {
  const [d, m, y] = (s || '').split('/')
  return { d: d || '', m: m || '', y: y || '' }
}

function authorInitials(name) {
  if (!name) return 'NT'
  const words = name.split(/\s+/).filter(Boolean)
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}
