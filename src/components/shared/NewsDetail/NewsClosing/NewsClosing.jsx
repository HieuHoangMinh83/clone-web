import '../_shared.css'
import './NewsClosing.css'

/**
 * Khối kết bài (S5) — ảnh minh hoạ + 2 cột + tags + share.
 *
 * Props:
 * - sections:      [{ num, kicker, title, paragraphs[] }]
 * - figure:        URL ảnh minh hoạ (optional)
 * - figureCaption: chú thích ảnh (optional — mặc định "Fig.02")
 * - tags:          string[] — hiển thị list tag (optional)
 * - shareUrl:      URL bài viết để share (mặc định window.location.href)
 * - shareTitle:    tiêu đề để share (dùng cho Twitter)
 * - showShare:     hiển thị cụm share (default true)
 * - active:        animation is-in (default true)
 * - kicker:        nhãn (default "Phần kết")
 * - heading:       H2 node (default "Triển khai & cam kết")
 */
export default function NewsClosing({
  sections = [],
  figure,
  figureCaption,
  tags = [],
  shareUrl,
  shareTitle = '',
  showShare = true,
  active = true,
  kicker,
  heading,
}) {
  const links = showShare ? buildShareLinks({ url: shareUrl, title: shareTitle }) : null
  return (
    <section className={`nd-sec nd-s5 ${active ? 'is-in' : ''}`}>
      <div className="nd-s5__bg" aria-hidden>
        <span className="nd-s5__watermark">03 · 04</span>
      </div>
      <div className="nd-container nd-s5__inner">
        <header className="nd-s5__head">
          {kicker && <span className="nd-kicker">{kicker}</span>}
          <h2 className="nd-s5__heading">
            {heading || (<>Triển khai &amp; <em>cam kết</em></>)}
          </h2>
        </header>
        <div className="nd-s5__layout">
          {figure && (
            <figure className="nd-s5__figure">
              <img src={figure} alt={figureCaption || ''} loading="lazy" />
              {figureCaption && (
                <figcaption>
                  <span>Fig.02</span>
                  {figureCaption}
                </figcaption>
              )}
            </figure>
          )}
          <div className="nd-s5__cols">
            {sections.map((sec, si) => (
              <article key={sec.id || si} className="nd-col" style={{ '--ci': si }}>
                <header className="nd-col__head">
                  <span className="nd-col__num">{sec.num}</span>
                  <div>
                    <span className="nd-col__kicker">{sec.kicker}</span>
                    <h3 className="nd-col__title">{sec.title}</h3>
                  </div>
                </header>
                <div className="nd-col__body">
                  {sec.paragraphs.map((p, pi) => <p key={pi}>{p}</p>)}
                </div>
              </article>
            ))}
          </div>
        </div>
        {(tags.length > 0 || links) && (
          <footer className="nd-s5__foot">
            {tags.length > 0 && (
              <ul className="nd-s5__tags" aria-label="Từ khoá">
                {tags.map((t) => <li key={t}>#{t}</li>)}
              </ul>
            )}
            {links && (
              <div className="nd-s5__share">
                <span className="nd-s5__share-label">Chia sẻ</span>
                <a href={links.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M13.5 8H11V6.5c0-.8.2-1 1-1h1.5V3H11c-2 0-3 .9-3 3v2H6v2.5h2V21h3v-8.5h2.1L13.5 8z" /></svg>
                </a>
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M4 4h4v4H4V4zm1 6h2v10H5V10zm4 0h2v1.4c.5-.8 1.4-1.6 2.9-1.6 3 0 3.6 1.9 3.6 4.3V20h-3v-5c0-1.2-.3-2-1.5-2-1.2 0-1.8.8-1.8 2.3V20H9V10z" /></svg>
                </a>
                <a href={links.twitter} target="_blank" rel="noopener noreferrer" aria-label="X">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M16.5 4h2.7l-5.9 6.7L20 20h-5.5l-4.3-5.6L5.2 20H2.5l6.3-7.1L2 4h5.6l3.9 5.2L16.5 4zm-1 14.3h1.5L7.6 5.6H6L15.5 18.3z" /></svg>
                </a>
              </div>
            )}
          </footer>
        )}
      </div>
    </section>
  )
}

function buildShareLinks({ url, title }) {
  const u = encodeURIComponent(url || (typeof window !== 'undefined' ? window.location.href : ''))
  const t = encodeURIComponent(title || '')
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    twitter: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
  }
}
