// Furutec — Home page data
// Cấu trúc mirror src/data/home.js (Newtecons) để cùng dùng các section
// component (Hero, About, Achievements, Projects).
// Ảnh tạm là 37 slide PDF render — thay ảnh xịn sau bằng cách đổi import.

// Slide images (PDF render) — alias gọn để dễ thay sau
import slide01 from '../../../assets/images/furutec/slides/page-01.png' // cover EITA + Furutec
import slide03 from '../../../assets/images/furutec/slides/page-03.png' // factory aerial
import slide04 from '../../../assets/images/furutec/slides/page-04.png' // certifications grid
import slide09 from '../../../assets/images/furutec/slides/page-09.png' // busduct overview
import slide11 from '../../../assets/images/furutec/slides/page-11.png' // compact sandwich indoor
import slide12 from '../../../assets/images/furutec/slides/page-12.png' // spec table compact sandwich
import slide18 from '../../../assets/images/furutec/slides/page-18.png' // cast resin outdoor
import slide24 from '../../../assets/images/furutec/slides/page-24.png' // i-DC data centre
import slide28 from '../../../assets/images/furutec/slides/page-28.png' // residential — Riviera/SPlus/Vista
import slide29 from '../../../assets/images/furutec/slides/page-29.png' // residential — Akari/WestGate/ParkCity
import slide32 from '../../../assets/images/furutec/slides/page-32.png' // industrial — Damen/Aristo (2025)
import slide33 from '../../../assets/images/furutec/slides/page-33.png' // industrial — Damen/Sanofi/Aristo (2013)

export const furutecHomeData = {
  page: {
    sectionLabels: ['Banner', 'Giới thiệu', 'Năng lực', 'Dự án', 'Tin tức', 'Liên hệ'],
    sectionTones: ['light', 'light', 'paper', 'light', 'paper', 'light'],
    navTransparent: [false, false, false, false, false, false],
  },

  hero: {
    ariaLabel: 'Banner Furutec Busduct System',
    autoplayMs: 7000,
    dotsLabel: 'Chọn slide',
    slides: [
      { id: 1, src: slide01, alt: 'FURUTEC Busduct System — A member of EITA Resources' },
      { id: 2, src: slide09, alt: 'Tổng quan ứng dụng busduct' },
      { id: 3, src: slide11, alt: 'Compact Sandwich Busduct — lắp đặt trong nhà' },
      { id: 4, src: slide18, alt: 'Cast Resin Busduct — môi trường ngoài trời & khắc nghiệt' },
      { id: 5, src: slide24, alt: 'i-DC Busduct cho Data Centre' },
    ],
  },

  about: {
    eyebrow: 'Giới thiệu chung',
    titleTop: 'Giới thiệu',
    brand: 'FURUTEC',
    tag: 'Busduct System — A member of EITA Resources Berhad',
    body: 'Hơn 30 năm kinh nghiệm sản xuất và R&D hệ thống busduct, FURUTEC Electrical Sdn Bhd thuộc EITA Resources Berhad (niêm yết Bursa Malaysia 2012). Công suất sản xuất trên 20.000 mét/tháng, đạt chuẩn quốc tế IEC 61439-6, UL 857 — được tin dùng tại hơn 20 quốc gia khắp ASEAN, châu Á và Trung Đông.',
    cta: { label: 'Về chúng tôi', href: '/furutec/gioi-thieu' },
    tiles: [
      {
        id: 1,
        titleTop: 'CHỨNG CHỈ',
        titleBot: 'QUỐC TẾ',
        img: slide04,
        cta: 'Xem chi tiết',
        href: '/furutec/gioi-thieu',
      },
      {
        id: 2,
        titleTop: 'CATALOGUE',
        titleBot: 'SẢN PHẨM',
        img: slide12,
        cta: 'Tải catalogue',
        href: '#',
      },
    ],
  },

  achievements: {
    bgImage: slide03,
    bgAlt: '',
    quote: [
      ['Hơn', '30', 'năm', 'làm', 'busduct'],
      ['cho', 'ASEAN', 'và', 'thế', 'giới'],
    ],
    stats: [
      { prefix: '+', value: 30, label: 'NĂM KINH NGHIỆM' },
      {
        prefix: '+',
        value: 20000,
        suffix: ' m/tháng',
        format: 'thousands',
        label: 'CÔNG SUẤT SẢN XUẤT',
      },
      { prefix: '+', value: 20, label: 'QUỐC GIA PHỦ SÓNG' },
      { prefix: '', value: 6300, suffix: 'A', label: 'DÒNG ĐIỆN ĐỊNH MỨC TỐI ĐA' },
    ],
  },

  projects: {
    ariaLabel: 'Dự án tiêu biểu tại Việt Nam',
    headerTop: 'DỰ ÁN',
    headerBold: 'TIÊU BIỂU',
    ctaLabel: 'Xem tất cả dự án',
    ctaHref: '/furutec/du-an',
    moreLabel: 'Xem chi tiết',
    items: [
      { id: 1, title: 'Riviera Point 1C\nHồ Chí Minh', cat: 'Nhà ở (2024)', img: slide28 },
      { id: 2, title: 'Akari City\nHồ Chí Minh', cat: 'Nhà ở (2020)', img: slide29 },
      { id: 3, title: 'Damen Shipyard\nHải Phòng', cat: 'Công nghiệp (2025)', img: slide32 },
      { id: 4, title: 'Sanofi Factory\nHồ Chí Minh', cat: 'Công nghiệp', img: slide33 },
    ],
  },
}
