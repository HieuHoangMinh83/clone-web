import { useEffect, useRef, useState } from 'react'
import bg from '../../../assets/images/intro/bg/values.png'
import VALUES from '../values.js'
import './IntroValues.css'

/* =====================================================================
   TỌA ĐỘ VÒNG CUNG & ICON — chỉnh trực tiếp 3 khối dưới đây
   Hệ trục: (0,0) = góc trên-trái SECTION (= góc trên-trái màn hình vì section = 100vw × 100vh)
            (100,100) = góc dưới-phải màn hình.
   x/y = phần trăm viewport. x=50 luôn là giữa màn hình, y=100 là đáy màn hình.
   ===================================================================== */

// Ngưỡng chia breakpoint (px). Viewport >= BP_LARGE → dùng LG, ngược lại → SM.
// Giữ BP_LARGE ở ngưỡng rất cao để luôn dùng SM — arc kiến trúc thống nhất
// trên mọi màn ngang (feet 24/76 bung rộng, apex 46). LG giữ lại cho tham khảo.
const BP_LARGE = 99999

// ---------- 📐 CONFIG cho MÀN ≥ 1700 (LG) ----------
const LG = {
  ARC_LEFT_FOOT:  { x: 29, y: 100 },
  ARC_RIGHT_FOOT: { x: 71, y: 100 },
  ARC_APEX:       { x: 50, y: 57  },
  ARC_STRETCH_X: 1,
  ARC_STRETCH_Y: 1,
  NODE_POSITIONS: [
    { x: 30.5, y: 85 },  // Sáng tạo
    { x: 38,   y: 66 },  // Đoàn kết
    { x: 50,   y: 59 },  // Chính trực
    { x: 62,   y: 66 },  // Tối ưu
    { x: 69.5, y: 85 },  // Tử tế
  ],
}

// ---------- 📐 CONFIG cho MÀN < 1700 (SM) — chỉnh giá trị ở đây ----------
// Ellipse: cx=50, cy=100, rx=26, ry=52 → nodes tại t = 160°, 125°, 90°, 55°, 20°
const SM = {
  ARC_LEFT_FOOT:  { x: 24, y: 100 },
  ARC_RIGHT_FOOT: { x: 76, y: 100 },
  ARC_APEX:       { x: 50, y: 46  },
  ARC_STRETCH_X: 1,
  ARC_STRETCH_Y: 1,
  NODE_POSITIONS: [
    { x: 25.6, y: 82.2 },  // Sáng tạo    — (t=160°)
    { x: 35.1, y: 57.4 },  // Đoàn kết    — (t=125°)
    { x: 50,   y: 48   },  // Chính trực  — (t=90°, đỉnh)
    { x: 64.9, y: 57.4 },  // Tối ưu      — (t=55°)
    { x: 74.4, y: 82.2 },  // Tử tế       — (t=20°)
  ],
}

// 🌀 ĐỘ CONG — hệ số tỉ lệ bán trục ellipse (độc lập với feet/apex)
//   = 1 → cung đi CHÍNH XÁC qua 3 điểm feet + apex (mặc định)
//   > 1 → cung phình to hơn theo trục tương ứng (vượt qua feet/apex)
//   < 1 → cung thu vào trong (không chạm feet/apex)

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

const DEFAULT_IDX = VALUES.findIndex((v) => v.featured) ?? 2

function pickConfig() {
  if (typeof window === 'undefined') return LG
  return window.innerWidth >= BP_LARGE ? LG : SM
}

export default function IntroValues() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [active, setActive] = useState(DEFAULT_IDX)
  const [cfg, setCfg] = useState(pickConfig)

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
    const onResize = () => setCfg(pickConfig())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

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

  const current = VALUES[active]

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
          GIÁ TRỊ <strong>CỐT LÕI</strong>
        </h2>
      </div>

      {/* Overlay full-section: (0,0) → (100,100) = toàn viewport */}
      <div className="intro-values__arc-wrap">
        {/* Cung tròn nét liền — path tính từ ARC_LEFT_FOOT / ARC_RIGHT_FOOT / ARC_APEX */}
        <svg className="intro-values__arc-svg" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none" aria-hidden>
          <path
            d={ARC_PATH}
            stroke="#fff"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            fill="none"
          />
        </svg>

        {/* Center text — đặt tại tâm vùng bowl trong cung */}
        <div
          className="intro-values__center"
          key={current.key}
          style={{ left: `${CENTER_TEXT_POS.x}%`, top: `calc(${CENTER_TEXT_POS.y}% + 40px)` }}
        >
          <h3 className="intro-values__center-name">{current.name}</h3>
          <p className="intro-values__center-desc">{current.desc}</p>
        </div>

        {/* 5 icon — vị trí lấy từ NODE_POSITIONS */}
        <div className="intro-values__nodes">
          {VALUES.map((v, i) => {
            const pos = NODE_POSITIONS[i] ?? { x: 50, y: 50 }
            // Label giữ baseline ngang, lệch NGƯỢC với vị trí icon (về phía trong cung):
            //   - icon trái cung  → label dịch sang phải
            //   - icon đỉnh       → label ở giữa
            //   - icon phải cung  → label dịch sang trái
            //   Hệ số 2.5 → ±49px ở hai đầu cung
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
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
