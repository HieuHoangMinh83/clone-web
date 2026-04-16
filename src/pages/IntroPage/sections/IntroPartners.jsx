import bg from '../../../assets/images/intro/bg/partners.png'

const logos = import.meta.glob(
  '../../../assets/images/intro/partners/logo-*.png',
  { eager: true, import: 'default' },
)
const LOGOS = Object.entries(logos)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src)
  .slice(0, 12)

export default function IntroPartners() {
  return (
    <section className="intro-sec intro-partners">
      <div
        className="intro-sec__bg intro-partners__bg"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="intro-container">
        <div className="intro-partners__head">
          <h2 className="intro-title">
            <strong>KHÁCH HÀNG</strong> & <strong>ĐỐI TÁC</strong>
          </h2>
          <p className="intro-lead intro-lead--light">
            Bằng chuẩn mực “Build on trust”, Newtecons lấy uy tín làm nền móng cho những công
            trình, luôn giữ vững cam kết, đem lại cho khách hàng, đối tác. Newtecons nỗ lực xây
            dựng mối quan hệ bền vững với các đối tác và khách hàng trong và ngoài nước, là
            tiền đề để vươn xa tới các quốc gia khác trong khu vực và trên thế giới.
          </p>
        </div>

        <figure className="intro-partners__testimonial">
          <div className="intro-partners__quote-mark">“</div>
          <div className="intro-partners__quote-body">
            <p>
              Với sự hợp tác tốt đẹp ở những dự án trước đây giữa Newtecons và Masterise Homes,
              cùng nền tảng kinh nghiệm triển khai các dự án quy mô lớn, sự am hiểu tiêu chuẩn
              khắt khe của những dự án đẳng cấp quốc tế, tôi tin rằng Newtecons sẽ quản lý, điều
              hành dự án đạt an toàn, chất lượng và tiến độ.
            </p>
            <figcaption>
              <div className="intro-partners__quote-attr">Ông Jason Turnbull</div>
              <div className="intro-partners__quote-role">
                Phó TGĐ kiêm GĐ Tài chính Masterise Homes
              </div>
            </figcaption>
          </div>
        </figure>

        <div className="intro-partners__logos">
          {LOGOS.map((src, i) => (
            <div key={i} className="intro-partners__logo">
              <img src={src} alt={`Đối tác ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
