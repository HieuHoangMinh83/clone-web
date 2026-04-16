import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__bg" aria-hidden />
      <div className="footer__overlay" aria-hidden />

      <div className="footer__content">
        <a href="#" className="footer__logo">
          <span className="footer__logo-mark">N</span>
          <span className="footer__logo-text">NEWTECONS</span>
        </a>

        <p className="footer__tag">
          Build on Trust — Sự tin tưởng của bạn là chuẩn mực cho giá trị của chúng tôi.
        </p>

        <ul className="footer__social">
          <li><a href="#" aria-label="Facebook">f</a></li>
          <li><a href="#" aria-label="YouTube">▶</a></li>
          <li><a href="#" aria-label="LinkedIn">in</a></li>
        </ul>

        <p className="footer__copy">
          © {new Date().getFullYear()} Company. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
