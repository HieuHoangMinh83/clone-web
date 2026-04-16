import { useState } from 'react'
import './Projects.css'

const projects = [
  { id: 1, title: 'Sân bay Quốc tế\nLong Thành', cat: 'Hạ tầng' },
  { id: 2, title: 'The Sóng', cat: 'Cao ốc' },
  { id: 3, title: 'Grand Marina,\nSaigon', cat: 'Khu đô thị' },
  { id: 4, title: 'Sora Gardens II', cat: 'Căn hộ cao cấp' },
]

export default function Projects() {
  const [active, setActive] = useState(0)

  return (
    <section id="projects" className="projects section" aria-label="Dự án tiêu biểu">
      <header className="projects__head">
        <p className="projects__eyebrow">Dự án tiêu biểu</p>
        <h2 className="projects__title">CÔNG TRÌNH BIỂU TƯỢNG</h2>
      </header>

      <ul className="projects__rail" style={{ '--count': projects.length }}>
        {projects.map((p, i) => (
          <li
            key={p.id}
            className={`pcard ${i === active ? 'is-active' : ''}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <button className="pcard__hit" aria-label={p.title.replace('\n', ' ')}>
              <div className="pcard__media" aria-hidden>
                <div className="pcard__img" />
                <div className="pcard__shade" />
              </div>
              <div className="pcard__body">
                <span className="pcard__cat">{p.cat}</span>
                <h3 className="pcard__title">
                  {p.title.split('\n').map((line, idx) => (
                    <span key={idx}>
                      {line}
                      {idx === 0 && p.title.includes('\n') && <br />}
                    </span>
                  ))}
                </h3>
                <span className="pcard__more" aria-hidden>
                  Xem chi tiết →
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
