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

// 🦶 2 CHÂN vòng cung (phải cùng y để đối xứng qua apex.x)
const ARC_LEFT_FOOT  = { x: 29,  y: 100 }
const ARC_RIGHT_FOOT = { x: 71, y: 100 }

// ⛰️ ĐỈNH vòng cung (x nên = giữa 2 chân)
const ARC_APEX       = { x: 50,  y: 57 }

// 🌀 ĐỘ CONG — hệ số tỉ lệ bán trục ellipse (độc lập với feet/apex)
//   = 1 → cung đi CHÍNH XÁC qua 3 điểm feet + apex (mặc định)
//   > 1 → cung phình to hơn theo trục tương ứng (vượt qua feet/apex)
//   < 1 → cung thu vào trong (không chạm feet/apex)
//   Ghi chú: khi ≠ 1, feet + apex chỉ là "khung tham chiếu" — cung sẽ lệch.
const ARC_STRETCH_X = 1     // kéo ngang (độ rộng cung)
const ARC_STRETCH_Y = 1     // kéo dọc   (đỉnh vồng cao/thấp)

// 🔵 5 icon value (theo thứ tự trong values.js — Sáng tạo → Đoàn kết → Chính trực → Tối ưu → Tử tế)
// Các giá trị nằm đúng trên ellipse hiện tại (cx=50, cy=100, rx=21, ry=43)
// Phân bố theo góc tham số t = 160°, 125°, 90°, 55°, 20° (tránh 20° sát chân mỗi bên)
const NODE_POSITIONS = [
  { x: 30.5, y: 85 },  // Sáng tạo    — (t=160°)
  { x: 38, y: 66 },  // Đoàn kết    — (t=125°)
  { x: 50, y: 59 },  // Chính trực  — (t=90°, đỉnh)
  { x: 62, y: 66 },  // Tối ưu      — (t=55°)
  { x: 69.5, y: 85 },  // Tử tế       — (t=20°)
]

/* -------- không cần chỉnh phần dưới: path tự tính từ các giá trị trên --------
   Mô hình: ellipse axis-aligned, tâm = trung điểm 2 chân, chord = trục ngang.
     cx = (left.x + right.x) / 2                       — tâm ngang
     cy = (left.y + right.y) / 2                       — tâm dọc (= đường chord)
     rx = |right.x − cx|  × ARC_STRETCH_X              — bán trục ngang
     ry = (cy − apex.y)   × ARC_STRETCH_Y              — bán trục dọc
   Muốn xem số đo cung hiện tại?  DevTools console → window.__ARC_DEBUG */

const _cx = (ARC_LEFT_FOOT.x + ARC_RIGHT_FOOT.x) / 2
const _cy = (ARC_LEFT_FOOT.y + ARC_RIGHT_FOOT.y) / 2
const _rx = Math.abs(ARC_RIGHT_FOOT.x - _cx) * ARC_STRETCH_X
const _ry = (_cy - ARC_APEX.y) * ARC_STRETCH_Y
const ARC_PATH = `M ${ARC_LEFT_FOOT.x} ${ARC_LEFT_FOOT.y} A ${_rx} ${_ry} 0 1 1 ${ARC_RIGHT_FOOT.x} ${ARC_RIGHT_FOOT.y}`

// Tâm vùng "bowl" bên trong cung — để đặt text value
const CENTER_TEXT_POS = { x: _cx, y: (ARC_APEX.y + _cy) / 2 }

if (typeof window !== 'undefined') {
  window.__ARC_DEBUG = {
    center: { x: _cx, y: _cy },
    rx: _rx,
    ry: _ry,
    aspectRatio: _ry / _rx,   // >1 = nhọn/cao, <1 = bè/dẹt, =1 = bán-tròn
    path: ARC_PATH,
  }
}

const DEFAULT_IDX = VALUES.findIndex((v) => v.featured) ?? 2

export default function IntroValues() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [active, setActive] = useState(DEFAULT_IDX)

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
          style={{ left: `${CENTER_TEXT_POS.x}%`, top: `calc(${CENTER_TEXT_POS.y}% + 10px)` }}
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
