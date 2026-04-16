import { useEffect, useRef, useState } from 'react'
import bg from '../../../assets/images/intro/bg/history.png'
import y2003 from '../../../assets/images/intro/history/y2003.png'
import y2009 from '../../../assets/images/intro/history/y2009.png'
import y2011 from '../../../assets/images/intro/history/y2011.png'
import y2012 from '../../../assets/images/intro/history/y2012.png'
import y2014 from '../../../assets/images/intro/history/y2014.png'
import y2015 from '../../../assets/images/intro/history/y2015.png'
import y2016 from '../../../assets/images/intro/history/y2016.png'
import y2017 from '../../../assets/images/intro/history/y2017.png'
import y2018 from '../../../assets/images/intro/history/y2018.png'
import y2019 from '../../../assets/images/intro/history/y2019.png'
import y2020 from '../../../assets/images/intro/history/y2020.png'
import y2021 from '../../../assets/images/intro/history/y2021.png'
import y2022 from '../../../assets/images/intro/history/y2022.png'
import y2023 from '../../../assets/images/intro/history/y2023.png'
import y2024 from '../../../assets/images/intro/history/y2024.png'

const MILESTONES = [
  { year: 2003, img: y2003, desc: 'Thành lập Công ty Cổ phần Đầu tư Xây dựng Địa ốc F.D.C.' },
  { year: 2009, img: y2009, desc: 'Tham gia thi công phức hợp căn hộ cao cấp – trung tâm thương mại, dịch vụ Indochina Plaza Hà Nội; dự án giành 5 giải thưởng của khu vực về thiết kế nội thất và kiến trúc.' },
  { year: 2011, img: y2011, desc: 'Thành lập Khối Chống thấm, chuyên thi công, cung cấp sản phẩm – giải pháp chống thấm cho công trình. Khối Chống thấm thuộc F.D.C là đối tác của nhiều nhà thầu lớn trên cả nước.' },
  { year: 2012, img: y2012, desc: 'F.D.C được các Chủ đầu tư tin tưởng lựa chọn là Tổng thầu cho những công trình trọng điểm như: Phú Mỹ 3, Nhà máy Texhong Ngân Long, Nhà xưởng Jotun,…' },
  { year: 2014, img: y2014, desc: 'Thành lập Khối Nhôm kính, khẳng định thương hiệu qua việc thi công nhiều dự án lớn như: Vinhomes Central Park III, nhà máy Regina Hải Phòng, Big C Hạ Long,…' },
  { year: 2015, img: y2015, desc: 'Thi công tháp CT5 Masteri Thảo Điền, vươn đến dự án đạt doanh số 1,000 tỷ.' },
  { year: 2016, img: y2016, desc: 'Tham gia thi công siêu dự án The Landmark 81. F.D.C phụ trách thi công phần lõi thang máy và kết cấu thép, đây là những hạng mục đòi hỏi kỹ thuật chuyên môn cao nhất của dự án.' },
  { year: 2017, img: y2017, desc: 'Được vinh danh Top 10 Nhà thầu Xây dựng uy tín và Top 500 Doanh nghiệp tăng trưởng nhanh nhất Việt Nam.' },
  { year: 2018, img: y2018, desc: 'Tiếp tục nằm trong bảng xếp hạng Top 10 Nhà thầu Xây dựng uy tín và Top 500 Doanh nghiệp tăng trưởng nhanh nhất Việt Nam; nhận bằng khen của Bộ LĐTB & XH về thành tích An toàn vệ sinh lao động 3 năm liền.' },
  { year: 2019, img: y2019, desc: 'Đổi tên thành Công ty Cổ phần Đầu tư Xây dựng NEWTECONS.' },
  { year: 2020, img: y2020, desc: 'Được vinh danh Top 50 doanh nghiệp tăng trưởng nhanh nhất Việt Nam.' },
  { year: 2021, img: y2021, desc: 'Top 10 Nhà thầu Xây dựng uy tín và Top 50 doanh nghiệp tăng trưởng nhanh nhất VN. Khánh thành tòa nhà Newtecons Tower, đánh dấu một bước ngoặt mới trong tiến trình vươn ra biển lớn.' },
  { year: 2022, img: y2022, desc: 'Tăng trưởng vượt bậc với doanh thu 11.150 tỷ đồng và được vinh danh Top 10 Nhà thầu Xây dựng Việt Nam.' },
  { year: 2023, img: y2023, desc: 'Thắng thầu dự án Sân bay quốc tế Long Thành. Doanh thu vượt mốc 11.500 tỷ đồng.' },
  { year: 2024, img: y2024, desc: 'Thắng thầu thi công hàng loạt dự án quy mô lớn: Lumi Residential, Masteri Cổ Loa, LUMIÈRE Evergreen. Doanh thu đạt mốc 11.870 tỷ đồng.' },
]

const GAP = 24
const CARD_W = 260

export default function IntroHistory() {
  const [page, setPage] = useState(0)
  const trackRef = useRef(null)
  const [perView, setPerView] = useState(4)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 640) setPerView(1)
      else if (w < 1024) setPerView(2)
      else if (w < 1280) setPerView(3)
      else setPerView(4)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxPage = Math.max(0, Math.ceil(MILESTONES.length / perView) - 1)
  const clampPage = Math.min(page, maxPage)
  const offset = clampPage * perView * (CARD_W + GAP)

  return (
    <section className="intro-sec intro-history">
      <div
        className="intro-sec__bg intro-history__bg"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="intro-container">
        <div className="intro-history__head">
          <h2 className="intro-title">
            <strong>Lịch sử</strong> hình thành
          </h2>
          <p className="intro-lead">
            Công ty Cổ phần Đầu tư Xây dựng NEWTECONS được thành lập vào ngày 23/10/2003, là
            một trong những đơn vị uy tín trong lĩnh vực thi công xây dựng với đa dạng các loại
            hình công trình.
          </p>
        </div>
        <div className="intro-history__viewport">
          <div
            ref={trackRef}
            className="intro-history__track"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {MILESTONES.map((m) => (
              <article className="intro-history__item" key={m.year} style={{ flexBasis: `${CARD_W}px` }}>
                <div className="intro-history__img">
                  <img src={m.img} alt={`Cột mốc ${m.year}`} loading="lazy" />
                </div>
                <span className="intro-history__dot" aria-hidden />
                <div className="intro-history__year">{m.year}</div>
                <p className="intro-history__desc">{m.desc}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="intro-history__controls">
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
