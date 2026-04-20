import landmark81 from '../../assets/images/projects/landmark-81.jpg'
import grandMarina from '../../assets/images/projects/grand-marina-saigon.jpg'
import oneCentral from '../../assets/images/projects/one-central-hcm.jpg'
import masteriWaterfront from '../../assets/images/projects/masteri-waterfront.jpg'
import lumiereRiverside from '../../assets/images/projects/lumiere-riverside.jpg'
import grandbayHalong from '../../assets/images/projects/grandbay-halong.jpg'
import flamingoDailai from '../../assets/images/projects/flamingo-dailai.jpg'
import theNine from '../../assets/images/projects/the-nine.jpg'
import floraPanorama from '../../assets/images/projects/flora-panorama.jpg'
import soraGardens from '../../assets/images/projects/sora-gardens.jpg'
import ttCityMillennia from '../../assets/images/projects/tt-city-millennia.jpg'
import khuPhucHopAngiang from '../../assets/images/projects/khu-phuc-hop-angiang.jpg'
import deweySchools from '../../assets/images/projects/dewey-schools.jpg'
import techcombankSaigon from '../../assets/images/projects/techcombank-saigon.jpg'
import ttThuongMaiDakmil from '../../assets/images/projects/ttthuongmai-dakmil.jpg'
import namhoianCasino from '../../assets/images/projects/namhoian-casino.jpg'
import airportLongThanh from '../../assets/images/projects/airport-long-thanh.jpg'
import kcnLongThanh from '../../assets/images/projects/kcn-long-thanh.jpg'
import viettelHoalac from '../../assets/images/projects/viettel-hoalac.jpg'
import bwHaiDuong from '../../assets/images/projects/bw-hai-duong.jpg'
import greenPlanetDc from '../../assets/images/projects/green-planet-dc.jpg'

export const CATEGORIES = [
  { key: 'all', label: 'Tất cả' },
  { key: 'residential', label: 'Nhà ở cao tầng' },
  { key: 'mixed', label: 'Phức hợp' },
  { key: 'commercial', label: 'Thương mại' },
  { key: 'industrial', label: 'Công nghiệp' },
  { key: 'infrastructure', label: 'Hạ tầng' },
]

export const PROJECTS = [
  {
    slug: 'landmark-81',
    image: landmark81,
    category: 'residential',
    categoryLabel: 'Nhà ở cao tầng',
    title: 'Vinhomes Landmark 81',
    client: 'Vingroup',
    location: 'TP. Hồ Chí Minh',
    scale: '81 tầng · 461 m',
    year: '2018',
    role: 'Tổng thầu kết cấu',
    excerpt:
      'Toà tháp biểu tượng cao nhất Việt Nam, Newtecons đảm nhận gói thầu kết cấu phần thân siêu cao tầng.',
    featured: true,
  },
  {
    slug: 'grand-marina-saigon',
    image: grandMarina,
    category: 'mixed',
    categoryLabel: 'Phức hợp',
    title: 'Grand Marina Saigon',
    client: 'Masterise Homes',
    location: 'Quận 1, TP.HCM',
    scale: '4.5 ha · 9 tháp',
    year: '2024',
    role: 'Tổng thầu D&B',
    excerpt:
      'Khu phức hợp thương hiệu Marriott đầu tiên tại Đông Nam Á — Newtecons đảm nhận Tổng thầu thiết kế & thi công.',
    featured: true,
  },
  {
    slug: 'one-central-hcm',
    image: oneCentral,
    category: 'mixed',
    categoryLabel: 'Phức hợp',
    title: 'One Central HCM',
    client: 'Masterise Homes',
    location: 'Quận 1, TP.HCM',
    scale: '8.6 ha · Phức hợp CBD',
    year: '2025',
    role: 'Tổng thầu phần ngầm',
    excerpt:
      'Siêu dự án trung tâm Sài Gòn, Newtecons thi công gói phần ngầm quy mô lớn bậc nhất khu lõi CBD.',
  },
  {
    slug: 'masteri-waterfront',
    image: masteriWaterfront,
    category: 'residential',
    categoryLabel: 'Nhà ở cao tầng',
    title: 'Masteri Waterfront',
    client: 'Masterise Homes',
    location: 'Ocean Park, Hà Nội',
    scale: '3.6 ha · 6 tháp',
    year: '2023',
    role: 'Tổng thầu D&B',
    excerpt:
      'Dự án căn hộ cao cấp ven hồ với tiêu chuẩn hoàn thiện quốc tế, bàn giao đúng tiến độ cho Masterise Homes.',
  },
  {
    slug: 'lumiere-riverside',
    image: lumiereRiverside,
    category: 'residential',
    categoryLabel: 'Nhà ở cao tầng',
    title: 'LUMIÈRE Riverside',
    client: 'Masterise Homes',
    location: 'Thủ Đức, TP.HCM',
    scale: '1.7 ha · 2 tháp',
    year: '2024',
    role: 'Tổng thầu thi công',
    excerpt:
      'Toà căn hộ boutique ven sông Sài Gòn, tiêu chuẩn hoàn thiện sang trọng bậc nhất khu Đông.',
    featured: true,
  },
  {
    slug: 'grandbay-halong',
    image: grandbayHalong,
    category: 'residential',
    categoryLabel: 'Nhà ở cao tầng',
    title: 'Grandbay Hạ Long',
    client: 'BIM Group',
    location: 'Hạ Long, Quảng Ninh',
    scale: '29 ha · 12 tháp',
    year: '2024',
    role: 'Tổng thầu thi công',
    excerpt:
      'Tổ hợp căn hộ nghỉ dưỡng view vịnh Hạ Long — một trong những cụm cao tầng lớn nhất phía Bắc.',
  },
  {
    slug: 'flamingo-dailai',
    image: flamingoDailai,
    category: 'mixed',
    categoryLabel: 'Phức hợp',
    title: 'Flamingo Đại Lải Resort',
    client: 'Flamingo Group',
    location: 'Vĩnh Phúc',
    scale: '123 ha · Resort 5*',
    year: '2022',
    role: 'Tổng thầu hạ tầng',
    excerpt:
      'Tổ hợp resort 5 sao ven hồ Đại Lải, Newtecons đảm nhận gói hạ tầng và nhiều hạng mục chính.',
  },
  {
    slug: 'the-nine',
    image: theNine,
    category: 'residential',
    categoryLabel: 'Nhà ở cao tầng',
    title: 'The Nine Tower',
    client: 'Viet Phat',
    location: 'Cầu Giấy, Hà Nội',
    scale: '32 tầng · 1 tháp',
    year: '2023',
    role: 'Tổng thầu D&B',
    excerpt:
      'Toà tháp văn phòng — căn hộ trung tâm Cầu Giấy, Newtecons triển khai Tổng thầu trọn gói.',
  },
  {
    slug: 'flora-panorama',
    image: floraPanorama,
    category: 'residential',
    categoryLabel: 'Nhà ở cao tầng',
    title: 'Flora Panorama',
    client: 'Nam Long Group',
    location: 'Bình Tân, TP.HCM',
    scale: '2.3 ha · 3 tháp',
    year: '2022',
    role: 'Tổng thầu thi công',
    excerpt:
      'Cụm căn hộ tầm trung với thiết kế tối ưu ánh sáng tự nhiên và không gian xanh panorama.',
  },
  {
    slug: 'sora-gardens',
    image: soraGardens,
    category: 'residential',
    categoryLabel: 'Nhà ở cao tầng',
    title: 'Sora Gardens',
    client: 'Becamex Tokyu',
    location: 'Bình Dương',
    scale: '24 tầng · 2 tháp',
    year: '2021',
    role: 'Tổng thầu thi công',
    excerpt:
      'Dự án hợp tác Việt — Nhật mang phong cách sống Tokyo đến thủ phủ công nghiệp Bình Dương.',
  },
  {
    slug: 'tt-city-millennia',
    image: ttCityMillennia,
    category: 'mixed',
    categoryLabel: 'Phức hợp',
    title: 'T&T City Millennia',
    client: 'T&T Group',
    location: 'Long An',
    scale: '267 ha · Khu đô thị',
    year: '2024',
    role: 'Tổng thầu hạ tầng',
    excerpt:
      'Khu đô thị vệ tinh phía Nam TP.HCM, Newtecons triển khai hạ tầng đồng bộ giai đoạn 1.',
  },
  {
    slug: 'khu-phuc-hop-angiang',
    image: khuPhucHopAngiang,
    category: 'mixed',
    categoryLabel: 'Phức hợp',
    title: 'Khu phức hợp An Giang',
    client: 'T&T Group',
    location: 'Long Xuyên, An Giang',
    scale: '6.8 ha · Phức hợp',
    year: '2023',
    role: 'Tổng thầu thi công',
    excerpt:
      'Phức hợp thương mại — dịch vụ — căn hộ trung tâm Long Xuyên, điểm nhấn mới của Đồng bằng Sông Cửu Long.',
  },
  {
    slug: 'dewey-schools',
    image: deweySchools,
    category: 'commercial',
    categoryLabel: 'Thương mại',
    title: 'Dewey Schools Ocean Park',
    client: 'Dewey Group',
    location: 'Gia Lâm, Hà Nội',
    scale: '2.1 ha · Giáo dục',
    year: '2022',
    role: 'Tổng thầu D&B',
    excerpt:
      'Khuôn viên trường liên cấp chuẩn quốc tế tại Ocean Park, hoàn thành trong 10 tháng thi công.',
  },
  {
    slug: 'techcombank-saigon',
    image: techcombankSaigon,
    category: 'commercial',
    categoryLabel: 'Thương mại',
    title: 'Techcombank Saigon Tower',
    client: 'Techcombank',
    location: 'Quận 1, TP.HCM',
    scale: '40 tầng · Văn phòng',
    year: '2024',
    role: 'Tổng thầu hoàn thiện',
    excerpt:
      'Trụ sở miền Nam Techcombank, Newtecons đảm nhận gói hoàn thiện và cơ điện đồng bộ.',
  },
  {
    slug: 'ttthuongmai-dakmil',
    image: ttThuongMaiDakmil,
    category: 'commercial',
    categoryLabel: 'Thương mại',
    title: 'Trung tâm thương mại Đắk Mil',
    client: 'Vincom Retail',
    location: 'Đắk Nông',
    scale: '1.4 ha · Retail',
    year: '2023',
    role: 'Tổng thầu D&B',
    excerpt:
      'Trung tâm thương mại đầu tiên của khu vực Tây Nguyên, bàn giao trước tiến độ 12 ngày.',
  },
  {
    slug: 'namhoian-casino',
    image: namhoianCasino,
    category: 'mixed',
    categoryLabel: 'Phức hợp',
    title: 'Hoiana Resort & Casino',
    client: 'Suncity Group',
    location: 'Quảng Nam',
    scale: '985 ha · Resort 5*',
    year: '2021',
    role: 'Tổng thầu thi công',
    excerpt:
      'Tổ hợp nghỉ dưỡng và giải trí phức hợp 985 ha ven biển Quảng Nam, Newtecons tham gia nhiều gói thầu chính.',
  },
  {
    slug: 'airport-long-thanh',
    image: airportLongThanh,
    category: 'infrastructure',
    categoryLabel: 'Hạ tầng',
    title: 'Sân bay quốc tế Long Thành',
    client: 'ACV',
    location: 'Đồng Nai',
    scale: 'Giai đoạn 1 · 5.000 ha',
    year: '2024',
    role: 'Liên danh thi công',
    excerpt:
      'Siêu dự án sân bay quốc tế trọng điểm quốc gia, Newtecons tham gia liên danh thi công hạng mục chính.',
    featured: true,
  },
  {
    slug: 'kcn-long-thanh',
    image: kcnLongThanh,
    category: 'industrial',
    categoryLabel: 'Công nghiệp',
    title: 'KCN Long Thành',
    client: 'Sonadezi',
    location: 'Đồng Nai',
    scale: '488 ha · KCN',
    year: '2023',
    role: 'Tổng thầu hạ tầng',
    excerpt:
      'Hạ tầng kỹ thuật khu công nghiệp Long Thành — nền tảng cho chuỗi nhà xưởng FDI phía Nam.',
  },
  {
    slug: 'viettel-hoalac',
    image: viettelHoalac,
    category: 'industrial',
    categoryLabel: 'Công nghiệp',
    title: 'Viettel Hoà Lạc R&D Center',
    client: 'Viettel Group',
    location: 'Hoà Lạc, Hà Nội',
    scale: '11 ha · R&D',
    year: '2024',
    role: 'Tổng thầu D&B',
    excerpt:
      'Trung tâm nghiên cứu & phát triển công nghệ cao của Viettel, chuẩn phòng sạch và cơ điện quốc tế.',
  },
  {
    slug: 'bw-hai-duong',
    image: bwHaiDuong,
    category: 'industrial',
    categoryLabel: 'Công nghiệp',
    title: 'BW Industrial Hải Dương',
    client: 'BW Industrial',
    location: 'Hải Dương',
    scale: '70 ha · Nhà xưởng',
    year: '2024',
    role: 'Tổng thầu thi công',
    excerpt:
      'Cụm nhà xưởng xây sẵn tiêu chuẩn quốc tế, giao mặt bằng theo lịch trình cam kết với nhà đầu tư.',
  },
  {
    slug: 'green-planet-dc',
    image: greenPlanetDc,
    category: 'industrial',
    categoryLabel: 'Công nghiệp',
    title: 'Green Planet Data Center',
    client: 'CMC Telecom',
    location: 'Tân Thuận, TP.HCM',
    scale: 'Tier III · 2.000 rack',
    year: '2024',
    role: 'Tổng thầu MEP',
    excerpt:
      'Trung tâm dữ liệu Tier III với hệ thống cơ điện và làm mát chính xác đạt tiêu chuẩn Uptime Institute.',
  },
]

export const PROJECT_STATS = [
  { k: '120+', v: 'Dự án đã bàn giao' },
  { k: '20', v: 'Năm kinh nghiệm' },
  { k: '45', v: 'Tỉnh/thành triển khai' },
  { k: '6.500+', v: 'Kỹ sư & công nhân' },
]

// ============================================================
// Detail content builder — synthesize rich detail for each project
// from base metadata so detail page has something meaningful.
// ============================================================

function scopeForCategory(p) {
  switch (p.category) {
    case 'residential':
      return [
        { title: 'Phần ngầm & kết cấu', note: 'Tường vây, top-down, sàn bê tông ứng lực trước.' },
        { title: 'Kết cấu phần thân', note: 'Ván khuôn leo, cẩu tháp điều phối, BIM 5D tiến độ.' },
        { title: 'Cơ điện ME', note: 'Hệ HVAC, điện nhẹ, hệ thống PCCC chuẩn quốc tế.' },
        { title: 'Hoàn thiện cao cấp', note: 'Phòng mẫu, vật liệu đá — gỗ cao cấp, bàn giao chìa khóa.' },
      ]
    case 'mixed':
      return [
        { title: 'Phần ngầm đa tầng', note: 'Hầm xe cơ giới, tường vây siêu sâu, hệ chống thấm.' },
        { title: 'Kết cấu phức hợp', note: 'Khối tháp + khối đế podium, kết nối kiến trúc phức tạp.' },
        { title: 'Cơ điện tổng hợp', note: 'HVAC trung tâm, PCCC, BMS quản trị tòa nhà.' },
        { title: 'Hạ tầng ngoài trời', note: 'Cảnh quan, giao thông nội khu, kết nối tiện ích.' },
      ]
    case 'commercial':
      return [
        { title: 'Thiết kế & thi công D&B', note: 'Mô hình D&B tối ưu ngân sách & tiến độ bàn giao.' },
        { title: 'Kết cấu khung thép', note: 'Hệ khung thép nhẹ, dầm mái vượt nhịp lớn.' },
        { title: 'Cơ điện thương mại', note: 'HVAC công suất lớn, hệ đèn retail, âm thanh sự kiện.' },
        { title: 'Hoàn thiện khai trương', note: 'Fit-out cửa hàng, biển hiệu, vận hành open-day.' },
      ]
    case 'industrial':
      return [
        { title: 'Hạ tầng kỹ thuật', note: 'San nền, đường nội bộ, cấp điện trung thế, nước công nghiệp.' },
        { title: 'Nhà xưởng & phòng sạch', note: 'Kết cấu thép nhẹ, sàn epoxy, hệ làm sạch ISO 14644.' },
        { title: 'Cơ điện công nghiệp', note: 'Điện 22kV, khí nén, xử lý nước thải, HVAC precision.' },
        { title: 'Văn phòng điều hành', note: 'Office block, cafeteria, nhà ăn công nhân.' },
      ]
    case 'infrastructure':
      return [
        { title: 'Thi công nền móng', note: 'Cọc khoan nhồi, xử lý nền đất yếu, bệ mố trụ.' },
        { title: 'Kết cấu hạ tầng', note: 'Dầm cầu, mố trụ bê tông cốt thép, mặt đường bê tông.' },
        { title: 'Hệ thống phụ trợ', note: 'Thoát nước, chiếu sáng, an toàn giao thông.' },
        { title: 'Nghiệm thu & bàn giao', note: 'Kiểm định độc lập, hồ sơ hoàn công quốc gia.' },
      ]
    default:
      return []
  }
}

function numbersForCategory(p) {
  const base = [
    { k: p.scale.split(' ')[0] || '—', v: p.scale.split(/\s/).slice(1).join(' ') || 'Quy mô' },
    { k: p.year, v: 'Năm hoàn thành' },
  ]
  switch (p.category) {
    case 'residential':
      return [
        ...base,
        { k: '1.200+', v: 'Kỹ sư & công nhân cao điểm' },
        { k: '28', v: 'Tháng thi công' },
      ]
    case 'mixed':
      return [
        ...base,
        { k: '3.500+', v: 'Nhân sự cao điểm' },
        { k: '42', v: 'Tháng triển khai' },
      ]
    case 'commercial':
      return [
        ...base,
        { k: '320+', v: 'Nhân sự thi công' },
        { k: '14', v: 'Tháng bàn giao' },
      ]
    case 'industrial':
      return [
        ...base,
        { k: '950+', v: 'Nhân sự thi công' },
        { k: '18', v: 'Tháng bàn giao' },
      ]
    case 'infrastructure':
      return [
        ...base,
        { k: '2.400+', v: 'Nhân sự thi công' },
        { k: '36', v: 'Tháng triển khai' },
      ]
    default:
      return base
  }
}

const QUOTE_POOL = [
  {
    text:
      'Chúng tôi tiếp nhận mỗi công trình với tâm thế của một Tổng thầu chuyên nghiệp — kiểm soát chất lượng, tiến độ và an toàn xuyên suốt quá trình triển khai.',
    by: 'Ban Tổng Giám đốc Newtecons',
  },
  {
    text:
      'Niềm tin của Chủ đầu tư là động lực để đội ngũ Newtecons dồn tâm huyết cho mỗi hạng mục — từ bê tông đầu tiên đến khoảnh khắc bàn giao.',
    by: 'Chỉ huy trưởng Dự án',
  },
  {
    text:
      'Mỗi công trình là một phép thử về sự phối hợp giữa thiết kế, thi công và quản trị — và chúng tôi luôn đi đến cùng cam kết bàn giao đúng hạn.',
    by: 'Giám đốc Điều hành Newtecons',
  },
]

function hashSlug(slug) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return h
}

function buildDetail(p) {
  const seed = hashSlug(p.slug)
  return {
    scope: scopeForCategory(p),
    numbers: numbersForCategory(p),
    quote: QUOTE_POOL[seed % QUOTE_POOL.length],
  }
}

export const PROJECTS_WITH_DETAIL = PROJECTS.map((p) => ({
  ...p,
  detail: buildDetail(p),
}))

export function findProjectBySlug(slug) {
  return PROJECTS_WITH_DETAIL.find((p) => p.slug === slug) || null
}

export function getRelatedProjects(slug, limit = 3) {
  const current = findProjectBySlug(slug)
  if (!current) return PROJECTS_WITH_DETAIL.slice(0, limit)
  const same = PROJECTS_WITH_DETAIL.filter(
    (p) => p.slug !== slug && p.category === current.category,
  )
  const others = PROJECTS_WITH_DETAIL.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  )
  return [...same, ...others].slice(0, limit)
}
