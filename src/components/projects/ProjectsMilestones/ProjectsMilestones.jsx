import { useEffect, useRef, useState } from 'react'
import './ProjectsMilestones.css'

const MILESTONES = [
  {
    year: '2004',
    label: 'Khởi đầu',
    title: 'Newtecons thành lập',
    note: 'Từ một nhà thầu phụ khiêm tốn tại TP.HCM.',
  },
  {
    year: '2010',
    label: 'Cao tầng đầu tiên',
    title: 'Bước vào thị trường căn hộ cao cấp',
    note: 'Bàn giao gói thầu cao ốc đầu tiên cho Chủ đầu tư tư nhân.',
  },
  {
    year: '2014',
    label: 'Tổng thầu D&B',
    title: 'Chuyển mình thành Tổng thầu Thiết kế — Thi công',
    note: 'Mô hình D&B cho phép tối ưu tiến độ và chi phí dự án.',
  },
  {
    year: '2018',
    label: 'Landmark',
    title: 'Kết cấu Vinhomes Landmark 81',
    note: 'Góp phần định hình tháp biểu tượng cao nhất Việt Nam.',
  },
  {
    year: '2021',
    label: 'Mở rộng đa ngành',
    title: 'Hoiana · Phú Mỹ · Hoà Lạc',
    note: 'Ghi dấu ở nghỉ dưỡng, công nghiệp và trung tâm R&D.',
  },
  {
    year: '2024',
    label: 'Siêu dự án quốc gia',
    title: 'Long Thành · Grand Marina · Lumière',
    note: 'Đồng hành cùng các công trình trọng điểm quốc gia.',
  },
]

export default function ProjectsMilestones() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className={`prj-sec prj-miles ${inView ? 'is-in' : ''}`}
      aria-labelledby="prj-miles-title"
    >
      <div className="prj-container">
        <header className="prj-miles__head">
          <span className="prj-miles__eyebrow">
            <span className="prj-miles__eyebrow-line" aria-hidden />
            <span>Hành trình · 2004 — 2024</span>
          </span>
          <h2 id="prj-miles-title" className="prj-miles__title">
            Hai thập kỷ <em>kiến tạo</em>
            <span className="prj-miles__title-amp"> &amp; </span>
            <em>thay đổi</em>
          </h2>
          <p className="prj-miles__lead">
            Từ một nhà thầu nhỏ năm 2004, Newtecons bước đi cùng các Chủ đầu tư
            qua mỗi chu kỳ — để mỗi cột mốc dưới đây trở thành một viên gạch
            cho hệ sinh thái Tổng thầu đa ngành hôm nay.
          </p>
        </header>

        <ol className="prj-miles__list">
          {MILESTONES.map((m, i) => (
            <li
              key={m.year}
              className="prj-miles__item"
              style={{ '--i': i }}
            >
              <span className="prj-miles__dot" aria-hidden />
              <span className="prj-miles__year">{m.year}</span>
              <span className="prj-miles__label">{m.label}</span>
              <h3 className="prj-miles__name">{m.title}</h3>
              <p className="prj-miles__note">{m.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
