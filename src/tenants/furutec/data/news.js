// Furutec — News stub data
// Tạm thời chưa có content news thật. Stub 1 featured + 2 sub article.
// Khi có nội dung thật, thay slug + image + text. NewsFeatured component
// chỉ đọc các field: slug, image, category, date, title, excerpt.

import imgIndoor from '../../../assets/images/furutec/slides/page-11.png'
import imgOutdoor from '../../../assets/images/furutec/slides/page-18.png'
import imgDataCentre from '../../../assets/images/furutec/slides/page-24.png'

export const FURUTEC_FEATURED = {
  slug: 'cot-moc-30-nam-busduct',
  image: imgIndoor,
  category: 'Tin doanh nghiệp',
  date: '15/04/2026',
  title: 'Furutec kỷ niệm 30 năm sản xuất hệ thống busduct, mở rộng thị trường ASEAN',
  excerpt:
    'Hơn 30 năm kinh nghiệm sản xuất và R&D, Furutec Electrical Sdn Bhd tiếp tục mở rộng sự hiện diện tại các thị trường ASEAN với danh mục sản phẩm Compact Sandwich, Cast Resin và i-DC Busduct đạt chuẩn quốc tế IEC 61439-6.',
}

export const FURUTEC_FEATURED_SUB = [
  {
    slug: 'cast-resin-outdoor-application',
    image: imgOutdoor,
    category: 'Sản phẩm',
    date: '22/03/2026',
    title:
      'Cast Resin Busduct — giải pháp cho lắp đặt ngoài trời và môi trường khắc nghiệt',
    excerpt:
      'Cast Resin Busduct đạt IP68, vận hành an toàn dưới mưa nắng trực tiếp mà không cần lắp thêm vỏ bảo vệ.',
  },
  {
    slug: 'i-dc-busduct-data-centre',
    image: imgDataCentre,
    category: 'Sản phẩm',
    date: '08/02/2026',
    title:
      'i-DC Busduct — phân phối điện linh hoạt cho data centre hiện đại',
    excerpt:
      'Cơ chế Turn & Lock cho phép lắp/tháo tap-off unit nhanh, giảm cabling truyền thống và tối ưu tổng chi phí vận hành.',
  },
]
