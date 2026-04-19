import { useEffect, useMemo, useRef, useState } from 'react'
import SectionIndicator from '../../components/shared/SectionIndicator/SectionIndicator.jsx'
import Contact from '../../components/shared/Contact/Contact.jsx'
import NewsHero from '../../components/shared/NewsDetail/NewsHero/NewsHero.jsx'
import NewsOpening from '../../components/shared/NewsDetail/NewsOpening/NewsOpening.jsx'
import NewsQuote from '../../components/shared/NewsDetail/NewsQuote/NewsQuote.jsx'
import NewsStats from '../../components/shared/NewsDetail/NewsStats/NewsStats.jsx'
import NewsClosing from '../../components/shared/NewsDetail/NewsClosing/NewsClosing.jsx'
import NewsRelated from '../../components/shared/NewsDetail/NewsRelated/NewsRelated.jsx'
import { FEATURED, NEWS_LIST } from '../../components/news/newsData.js'
import '../NewsPage/NewsDetail.css'
import './NewsBuilder.css'

const STORAGE_KEY = 'nb:draft:v1'

// Nhãn hiển thị chung theo loại block (dùng ở danh sách khối, gallery, showcase…)
const BLOCK_LABEL = {
  hero: 'Ảnh bìa',
  columns: 'Khối văn bản',
  quote: 'Trích dẫn',
  stats: 'Con số',
  related: 'Bài liên quan',
  contact: 'Liên hệ',
}
const BLOCK_DESC = {
  hero: 'Ảnh nền toàn màn hình với tiêu đề và mô tả ngắn — thường đặt đầu bài.',
  columns: 'Nhiều cột văn bản song song, có thể kèm ảnh minh hoạ và thông tin nhanh.',
  quote: 'Câu phát biểu nổi bật của lãnh đạo hoặc nhân vật — nền tối, chữ to.',
  stats: 'Các con số ấn tượng của bài viết, hiển thị dạng lưới 2–4 ô.',
  related: 'Tự động hiển thị 3 bài khác cùng chuyên mục khi xem thật.',
  contact: 'Khối liên hệ chung (form / địa chỉ) đặt cuối bài viết.',
}

// Danh sách các lựa chọn trong picker modal — 1 type có thể có nhiều biến thể
const BLOCK_TYPES = [
  {
    id: 'hero',
    type: 'hero',
    name: 'Ảnh bìa (Hero)',
    desc: BLOCK_DESC.hero,
  },
  {
    id: 'columns',
    type: 'columns',
    name: 'Khối văn bản — 2 cột',
    desc: 'Hai cột văn bản song song có số thứ tự và tiêu đề. Có thể kèm khối facts 4 ô ở dưới (Chủ đầu tư, Vai trò…).',
  },
  {
    id: 'columns-figure',
    type: 'columns',
    variant: 'figure',
    name: 'Khối văn bản + Ảnh minh hoạ',
    desc: 'Bố cục "phần kết" — ảnh minh hoạ lớn bên cạnh 2 cột văn bản. Phù hợp cho nội dung triển khai / cam kết dự án.',
  },
  {
    id: 'quote',
    type: 'quote',
    name: 'Trích dẫn',
    desc: BLOCK_DESC.quote,
  },
  {
    id: 'stats',
    type: 'stats',
    name: 'Con số',
    desc: BLOCK_DESC.stats,
  },
  {
    id: 'related',
    type: 'related',
    name: 'Bài liên quan',
    desc: BLOCK_DESC.related,
  },
  {
    id: 'contact',
    type: 'contact',
    name: 'Liên hệ',
    desc: BLOCK_DESC.contact,
  },
]

// ============================================================
// BLOCK_SCHEMA — mô tả chi tiết thành phần bên trong mỗi khối
// (dùng cho màn xem chi tiết block trong Thư viện mẫu)
// ============================================================
const BLOCK_SCHEMA = {
  hero: {
    summary: 'Khối banner đầu bài, dùng dữ liệu từ mục "Thông tin bài viết".',
    usage: 'Đặt ở đầu bài — chỉ nên có 1 khối Hero cho mỗi bài viết.',
    parts: [
      { label: 'Ảnh nền toàn màn hình', note: 'Dùng URL ảnh bìa (meta.image). Có veil gradient tối dần để chữ nổi.' },
      { label: 'Nhãn chuyên mục • Ngày', note: 'Chữ vàng nhỏ ở trên: category + date.' },
      { label: 'Tiêu đề chính', note: 'Tiêu đề bài viết, cỡ chữ lớn nhất trang.' },
      { label: 'Đoạn dẫn (lead)', note: 'Mô tả ngắn ~1–2 câu, tóm tắt bài viết.' },
      { label: 'Byline', note: 'Tác giả · Thời gian đọc — cỡ chữ nhỏ, màu xám sáng.' },
    ],
  },
  columns: {
    summary: 'Hiển thị 2 cột văn bản song song, có thể kèm ảnh minh hoạ và khối thông tin nhanh (facts).',
    usage: 'Là khối nền tảng cho phần nội dung — có thể dùng nhiều khối columns trong cùng bài.',
    parts: [
      { label: 'Ảnh minh hoạ (tuỳ chọn)', note: 'Đặt trên cùng, max-height 360px, bo góc nhẹ.' },
      { label: 'Các cột (mặc định 2)', note: 'Mỗi cột: Số thứ tự (vàng) · Kicker (viết hoa) · Tiêu đề · Các đoạn văn.' },
      { label: 'Facts (tuỳ chọn)', note: 'Lưới key/value ở cuối khối — VD: Chủ đầu tư, Vai trò, Khởi công...' },
    ],
  },
  quote: {
    summary: 'Khối nền navy, câu trích dẫn nổi bật — thường là phát biểu của lãnh đạo hoặc nhân vật.',
    usage: 'Dùng xen kẽ giữa các khối văn bản để tạo nhịp — không nên dùng quá 1–2 lần/bài.',
    parts: [
      { label: 'Dấu ngoặc kép vàng', note: 'Ký tự " cỡ 80px, màu vàng, đặt ở đầu khối.' },
      { label: 'Nội dung trích dẫn', note: 'Câu phát biểu ngắn gọn, cỡ 20–30px, màu trắng.' },
      { label: 'Gạch vàng + tên/đơn vị', note: 'Đường kẻ vàng 36px + tên người/đơn vị phát biểu.' },
    ],
  },
  stats: {
    summary: 'Lưới 2–4 ô con số ấn tượng — mỗi ô gồm con số, đơn vị và mô tả.',
    usage: 'Tóm tắt quy mô, thành tích, thước đo — nên đặt sau khối bối cảnh.',
    parts: [
      { label: 'Tiêu đề khối (tuỳ chọn)', note: 'VD "Quy mô & tác động" đặt trên lưới.' },
      { label: 'Các ô con số', note: 'Mỗi ô: STT nhỏ · Con số (cỡ lớn, màu navy) · Đơn vị (vàng, nhỏ) · Mô tả.' },
      { label: 'Viền vàng đầu ô', note: 'Mỗi ô có border-top 2px màu vàng — tạo điểm nhấn.' },
    ],
  },
  related: {
    summary: 'Tự động hiển thị 3 bài khác cùng chuyên mục — không có dữ liệu tuỳ chỉnh.',
    usage: 'Nên đặt gần cuối bài, trước khối Liên hệ.',
    parts: [
      { label: 'Nhãn "Bài liên quan"', note: 'Kicker chữ navy, viết hoa, giãn ký tự rộng.' },
      { label: 'Lưới 3 thẻ bài', note: 'Khi render thật sẽ lấy từ newsData — ảnh, tiêu đề, excerpt.' },
    ],
  },
  contact: {
    summary: 'Khối liên hệ chung dùng component <Contact /> — cùng 1 giao diện cho toàn site.',
    usage: 'Thường đặt ở cuối mỗi bài, mở rộng kênh liên lạc cho đọc giả.',
    parts: [
      { label: 'Component chung', note: 'Form + địa chỉ công ty lấy từ config — không cần cấu hình riêng cho bài viết.' },
    ],
  },
}

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

// Tone của SectionIndicator theo loại block đang hiển thị
function slideTone(type) {
  if (type === 'hero') return 'light'
  if (type === 'quote') return 'dark'
  return 'paper'
}

function parseDate(s) {
  const [d, m, y] = (s || '').split('/')
  return { d: d || '', m: m || '', y: y || '' }
}

function authorInitials(name) {
  if (!name) return 'NT'
  const words = name.split(/\s+/).filter(Boolean)
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

function makeBlock(type, variant) {
  const base = { id: uid(), type }
  if (type === 'columns') {
    const isFigure = variant === 'figure'
    return {
      ...base,
      variant: isFigure ? 'figure' : 'plain',
      items: [
        {
          num: '01',
          kicker: isFigure ? 'Triển khai' : 'Mở đầu',
          title: isFigure ? 'Thi công thực địa' : 'Bối cảnh',
          paragraphs: ['Nội dung đoạn văn thứ nhất của cột này...', 'Nội dung đoạn văn thứ hai của cột này...'],
        },
        {
          num: '02',
          kicker: isFigure ? 'Cam kết' : 'Nội dung',
          title: isFigure ? 'Định hướng công ty' : 'Điểm then chốt',
          paragraphs: ['Nội dung đoạn văn thứ nhất của cột này...', 'Nội dung đoạn văn thứ hai của cột này...'],
        },
      ],
      facts: isFigure
        ? []
        : [
            { label: 'Vai trò', value: 'Tổng thầu' },
            { label: 'Phạm vi', value: 'Toàn quốc' },
          ],
      figure: '',
    }
  }
  if (type === 'quote') {
    return { ...base, text: 'Câu trích dẫn ngắn gọn, súc tích...', attribution: 'Ban Tổng Giám đốc' }
  }
  if (type === 'stats') {
    return {
      ...base,
      heading: 'Quy mô & tác động',
      items: [
        { k: '120.000', u: 'm³', v: 'Khối lượng bê tông' },
        { k: '4', u: 'ha', v: 'Diện tích triển khai' },
        { k: '92%', u: '', v: 'Độ hài lòng' },
        { k: '2027', u: '', v: 'Mốc hoàn thành' },
      ],
    }
  }
  return base
}

function defaultDraft() {
  return TEMPLATES[0].build()
}

// ============================================================
// Template gallery — các mẫu đóng gói sẵn để user học theo
// ============================================================
const TEMPLATES = [
  {
    id: 'project-full',
    name: 'Tin dự án (đầy đủ)',
    desc: 'Bố cục 7 khối chuẩn cho một bài dự án lớn — từ Ảnh bìa, bối cảnh, trích dẫn, con số tới cam kết.',
    blocks: ['hero', 'columns', 'quote', 'stats', 'columns', 'related', 'contact'],
    build: () => ({
      meta: {
        title: 'Newtecons trúng thầu gói công tác ngầm siêu dự án Lumière Evergreen',
        excerpt:
          'Ngày 28/12/2024, Newtecons chính thức ký kết hợp đồng Tổng thầu gói công tác ngầm với chủ đầu tư Masterise Homes — tiếp tục khẳng định năng lực triển khai siêu dự án.',
        image: '',
        category: 'Tin dự án',
        date: '28/12/2024',
        author: 'Phòng Truyền thông Newtecons',
        readTime: '6 phút đọc',
      },
      blocks: [
        makeBlock('hero'),
        {
          id: uid(), type: 'columns',
          items: [
            { num: '01', kicker: 'Mở đầu', title: 'Bối cảnh hợp tác', paragraphs: [
              'Newtecons và Masterise Homes bước vào giai đoạn triển khai mới của Lumière Evergreen — cột mốc tiếp nối chuỗi dự án quy mô lớn đã đồng hành.',
              'Việc được lựa chọn thể hiện sự tin tưởng dành cho năng lực quản trị và cam kết tiến độ Newtecons đã xác lập qua nhiều công trình trọng điểm.',
            ] },
            { num: '02', kicker: 'Nội dung', title: 'Phạm vi gói thầu', paragraphs: [
              'Gói thầu bao trùm công tác thi công phần ngầm, kết cấu chính và hệ thống cơ điện đồng bộ — huy động đội chỉ huy trưởng và kỹ sư BIM 5D ngay sau ký kết.',
              'Biện pháp thi công tối ưu dựa trên dữ liệu các gói tương tự, kết hợp tường vây, top-down và ván khuôn leo — thế mạnh đặc trưng.',
            ] },
          ],
          facts: [
            { label: 'Chủ đầu tư', value: 'Masterise Homes' },
            { label: 'Vai trò', value: 'Tổng thầu thi công' },
            { label: 'Khởi công', value: '28/12/2024' },
            { label: 'Địa điểm', value: 'Hà Nội' },
          ],
          figure: '',
        },
        { id: uid(), type: 'quote', text: 'Chúng tôi tiếp nhận mỗi công trình với tâm thế của một tổng thầu chuyên nghiệp — kiểm soát chất lượng, tiến độ và an toàn xuyên suốt quá trình triển khai.', attribution: 'Ban Tổng Giám đốc Newtecons' },
        {
          id: uid(), type: 'stats', heading: 'Quy mô & tác động',
          items: [
            { k: '120.000', u: 'm³', v: 'Khối lượng bê tông dự kiến' },
            { k: '4', u: 'ha', v: 'Diện tích triển khai' },
            { k: '3', u: 'tầng', v: 'Kết cấu phần hầm' },
            { k: 'Q4', u: '2025', v: 'Mốc hoàn thành' },
          ],
        },
        {
          id: uid(), type: 'columns',
          items: [
            { num: '03', kicker: 'Quy mô', title: 'Triển khai thực địa', paragraphs: [
              'Công trường tổ chức theo ba phân kỳ: chuẩn bị mặt bằng, thi công phần ngầm và triển khai kết cấu phần thân — hệ thống an toàn, môi trường, chất lượng đồng bộ ISO 45001:2018.',
            ] },
            { num: '04', kicker: 'Cam kết', title: 'Định hướng của Newtecons', paragraphs: [
              'Với định hướng "Build on Trust", Newtecons cam kết đưa dự án trở thành công trình tiêu biểu về chất lượng, an toàn và tiến độ — củng cố vị thế Tổng thầu hàng đầu.',
            ] },
          ],
          facts: [],
          figure: '',
        },
        makeBlock('related'),
        makeBlock('contact'),
      ],
    }),
  },
  {
    id: 'award',
    name: 'Giải thưởng',
    desc: 'Bố cục gọn, phù hợp tin vinh danh, xếp hạng — nhấn mạnh trích dẫn và các con số ấn tượng.',
    blocks: ['hero', 'quote', 'stats', 'columns', 'related', 'contact'],
    build: () => ({
      meta: {
        title: 'Newtecons đạt Top 10 Nhà thầu Xây dựng uy tín Việt Nam 2024',
        excerpt:
          'Vietnam Report xếp hạng Newtecons Top 10 Nhà thầu Xây dựng uy tín — ghi nhận hành trình tăng trưởng bền vững và chất lượng thi công cam kết.',
        image: '',
        category: 'Giải thưởng',
        date: '12/12/2024',
        author: 'Phòng Truyền thông Newtecons',
        readTime: '3 phút đọc',
      },
      blocks: [
        makeBlock('hero'),
        { id: uid(), type: 'quote', text: 'Giải thưởng là sự ghi nhận cho nỗ lực tập thể. Với chúng tôi, danh hiệu hôm nay là trách nhiệm gìn giữ niềm tin từ ngày mai.', attribution: 'Chủ tịch HĐQT Newtecons' },
        {
          id: uid(), type: 'stats', heading: 'Thước đo ghi nhận',
          items: [
            { k: 'Top 10', u: '2024', v: 'Xếp hạng Nhà thầu uy tín' },
            { k: '45', u: 'điểm', v: 'Năng lực tài chính' },
            { k: '92%', u: '', v: 'Độ hài lòng Chủ đầu tư' },
            { k: '20', u: 'năm', v: 'Hành trình tích luỹ' },
          ],
        },
        {
          id: uid(), type: 'columns',
          items: [
            { num: '01', kicker: 'Tiêu chí', title: 'Thước đo đánh giá', paragraphs: [
              'Hội đồng xét giải đánh giá doanh nghiệp trên các tiêu chí năng lực tài chính, hiệu quả kinh doanh, uy tín truyền thông và mức độ hài lòng của khách hàng.',
            ] },
            { num: '02', kicker: 'Ý nghĩa', title: 'Động lực phía trước', paragraphs: [
              'Giải thưởng không chỉ là sự tôn vinh mà còn là lời nhắc về trách nhiệm gìn giữ chất lượng và niềm tin dành cho thương hiệu Newtecons.',
            ] },
          ],
          facts: [],
          figure: '',
        },
        makeBlock('related'),
        makeBlock('contact'),
      ],
    }),
  },
  {
    id: 'event',
    name: 'Sự kiện nội bộ',
    desc: 'Bố cục cân đối cho sự kiện, lễ kỷ niệm, đào tạo — nhấn mạnh không khí và con số người tham dự.',
    blocks: ['hero', 'columns', 'stats', 'quote', 'related', 'contact'],
    build: () => ({
      meta: {
        title: 'Newtecons tổ chức Ngày hội An toàn vệ sinh lao động 2024',
        excerpt:
          'Ngày hội An toàn được tổ chức đồng loạt tại 18 công trường, huy động hơn 6.000 nhân sự tham gia — thông điệp nhất quán về văn hoá an toàn Newtecons.',
        image: '',
        category: 'Sự kiện',
        date: '18/09/2024',
        author: 'Phòng An toàn Newtecons',
        readTime: '4 phút đọc',
      },
      blocks: [
        makeBlock('hero'),
        {
          id: uid(), type: 'columns',
          items: [
            { num: '01', kicker: 'Mở đầu', title: 'Không khí sự kiện', paragraphs: [
              'Ngày hội quy tụ cán bộ nhân viên, kỹ sư công trường và đại diện đối tác — thể hiện sự chủ động và tinh thần nhất quán mà Công ty luôn duy trì.',
            ] },
            { num: '02', kicker: 'Diễn biến', title: 'Nội dung trọng tâm', paragraphs: [
              'Chương trình bao gồm các phiên trao đổi chuyên môn, trình diễn thực tế và hoạt động gắn kết — tổng hợp vừa nghiệp vụ, vừa đề cao giá trị đội ngũ.',
            ] },
          ],
          facts: [],
          figure: '',
        },
        {
          id: uid(), type: 'stats', heading: 'Quy mô sự kiện',
          items: [
            { k: '18', u: 'công trường', v: 'Tham gia đồng loạt' },
            { k: '6.000+', u: 'người', v: 'Nhân sự tham dự' },
            { k: '12', u: 'phiên', v: 'Chuyên đề & gian trình diễn' },
            { k: '100%', u: '', v: 'Hoàn thành mục tiêu' },
          ],
        },
        { id: uid(), type: 'quote', text: 'Mỗi sự kiện là một dịp để đội ngũ Newtecons cùng nhau nhìn lại, chia sẻ và tiếp thêm năng lượng cho hành trình phía trước.', attribution: 'Ban Truyền thông Newtecons' },
        makeBlock('related'),
        makeBlock('contact'),
      ],
    }),
  },
  {
    id: 'minimal',
    name: 'Tối giản',
    desc: 'Bố cục ngắn — chỉ Ảnh bìa, một khối văn bản và Liên hệ. Phù hợp tin nhanh, thông báo.',
    blocks: ['hero', 'columns', 'contact'],
    build: () => ({
      meta: {
        title: 'Thông báo ngắn từ Newtecons',
        excerpt: 'Đoạn mô tả ngắn, đi thẳng vào vấn đề.',
        image: '',
        category: 'Tin công ty',
        date: '18/04/2026',
        author: 'Phòng Truyền thông',
        readTime: '2 phút đọc',
      },
      blocks: [
        makeBlock('hero'),
        {
          id: uid(), type: 'columns',
          items: [
            { num: '01', kicker: 'Nội dung', title: 'Thông tin chính', paragraphs: [
              'Đoạn văn mô tả trực tiếp sự kiện, thay đổi, hoặc quyết định được công bố.',
              'Đoạn văn thứ hai nếu cần bổ sung bối cảnh hoặc các bước tiếp theo.',
            ] },
          ],
          facts: [],
          figure: '',
        },
        makeBlock('contact'),
      ],
    }),
  },
]

function loadDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultDraft()
    const parsed = JSON.parse(raw)
    if (!parsed.meta || !Array.isArray(parsed.blocks)) return defaultDraft()
    return parsed
  } catch {
    return defaultDraft()
  }
}

export default function NewsBuilder() {
  const [draft, setDraft] = useState(loadDraft)
  const [activeId, setActiveId] = useState(() => draft.blocks[0]?.id || null)
  const [toast, setToast] = useState('')
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [editorOpen, setEditorOpen] = useState(true)
  const [slideIndex, setSlideIndex] = useState(0)
  const [isPortrait, setIsPortrait] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(orientation: portrait) and (max-width: 1023px)').matches,
  )
  const slideIndexRef = useRef(0)
  const slideLockRef = useRef(false)
  const previewRef = useRef(null)
  const totalSlides = draft.blocks.length

  // Theo dõi orientation: màn hình dọc thì dùng scroll thuần, không fullpage
  useEffect(() => {
    const mq = window.matchMedia('(orientation: portrait) and (max-width: 1023px)')
    const onChange = (e) => setIsPortrait(e.matches)
    if (mq.addEventListener) mq.addEventListener('change', onChange)
    else mq.addListener(onChange)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange)
      else mq.removeListener(onChange)
    }
  }, [])

  // Khi editor đóng => bật fullpage scroll cho preview (wheel / key / touch)
  // Bỏ qua nếu đang ở màn hình dọc (scroll thuần)
  useEffect(() => {
    if (editorOpen) return
    if (isPortrait) return
    if (totalSlides === 0) return

    const goTo = (next) => {
      const n = Math.max(0, Math.min(totalSlides - 1, next))
      if (n === slideIndexRef.current) return
      slideIndexRef.current = n
      setSlideIndex(n)
      slideLockRef.current = true
      window.setTimeout(() => {
        slideLockRef.current = false
      }, 900)
    }

    const onWheel = (e) => {
      if (galleryOpen) return
      e.preventDefault()
      if (slideLockRef.current) return
      if (Math.abs(e.deltaY) < 10) return
      goTo(slideIndexRef.current + (e.deltaY > 0 ? 1 : -1))
    }
    const onKey = (e) => {
      if (galleryOpen) return
      if (slideLockRef.current) return
      if (['ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault()
        goTo(slideIndexRef.current + 1)
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        goTo(slideIndexRef.current - 1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        goTo(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goTo(totalSlides - 1)
      }
    }
    let touchStartY = 0
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }
    const onTouchEnd = (e) => {
      if (galleryOpen) return
      if (slideLockRef.current) return
      const dy = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(dy) < 50) return
      goTo(slideIndexRef.current + (dy > 0 ? 1 : -1))
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [editorOpen, galleryOpen, totalSlides, isPortrait])

  // Clamp slideIndex khi số block thay đổi
  useEffect(() => {
    if (totalSlides === 0) {
      slideIndexRef.current = 0
      setSlideIndex(0)
      return
    }
    if (slideIndexRef.current >= totalSlides) {
      const n = totalSlides - 1
      slideIndexRef.current = n
      setSlideIndex(n)
    }
  }, [totalSlides])

  // Khi đóng editor, reset về slide đầu để user bắt đầu từ hero
  useEffect(() => {
    if (!editorOpen) {
      slideIndexRef.current = 0
      setSlideIndex(0)
      if (previewRef.current) previewRef.current.scrollTop = 0
    }
  }, [editorOpen])

  const navigateSlide = (i) => {
    const n = Math.max(0, Math.min(totalSlides - 1, i))
    slideIndexRef.current = n
    setSlideIndex(n)
    slideLockRef.current = true
    window.setTimeout(() => {
      slideLockRef.current = false
    }, 900)
  }

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
    } catch {
      // ignore
    }
  }, [draft])

  const updateMeta = (patch) => setDraft((d) => ({ ...d, meta: { ...d.meta, ...patch } }))

  const updateBlock = (id, patch) =>
    setDraft((d) => ({
      ...d,
      blocks: d.blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    }))

  const addBlock = (type, variant) => {
    const b = makeBlock(type, variant)
    setDraft((d) => ({ ...d, blocks: [...d.blocks, b] }))
    setActiveId(b.id)
  }

  const removeBlock = (id) =>
    setDraft((d) => ({ ...d, blocks: d.blocks.filter((b) => b.id !== id) }))

  const moveBlock = (id, dir) =>
    setDraft((d) => {
      const i = d.blocks.findIndex((b) => b.id === id)
      if (i < 0) return d
      const j = i + dir
      if (j < 0 || j >= d.blocks.length) return d
      const copy = [...d.blocks]
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
      return { ...d, blocks: copy }
    })

  const resetDraft = () => {
    if (!window.confirm('Xoá bản nháp hiện tại và quay về mẫu mặc định?')) return
    const d = defaultDraft()
    setDraft(d)
    setActiveId(d.blocks[0]?.id || null)
  }

  const applyTemplate = (tpl) => {
    if (!window.confirm(`Áp dụng mẫu "${tpl.name}"? Bản nháp hiện tại sẽ bị ghi đè.`)) return
    const d = tpl.build()
    setDraft(d)
    setActiveId(d.blocks[0]?.id || null)
    setGalleryOpen(false)
    flash(`Đã áp dụng mẫu "${tpl.name}"`)
  }

  const exportJSON = async () => {
    const text = JSON.stringify(draft, null, 2)
    try {
      await navigator.clipboard.writeText(text)
      flash('Đã copy JSON vào clipboard')
    } catch {
      window.prompt('Copy JSON bên dưới:', text)
    }
  }

  const flash = (msg) => {
    setToast(msg)
    window.setTimeout(() => setToast(''), 1800)
  }

  return (
    <div className="nb">
      <header className="nb__bar">
        <div className="nb__bar-left">
          <a className="nb__bar-back" href="/tin-tuc">← Tin tức</a>
          <span className="nb__bar-title">Trình thiết kế chi tiết tin tức</span>
        </div>
        <div className="nb__bar-right">
          <a className="nb__bar-btn" href="/tin-tuc-builder/khoi">Thư viện khối</a>
          <button className="nb__bar-btn" onClick={() => setGalleryOpen(true)}>Xem mẫu</button>
          <button className="nb__bar-btn" onClick={resetDraft}>Đặt lại</button>
          <button
            className={`nb__bar-btn ${editorOpen ? 'is-on' : ''}`}
            onClick={() => setEditorOpen((o) => !o)}
            aria-pressed={editorOpen}
          >
            {editorOpen ? 'Ẩn bảng chỉnh sửa' : 'Chỉnh sửa'}
          </button>
          <button className="nb__bar-btn nb__bar-btn--primary" onClick={exportJSON}>
            Xuất JSON
          </button>
        </div>
      </header>

      <div className={`nb__body ${editorOpen ? 'is-editor-open' : ''} ${isPortrait ? 'is-portrait' : ''}`}>
        <main className="nb__preview" ref={previewRef}>
          <Preview draft={draft} slideIndex={editorOpen || isPortrait ? null : slideIndex} />
        </main>

        <aside className="nb__editor" aria-hidden={!editorOpen}>
          <div className="nb__editor-head">
            <span className="nb__editor-title">Bảng chỉnh sửa</span>
            <button
              className="nb__editor-close"
              onClick={() => setEditorOpen(false)}
              aria-label="Đóng bảng chỉnh sửa"
            >
              ×
            </button>
          </div>
          <div className="nb__editor-scroll">
            <MetaEditor meta={draft.meta} onChange={updateMeta} />

            <div className="nb__section">
              <div className="nb__section-head">
                <h3>Các khối nội dung</h3>
                <AddBlockMenu onAdd={addBlock} />
              </div>

              <ul className="nb__blocks">
                {draft.blocks.map((b, i) => (
                  <li key={b.id} className={`nb__block ${activeId === b.id ? 'is-open' : ''}`}>
                    <div className="nb__block-head">
                      <button
                        type="button"
                        className="nb__block-toggle"
                        onClick={() => setActiveId(activeId === b.id ? null : b.id)}
                      >
                        <span className="nb__block-idx">{String(i + 1).padStart(2, '0')}</span>
                        <BlockThumb type={b.type} variant={b.variant} size="sm" />
                        <span className="nb__block-label">
                          {BLOCK_LABEL[b.type]}
                          {b.type === 'columns' && b.variant === 'figure' && (
                            <em className="nb__block-tag"> + ảnh</em>
                          )}
                        </span>
                        <span className="nb__block-chevron" aria-hidden>▾</span>
                      </button>
                      <div className="nb__block-actions">
                        <button onClick={() => moveBlock(b.id, -1)} disabled={i === 0} aria-label="Lên">↑</button>
                        <button
                          onClick={() => moveBlock(b.id, 1)}
                          disabled={i === draft.blocks.length - 1}
                          aria-label="Xuống"
                        >
                          ↓
                        </button>
                        <button
                          onClick={() => removeBlock(b.id)}
                          aria-label="Xoá"
                          className="nb__block-del"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                    {activeId === b.id && (
                      <div className="nb__block-body">
                        <BlockForm block={b} onChange={(patch) => updateBlock(b.id, patch)} />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {!editorOpen && !isPortrait && totalSlides > 0 && (
        <SectionIndicator
          current={slideIndex}
          total={totalSlides}
          onNav={navigateSlide}
          labels={draft.blocks.map((b) => BLOCK_LABEL[b.type])}
          tone={slideTone(draft.blocks[slideIndex]?.type)}
        />
      )}

      {toast && <div className="nb__toast">{toast}</div>}

      {galleryOpen && (
        <TemplateGallery
          templates={TEMPLATES}
          onApply={applyTemplate}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </div>
  )
}

// ============================================================
// Template gallery modal
// ============================================================
function TemplateGallery({ templates, onApply, onClose }) {
  // detail = { template, blockType, index } khi user click 1 khối trong mẫu
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (detail) setDetail(null)
      else onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, detail])

  return (
    <div className="nb-gal" role="dialog" aria-modal="true" aria-label="Thư viện mẫu">
      <div className="nb-gal__backdrop" onClick={onClose} />
      <div className="nb-gal__panel">
        <header className="nb-gal__head">
          {detail ? (
            <div className="nb-gal__head-main">
              <button className="nb-gal__back" onClick={() => setDetail(null)}>
                ← Quay lại danh sách mẫu
              </button>
              <h2>{BLOCK_LABEL[detail.blockType]}</h2>
              <p>
                Khối số {String(detail.index + 1).padStart(2, '0')} trong mẫu
                {' '}<strong>"{detail.template.name}"</strong>.
              </p>
            </div>
          ) : (
            <div className="nb-gal__head-main">
              <h2>Thư viện mẫu</h2>
              <p>Chọn mẫu để áp dụng, hoặc nhấn vào một khối trong mẫu để xem nó gồm những thành phần gì.</p>
            </div>
          )}
          <button className="nb-gal__close" onClick={onClose} aria-label="Đóng">×</button>
        </header>

        {!detail ? (
          <ul className="nb-gal__grid">
            {templates.map((t) => (
              <li key={t.id} className="nb-gal__card">
                <div className="nb-gal__card-body">
                  <h3>{t.name}</h3>
                  <p>{t.desc}</p>
                  <ul className="nb-gal__seq" aria-label="Thứ tự khối — nhấn để xem chi tiết">
                    {t.blocks.map((b, i) => (
                      <li key={i}>
                        <button
                          type="button"
                          className="nb-gal__seq-btn"
                          onClick={() => setDetail({ template: t, blockType: b, index: i })}
                          title={`Xem chi tiết khối ${BLOCK_LABEL[b]}`}
                        >
                          <span className="nb-gal__seq-num">{String(i + 1).padStart(2, '0')}</span>
                          <BlockThumb type={b} size="xs" />
                          <span className="nb-gal__seq-label">{BLOCK_LABEL[b]}</span>
                          <span className="nb-gal__seq-arrow" aria-hidden>›</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <footer className="nb-gal__card-foot">
                  <span className="nb-gal__count">{t.blocks.length} khối</span>
                  <button className="nb-gal__apply" onClick={() => onApply(t)}>
                    Áp dụng mẫu này →
                  </button>
                </footer>
              </li>
            ))}
          </ul>
        ) : (
          <BlockDetailView
            template={detail.template}
            blockType={detail.blockType}
            index={detail.index}
            onJump={(tpl) => onApply(tpl)}
            onSwitchBlock={(i) =>
              setDetail({ template: detail.template, blockType: detail.template.blocks[i], index: i })
            }
          />
        )}
      </div>
    </div>
  )
}

// ============================================================
// Chi tiết 1 khối trong 1 mẫu — hiển thị trong Thư viện mẫu
// ============================================================
function BlockDetailView({ template, blockType, index, onJump, onSwitchBlock }) {
  const schema = BLOCK_SCHEMA[blockType]
  return (
    <div className="nb-gal__detail">
      <aside className="nb-gal__detail-side">
        <div className="nb-gal__detail-meta">
          <span className="nb-gal__detail-kicker">Mẫu</span>
          <strong>{template.name}</strong>
          <p>{template.desc}</p>
        </div>
        <div className="nb-gal__detail-seq">
          <span className="nb-gal__detail-kicker">Tất cả khối trong mẫu</span>
          <ul>
            {template.blocks.map((b, i) => (
              <li key={i}>
                <button
                  type="button"
                  className={`nb-gal__seq-btn ${i === index ? 'is-active' : ''}`}
                  onClick={() => onSwitchBlock(i)}
                >
                  <span className="nb-gal__seq-num">{String(i + 1).padStart(2, '0')}</span>
                  <BlockThumb type={b} size="xs" />
                  <span className="nb-gal__seq-label">{BLOCK_LABEL[b]}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <section className="nb-gal__detail-main">
        <div className="nb-gal__detail-preview">
          <span className="nb-gal__detail-kicker">Bản xem trước</span>
          <div className="nb-gal__detail-thumb">
            <BlockThumb type={blockType} size="md" />
          </div>
          <p className="nb-gal__detail-desc">{BLOCK_DESC[blockType]}</p>
        </div>

        <div className="nb-gal__detail-body">
          <div className="nb-gal__detail-block">
            <span className="nb-gal__detail-kicker">Mô tả ngắn</span>
            <p>{schema.summary}</p>
          </div>

          <div className="nb-gal__detail-block">
            <span className="nb-gal__detail-kicker">Cách dùng</span>
            <p>{schema.usage}</p>
          </div>

          <div className="nb-gal__detail-block">
            <span className="nb-gal__detail-kicker">Thành phần bên trong</span>
            <ul className="nb-gal__parts">
              {schema.parts.map((p, i) => (
                <li key={i}>
                  <span className="nb-gal__parts-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{p.label}</strong>
                    <p>{p.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer className="nb-gal__detail-foot">
          <span className="nb-gal__count">
            Khối {String(index + 1).padStart(2, '0')} / {template.blocks.length} · Mẫu "{template.name}"
          </span>
          <button className="nb-gal__apply" onClick={() => onJump(template)}>
            Áp dụng mẫu này →
          </button>
        </footer>
      </section>
    </div>
  )
}

// ============================================================
// Meta editor
// ============================================================
function MetaEditor({ meta, onChange }) {
  return (
    <div className="nb__section">
      <div className="nb__section-head">
        <h3>Thông tin bài viết</h3>
      </div>
      <div className="nb__form">
        <Field label="Tiêu đề" value={meta.title} onChange={(v) => onChange({ title: v })} />
        <Field
          label="Đoạn mô tả (excerpt)"
          value={meta.excerpt}
          onChange={(v) => onChange({ excerpt: v })}
          textarea
        />
        <Field label="URL ảnh bìa" value={meta.image} onChange={(v) => onChange({ image: v })} placeholder="https://..." />
        <div className="nb__form-row">
          <Field label="Danh mục" value={meta.category} onChange={(v) => onChange({ category: v })} />
          <Field label="Ngày đăng" value={meta.date} onChange={(v) => onChange({ date: v })} placeholder="dd/mm/yyyy" />
        </div>
        <div className="nb__form-row">
          <Field label="Tác giả" value={meta.author} onChange={(v) => onChange({ author: v })} />
          <Field label="Thời gian đọc" value={meta.readTime} onChange={(v) => onChange({ readTime: v })} />
        </div>
      </div>
    </div>
  )
}

// ============================================================
// Add block picker — grid of thumbnail cards in a popover
// ============================================================
function AddBlockMenu({ onAdd }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="nb__add">
      <button className="nb__add-btn" onClick={() => setOpen(true)}>
        + Thêm khối
      </button>
      {open && (
        <div className="nb-pick" role="dialog" aria-modal="true" aria-label="Chọn khối để thêm">
          <div className="nb-pick__backdrop" onClick={() => setOpen(false)} />
          <div className="nb-pick__panel">
            <header className="nb-pick__head">
              <div>
                <span className="nb-pick__kicker">Thêm khối mới</span>
                <h2>Chọn loại khối phù hợp</h2>
                <p>Mỗi khối có một vai trò khác nhau trong bài viết. Nhấn vào một loại để thêm vào cuối bản nháp.</p>
              </div>
              <button className="nb-pick__close" onClick={() => setOpen(false)} aria-label="Đóng">×</button>
            </header>
            <ul className="nb-pick__grid">
              {BLOCK_TYPES.map((t) => (
                <li key={t.id}>
                  <button
                    className="nb-pick__card"
                    onClick={() => {
                      onAdd(t.type, t.variant)
                      setOpen(false)
                    }}
                  >
                    <div className="nb-pick__card-thumb">
                      <BlockMiniPreview type={t.type} variant={t.variant} />
                    </div>
                    <div className="nb-pick__card-text">
                      <h4>{t.name}</h4>
                      <p>{t.desc}</p>
                      <span className="nb-pick__card-cta">Thêm khối này →</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================
// Block thumbnail — preview thu nhỏ của từng loại khối
// ============================================================
function BlockThumb({ type, variant, size = 'md' }) {
  const v = variant || ''
  return (
    <div className={`nb-thumb nb-thumb--${type} nb-thumb--${size} ${v ? `nb-thumb--${type}-${v}` : ''}`} aria-hidden>
      {type === 'hero' && (
        <>
          <div className="nb-thumb__hero-img" />
          <div className="nb-thumb__hero-veil" />
          <div className="nb-thumb__hero-content">
            <span className="nb-thumb__stamp" />
            <span className="nb-thumb__bar nb-thumb__bar--xl" />
            <span className="nb-thumb__bar nb-thumb__bar--md" />
            <span className="nb-thumb__bar nb-thumb__bar--sm" />
          </div>
        </>
      )}
      {type === 'columns' && variant === 'figure' && (
        <div className="nb-thumb__colfig">
          <span className="nb-thumb__fig" aria-hidden />
          <div className="nb-thumb__cols">
            {[0, 1].map((i) => (
              <div key={i} className="nb-thumb__col">
                <span className="nb-thumb__num" />
                <span className="nb-thumb__bar nb-thumb__bar--title" />
                <span className="nb-thumb__bar nb-thumb__bar--full" />
                <span className="nb-thumb__bar nb-thumb__bar--3q" />
              </div>
            ))}
          </div>
        </div>
      )}
      {type === 'columns' && variant !== 'figure' && (
        <div className="nb-thumb__cols">
          {[0, 1].map((i) => (
            <div key={i} className="nb-thumb__col">
              <span className="nb-thumb__num" />
              <span className="nb-thumb__bar nb-thumb__bar--title" />
              <span className="nb-thumb__bar nb-thumb__bar--full" />
              <span className="nb-thumb__bar nb-thumb__bar--full" />
              <span className="nb-thumb__bar nb-thumb__bar--3q" />
            </div>
          ))}
        </div>
      )}
      {type === 'quote' && (
        <div className="nb-thumb__quote">
          <span className="nb-thumb__mark">“</span>
          <span className="nb-thumb__bar nb-thumb__bar--full" />
          <span className="nb-thumb__bar nb-thumb__bar--full" />
          <span className="nb-thumb__bar nb-thumb__bar--half" />
          <span className="nb-thumb__quote-attr" />
        </div>
      )}
      {type === 'stats' && (
        <div className="nb-thumb__stats">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="nb-thumb__stat">
              <span className="nb-thumb__stat-num" />
              <span className="nb-thumb__bar nb-thumb__bar--3q" />
            </div>
          ))}
        </div>
      )}
      {type === 'related' && (
        <div className="nb-thumb__related">
          {[0, 1, 2].map((i) => (
            <div key={i} className="nb-thumb__rel-card">
              <span className="nb-thumb__rel-img" />
              <span className="nb-thumb__bar nb-thumb__bar--full" />
              <span className="nb-thumb__bar nb-thumb__bar--half" />
            </div>
          ))}
        </div>
      )}
      {type === 'contact' && (
        <div className="nb-thumb__contact">
          <div className="nb-thumb__contact-left">
            <span className="nb-thumb__bar nb-thumb__bar--title" />
            <span className="nb-thumb__bar nb-thumb__bar--full" />
            <span className="nb-thumb__bar nb-thumb__bar--3q" />
          </div>
          <div className="nb-thumb__contact-form">
            <span className="nb-thumb__contact-field" />
            <span className="nb-thumb__contact-field" />
            <span className="nb-thumb__contact-btn" />
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================
// Block-specific forms
// ============================================================
function BlockForm({ block, onChange }) {
  if (block.type === 'hero') {
    return <p className="nb__hint">Khối Hero dùng Thông tin bài viết ở trên. Không cần cấu hình thêm.</p>
  }
  if (block.type === 'related' || block.type === 'contact') {
    return (
      <p className="nb__hint">
        Khối {BLOCK_LABEL[block.type]} tự động hiển thị khi render, không có nội dung tuỳ chỉnh.
      </p>
    )
  }
  if (block.type === 'quote') {
    return (
      <div className="nb__form">
        <Field label="Nội dung trích dẫn" value={block.text} onChange={(v) => onChange({ text: v })} textarea />
        <Field label="Người/đơn vị phát biểu" value={block.attribution} onChange={(v) => onChange({ attribution: v })} />
      </div>
    )
  }
  if (block.type === 'stats') {
    return (
      <div className="nb__form">
        <Field label="Tiêu đề (không bắt buộc)" value={block.heading || ''} onChange={(v) => onChange({ heading: v })} />
        <ListEditor
          label="Danh sách con số"
          items={block.items}
          onChange={(items) => onChange({ items })}
          fields={[
            { key: 'k', label: 'Số' },
            { key: 'u', label: 'Đơn vị' },
            { key: 'v', label: 'Mô tả' },
          ]}
          empty={{ k: '', u: '', v: '' }}
        />
      </div>
    )
  }
  if (block.type === 'columns') {
    return (
      <div className="nb__form">
        <ColumnsEditor
          items={block.items}
          onChange={(items) => onChange({ items })}
        />
        <div className="nb__divider" />
        <ListEditor
          label="Facts (thông tin nhanh, không bắt buộc)"
          items={block.facts || []}
          onChange={(facts) => onChange({ facts })}
          fields={[
            { key: 'label', label: 'Nhãn' },
            { key: 'value', label: 'Giá trị' },
          ]}
          empty={{ label: '', value: '' }}
        />
        <Field
          label="URL ảnh minh hoạ (không bắt buộc)"
          value={block.figure || ''}
          onChange={(v) => onChange({ figure: v })}
          placeholder="https://..."
        />
      </div>
    )
  }
  return null
}

function ColumnsEditor({ items, onChange }) {
  const update = (i, patch) => onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)))
  const add = () => onChange([...items, { num: String(items.length + 1).padStart(2, '0'), kicker: '', title: '', paragraphs: [''] }])
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i))
  const move = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const copy = [...items]
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
    onChange(copy)
  }
  return (
    <div className="nb__cols-edit">
      <div className="nb__list-head">
        <span>Các cột ({items.length})</span>
        <button onClick={add} className="nb__list-add">+ Thêm cột</button>
      </div>
      {items.map((it, i) => (
        <div key={i} className="nb__col-card">
          <div className="nb__col-card-head">
            <span>Cột {i + 1}</span>
            <div className="nb__block-actions">
              <button onClick={() => move(i, -1)} disabled={i === 0}>↑</button>
              <button onClick={() => move(i, 1)} disabled={i === items.length - 1}>↓</button>
              <button onClick={() => remove(i)} className="nb__block-del">×</button>
            </div>
          </div>
          <div className="nb__form-row">
            <Field label="Số (num)" value={it.num} onChange={(v) => update(i, { num: v })} />
            <Field label="Kicker" value={it.kicker} onChange={(v) => update(i, { kicker: v })} />
          </div>
          <Field label="Tiêu đề" value={it.title} onChange={(v) => update(i, { title: v })} />
          <ParagraphsEditor
            paragraphs={it.paragraphs}
            onChange={(paragraphs) => update(i, { paragraphs })}
          />
        </div>
      ))}
    </div>
  )
}

function ParagraphsEditor({ paragraphs, onChange }) {
  const update = (i, v) => onChange(paragraphs.map((p, idx) => (idx === i ? v : p)))
  const add = () => onChange([...paragraphs, ''])
  const remove = (i) => onChange(paragraphs.filter((_, idx) => idx !== i))
  return (
    <div className="nb__paras">
      <div className="nb__list-head">
        <span>Đoạn văn ({paragraphs.length})</span>
        <button onClick={add} className="nb__list-add">+ Thêm đoạn</button>
      </div>
      {paragraphs.map((p, i) => (
        <div key={i} className="nb__para-row">
          <textarea
            rows={3}
            value={p}
            onChange={(e) => update(i, e.target.value)}
            placeholder="Nội dung đoạn văn..."
          />
          <button onClick={() => remove(i)} className="nb__block-del" aria-label="Xoá đoạn">×</button>
        </div>
      ))}
    </div>
  )
}

function ListEditor({ label, items, onChange, fields, empty }) {
  const update = (i, patch) => onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)))
  const add = () => onChange([...items, { ...empty }])
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i))
  return (
    <div className="nb__list">
      <div className="nb__list-head">
        <span>{label} ({items.length})</span>
        <button onClick={add} className="nb__list-add">+ Thêm</button>
      </div>
      {items.map((it, i) => (
        <div key={i} className="nb__list-row">
          {fields.map((f) => (
            <label key={f.key} className="nb__list-cell">
              <span>{f.label}</span>
              <input
                type="text"
                value={it[f.key] ?? ''}
                onChange={(e) => update(i, { [f.key]: e.target.value })}
              />
            </label>
          ))}
          <button onClick={() => remove(i)} className="nb__block-del" aria-label="Xoá">×</button>
        </div>
      ))}
    </div>
  )
}

function Field({ label, value, onChange, textarea, placeholder }) {
  return (
    <label className="nb__field">
      <span>{label}</span>
      {textarea ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </label>
  )
}

// ============================================================
// Preview renderer
// ============================================================
function Preview({ draft, slideIndex }) {
  const { meta, blocks } = draft
  const isFullpage = slideIndex != null
  const style = isFullpage
    ? { transform: `translateY(calc(-${slideIndex} * (100vh - var(--nb-bar-h))))` }
    : undefined
  return (
    <div className={`nb-prev ${isFullpage ? 'is-fullpage' : ''}`} style={style}>
      {blocks.map((b, i) => (
        <PreviewBlock
          key={b.id}
          block={b}
          meta={meta}
          active={!isFullpage || slideIndex === i}
        />
      ))}
    </div>
  )
}

function PreviewBlock({ block, meta, active }) {
  if (block.type === 'hero') return <PrevHero meta={meta} active={active} />
  if (block.type === 'columns') return <PrevColumns block={block} active={active} />
  if (block.type === 'quote') return <PrevQuote block={block} active={active} />
  if (block.type === 'stats') return <PrevStats block={block} active={active} />
  if (block.type === 'related') return <PrevRelated active={active} />
  if (block.type === 'contact') return <PrevContact />
  return null
}

function PrevHero({ meta, active }) {
  return <NewsHero article={meta} active={active} />
}

function PrevColumns({ block, active }) {
  const useFigureLayout = block.variant === 'figure' || !!block.figure
  if (useFigureLayout) {
    return (
      <NewsClosing
        sections={block.items}
        figure={block.figure}
        figureCaption="Hình minh hoạ"
        showShare={false}
        kicker="Phần nội dung"
        heading={<>Chi tiết &amp; <em>triển khai</em></>}
        active={active}
      />
    )
  }
  return (
    <NewsOpening
      sections={block.items}
      facts={block.facts || []}
      kicker="Phần nội dung"
      heading={<>Bối cảnh &amp; <em>chi tiết</em></>}
      subtitle="Các cột văn bản dưới đây mô tả chi tiết ngữ cảnh, nội dung chính của bài viết."
      active={active}
    />
  )
}

function PrevQuote({ block, active }) {
  return <NewsQuote text={block.text} attribution={block.attribution} active={active} />
}

function PrevStats({ block, active }) {
  return <NewsStats items={block.items} heading={block.heading || 'Quy mô & tác động'} active={active} />
}

function PrevRelated({ active }) {
  return <NewsRelated articles={NEWS_LIST.slice(0, 3)} showAll={null} active={active} />
}

function PrevContact() {
  return <Contact />
}

// ============================================================
// BlockMiniPreview — scale xuống THIẾT KẾ THẬT của Prev* components
// bằng transform: scale để hiển thị trong picker modal.
// Nội dung mẫu dùng chính dữ liệu của bài FEATURED (Lumière).
// ============================================================
const SAMPLE_META = {
  title: FEATURED.title,
  excerpt: FEATURED.excerpt,
  image: FEATURED.image,
  category: FEATURED.category,
  date: FEATURED.date,
  author: FEATURED.author,
  readTime: FEATURED.readTime,
}

const SAMPLE_BLOCK = {
  columns: {
    variant: 'plain',
    items: FEATURED.detail.sections.slice(0, 2),
    facts: FEATURED.detail.facts,
    figure: '',
  },
  'columns-figure': {
    variant: 'figure',
    items: FEATURED.detail.sections.slice(2, 4),
    facts: [],
    figure: FEATURED.detail.gallery[1],
  },
  quote: FEATURED.detail.quote,
  stats: {
    heading: 'Quy mô & tác động',
    items: FEATURED.detail.stats,
  },
}

function BlockMiniPreview({ type, variant }) {
  const hostRef = useRef(null)
  const [scale, setScale] = useState(0.2)
  // playKey đổi mỗi lần hover để remount MiniSample → animation .is-in chạy lại
  const [playKey, setPlayKey] = useState(0)

  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    const update = () => {
      const w = el.getBoundingClientRect().width
      if (w > 0) setScale(w / 1440)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const replay = () => setPlayKey((k) => k + 1)

  return (
    <div
      ref={hostRef}
      className="nb-real"
      onMouseEnter={replay}
      onFocus={replay}
      aria-hidden
    >
      <div className="nb-real__stage" style={{ transform: `scale(${scale})` }}>
        <MiniSample key={playKey} type={type} variant={variant} />
      </div>
    </div>
  )
}

function MiniSample({ type, variant }) {
  if (type === 'hero') return <PrevHero meta={SAMPLE_META} />
  if (type === 'columns') {
    const key = variant === 'figure' ? 'columns-figure' : 'columns'
    return <PrevColumns block={{ id: 'sample', type: 'columns', ...SAMPLE_BLOCK[key] }} />
  }
  if (type === 'quote') {
    return <PrevQuote block={{ id: 'sample', type: 'quote', ...SAMPLE_BLOCK.quote }} />
  }
  if (type === 'stats') {
    return <PrevStats block={{ id: 'sample', type: 'stats', ...SAMPLE_BLOCK.stats }} />
  }
  if (type === 'related') return <PrevRelated />
  if (type === 'contact') return <PrevContact />
  return null
}
