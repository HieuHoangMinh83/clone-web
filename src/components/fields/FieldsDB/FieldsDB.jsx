import { useEffect, useState } from 'react'
import './FieldsDB.css'

const BENEFITS = [
  {
    k: '01',
    title: 'Tiết kiệm thời gian',
    desc: 'Hạn chế các thay đổi phát sinh, đảm bảo vận hành ăn ý theo yêu cầu CĐT và các tiêu chuẩn, quy chuẩn hiện hành.',
  },
  {
    k: '02',
    title: 'Tối ưu vốn đầu tư',
    desc: 'Mang tới nhiều giải pháp xử lý công việc với duy nhất một đầu mối giúp tối ưu hoá chi phí và tăng hiệu quả kiểm soát dự án.',
  },
  {
    k: '03',
    title: 'Chủ động tiến độ',
    desc: 'Giảm những công đoạn, thời gian chờ khi phải phân chia và điều phối nhiều gói thầu nhỏ gây ảnh hưởng tới tiến độ.',
  },
  {
    k: '04',
    title: 'Đảm bảo chất lượng',
    desc: 'Tăng tính ràng buộc trách nhiệm chặt chẽ giữa Thiết kế & Thi công, Xây dựng & Cơ điện — tối đa hoá hiệu quả dự án.',
  },
]

export default function FieldsDB({ active }) {
  const [mount, setMount] = useState(false)
  useEffect(() => {
    if (active) {
      const t = requestAnimationFrame(() => setMount(true))
      return () => cancelAnimationFrame(t)
    }
  }, [active])

  return (
    <section
      className={`fp-sec fp-db ${mount ? 'is-in' : ''}`}
      aria-label="Tổng thầu D&amp;B"
    >
      <div className="fp-db__bg" aria-hidden>
        <span className="fp-db__grid" />
        <span className="fp-db__orb fp-db__orb--a" />
        <span className="fp-db__orb fp-db__orb--b" />
        <span className="fp-db__watermark">D&amp;B</span>
      </div>

      <div className="fp-db__inner">
        <header className="fp-db__head">
          <span className="fp-db__eyebrow">
            <span className="fp-db__eyebrow-line" />
            TỔNG THẦU D&amp;B
          </span>
          <h2 className="fp-db__title">
            <span className="fp-db__title-mask">
              <span className="fp-db__title-row">Xây dựng</span>
            </span>
            <span className="fp-db__title-mask">
              <span className="fp-db__title-row fp-db__title-row--accent">
                &amp; <em>Cơ điện</em>
              </span>
            </span>
          </h2>
          <p className="fp-db__lede">
            Với mô hình D&amp;B, Newtecons giúp Chủ đầu tư{' '}
            <strong>giảm 30% thời gian</strong> và{' '}
            <strong>10–15% chi phí</strong> — phối hợp nhịp nhàng giữa thiết kế
            và thi công, giữa xây dựng và cơ điện.
          </p>

          <ul className="fp-db__metrics" role="list">
            <li className="fp-db__metric" style={{ '--m': 0 }}>
              <span className="fp-db__metric-k">-30%</span>
              <span className="fp-db__metric-v">Thời gian</span>
            </li>
            <li className="fp-db__metric" style={{ '--m': 1 }}>
              <span className="fp-db__metric-k">-15%</span>
              <span className="fp-db__metric-v">Chi phí</span>
            </li>
            <li className="fp-db__metric" style={{ '--m': 2 }}>
              <span className="fp-db__metric-k">1</span>
              <span className="fp-db__metric-v">Đầu mối</span>
            </li>
          </ul>
        </header>

        <ul className="fp-db__grid-cards" role="list">
          {BENEFITS.map((b, i) => (
            <li
              key={b.k}
              className="fp-db__card"
              style={{ '--i': i }}
            >
              <span className="fp-db__card-num">{b.k}</span>
              <span className="fp-db__card-rule" />
              <h3 className="fp-db__card-title">{b.title}</h3>
              <p className="fp-db__card-desc">{b.desc}</p>
              <span className="fp-db__card-corner" aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
