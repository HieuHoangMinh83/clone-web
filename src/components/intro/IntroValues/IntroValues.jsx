import { useEffect, useRef, useState } from 'react'
import './IntroValues.css'

/* =====================================================================
   TỌA ĐỘ VÒNG CUNG & ICON — design tokens, không phải content.
   Giữ trong component vì không thay đổi giữa các dự án (visual layout).
   Hệ trục: (0,0) = góc trên-trái SECTION. x/y = phần trăm viewport.
   ===================================================================== */
const BP_LARGE = 99999

const LG = {
  ARC_LEFT_FOOT:  { x: 29, y: 100 },
  ARC_RIGHT_FOOT: { x: 71, y: 100 },
  ARC_APEX:       { x: 50, y: 57  },
  ARC_STRETCH_X: 1,
  ARC_STRETCH_Y: 1,
  NODE_POSITIONS: [
    { x: 30.5, y: 85 },
    { x: 38,   y: 66 },
    { x: 50,   y: 59 },
    { x: 62,   y: 66 },
    { x: 69.5, y: 85 },
  ],
}

const SM = {
  ARC_LEFT_FOOT:  { x: 24, y: 100 },
  ARC_RIGHT_FOOT: { x: 76, y: 100 },
  ARC_APEX:       { x: 50, y: 46  },
  ARC_STRETCH_X: 1,
  ARC_STRETCH_Y: 1,
  NODE_POSITIONS: [
    { x: 25.6, y: 82.2 },
    { x: 35.1, y: 57.4 },
    { x: 50,   y: 48   },
    { x: 64.9, y: 57.4 },
    { x: 74.4, y: 82.2 },
  ],
}

function buildArc(cfg) {
  const cx = (cfg.ARC_LEFT_FOOT.x + cfg.ARC_RIGHT_FOOT.x) / 2
  const cy = (cfg.ARC_LEFT_FOOT.y + cfg.ARC_RIGHT_FOOT.y) / 2
  const rx = Math.abs(cfg.ARC_RIGHT_FOOT.x - cx) * cfg.ARC_STRETCH_X
  const ry = (cy - cfg.ARC_APEX.y) * cfg.ARC_STRETCH_Y
  return {
    cx, cy, rx, ry,
    path: `M ${cfg.ARC_LEFT_FOOT.x} ${cfg.ARC_LEFT_FOOT.y} A ${rx} ${ry} 0 1 1 ${cfg.ARC_RIGHT_FOOT.x} ${cfg.ARC_RIGHT_FOOT.y}`,
    centerText: { x: cx, y: (cfg.ARC_APEX.y + cy) / 2 },
  }
}

function pickConfig() {
  if (typeof window === 'undefined') return LG
  return window.innerWidth >= BP_LARGE ? LG : SM
}

export default function IntroValues({
  bg,
  titleTop,
  titleStrong,
  items = [],
}) {
  const defaultIdx = Math.max(0, items.findIndex((v) => v.featured))
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [active, setActive] = useState(defaultIdx >= 0 ? defaultIdx : 2)
  const [cfg, setCfg] = useState(pickConfig)
  const [isNarrow, setIsNarrow] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 500,
  )

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.25)
      },
      { threshold: [0, 0.25, 0.5] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onResize = () => {
      setCfg(pickConfig())
      setIsNarrow(window.innerWidth < 500)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const touchRef = useRef({ x: 0, y: 0, locked: 'none' })
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [enterDir, setEnterDir] = useState(1)

  useEffect(() => {
    if (!isNarrow || !inView || items.length <= 1 || isDragging) return
    const id = setTimeout(() => {
      setEnterDir(1)
      setActive((i) => (i + 1) % items.length)
    }, 4000)
    return () => clearTimeout(id)
  }, [isNarrow, inView, items.length, active, isDragging])
  const onTouchStart = (e) => {
    if (!isNarrow || items.length <= 1) return
    const t = e.touches[0]
    touchRef.current = { x: t.clientX, y: t.clientY, locked: 'none' }
    setIsDragging(true)
  }
  const onTouchMove = (e) => {
    if (!isDragging) return
    const t = e.touches[0]
    const dx = t.clientX - touchRef.current.x
    const dy = t.clientY - touchRef.current.y
    if (touchRef.current.locked === 'none') {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
      touchRef.current.locked = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
    }
    if (touchRef.current.locked !== 'x') return
    setDragX(dx)
  }
  const onTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    const dx = dragX
    setDragX(0)
    if (touchRef.current.locked !== 'x' || items.length <= 1) return
    if (Math.abs(dx) < 50) return
    const delta = dx < 0 ? 1 : -1
    setEnterDir(delta)
    setActive((i) => {
      const n = items.length
      return (i + delta + n) % n
    })
  }

  const arc = buildArc(cfg)
  const ARC_PATH = arc.path
  const CENTER_TEXT_POS = arc.centerText
  const NODE_POSITIONS = cfg.NODE_POSITIONS
  const _cx = arc.cx

  if (typeof window !== 'undefined') {
    window.__ARC_DEBUG = {
      breakpoint: cfg === LG ? 'LG (>=1700)' : 'SM (<1700)',
      center: { x: arc.cx, y: arc.cy },
      rx: arc.rx,
      ry: arc.ry,
      aspectRatio: arc.ry / arc.rx,
      path: ARC_PATH,
    }
  }

  const current = items[active] || items[0]
  if (!current) return null

  return (
    <section
      ref={sectionRef}
      className={`intro-sec intro-values ${inView ? 'is-in' : ''}`}
    >
      <div
        className="intro-sec__bg intro-values__bg"
        style={{ backgroundImage: `url(${bg})` }}
      />

      <div className="intro-container">
        <h2 className="intro-values__title">
          {titleTop} <strong>{titleStrong}</strong>
        </h2>
      </div>

      <div
        className="intro-values__arc-wrap"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <svg className="intro-values__arc-svg" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none" aria-hidden>
          <path
            d={ARC_PATH}
            stroke="#fff"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            fill="none"
          />
        </svg>

        <div
          className={`intro-values__center ${isDragging ? 'is-dragging' : ''}`}
          key={current.key}
          style={{
            left: `${CENTER_TEXT_POS.x}%`,
            top: `calc(${CENTER_TEXT_POS.y}% + 40px)`,
            '--drag-x': `${dragX}px`,
            '--enter-x': enterDir > 0 ? '60px' : '-60px',
          }}
        >
          <span
            className="intro-values__center-icon"
            style={{ '--icon-url': `url(${current.icon})` }}
            aria-hidden
          />
          <h3 className="intro-values__center-name">{current.name}</h3>
          <p className="intro-values__center-desc">{current.desc}</p>
        </div>

        {items.length > 1 && (
          <ol className="intro-values__dots" aria-label="Điều hướng giá trị cốt lõi">
            {items.map((v, i) => (
              <li key={v.key}>
                <button
                  type="button"
                  className={i === active ? 'is-active' : ''}
                  onClick={() => setActive(i)}
                  aria-label={v.name}
                  aria-current={i === active ? 'true' : undefined}
                />
              </li>
            ))}
          </ol>
        )}

        <div className="intro-values__nodes">
          {items.map((v, i) => {
            const pos = NODE_POSITIONS[i] ?? { x: 50, y: 50 }
            const labelShift = (_cx - pos.x) * 2.5
            return (
              <button
                key={v.key}
                className={`intro-values__node ${i === active ? 'is-active' : ''}`}
                style={{ '--ai': i, left: `${pos.x}%`, top: `${pos.y}%`, '--label-shift': `${labelShift}px` }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="intro-values__node-circle">
                  <span
                    className="intro-values__node-icon"
                    style={{ '--icon-url': `url(${v.icon})` }}
                    aria-hidden
                  />
                </span>
                <span className="intro-values__node-label">{v.name}</span>
                <span className="intro-values__node-desc">{v.desc}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
