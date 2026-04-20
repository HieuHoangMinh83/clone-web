import { useEffect, useRef, useState, Fragment } from 'react'
import bg from '../../../assets/images/intro/bg/vision-mission.png'
import iconVision from '../../../assets/images/intro/icons/vision.png'
import iconMission from '../../../assets/images/intro/icons/mission.png'
import './IntroVisionMission.css'

function SplitWords({ text }) {
  const words = text.split(' ')
  return words.map((w, i) => (
    <Fragment key={i}>
      <span className="intro-vm__word" style={{ '--wi': i }}>
        {w}
      </span>
      {i < words.length - 1 ? ' ' : ''}
    </Fragment>
  ))
}

export default function IntroVisionMission() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.15)
      },
      { threshold: [0, 0.15, 0.3, 0.5] }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`intro-sec intro-vm ${inView ? 'is-in' : ''}`}
    >
      <div
        className="intro-sec__bg intro-vm__bg"
        style={{ backgroundImage: `url(${bg})` }}
      />

      <div className="intro-container">
        <div className="intro-vm__grid">
          <article className="intro-vm__col" style={{ '--d': '0.25s' }}>
            <div className="intro-vm__icon">
              <img src={iconVision} alt="" />
            </div>
            <p className="intro-vm__eyebrow">Newtecons</p>
            <h3 className="intro-vm__heading">TẦM NHÌN</h3>
            <span className="intro-vm__line" />
            <p className="intro-vm__text">
              <SplitWords text="Giữ vững vị thế Tổng thầu xây dựng vững mạnh có tiềm lực kinh tế hàng đầu Việt Nam, tiến tới phát triển thành tập đoàn đa ngành lấy xây dựng làm lĩnh vực cốt lõi." />
            </p>
          </article>

          <span className="intro-vm__divider" aria-hidden />

          <article className="intro-vm__col" style={{ '--d': '0.45s' }}>
            <div className="intro-vm__icon">
              <img src={iconMission} alt="" />
            </div>
            <p className="intro-vm__eyebrow">Newtecons</p>
            <h3 className="intro-vm__heading">SỨ MỆNH</h3>
            <span className="intro-vm__line" />
            <p className="intro-vm__text">
              <SplitWords text="Dùng uy tín và chất lượng làm nền móng để dựng xây lên những công trình mang tầm vóc Việt, cam kết đem lại lợi ích cao nhất cho khách hàng, đối tác và người lao động, góp phần phát triển cộng đồng bền vững." />
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
