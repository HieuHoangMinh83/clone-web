import bg from '../../../assets/images/intro/bg/vision-mission.png'
import iconVision from '../../../assets/images/intro/icons/vision.png'
import iconMission from '../../../assets/images/intro/icons/mission.png'

export default function IntroVisionMission() {
  return (
    <section className="intro-sec intro-vm">
      <div
        className="intro-sec__bg intro-vm__bg"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="intro-container">
        <header className="intro-vm__head">
          <span className="intro-vm__tag">— Định hướng</span>
          <h2 className="intro-vm__title">
            <span className="intro-vm__title-soft">TẦM NHÌN</span>
            <span className="intro-vm__title-amp">&amp;</span>
            <span className="intro-vm__title-strong">SỨ MỆNH</span>
          </h2>
        </header>

        <div className="intro-vm__grid">
          <article className="intro-vm__card">
            <span className="intro-vm__num">01</span>
            <div className="intro-vm__icon">
              <img src={iconVision} alt="" />
            </div>
            <p className="intro-vm__eyebrow">Newtecons</p>
            <h3 className="intro-vm__heading">Tầm nhìn</h3>
            <span className="intro-vm__line" />
            <p className="intro-vm__text">
              Giữ vững vị thế Tổng thầu xây dựng vững mạnh có tiềm lực kinh tế hàng đầu Việt
              Nam, tiến tới phát triển thành tập đoàn đa ngành lấy xây dựng làm lĩnh vực cốt
              lõi.
            </p>
          </article>

          <article className="intro-vm__card">
            <span className="intro-vm__num">02</span>
            <div className="intro-vm__icon">
              <img src={iconMission} alt="" />
            </div>
            <p className="intro-vm__eyebrow">Newtecons</p>
            <h3 className="intro-vm__heading">Sứ mệnh</h3>
            <span className="intro-vm__line" />
            <p className="intro-vm__text">
              Dùng uy tín và chất lượng làm nền móng để dựng xây lên những công trình mang tầm
              vóc Việt, cam kết đem lại lợi ích cao nhất cho khách hàng, đối tác và người lao
              động, góp phần phát triển cộng đồng bền vững.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
