// ============================================================
// Component Registry — nguồn dữ liệu trung tâm của thư viện
// Thêm component mới: import + push 1 object vào COMPONENTS.
// ============================================================

// Shared page stylesheets — nhiều component phụ thuộc vào
// class shell ở page CSS (.news-sec, .rec-sec, .prj-sec...)
// nên cần import để có full styling khi render độc lập.
import '../NewsPage/NewsPage.css'
import '../RecruitPage/RecruitPage.css'
import '../ProjectsPage/ProjectsPage.css'

// Shared
import Contact from '../../components/shared/Contact/Contact.jsx'
import Header from '../../components/shared/Header/Header.jsx'
import LogoMark from '../../components/shared/LogoMark/LogoMark.jsx'
import NewsFeatured from '../../components/shared/NewsFeatured/NewsFeatured.jsx'
import SectionIndicator from '../../components/shared/SectionIndicator/SectionIndicator.jsx'
import { PaginationDemo } from '../../components/shared/Pagination/Pagination.jsx'
import { SearchFilterDemo } from '../../components/shared/SearchFilter/SearchFilter.jsx'

// NewsDetail blocks
import NewsHero from '../../components/shared/NewsDetail/NewsHero/NewsHero.jsx'
import NewsOpening from '../../components/shared/NewsDetail/NewsOpening/NewsOpening.jsx'
import NewsQuote from '../../components/shared/NewsDetail/NewsQuote/NewsQuote.jsx'
import NewsStats from '../../components/shared/NewsDetail/NewsStats/NewsStats.jsx'
import NewsClosing from '../../components/shared/NewsDetail/NewsClosing/NewsClosing.jsx'
import NewsRelated from '../../components/shared/NewsDetail/NewsRelated/NewsRelated.jsx'

// Homepage sections
import HomeHero from '../HomePage/Hero/Hero.jsx'
import HomeAbout from '../HomePage/About/About.jsx'
import HomeFields from '../HomePage/Fields/Fields.jsx'
import HomeProjects from '../HomePage/Projects/Projects.jsx'
import HomeAchievements from '../HomePage/Achievements/Achievements.jsx'
import HomeNews from '../HomePage/News/News.jsx'

// Intro page
import IntroBanner from '../IntroPage/IntroBanner/IntroBanner.jsx'
import IntroVisionMission from '../IntroPage/IntroVisionMission/IntroVisionMission.jsx'
import IntroChairman from '../IntroPage/IntroChairman/IntroChairman.jsx'
import IntroBoard from '../IntroPage/IntroBoard/IntroBoard.jsx'
import IntroManagers from '../IntroPage/IntroManagers/IntroManagers.jsx'
import IntroValues from '../IntroPage/IntroValues/IntroValues.jsx'
import IntroHistory from '../IntroPage/IntroHistory/IntroHistory.jsx'
import IntroPartners from '../IntroPage/IntroPartners/IntroPartners.jsx'

// Fields page
import FieldsBanner from '../../components/fields/FieldsBanner/FieldsBanner.jsx'
import FieldsConstruction from '../../components/fields/FieldsConstruction/FieldsConstruction.jsx'
import FieldsMEP from '../../components/fields/FieldsMEP/FieldsMEP.jsx'
import FieldsEquipment from '../../components/fields/FieldsEquipment/FieldsEquipment.jsx'
import FieldsHR from '../../components/fields/FieldsHR/FieldsHR.jsx'
import FieldsDB from '../../components/fields/FieldsDB/FieldsDB.jsx'
import FieldsSafety from '../../components/fields/FieldsSafety/FieldsSafety.jsx'
import FieldsISO from '../../components/fields/FieldsISO/FieldsISO.jsx'
import FieldsOutro from '../../components/fields/FieldsOutro/FieldsOutro.jsx'

// News page
import NewsBanner from '../../components/news/NewsBanner.jsx'
import NewsGrid from '../../components/news/NewsGrid.jsx'

// Projects page
import ProjectsBanner from '../../components/projects/ProjectsBanner/ProjectsBanner.jsx'
import ProjectsSpotlight from '../../components/projects/ProjectsSpotlight/ProjectsSpotlight.jsx'
import ProjectsGrid from '../../components/projects/ProjectsGrid/ProjectsGrid.jsx'
import ProjectsMilestones from '../../components/projects/ProjectsMilestones/ProjectsMilestones.jsx'
import ProjectsPartners from '../../components/projects/ProjectsPartners/ProjectsPartners.jsx'
import ProjectsCTA from '../../components/projects/ProjectsCTA/ProjectsCTA.jsx'

// Recruit page
import RecruitBanner from '../../components/recruit/RecruitBanner.jsx'
import RecruitWhy from '../../components/recruit/RecruitWhy.jsx'
import RecruitLife from '../../components/recruit/RecruitLife.jsx'
import RecruitJobs from '../../components/recruit/RecruitJobs.jsx'

// Sample data cho NewsDetail blocks
import { FEATURED, getRelatedArticles } from '../../components/news/newsData.js'

const article = FEATURED
const related = getRelatedArticles(article.slug, 3)
const { sections, quote, stats, facts, gallery } = article.detail
const openingSecs = sections.slice(0, 2)
const closingSecs = sections.slice(2, 4)

// ------------------------------------------------------------
// CATEGORIES — tab filter trên library view
// ------------------------------------------------------------
export const CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'shared', label: 'Shared · Site-wide' },
  { id: 'news-detail', label: 'News Detail' },
  { id: 'home', label: 'Homepage' },
  { id: 'intro', label: 'Giới thiệu' },
  { id: 'fields', label: 'Lĩnh vực' },
  { id: 'news', label: 'Tin tức' },
  { id: 'projects', label: 'Dự án' },
  { id: 'recruit', label: 'Tuyển dụng' },
]

// ------------------------------------------------------------
// COMPONENTS — danh sách tất cả component trong thư viện
// ------------------------------------------------------------
export const COMPONENTS = [
  // =========== SHARED ===========
  {
    id: 'header',
    category: 'shared',
    name: 'Header',
    subtitle: 'Navbar cố định · Menu · Language',
    desc: 'Header chung toàn site. Có variant light/dark/default, hiển thị logo, menu và chuyển ngôn ngữ.',
    tag: 'Header',
    path: 'src/components/shared/Header/',
    render: () => (
      <div
        style={{
          minHeight: '900px',
          background:
            'linear-gradient(135deg, #0a1938 0%, #132e4f 60%, #1a4070 100%)',
          position: 'relative',
        }}
      >
        <Header variant="default" />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.7)',
            fontSize: 18,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          <div style={{ color: '#c6a15b', marginBottom: 12, fontSize: 12 }}>Demo</div>
          <div>Header navigation</div>
          <div style={{ fontSize: 14, marginTop: 12, letterSpacing: '0.04em', textTransform: 'none', fontWeight: 400 }}>
            Logo · Tìm kiếm · Burger menu
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'contact',
    category: 'shared',
    name: 'Contact',
    subtitle: 'Khối liên hệ · Info + Form',
    desc: 'Khối liên hệ chung đặt ở cuối mỗi trang.',
    tag: 'Contact',
    path: 'src/components/shared/Contact/',
    render: () => <Contact />,
  },
  {
    id: 'news-featured',
    category: 'shared',
    name: 'NewsFeatured',
    subtitle: 'Card bài viết nổi bật · Hero style',
    desc: 'Thẻ bài viết featured với ảnh lớn + char reveal animation.',
    tag: 'NewsFeatured',
    path: 'src/components/shared/NewsFeatured/',
    render: () => <NewsFeatured />,
  },
  {
    id: 'logo-mark',
    category: 'shared',
    name: 'LogoMark',
    subtitle: 'Logo SVG · chữ cái animated',
    desc: 'Render 1 chữ cái logo với animation draw-in. Props: letter="N" | "H" | "A".',
    tag: 'LogoMark',
    path: 'src/components/shared/LogoMark/',
    render: () => (
      <div
        style={{
          minHeight: '900px',
          display: 'grid',
          placeItems: 'center',
          gap: 48,
          gridTemplateColumns: 'repeat(3, auto)',
          background: '#0a1938',
          padding: 48,
        }}
      >
        <LogoMark letter="N" />
        <LogoMark letter="H" />
        <LogoMark letter="A" />
      </div>
    ),
  },
  {
    id: 'section-indicator',
    category: 'shared',
    name: 'SectionIndicator',
    subtitle: 'Dots nav · Số thứ tự section',
    desc: 'Nav cố định bên phải hiển thị vị trí section hiện tại. Tone: light / paper / dark / gold.',
    tag: 'SectionIndicator',
    path: 'src/components/shared/SectionIndicator/',
    render: () => (
      <div
        style={{
          minHeight: '900px',
          background:
            'linear-gradient(135deg, #f4f5f8 0%, #e3e6eb 100%)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', color: '#5b6574', maxWidth: 480, padding: '0 80px' }}>
          <div style={{ color: '#c6a15b', fontSize: 12, fontWeight: 800, letterSpacing: '0.22em', marginBottom: 16 }}>
            DEMO · Section Indicator
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#0a1938', marginBottom: 12, letterSpacing: '-0.01em' }}>
            Dots nav cố định bên phải
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.6 }}>
            Hiển thị số thứ tự các section trong fullpage scroll. Số đậm + lớn = section đang xem.
            Tone: <code>paper / light / dark / gold</code>.
          </p>
        </div>
        <SectionIndicator
          current={2}
          total={7}
          onNav={() => {}}
          labels={['Mở đầu', 'Giới thiệu', 'Trích dẫn', 'Con số', 'Kết luận', 'Liên quan', 'Liên hệ']}
          tone="paper"
        />
      </div>
    ),
  },
  {
    id: 'pagination',
    category: 'shared',
    name: 'Pagination',
    subtitle: 'Phân trang · 1 dòng tối giản',
    desc: 'Component phân trang gọn một dòng: mũi tên tròn 2 đầu + số có ellipsis thông minh, gạch vàng dưới số active. Props: current, total, onChange, siblings, tone (light/dark).',
    tag: 'Pagination',
    path: 'src/components/shared/Pagination/',
    render: () => <PaginationDemo />,
  },
  {
    id: 'search-filter',
    category: 'shared',
    name: 'SearchFilter',
    subtitle: 'Ô tìm kiếm · Tab danh mục · Dropdown phụ',
    desc: 'Bộ lọc chuẩn dùng chung cho mọi trang có danh sách: ô search + dải tab + dropdown bên phải. Tabs và dropdown tuỳ chọn — truyền gì thì hiện nấy. Props: query/onQueryChange, searchPlaceholder, tabs/tabValue/onTabChange, selectOptions/selectValue/onSelectChange, active.',
    tag: 'SearchFilter',
    path: 'src/components/shared/SearchFilter/',
    render: () => <SearchFilterDemo />,
  },

  // =========== NEWS DETAIL ===========
  {
    id: 'news-hero',
    category: 'news-detail',
    name: 'NewsHero',
    subtitle: 'Banner đầu bài · Ảnh bìa + Title',
    desc: 'Hero banner cho trang chi tiết tin tức — ảnh bìa full viewport, stamp chuyên mục, tiêu đề split-word animation, byline.',
    tag: 'NewsHero',
    path: 'src/components/shared/NewsDetail/NewsHero/',
    render: () => (
      <NewsHero
        article={article}
        crumb={
          <>
            <a href="/">Trang chủ</a>
            <span className="sep" aria-hidden>/</span>
            <a href="/tin-tuc">Tin tức</a>
            <span className="sep" aria-hidden>/</span>
            <span className="current">{article.category}</span>
          </>
        }
      />
    ),
  },
  {
    id: 'news-opening',
    category: 'news-detail',
    name: 'NewsOpening',
    subtitle: '2 cột văn bản + Facts 4 ô',
    desc: 'Khối nội dung mở đầu với 2 cột có số thứ tự, kèm khối facts 4 ô thông tin.',
    tag: 'NewsOpening',
    path: 'src/components/shared/NewsDetail/NewsOpening/',
    render: () => <NewsOpening sections={openingSecs} facts={facts} />,
  },
  {
    id: 'news-quote',
    category: 'news-detail',
    name: 'NewsQuote',
    subtitle: 'Trích dẫn · Nền ảnh + dấu vàng',
    desc: 'Khối trích dẫn với dấu ngoặc kép vàng cỡ lớn, câu trích và tên người phát biểu.',
    tag: 'NewsQuote',
    path: 'src/components/shared/NewsDetail/NewsQuote/',
    render: () => <NewsQuote text={quote.text} attribution={quote.attribution} bgImage={gallery?.[0]} />,
  },
  {
    id: 'news-stats',
    category: 'news-detail',
    name: 'NewsStats',
    subtitle: 'Lưới 4 ô con số · Navy + Gold',
    desc: 'Lưới 4 ô con số ấn tượng — STT, số chính cỡ lớn, đơn vị vàng, mô tả.',
    tag: 'NewsStats',
    path: 'src/components/shared/NewsDetail/NewsStats/',
    render: () => <NewsStats items={stats} />,
  },
  {
    id: 'news-closing',
    category: 'news-detail',
    name: 'NewsClosing',
    subtitle: 'Figure + 2 cột kết · Tags · Share',
    desc: 'Khối kết bài: ảnh minh hoạ lớn + 2 cột kết + tags + nút share.',
    tag: 'NewsClosing',
    path: 'src/components/shared/NewsDetail/NewsClosing/',
    render: () => (
      <NewsClosing
        sections={closingSecs}
        figure={gallery?.[1]}
        figureCaption={article.title}
        tags={article.tags}
        shareTitle={article.title}
      />
    ),
  },
  {
    id: 'news-related',
    category: 'news-detail',
    name: 'NewsRelated',
    subtitle: '3 thẻ bài cùng chuyên mục',
    desc: 'Khối "Đọc tiếp" — 3 thẻ bài liên quan với ảnh, danh mục, ngày và CTA.',
    tag: 'NewsRelated',
    path: 'src/components/shared/NewsDetail/NewsRelated/',
    render: () => <NewsRelated articles={related} />,
  },

  // =========== HOMEPAGE ===========
  {
    id: 'home-hero',
    category: 'home',
    name: 'Home Hero',
    subtitle: 'Slider banner tự chạy · 6 slide',
    desc: 'Hero banner trang chủ với slider autoplay 7s, progress indicator dọc và CTA overlay.',
    tag: 'Hero',
    path: 'src/pages/HomePage/Hero/',
    render: () => <HomeHero />,
  },
  {
    id: 'home-about',
    category: 'home',
    name: 'Home About',
    subtitle: 'Giới thiệu · Tower + Logo',
    desc: 'Khối giới thiệu trang chủ: ảnh tower Newtecons + logo paper + text scroll animation.',
    tag: 'About',
    path: 'src/pages/HomePage/About/',
    render: () => <HomeAbout />,
  },
  {
    id: 'home-fields',
    category: 'home',
    name: 'Home Fields',
    subtitle: '6 lĩnh vực hoạt động',
    desc: 'Lưới 6 lĩnh vực: Civil, Industrial, Infrastructure, MEP, Real Estate, Interior với ảnh hover.',
    tag: 'Fields',
    path: 'src/pages/HomePage/Fields/',
    render: () => <HomeFields />,
  },
  {
    id: 'home-projects',
    category: 'home',
    name: 'Home Projects',
    subtitle: 'Dự án nổi bật · Cards',
    desc: 'Showcase các dự án tiêu biểu (sân bay, căn hộ, khách sạn, hạ tầng).',
    tag: 'Projects',
    path: 'src/pages/HomePage/Projects/',
    render: () => <HomeProjects />,
  },
  {
    id: 'home-achievements',
    category: 'home',
    name: 'Home Achievements',
    subtitle: 'Thành tựu · Quote + BG',
    desc: 'Khối thành tựu trang chủ với quote + ảnh engineers.',
    tag: 'Achievements',
    path: 'src/pages/HomePage/Achievements/',
    render: () => <HomeAchievements />,
  },
  {
    id: 'home-news',
    category: 'home',
    name: 'Home News',
    subtitle: 'Tin tức nổi bật · Featured + grid',
    desc: 'Khối tin tức trang chủ: 1 bài featured lớn + 3 bài phụ ở bên cạnh.',
    tag: 'News',
    path: 'src/pages/HomePage/News/',
    render: () => <HomeNews />,
  },

  // =========== INTRO ===========
  {
    id: 'intro-banner',
    category: 'intro',
    name: 'IntroBanner',
    subtitle: 'Banner đầu trang Giới thiệu',
    desc: 'Banner mở đầu trang Giới thiệu — ảnh nền + tiêu đề + subtitle.',
    tag: 'IntroBanner',
    path: 'src/pages/IntroPage/IntroBanner/',
    render: () => <IntroBanner />,
  },
  {
    id: 'intro-vision-mission',
    category: 'intro',
    name: 'IntroVisionMission',
    subtitle: 'Tầm nhìn · Sứ mệnh',
    desc: 'Khối tầm nhìn & sứ mệnh — 2 cột icon vàng + tiêu đề + mô tả.',
    tag: 'IntroVisionMission',
    path: 'src/pages/IntroPage/IntroVisionMission/',
    render: () => <IntroVisionMission />,
  },
  {
    id: 'intro-chairman',
    category: 'intro',
    name: 'IntroChairman',
    subtitle: 'Thông điệp chủ tịch · Portrait',
    desc: 'Khối thông điệp chủ tịch HĐQT — chân dung + quote + chữ ký.',
    tag: 'IntroChairman',
    path: 'src/pages/IntroPage/IntroChairman/',
    render: () => <IntroChairman />,
  },
  {
    id: 'intro-board',
    category: 'intro',
    name: 'IntroBoard',
    subtitle: 'Hội đồng quản trị',
    desc: 'Lưới thành viên HĐQT với ảnh + tên + chức danh, click mở modal.',
    tag: 'IntroBoard',
    path: 'src/pages/IntroPage/IntroBoard/',
    render: () => <IntroBoard />,
  },
  {
    id: 'intro-managers',
    category: 'intro',
    name: 'IntroManagers',
    subtitle: 'Ban điều hành',
    desc: 'Danh sách quản lý cấp cao — grid cards có portal modal.',
    tag: 'IntroManagers',
    path: 'src/pages/IntroPage/IntroManagers/',
    render: () => <IntroManagers />,
  },
  {
    id: 'intro-values',
    category: 'intro',
    name: 'IntroValues',
    subtitle: 'Giá trị cốt lõi',
    desc: 'Khối giá trị cốt lõi — danh sách giá trị có icon + mô tả.',
    tag: 'IntroValues',
    path: 'src/pages/IntroPage/IntroValues/',
    render: () => <IntroValues />,
  },
  {
    id: 'intro-history',
    category: 'intro',
    name: 'IntroHistory',
    subtitle: 'Lịch sử · Dòng thời gian',
    desc: 'Dòng thời gian các cột mốc với carousel controls.',
    tag: 'IntroHistory',
    path: 'src/pages/IntroPage/IntroHistory/',
    render: () => <IntroHistory />,
  },
  {
    id: 'intro-partners',
    category: 'intro',
    name: 'IntroPartners',
    subtitle: 'Đối tác · Logo grid',
    desc: 'Lưới logo đối tác của Newtecons (glob imports).',
    tag: 'IntroPartners',
    path: 'src/pages/IntroPage/IntroPartners/',
    render: () => <IntroPartners />,
  },

  // =========== FIELDS ===========
  {
    id: 'fields-banner',
    category: 'fields',
    name: 'FieldsBanner',
    subtitle: 'Banner trang Lĩnh vực',
    desc: 'Banner mở đầu trang Lĩnh vực hoạt động. Nhận prop active để trigger animation.',
    tag: 'FieldsBanner',
    path: 'src/components/fields/FieldsBanner/',
    render: () => <FieldsBanner active={true} />,
  },
  {
    id: 'fields-construction',
    category: 'fields',
    name: 'FieldsConstruction',
    subtitle: 'Xây dựng dân dụng & công nghiệp',
    desc: 'Section mô tả lĩnh vực xây dựng dân dụng & công nghiệp.',
    tag: 'FieldsConstruction',
    path: 'src/components/fields/FieldsConstruction/',
    render: () => <FieldsConstruction active={true} />,
  },
  {
    id: 'fields-mep',
    category: 'fields',
    name: 'FieldsMEP',
    subtitle: 'Cơ điện (M&E / MEP)',
    desc: 'Section cơ điện, gió, nước, chiếu sáng — hệ thống kỹ thuật toà nhà.',
    tag: 'FieldsMEP',
    path: 'src/components/fields/FieldsMEP/',
    render: () => <FieldsMEP active={true} />,
  },
  {
    id: 'fields-equipment',
    category: 'fields',
    name: 'FieldsEquipment',
    subtitle: 'Thiết bị · Máy móc thi công',
    desc: 'Section thiết bị & máy móc hiện đại sử dụng trong thi công.',
    tag: 'FieldsEquipment',
    path: 'src/components/fields/FieldsEquipment/',
    render: () => <FieldsEquipment active={true} />,
  },
  {
    id: 'fields-hr',
    category: 'fields',
    name: 'FieldsHR',
    subtitle: 'Nhân sự · Đội ngũ',
    desc: 'Section đội ngũ nhân sự — kỹ sư, chỉ huy trưởng, công nhân.',
    tag: 'FieldsHR',
    path: 'src/components/fields/FieldsHR/',
    render: () => <FieldsHR active={true} />,
  },
  {
    id: 'fields-db',
    category: 'fields',
    name: 'FieldsDB',
    subtitle: 'Tiến độ · Database dự án',
    desc: 'Section mô tả cách quản lý tiến độ, dữ liệu dự án.',
    tag: 'FieldsDB',
    path: 'src/components/fields/FieldsDB/',
    render: () => <FieldsDB active={true} />,
  },
  {
    id: 'fields-safety',
    category: 'fields',
    name: 'FieldsSafety',
    subtitle: 'An toàn lao động · HSE',
    desc: 'Section cam kết an toàn lao động, HSE.',
    tag: 'FieldsSafety',
    path: 'src/components/fields/FieldsSafety/',
    render: () => <FieldsSafety active={true} />,
  },
  {
    id: 'fields-iso',
    category: 'fields',
    name: 'FieldsISO',
    subtitle: 'Chuẩn quốc tế · ISO',
    desc: 'Section chứng chỉ ISO 9001, 14001, 45001 — chuẩn quốc tế.',
    tag: 'FieldsISO',
    path: 'src/components/fields/FieldsISO/',
    render: () => <FieldsISO active={true} />,
  },
  {
    id: 'fields-outro',
    category: 'fields',
    name: 'FieldsOutro',
    subtitle: 'Kết thúc · CTA',
    desc: 'Section kết trang Lĩnh vực — CTA hướng đến liên hệ.',
    tag: 'FieldsOutro',
    path: 'src/components/fields/FieldsOutro/',
    render: () => <FieldsOutro active={true} />,
  },

  // =========== NEWS PAGE ===========
  {
    id: 'news-banner',
    category: 'news',
    name: 'NewsBanner',
    subtitle: 'Banner trang Tin tức + tabs',
    desc: 'Banner trang Tin tức với các tabs lọc theo danh mục (Tất cả / Tin công ty / Dự án / …).',
    tag: 'NewsBanner',
    path: 'src/components/news/NewsBanner.jsx',
    render: () => <NewsBanner />,
  },
  {
    id: 'news-grid',
    category: 'news',
    name: 'NewsGrid',
    subtitle: 'Lưới bài viết · Phân trang',
    desc: 'Lưới bài viết tin tức với phân trang 3/trang — ảnh + danh mục + tiêu đề + excerpt.',
    tag: 'NewsGrid',
    path: 'src/components/news/NewsGrid.jsx',
    render: () => <NewsGrid />,
  },

  // =========== PROJECTS PAGE ===========
  {
    id: 'projects-banner',
    category: 'projects',
    name: 'ProjectsBanner',
    subtitle: 'Banner trang Dự án · Rotate',
    desc: 'Banner xoay 5 dự án featured với ảnh nền + thông tin mỗi 6.5s.',
    tag: 'ProjectsBanner',
    path: 'src/components/projects/ProjectsBanner/',
    render: () => <ProjectsBanner />,
  },
  {
    id: 'projects-spotlight',
    category: 'projects',
    name: 'ProjectsSpotlight',
    subtitle: 'Dự án nổi bật · Landmark 81',
    desc: 'Khối spotlight 1 dự án tiêu biểu (thường là Landmark 81) — ảnh lớn + thông số.',
    tag: 'ProjectsSpotlight',
    path: 'src/components/projects/ProjectsSpotlight/',
    render: () => <ProjectsSpotlight />,
  },
  {
    id: 'projects-grid',
    category: 'projects',
    name: 'ProjectsGrid',
    subtitle: 'Lưới dự án · 9/trang',
    desc: 'Lưới tất cả dự án với phân trang 9 mỗi trang, filter theo danh mục.',
    tag: 'ProjectsGrid',
    path: 'src/components/projects/ProjectsGrid/',
    render: () => <ProjectsGrid />,
  },
  {
    id: 'projects-milestones',
    category: 'projects',
    name: 'ProjectsMilestones',
    subtitle: 'Cột mốc phát triển',
    desc: 'Dòng thời gian cột mốc (2004 đến nay) — sự kiện nổi bật của công ty.',
    tag: 'ProjectsMilestones',
    path: 'src/components/projects/ProjectsMilestones/',
    render: () => <ProjectsMilestones />,
  },
  {
    id: 'projects-partners',
    category: 'projects',
    name: 'ProjectsPartners',
    subtitle: 'Đối tác chiến lược',
    desc: 'Danh sách đối tác chiến lược: Vingroup, Masterise, Sun Group…',
    tag: 'ProjectsPartners',
    path: 'src/components/projects/ProjectsPartners/',
    render: () => <ProjectsPartners />,
  },
  {
    id: 'projects-cta',
    category: 'projects',
    name: 'ProjectsCTA',
    subtitle: 'CTA · Bàn giao dự án',
    desc: 'Call-to-action cuối trang dự án — mời liên hệ để bàn giao dự án mới.',
    tag: 'ProjectsCTA',
    path: 'src/components/projects/ProjectsCTA/',
    render: () => <ProjectsCTA />,
  },

  // =========== RECRUIT PAGE ===========
  {
    id: 'recruit-banner',
    category: 'recruit',
    name: 'RecruitBanner',
    subtitle: 'Banner Tuyển dụng',
    desc: 'Banner mở đầu trang Tuyển dụng — ảnh công trường + slogan tuyển dụng.',
    tag: 'RecruitBanner',
    path: 'src/components/recruit/RecruitBanner.jsx',
    render: () => <RecruitBanner />,
  },
  {
    id: 'recruit-why',
    category: 'recruit',
    name: 'RecruitWhy',
    subtitle: 'Vì sao chọn Newtecons · Pillars',
    desc: 'Khối 4 trụ cột lý do chọn làm việc tại Newtecons (với icon tự vẽ).',
    tag: 'RecruitWhy',
    path: 'src/components/recruit/RecruitWhy.jsx',
    render: () => <RecruitWhy />,
  },
  {
    id: 'recruit-life',
    category: 'recruit',
    name: 'RecruitLife',
    subtitle: 'Cuộc sống tại Newtecons',
    desc: 'Khối cuộc sống / văn hoá làm việc tại Newtecons — tab + ảnh.',
    tag: 'RecruitLife',
    path: 'src/components/recruit/RecruitLife.jsx',
    render: () => <RecruitLife />,
  },
  {
    id: 'recruit-jobs',
    category: 'recruit',
    name: 'RecruitJobs',
    subtitle: 'Danh sách công việc · 6/trang',
    desc: 'Danh sách vị trí tuyển dụng với filter + phân trang 6 mỗi trang.',
    tag: 'RecruitJobs',
    path: 'src/components/recruit/RecruitJobs.jsx',
    render: () => <RecruitJobs />,
  },
]
