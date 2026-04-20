// Fields page data — 9 sections (Banner · D&B · Construction · MEP · Safety · HR · Equipment · ISO · Outro)
// Icons (SVG) giữ inline trong components vì là markup, không phải content.

import bannerBg from '../assets/images/fields/figma-header-bg.png'
import dbBg from '../assets/images/projects/landmark-81.jpg'
import consBg from '../assets/images/fields/civil.jpg'
import safeBg from '../assets/images/fields/figma-f3.png'
import outroBg from '../assets/images/fields/figma-f7.png'

export const fieldsData = {
  page: {
    sectionLabels: [
      'Banner',
      'Tổng thầu D&B',
      'Xây dựng',
      'Cơ điện',
      'An toàn',
      'Nhân lực',
      'Thiết bị',
      'ISO',
      'Liên hệ',
    ],
    sectionTones: ['light', 'light', 'light', 'light', 'light', 'light', 'light', 'paper', 'light'],
    navTransparent: [false, false, false, false, false, false, false, false, false],
  },

  banner: {
    bg: bannerBg,
    ariaLabel: 'Lĩnh vực hoạt động',
    markerNum: '01',
    markerTotal: '/09',
    titleTop: 'Lĩnh vực',
    titleBot: 'hoạt động',
    subtitle:
      'Tám trụ cột năng lực — từ tổng thầu D&B, xây dựng dân dụng & công nghiệp, cơ điện thông minh đến văn hoá an toàn và hệ thống quản trị quốc tế.',
  },

  db: {
    bg: dbBg,
    ariaLabel: 'Tổng thầu D&B',
    markerNum: '02',
    markerTotal: '/09',
    titleTop: 'TỔNG THẦU D&B',
    titleBot: 'XÂY DỰNG & CƠ ĐIỆN',
    lede:
      'Thiết kế và Thi công (D&B) là mô hình tiên tiến được nhiều nhà thầu lớn trên thế giới áp dụng. Với quy mô lớn và phức tạp, D&B đòi hỏi sự phối hợp nhịp nhàng giữa thiết kế và thi công, xây dựng và cơ điện. Newtecons đáp ứng những yêu cầu đó — thành viên Hội đồng Công trình Xanh Việt Nam, giàu kinh nghiệm với các dự án đạt tiêu chuẩn LEED (Mỹ), LOTUS (Việt Nam).',
    ledeStrongs: ['LEED (Mỹ)', 'LOTUS (Việt Nam)'],
    headline: {
      text: 'Với mô hình D&B, Newtecons giúp Chủ đầu tư',
      highlights: ['giảm 30% thời gian', '10–15% chi phí'],
      join: 'và',
    },
    benefits: [
      { k: '01', title: 'Tiết kiệm thời gian', desc: 'Hạn chế các thay đổi phát sinh, đảm bảo vận hành ăn ý theo yêu cầu CĐT và các tiêu chuẩn, quy chuẩn hiện hành.' },
      { k: '02', title: 'Tối ưu vốn đầu tư', desc: 'Mang tới nhiều giải pháp xử lý công việc với duy nhất một đầu mối giúp tối ưu hoá chi phí và tăng hiệu quả kiểm soát dự án.' },
      { k: '03', title: 'Chủ động thiết kế & tiến độ', desc: 'Giảm những công đoạn, thời gian chờ khi phải phân chia và điều phối nhiều gói thầu nhỏ gây ảnh hưởng tới tiến độ chung.' },
      { k: '04', title: 'Đảm bảo chất lượng', desc: 'Tăng tính ràng buộc trách nhiệm chặt chẽ giữa Thiết kế và Thi công, giữa Xây dựng và Cơ điện — tối đa hoá hiệu quả dự án.' },
    ],
  },

  construction: {
    bg: consBg,
    ariaLabel: 'Tổng thầu thi công xây dựng',
    markerNum: '03',
    markerTotal: '/09',
    badge: 'Civil Construction',
    dimStart: '0',
    dimEnd: '200+ dự án',
    titleTop: 'Vững chắc',
    titleBot: 'từ móng đến mái',
    titleEm: 'móng đến mái',
    lede:
      'Đảm nhận toàn bộ phần móng, kết cấu hầm, thân nhà, hoàn thiện và hạ tầng cảnh quan — từ tầng hầm sâu nhất đến mái vòm cao nhất.',
    strengths: [
      { title: 'Đội ngũ chuyên gia', desc: 'Kỹ sư tinh nhuệ với kinh nghiệm thi công các công trình quy mô và độ phức tạp cao.' },
      { title: 'Tư vấn giải pháp chuyên sâu', desc: 'Đề xuất phương án tối ưu vật liệu, biện pháp thi công và tiến độ ngay từ giai đoạn thiết kế.' },
      { title: 'Đáp ứng kỹ thuật khắt khe', desc: 'Đạt các yêu cầu kỹ thuật khắt khe về kết cấu, cơ điện và hoàn thiện cho công trình hạng A.' },
      { title: 'Quản lý tinh gọn', desc: 'Mô hình quản lý dự án tinh gọn, kiểm soát chặt chi phí — chất lượng — an toàn.' },
    ],
  },

  mep: {
    ariaLabel: 'Tổng thầu thi công cơ điện',
    markerNum: '04',
    markerTotal: '/09',
    coreLabel: 'M&E',
    titleTop: 'Hệ M&E',
    titleBot: 'vận hành thông minh',
    titleEm: 'thông minh',
    lede:
      'Gần hai thập kỷ thiết kế, cung cấp vật tư, thi công và bảo trì các hệ thống cơ điện cho công trình dân dụng & công nghiệp — vận hành ổn định, tiết kiệm năng lượng.',
    specialties: [
      { title: 'Hệ thống điện & điện nhẹ', hint: 'Trung – hạ thế · trạm biến áp · điện nhẹ' },
      { title: 'Điều hoà không khí & thông gió', hint: 'HVAC · phòng sạch · hút ẩm' },
      { title: 'Cấp thoát nước', hint: 'Cấp nước sinh hoạt · xử lý nước thải' },
      { title: 'Phòng cháy chữa cháy', hint: 'Sprinkler · báo cháy · chữa khí' },
      { title: 'Hệ thống phụ trợ', hint: 'Khí nén · gas · nồi hơi · RO' },
    ],
    standardsLabel: 'Tiêu chuẩn',
    standards: ['IEC', 'NFPA', 'UL/FM', 'SMACNA'],
    techLabel: 'Công nghệ',
    tech: ['BIM · Revit', 'VR Walkthrough'],
  },

  safety: {
    bg: safeBg,
    ariaLabel: 'Văn hoá an toàn',
    markerNum: '05',
    markerTotal: '/09',
    titleTop: 'Hai điều',
    titleBot: 'không thoả hiệp',
    titleEm: 'thoả hiệp',
    pullAccents: ['Chất lượng', 'An toàn'],
    pullTail: '— hai trụ cột Newtecons không bao giờ đánh đổi.',
    lede: 'Mọi quyết định thi công của chúng tôi đều được cân nhắc trên hai trụ cột này — bất kể tiến độ hay áp lực ngân sách.',
    stats: [
      { num: '1.000.000+', unit: 'giờ công an toàn', sub: 'Lũy kế toàn hệ thống' },
      { num: '0', unit: 'LTI', sub: 'Lost Time Injury · 12 tháng' },
      { num: '200+', unit: 'dự án zero accident', sub: 'Bàn giao trong 5 năm gần nhất' },
    ],
    commitments: [
      { k: '01', title: 'Huấn luyện trước dự án', desc: 'Đào tạo an toàn lao động bắt buộc cho toàn bộ kỹ sư & công nhân trước khi vào công trường.' },
      { k: '02', title: 'Đánh giá rủi ro HIRA', desc: 'Phân tích, nhận diện và kiểm soát các rủi ro tiềm ẩn theo quy trình HIRA chặt chẽ.' },
      { k: '03', title: 'Sơ cấp cứu định kỳ', desc: 'Bồi dưỡng sơ cấp cứu định kỳ — trang bị thiết bị y tế tại tất cả công trường.' },
      { k: '04', title: 'Giám sát HSSE 24/7', desc: 'Đội ngũ HSSE hiện diện toàn thời gian, audit ngẫu nhiên — báo cáo trực tiếp ban lãnh đạo.' },
    ],
    seal: {
      ariaLabel: 'ISO 45001:2018 certified',
      mark: 'ISO',
      label: 'Certified · OH&S',
      name: '45001 : 2018',
      issuer: 'BSI · TÜV · DNV',
    },
  },

  hr: {
    ariaLabel: 'Nguồn nhân lực',
    markerNum: '06',
    markerTotal: '/09',
    titleTop: 'Nơi tài năng',
    titleBot: 'bám rễ.',
    titleEm: 'bám rễ',
    award: {
      ariaLabel: 'HR Asia Best Companies to Work For 2024',
      org: 'HR Asia',
      name: 'Best Companies',
      year: 'to Work For · 2024',
    },
    pullBody: 'Mỗi nhân viên Newtecons coi thành công chung của công ty là sự nghiệp cả đời mình theo đuổi.',
    pullEm: 'sự nghiệp cả đời',
    pullAttr: '— Triết lý nhân sự Newtecons',
    values: [
      { k: 'S', label: 'Sáng tạo' },
      { k: 'Đ', label: 'Đoàn kết' },
      { k: 'C', label: 'Chính trực' },
      { k: 'T', label: 'Tối ưu' },
    ],
    stats: [
      { k: '1.500+', v: 'Thành viên', sub: 'Toàn hệ thống' },
      { k: '20+', v: 'Năm kinh nghiệm', sub: 'Phát triển bền vững' },
      { k: '05', v: 'Quốc gia hoạt động', sub: 'VN · ASEAN · APAC' },
      { k: '04', v: 'Năm liên tiếp HR Asia', sub: 'Best Companies' },
    ],
  },

  equipment: {
    ariaLabel: 'Năng lực thiết bị',
    markerNum: '07',
    markerTotal: '/09',
    titleTop: 'Trang bị',
    titleBot: 'phủ Bắc — Trung — Nam',
    titleEm: 'Bắc — Trung — Nam',
    lede:
      'Đội ngũ thiết bị chuyên dụng và hệ thống kho bãi 3 miền — sẵn sàng huy động trong 24h cho các dự án trải dài cả nước.',
    items: [
      { name: 'Cẩu tháp', tag: '50t · 200m' },
      { name: 'Vận thăng', tag: '2.000kg · 150m' },
      { name: 'Coffa nhôm', tag: 'Aluform · 350 bộ' },
      { name: 'Giàn giáo', tag: 'Khung Hàn Quốc' },
      { name: 'Ringlock', tag: '40.000m² hệ' },
      { name: 'Cẩu tháp leo lõi', tag: 'Topkit · 80m' },
      { name: 'Hoist lồng lớn', tag: '3.200kg lồng đôi' },
      { name: 'Coffa trượt', tag: 'Slip-form · 24/7' },
    ],
    mapHeadLabel: 'Hệ thống kho · 03 vùng',
    mapHeadSum: '36.000m² · sẵn sàng 24h',
    mapFootK: '24',
    mapFootKUnit: 'h',
    mapFootV: 'huy động toàn quốc',
    mapAriaLabel: 'Vị trí kho bãi',
  },

  iso: {
    ariaLabel: 'Hệ thống quản lý',
    markerNum: '08',
    markerTotal: '/09',
    titleTop: 'Tuân thủ chuẩn',
    titleBot: 'quốc tế.',
    titleEm: 'quốc tế',
    lede: 'Ba chứng nhận ISO chính — nền tảng quản trị xuyên suốt mọi dự án Newtecons triển khai theo vòng cải tiến liên tục PDCA.',
    certs: [
      { num: '9001', year: '2015', name: 'Quản lý chất lượng', desc: 'Hệ thống quản lý chất lượng xuyên suốt từ thiết kế, mua sắm, thi công đến bàn giao.', tag: 'Active', tone: 'navy' },
      { num: '14001', year: '2015', name: 'Quản lý môi trường', desc: 'Kiểm soát phát thải, xử lý chất thải xây dựng và bảo vệ hệ sinh thái khu vực dự án.', tag: 'Active', tone: 'green' },
      { num: '45001', year: '2018', name: 'An toàn sức khoẻ', desc: 'Quản lý an toàn lao động & sức khoẻ nghề nghiệp theo chuẩn quốc tế.', tag: 'Active', tone: 'red' },
    ],
    pdcaLabel: 'Chu trình quản trị · PDCA',
    pdcaAriaLabel: 'Chu trình PDCA',
    pillars: [
      { k: '01', label: 'Hoạch định', desc: 'Plan' },
      { k: '02', label: 'Triển khai', desc: 'Do' },
      { k: '03', label: 'Kiểm tra', desc: 'Check' },
      { k: '04', label: 'Cải tiến', desc: 'Act' },
    ],
    footLeftText: 'Cam kết tuân thủ',
    footLeftStrong: 'luật pháp Việt Nam',
    footLeftTail: '& yêu cầu HSSE',
    footRightText: 'Audit định kỳ:',
    footRightStrong: 'BSI · TÜV · DNV',
  },

  outro: {
    bg: outroBg,
    ariaLabel: 'Liên hệ hợp tác',
    markerNum: '09',
    markerTotal: '/09',
    eyebrow: 'SẴN SÀNG ĐỒNG HÀNH',
    titleTop: 'Kiến tạo',
    titleBot: 'giá trị cùng bạn',
    lede: 'Hãy chia sẻ dự án của bạn — đội ngũ Newtecons sẽ tư vấn giải pháp Tổng thầu D&B tối ưu cho tiến độ, ngân sách và chất lượng công trình.',
    ctas: {
      primary: { label: 'Liên hệ hợp tác', href: '/lien-he' },
      secondary: { label: 'Giới thiệu công ty', href: '/gioi-thieu' },
    },
    info: [
      { k: 'Trụ sở', v: 'Newtecons Tower, 96 Phan Đăng Lưu,\nP. Đức Nhuận, TP. HCM' },
      { k: 'Hotline', v: '(+84) 28 3514 6699' },
      { k: 'Email', v: 'tender@newtecons.vn' },
    ],
    footer: '© 2026 Newtecons. All rights reserved.',
  },
}
