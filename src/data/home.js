// Home page data — tất cả text/ảnh/labels cho HomePage + 4 section components
// (Hero, About, Achievements, Projects). Đổi dự án: chỉ sửa file này.

import banner1 from '../assets/images/hero/banner-main.png'
import banner2 from '../assets/images/hero/cover-web.png'
import imgTower from '../assets/images/about/tower-newtecons.png'
import imgLogo from '../assets/images/about/logo-paper.png'
import bgEngineers from '../assets/images/achievements/bg-engineers.png'
import imgAirport from '../assets/images/projects/airport-long-thanh.jpg'
import imgOneCentral from '../assets/images/projects/one-central-hcm.jpg'
import imgMasteri from '../assets/images/projects/masteri-waterfront.jpg'
import imgGrandbay from '../assets/images/projects/grandbay-halong.jpg'

export const homeData = {
  // HomePage orchestrator config (labels cho indicator, tones, header variant)
  page: {
    sectionLabels: ['Banner', 'Giới thiệu', 'Thành tựu', 'Dự án', 'Tin tức', 'Liên hệ'],
    sectionTones: ['light', 'light', 'paper', 'light', 'paper', 'light'],
    navTransparent: [false, false, false, false, false, false],
  },

  hero: {
    ariaLabel: 'Banner giới thiệu',
    autoplayMs: 7000,
    dotsLabel: 'Chọn slide',
    slides: [
      { id: 1, src: banner1, alt: 'Banner 1' },
      { id: 2, src: banner2, alt: 'Banner 2' },
      { id: 3, src: banner1, alt: 'Banner 3' },
      { id: 4, src: banner2, alt: 'Banner 4' },
      { id: 5, src: banner1, alt: 'Banner 5' },
      { id: 6, src: banner2, alt: 'Banner 6' },
    ],
  },

  about: {
    eyebrow: 'Giới thiệu chung',
    titleTop: 'Giới thiệu',
    brand: 'NEWTECONS',
    tag: 'Build on Trust — Sự tin tưởng của bạn là chuẩn mực cho giá trị của chúng tôi',
    body: 'Bằng nhiệt huyết và tinh thần không ngừng đổi mới, công ty đã vươn mình khẳng định vị thế trên thị trường xây dựng Việt Nam. Với đội ngũ kỹ sư giàu kinh nghiệm cùng cam kết về chất lượng, chúng tôi tiên phong chinh phục những tầm cao mới.',
    cta: { label: 'Về chúng tôi', href: '#' },
    tiles: [
      {
        id: 1,
        titleTop: 'LỊCH SỬ',
        titleBot: 'HÌNH THÀNH',
        img: imgLogo,
        cta: 'Khám phá',
        href: '#',
      },
      {
        id: 2,
        titleTop: 'COMPANY',
        titleBot: 'PROFILE',
        img: imgTower,
        cta: 'Tải hồ sơ',
        href: '#',
      },
    ],
  },

  achievements: {
    bgImage: bgEngineers,
    bgAlt: '',
    quote: [
      ['Cùng', 'nhau', 'chúng', 'tôi', 'kiến', 'tạo'],
      ['nên', 'những', 'công', 'trình', 'biểu', 'tượng'],
    ],
    stats: [
      { prefix: '+', value: 1000, label: 'NHÂN SỰ' },
      { prefix: '', value: 21, label: 'NĂM HOẠT ĐỘNG' },
      { prefix: '+', value: 150, label: 'DỰ ÁN' },
      {
        prefix: '',
        value: 11500,
        suffix: ' tỷ đồng',
        format: 'thousands',
        label: 'TỔNG DOANH THU 2023',
      },
    ],
  },

  projects: {
    ariaLabel: 'Dự án tiêu biểu',
    headerTop: 'CÔNG TRÌNH',
    headerBold: 'BIỂU TƯỢNG',
    ctaLabel: 'Xem tất cả dự án',
    ctaHref: '#',
    moreLabel: 'Xem chi tiết',
    items: [
      { id: 1, title: 'Sân bay Quốc tế\nLong Thành', cat: 'Hạ tầng', img: imgAirport },
      { id: 2, title: 'One Central\nHCM', cat: 'Cao ốc', img: imgOneCentral },
      { id: 3, title: 'Masteri\nWaterfront', cat: 'Khu đô thị', img: imgMasteri },
      { id: 4, title: 'Grand Bay\nHạ Long', cat: 'Nghỉ dưỡng', img: imgGrandbay },
    ],
  },
}
