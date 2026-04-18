import { useEffect, useRef, useState } from 'react'
import bannerBg from '../../../assets/images/fields/figma-header-bg.png'
import './FieldsBanner.css'

export default function FieldsBanner({ active }) {
  const [mount, setMount] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (active) {
      const t = requestAnimationFrame(() => setMount(true))
      return () => cancelAnimationFrame(t)
    }
    setMount(false)
  }, [active])

  return (
    <section
      ref={ref}
      className={`fp-sec fp-banner ${mount ? 'is-in' : ''}`}
      aria-label="Lĩnh vực hoạt động"
    >
      <div
        className="fp-banner__bg"
        style={{ backgroundImage: `url(${bannerBg})` }}
      />
      <div className="fp-banner__scrim" />

      <div className="fp-banner__deco" aria-hidden>
        <svg className="fp-banner__lines" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          <path className="fp-banner__line fp-banner__line--1" d="M80 540 L560 540 L720 380 L1200 380 L1340 240 L1840 240" stroke="currentColor" fill="none" strokeWidth="1" />
          <path className="fp-banner__line fp-banner__line--2" d="M80 860 L420 860 L580 740 L1020 740 L1180 620 L1840 620" stroke="currentColor" fill="none" strokeWidth="1" />
          <circle className="fp-banner__dot" cx="720" cy="380" r="4" />
          <circle className="fp-banner__dot fp-banner__dot--b" cx="1200" cy="380" r="4" />
          <circle className="fp-banner__dot fp-banner__dot--c" cx="1020" cy="740" r="4" />
        </svg>
      </div>

      <span className="fp-marker" aria-hidden>01<span className="fp-marker__small">/09</span></span>
      <span className="fp-crosshair fp-crosshair--tl" aria-hidden />
      <span className="fp-crosshair fp-crosshair--bl" aria-hidden />
      <span className="fp-crosshair fp-crosshair--br" aria-hidden />

      <div className="fp-banner__inner">
        <h1 className="fp-banner__title">
          <span className="fp-banner__title-mask">
            <span className="fp-banner__title-row">Lĩnh vực</span>
          </span>
          <span className="fp-banner__title-mask">
            <span className="fp-banner__title-row fp-banner__title-row--accent">
              <em>hoạt động</em>
            </span>
          </span>
        </h1>
        <span className="fp-banner__mark" />
        <p className="fp-banner__sub">
          Tám trụ cột năng lực — từ tổng thầu D&amp;B, xây dựng dân dụng & công nghiệp,
          cơ điện thông minh đến văn hoá an toàn và hệ thống quản trị quốc tế.
        </p>
      </div>
    </section>
  )
}
