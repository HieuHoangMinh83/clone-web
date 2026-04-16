import bg from '../../../assets/images/intro/bg/values.png'
import iChinh from '../../../assets/images/intro/icons/value-chinhtruc.png'
import iSang from '../../../assets/images/intro/icons/value-sangtao.png'
import iDoan from '../../../assets/images/intro/icons/value-doanket.png'
import iToiuu from '../../../assets/images/intro/icons/value-toiuu.png'
import iTute from '../../../assets/images/intro/icons/value-tute.png'

const VALUES = [
  {
    key: 'sangtao',
    name: 'SÁNG TẠO',
    icon: iSang,
    desc: 'Liên tục đổi mới, tìm tòi giải pháp thông minh và hiệu quả cho mọi công trình.',
  },
  {
    key: 'doanket',
    name: 'ĐOÀN KẾT',
    icon: iDoan,
    desc: 'Một đội ngũ — một mục tiêu — cùng nhau vượt qua mọi thử thách.',
  },
  {
    key: 'chinhtruc',
    name: 'CHÍNH TRỰC',
    icon: iChinh,
    desc: 'Chính trực là kim chỉ nam cho từng suy nghĩ, từng hành động của mỗi Người Newtecons.',
    featured: true,
  },
  {
    key: 'toiuu',
    name: 'TỐI ƯU',
    icon: iToiuu,
    desc: 'Tối đa hiệu quả, tối thiểu lãng phí — trong từng công đoạn, từng nguồn lực.',
  },
  {
    key: 'tute',
    name: 'TỬ TẾ',
    icon: iTute,
    desc: 'Tử tế với khách hàng, với đồng đội, với công trình — và với cộng đồng.',
  },
]

export default function IntroValues() {
  return (
    <section className="intro-sec intro-values">
      <div
        className="intro-sec__bg intro-values__bg"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="intro-container">
        <div className="intro-values__head">
          <span className="intro-values__tag">— Văn hoá Newtecons</span>
          <h2 className="intro-values__title">
            GIÁ TRỊ <strong>CỐT LÕI</strong>
          </h2>
          <p className="intro-values__sub">
            Năm giá trị định hình cách Người Newtecons suy nghĩ, hành động và tạo ra giá trị mỗi
            ngày.
          </p>
        </div>

        <div className="intro-values__row">
          {VALUES.map((v, i) => (
            <article
              key={v.key}
              className={`intro-values__card${v.featured ? ' is-featured' : ''}`}
            >
              <div className="intro-values__card-num">0{i + 1}</div>
              <div className="intro-values__card-icon">
                <img src={v.icon} alt="" />
              </div>
              <h3 className="intro-values__card-name">{v.name}</h3>
              <p className="intro-values__card-desc">{v.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
