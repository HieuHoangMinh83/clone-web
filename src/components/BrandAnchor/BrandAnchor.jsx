import './BrandAnchor.css'

export default function BrandAnchor() {
  return (
    <section className="brand section" aria-label="Thương hiệu">
      <div className="brand__mark">
        <svg viewBox="0 0 495 590" fill="none" aria-hidden>
          <circle cx="247.5" cy="260" r="140" stroke="var(--teal-500)" strokeWidth="3" />
          <text
            x="50%"
            y="260"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--gold-500)"
            fontFamily="Montserrat, sans-serif"
            fontWeight="700"
            fontSize="56"
            letterSpacing="8"
          >
            LOGO
          </text>
          <text
            x="50%"
            y="440"
            textAnchor="middle"
            fill="var(--navy-700)"
            fontFamily="Montserrat, sans-serif"
            fontWeight="700"
            fontSize="40"
            letterSpacing="6"
          >
            COMPANY
          </text>
          <text
            x="50%"
            y="490"
            textAnchor="middle"
            fill="var(--ink-500)"
            fontFamily="Montserrat, sans-serif"
            fontWeight="400"
            fontSize="18"
            letterSpacing="4"
          >
            BUILD ON TRUST
          </text>
        </svg>
      </div>
    </section>
  )
}
