import { useEffect, useRef, useState } from 'react'
import bg from '../../../assets/images/intro/bg/managers.png'
import m1 from '../../../assets/images/intro/managers/mgr-1.png'
import m2 from '../../../assets/images/intro/managers/mgr-2.png'
import m3 from '../../../assets/images/intro/managers/mgr-3.png'
import m4 from '../../../assets/images/intro/managers/mgr-4.png'
import m5 from '../../../assets/images/intro/managers/mgr-5.png'
import m6 from '../../../assets/images/intro/managers/mgr-6.png'
import m7 from '../../../assets/images/intro/managers/mgr-7.png'
import m8 from '../../../assets/images/intro/managers/mgr-8.png'
import m9 from '../../../assets/images/intro/managers/mgr-9.png'
import m10 from '../../../assets/images/intro/managers/mgr-10.png'

const MANAGERS = [
  { name: 'TRẦN NGỌC ĐỨC', role: 'Giám đốc Khối Kỹ thuật', img: m1 },
  { name: 'NGUYỄN QUỐC MINH HUY', role: 'Trưởng Phòng Đấu thầu Thiết kế', img: m2 },
  { name: 'DƯƠNG HOÀNG GIANG', role: 'Trưởng Ban HSSE', img: m3 },
  { name: 'VÕ THANH CANG', role: 'Giám đốc Khối Cơ Điện', img: m4 },
  { name: 'TÔ VĂN THẮNG', role: 'Giám đốc Kinh tế', img: m5 },
  { name: 'LÊ ĐỨC TRÚC QUỲNH', role: 'Trưởng Phòng Đấu thầu Cơ Điện', img: m6 },
  { name: 'NGUYỄN TRẦN NHỰT QUANG', role: 'Trưởng Phòng Thiết bị', img: m7 },
  { name: 'NGUYỄN TRƯỜNG DUY', role: 'Giám đốc Thi công', img: m8 },
  { name: 'NGUYỄN NGỌC TÙNG', role: 'Trưởng Phòng Kế toán', img: m9 },
  { name: 'LÊ QUỐC VIỆT', role: 'Trưởng phòng CCM', img: m10 },
]

const CARD_W = 210
const GAP = 24

export default function IntroManagers() {
  const [page, setPage] = useState(0)
  const [perView, setPerView] = useState(5)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 640) setPerView(2)
      else if (w < 900) setPerView(3)
      else if (w < 1280) setPerView(4)
      else setPerView(5)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxPage = Math.max(0, Math.ceil(MANAGERS.length / perView) - 1)
  const clampPage = Math.min(page, maxPage)
  const offset = clampPage * perView * (CARD_W + GAP)

  return (
    <section className="intro-sec intro-managers">
      <div
        className="intro-sec__bg intro-managers__bg"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="intro-container">
        <div className="intro-managers__head">
          <h2 className="intro-title">
            CÁN BỘ <strong>QUẢN LÝ</strong>
          </h2>
          <p className="intro-lead">
            Chúng tôi tin rằng tinh thần đoàn kết của đội ngũ nhân lực giàu kinh nghiệm, sự cải
            tiến liên tục trong hoạt động thi công, việc nắm bắt nhu cầu thị trường xây dựng và
            khả năng đáp ứng linh hoạt các yêu cầu của khách hàng sẽ giúp Newtecons phát triển
            hơn nữa.
          </p>
        </div>
        <div className="intro-managers__viewport">
          <div
            className="intro-managers__track"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {MANAGERS.map((m) => (
              <article className="intro-managers__card" key={m.name}>
                <div className="intro-managers__img">
                  <img src={m.img} alt={m.name} loading="lazy" />
                </div>
                <div className="intro-managers__meta">
                  <div className="intro-managers__name">{m.name}</div>
                  <div className="intro-managers__role">{m.role}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="intro-managers__controls">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={clampPage === 0}
            aria-label="Trước"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
            disabled={clampPage === maxPage}
            aria-label="Tiếp"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
