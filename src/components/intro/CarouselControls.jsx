export default function CarouselControls({ onPrev, onNext, hasPrev, hasNext, className = '' }) {
  return (
    <div className={`carousel-controls ${className}`}>
      <button onClick={onPrev} disabled={!hasPrev} aria-label="Trước">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button onClick={onNext} disabled={!hasNext} aria-label="Tiếp">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}
