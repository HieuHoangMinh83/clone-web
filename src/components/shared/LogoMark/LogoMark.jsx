/**
 * LogoMark — Renders an animated SVG letter logo.
 *
 * Usage:
 *   <LogoMark letter="N" />          → Newtecons N
 *   <LogoMark letter="H" />          → HMKgrass H
 *   <LogoMark letter="A" />          → custom A
 *
 * Each letter is a hand-crafted SVG built from geometric parts
 * (pillars, crossbars, diagonals) with draw-in animations.
 */

const LETTERS = {
  /* ---- Newtecons N ---- */
  N: {
    viewBox: '0 0 145.8 175',
    gradients: (id) => (
      <>
        <linearGradient id={`${id}-l`} x1="0" y1="0" x2="0" y2="175" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--teal-500)" />
          <stop offset="100%" stopColor="#fff" />
        </linearGradient>
        <linearGradient id={`${id}-r`} x1="145.8" y1="175" x2="145.8" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--teal-500)" />
          <stop offset="100%" stopColor="#fff" />
        </linearGradient>
      </>
    ),
    parts: (id) => (
      <>
        <polygon
          className="logo-mark__part logo-mark__part--up"
          points="43.74 21.87 102.06 117.3 102.06 76.34 55.4 0 0 0 0 174.96 21.87 174.96 54.67 174.96 54.67 153.09 21.87 153.09 21.87 21.87 43.74 21.87"
          fill={`url(#${id}-l)`}
        />
        <polygon
          className="logo-mark__part logo-mark__part--down"
          points="102.06 153.09 43.74 57.66 43.74 98.61 90.39 174.96 145.8 174.96 145.8 0 123.93 0 91.12 0 91.12 21.87 123.93 21.87 123.93 153.09 102.06 153.09"
          fill={`url(#${id}-r)`}
        />
      </>
    ),
  },

  /* ---- HMKgrass H ---- */
  H: {
    viewBox: '0 0 140 175',
    gradients: (id) => (
      <>
        <linearGradient id={`${id}-l`} x1="0" y1="0" x2="0" y2="175" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#fff" />
        </linearGradient>
        <linearGradient id={`${id}-r`} x1="140" y1="175" x2="140" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#fff" />
        </linearGradient>
        <linearGradient id={`${id}-bar`} x1="0" y1="87.5" x2="140" y2="87.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="50%" stopColor="#fff" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
      </>
    ),
    parts: (id) => (
      <>
        {/* Left pillar */}
        <rect
          className="logo-mark__part logo-mark__part--up"
          x="0" y="0" width="28" height="175" fill={`url(#${id}-l)`}
        />
        {/* Right pillar */}
        <rect
          className="logo-mark__part logo-mark__part--down"
          x="112" y="0" width="28" height="175" fill={`url(#${id}-r)`}
        />
        {/* Crossbar */}
        <rect
          className="logo-mark__part logo-mark__part--bar"
          x="28" y="68" width="84" height="28" fill={`url(#${id}-bar)`}
        />
        {/* Inner shadow accents (thin lines inside pillars) */}
        <rect x="22" y="0" width="6" height="175" fill="rgba(255,255,255,0.15)" />
        <rect x="112" y="0" width="6" height="175" fill="rgba(255,255,255,0.15)" />
      </>
    ),
  },

  /* ---- Aura A (architectural, Newtecons-style) ---- */
  A: {
    viewBox: '0 0 150 175',
    gradients: (id) => (
      <>
        <linearGradient id={`${id}-l`} x1="0" y1="0" x2="0" y2="175" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="var(--gold-500)" />
        </linearGradient>
        <linearGradient id={`${id}-r`} x1="150" y1="175" x2="150" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="var(--gold-500)" />
        </linearGradient>
      </>
    ),
    parts: (id) => (
      <>
        {/* Left half — thick leg + left side of peak + crossbar left */}
        <polygon
          className="logo-mark__part logo-mark__part--up"
          points="
            75 0
            53 0
            0 175
            24 175
            38 130
            75 130
            75 105
            46 105
            75 30
          "
          fill={`url(#${id}-l)`}
        />
        {/* Right half — thick leg + right side of peak + crossbar right */}
        <polygon
          className="logo-mark__part logo-mark__part--down"
          points="
            75 0
            97 0
            150 175
            126 175
            112 130
            75 130
            75 105
            104 105
            75 30
          "
          fill={`url(#${id}-r)`}
        />
      </>
    ),
  },
}

export default function LogoMark({ letter = 'N', className = '' }) {
  const def = LETTERS[letter] || LETTERS.N
  const id = `lm-${letter}`

  return (
    <span className={`logo-mark ${className}`}>
      <svg className="logo-mark__svg" viewBox={def.viewBox} aria-hidden>
        <defs>{def.gradients(id)}</defs>
        {def.parts(id)}
      </svg>
    </span>
  )
}
