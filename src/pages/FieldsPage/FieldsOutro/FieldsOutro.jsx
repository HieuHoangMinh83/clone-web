import bg from '../../../assets/images/fields/figma-f7.png'
import useInViewActive from '../useInViewActive'
import './FieldsOutro.css'

export default function FieldsOutro({ active, isSlide }) {
  const { ref, mount } = useInViewActive(active, isSlide)

  return (
    <section
      ref={ref}
      className={`fp-sec fp-outro ${mount ? 'is-in' : ''}`}
      aria-label="Liên hệ hợp tác"
    >
      <div
        className="fp-outro__bg"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="fp-outro__scrim" />

      <span className="fp-marker" aria-hidden>09<span className="fp-marker__small">/09</span></span>
      <span className="fp-crosshair fp-crosshair--tl" aria-hidden />
      <span className="fp-crosshair fp-crosshair--tr" aria-hidden />
      <span className="fp-crosshair fp-crosshair--bl" aria-hidden />

      <div className="fp-outro__inner">
        <div className="fp-outro__copy">
          <span className="fp-outro__eyebrow">
            <span className="fp-outro__eyebrow-line" />
            SẴN SÀNG ĐỒNG HÀNH
          </span>
          <h2 className="fp-outro__title">
            <span className="fp-outro__title-mask">
              <span className="fp-outro__title-row">Kiến tạo</span>
            </span>
            <span className="fp-outro__title-mask">
              <span className="fp-outro__title-row fp-outro__title-row--accent">
                <em>giá trị cùng bạn</em>
              </span>
            </span>
          </h2>
          <p className="fp-outro__lede">
            Hãy chia sẻ dự án của bạn — đội ngũ Newtecons sẽ tư vấn giải pháp
            Tổng thầu D&amp;B tối ưu cho tiến độ, ngân sách và chất lượng công
            trình.
          </p>

          <div className="fp-outro__ctas">
            <a className="fp-outro__cta fp-outro__cta--primary" href="/lien-he">
              <span>Liên hệ hợp tác</span>
              <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
                <path
                  d="M1 5h19m0 0L16 1m4 4l-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a className="fp-outro__cta fp-outro__cta--ghost" href="/gioi-thieu">
              <span>Giới thiệu công ty</span>
            </a>
          </div>
        </div>

        <ul className="fp-outro__info" role="list">
          <li className="fp-outro__info-item" style={{ '--i': 0 }}>
            <span className="fp-outro__info-k">Trụ sở</span>
            <span className="fp-outro__info-v">
              Newtecons Tower, 96 Phan Đăng Lưu,<br />P. Đức Nhuận, TP. HCM
            </span>
          </li>
          <li className="fp-outro__info-item" style={{ '--i': 1 }}>
            <span className="fp-outro__info-k">Hotline</span>
            <span className="fp-outro__info-v">(+84) 28 3514 6699</span>
          </li>
          <li className="fp-outro__info-item" style={{ '--i': 2 }}>
            <span className="fp-outro__info-k">Email</span>
            <span className="fp-outro__info-v">tender@newtecons.vn</span>
          </li>
        </ul>
      </div>

      <div className="fp-outro__footer" aria-hidden>
        © 2026 Newtecons. All rights reserved.
      </div>
    </section>
  )
}
