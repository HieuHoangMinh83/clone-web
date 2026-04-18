import '../_shared.css'
import './NewsQuote.css'

/**
 * Khối trích dẫn (S3).
 *
 * Props:
 * - text:        nội dung câu trích (required)
 * - attribution: tên người/đơn vị phát biểu
 * - bgImage:     URL ảnh nền mờ (optional)
 * - active:      true → animation is-in (default true)
 * - kicker:      nhãn nhỏ (default "Trích dẫn")
 */
export default function NewsQuote({
  text,
  attribution,
  bgImage,
  active = true,
  kicker,
}) {
  return (
    <section className={`nd-sec nd-s3 ${active ? 'is-in' : ''}`}>
      <div className="nd-s3__bg" aria-hidden>
        {bgImage && <img src={bgImage} alt="" />}
        <span className="nd-s3__veil" />
      </div>
      <div className="nd-container nd-s3__inner">
        {kicker && <span className="nd-s3__kicker">{kicker}</span>}
        <span className="nd-s3__mark" aria-hidden>“</span>
        <blockquote className="nd-s3__quote">{text}</blockquote>
        {attribution && (
          <figcaption className="nd-s3__caption">
            <span className="nd-s3__line" />
            <span>{attribution}</span>
          </figcaption>
        )}
      </div>
    </section>
  )
}
