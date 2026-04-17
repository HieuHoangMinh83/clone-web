import { useEffect, useRef, useState } from 'react'
import bg from '../../../assets/images/intro/bg/chairman.png'
import portrait from '../../../assets/images/intro/chairman-portrait.png'
import './IntroChairman.css'

export default function IntroChairman() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.25)
      },
      { threshold: [0, 0.25, 0.5] }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`intro-sec intro-chairman ${inView ? 'is-in' : ''}`}
    >
      <div
        className="intro-sec__bg"
        style={{
          backgroundImage: `linear-gradient(115deg, rgba(18,62,130,0.88) 0%, rgba(36,110,190,0.82) 55%, rgba(78,170,230,0.72) 100%), url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <span className="intro-chairman__watermark" aria-hidden>
        MESSAGE
      </span>

      <figure className="intro-chairman__photo">
        <img src={portrait} alt="Chủ tịch HĐQT Nguyễn Bá Dương" loading="lazy" />
      </figure>

      <div className="intro-container">
        <div className="intro-chairman__copy">
          <h2 className="intro-chairman__title">
            <span className="intro-chairman__title-soft">THÔNG ĐIỆP</span>
            <span className="intro-chairman__title-strong">CHỦ TỊCH HĐQT</span>
          </h2>
          <div className="intro-chairman__body">
            <p>
              Hơn hai thập kỷ hình thành và phát triển, Newtecons đã kiên cường vượt qua nhiều
              thử thách và tạo dựng vị thế vững chắc của một Tổng thầu Xây dựng hàng đầu Việt
              Nam. Những công trình chúng tôi thực hiện không chỉ là minh chứng cho trình độ kỹ
              thuật, mà còn là biểu tượng cho niềm tự hào, mang đến những giá trị vượt thời gian
              cho khách hàng, đối tác và cho cả cộng đồng, xã hội.
            </p>
            <p>
              Với triết lý <em>"Uy tín – Chuyên nghiệp – Tử tế"</em>, Newtecons sẽ tiếp tục hành
              trình xây dựng những công trình thẩm mỹ và bền vững. Kiên định với những giá trị
              cốt lõi, chúng tôi cùng nhau kiến tạo biểu tượng của niềm tin, của giá trị và của
              tương lai.
            </p>
          </div>
          <div className="intro-chairman__sig">
            <div>
              <div className="intro-chairman__sig-name">NGUYỄN BÁ DƯƠNG</div>
              <div className="intro-chairman__sig-role">Chủ tịch Hội đồng Quản trị</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
