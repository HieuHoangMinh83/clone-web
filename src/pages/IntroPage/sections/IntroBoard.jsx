import bg from '../../../assets/images/intro/bg/board.png'
import ceo from '../../../assets/images/intro/managers/board-ceo.png'
import b1 from '../../../assets/images/intro/managers/board-1.png'
import b2 from '../../../assets/images/intro/managers/board-2.png'
import b3 from '../../../assets/images/intro/managers/board-3.png'
import b4 from '../../../assets/images/intro/managers/board-4.png'
import b5 from '../../../assets/images/intro/managers/board-5.png'

const DIRECTORS = [
  { name: 'NGUYỄN QUANG THỤY', role: 'Giám đốc Điều hành', img: b1 },
  { name: 'NGÔ ĐÌNH NGỌC QUANG', role: 'Giám đốc Điều hành', img: b2 },
  { name: 'LÊ ĐỨC BỬU', role: 'Giám đốc Điều hành', img: b3 },
  { name: 'ĐỖ NGUYỄN THÀNH NHÂN', role: 'Giám đốc Điều hành', img: b4 },
  { name: 'HÀ TIỂU ANH', role: 'Giám đốc Tài chính', img: b5 },
]

export default function IntroBoard() {
  return (
    <section className="intro-sec intro-board">
      <div
        className="intro-sec__bg intro-board__bg"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="intro-container">
        <div className="intro-board__head">
          <h2 className="intro-title">
            BAN <strong>ĐIỀU HÀNH</strong>
          </h2>
          <div className="intro-board__ceo-wrap">
            <div className="intro-board__ceo-img">
              <img src={ceo} alt="Võ Thanh Liêm" loading="lazy" />
            </div>
            <div className="intro-board__ceo-meta">
              <div className="intro-board__ceo-name">VÕ THANH LIÊM</div>
              <div className="intro-board__ceo-role">Tổng Giám đốc</div>
            </div>
          </div>
        </div>
        <div className="intro-board__row">
          {DIRECTORS.map((d) => (
            <article className="intro-board__card" key={d.name}>
              <div className="intro-board__img">
                <img src={d.img} alt={d.name} loading="lazy" />
              </div>
              <div className="intro-board__meta">
                <div className="intro-board__name">{d.name}</div>
                <div className="intro-board__role">{d.role}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
