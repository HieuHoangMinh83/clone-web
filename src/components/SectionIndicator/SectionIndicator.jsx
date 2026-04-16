import './SectionIndicator.css'

export default function SectionIndicator({
  current,
  total,
  onNav,
  labels,
  tone = 'light',
}) {
  return (
    <nav className={`indicator indicator--${tone}`} aria-label="Điều hướng section">
      <ul>
        {Array.from({ length: total }).map((_, i) => (
          <li key={i}>
            <button
              className={i === current ? 'is-active' : ''}
              onClick={() => onNav(i)}
              aria-label={labels?.[i] ?? `Section ${i + 1}`}
              aria-current={i === current ? 'true' : undefined}
            >
              {String(i + 1).padStart(2, '0')}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
