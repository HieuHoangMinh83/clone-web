// Intro page data — 8 sections. Đổi dự án: chỉ sửa file này.

// Backgrounds
import bgBanner from '../assets/images/intro/bg/banner.png'
import bgChairman from '../assets/images/intro/bg/chairman.png'
import bgHistory from '../assets/images/intro/bg/history.png'
import bgVm from '../assets/images/intro/bg/vision-mission.png'
import bgValues from '../assets/images/intro/bg/values.png'
import bgBoard from '../assets/images/intro/bg/board.png'
import bgMgr from '../assets/images/intro/bg/managers.png'
import bgPartners from '../assets/images/intro/bg/partners.png'

// Chairman + vision icons
import chairmanPortrait from '../assets/images/intro/chairman-portrait.png'
import iconVision from '../assets/images/intro/icons/vision.png'
import iconMission from '../assets/images/intro/icons/mission.png'

// Values icons
import iChinh from '../assets/images/intro/icons/value-chinhtruc.png'
import iSang from '../assets/images/intro/icons/value-sangtao.png'
import iDoan from '../assets/images/intro/icons/value-doanket.png'
import iToiuu from '../assets/images/intro/icons/value-toiuu.png'
import iTute from '../assets/images/intro/icons/value-tute.png'

// History milestones
import y2003 from '../assets/images/intro/history/y2003.png'
import y2009 from '../assets/images/intro/history/y2009.png'
import y2011 from '../assets/images/intro/history/y2011.png'
import y2012 from '../assets/images/intro/history/y2012.png'
import y2014 from '../assets/images/intro/history/y2014.png'
import y2015 from '../assets/images/intro/history/y2015.png'
import y2016 from '../assets/images/intro/history/y2016.png'
import y2017 from '../assets/images/intro/history/y2017.png'
import y2018 from '../assets/images/intro/history/y2018.png'
import y2019 from '../assets/images/intro/history/y2019.png'
import y2020 from '../assets/images/intro/history/y2020.png'
import y2021 from '../assets/images/intro/history/y2021.png'
import y2022 from '../assets/images/intro/history/y2022.png'
import y2023 from '../assets/images/intro/history/y2023.png'
import y2024 from '../assets/images/intro/history/y2024.png'

// Board
import boardCeo from '../assets/images/intro/managers/board-ceo.png'
import b1 from '../assets/images/intro/managers/board-1.png'
import b2 from '../assets/images/intro/managers/board-2.png'
import b3 from '../assets/images/intro/managers/board-3.png'
import b4 from '../assets/images/intro/managers/board-4.png'
import b5 from '../assets/images/intro/managers/board-5.png'

// Managers
import m1 from '../assets/images/intro/managers/mgr-1.png'
import m2 from '../assets/images/intro/managers/mgr-2.png'
import m3 from '../assets/images/intro/managers/mgr-3.png'
import m4 from '../assets/images/intro/managers/mgr-4.png'
import m5 from '../assets/images/intro/managers/mgr-5.png'
import m6 from '../assets/images/intro/managers/mgr-6.png'
import m7 from '../assets/images/intro/managers/mgr-7.png'
import m8 from '../assets/images/intro/managers/mgr-8.png'
import m9 from '../assets/images/intro/managers/mgr-9.png'
import m10 from '../assets/images/intro/managers/mgr-10.png'

// Partners logos (explicit so user dễ thêm/xóa)
const partnerLogos = import.meta.glob(
  '../assets/images/intro/partners/logo-*.png',
  { eager: true, import: 'default' },
)
const PARTNER_LOGOS = Object.entries(partnerLogos)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src)

const PLACEHOLDER_MGR_BIO =
  'Cán bộ quản lý giàu kinh nghiệm của Newtecons, đồng hành cùng công ty trong nhiều công trình trọng điểm trên khắp cả nước. Với triết lý "Uy tín – Chuyên nghiệp – Tử tế", ông/bà không ngừng nâng cao năng lực chuyên môn, dẫn dắt đội ngũ và đóng góp vào sự phát triển bền vững của công ty.'

export const introData = {
  page: {
    sectionLabels: [
      'Banner',
      'Thông điệp',
      'Lịch sử',
      'Tầm nhìn - Sứ mệnh',
      'Giá trị cốt lõi',
      'Ban điều hành',
      'Cán bộ quản lý',
      'Đối tác',
      'Liên hệ',
    ],
    sectionTones: ['light', 'light', 'paper', 'light', 'light', 'paper', 'paper', 'light', 'light'],
    navTransparent: [false, false, false, false, true, false, false, false, false],
  },

  banner: {
    bg: bgBanner,
    heading: 'Giới thiệu',
    subtitle:
      'Tổng thầu xây dựng hàng đầu Việt Nam — hơn hai thập kỷ kiến tạo những công trình mang tầm vóc Việt.',
  },

  chairman: {
    bg: bgChairman,
    portrait: chairmanPortrait,
    portraitAlt: 'Chủ tịch HĐQT Nguyễn Bá Dương',
    watermark: 'MESSAGE',
    titleSoft: 'THÔNG ĐIỆP',
    titleStrong: 'CHỦ TỊCH HĐQT',
    paragraphs: [
      'Hơn hai thập kỷ hình thành và phát triển, Newtecons đã kiên cường vượt qua nhiều thử thách và tạo dựng vị thế vững chắc của một Tổng thầu Xây dựng hàng đầu Việt Nam. Những công trình chúng tôi thực hiện không chỉ là minh chứng cho trình độ kỹ thuật, mà còn là biểu tượng cho niềm tự hào, mang đến những giá trị vượt thời gian cho khách hàng, đối tác và cho cả cộng đồng, xã hội.',
      // The quoted triết lý will be rendered with <em> wrap via template split (see component).
      'Với triết lý "Uy tín – Chuyên nghiệp – Tử tế", Newtecons sẽ tiếp tục hành trình xây dựng những công trình thẩm mỹ và bền vững. Kiên định với những giá trị cốt lõi, chúng tôi cùng nhau kiến tạo biểu tượng của niềm tin, của giá trị và của tương lai.',
    ],
    signature: { name: 'NGUYỄN BÁ DƯƠNG', role: 'Chủ tịch Hội đồng Quản trị' },
  },

  history: {
    bg: bgHistory,
    title: 'Lịch sử',
    titleTrail: 'hình thành',
    lead:
      'Công ty Cổ phần Đầu tư Xây dựng NEWTECONS được thành lập vào ngày 23/10/2003, là một trong những đơn vị uy tín trong lĩnh vực thi công xây dựng với đa dạng các loại hình công trình.',
    milestoneAltTemplate: 'Cột mốc {year}',
    milestones: [
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
    ],
  },

  visionMission: {
    bg: bgVm,
    columns: [
      {
        icon: iconVision,
        eyebrow: 'Newtecons',
        heading: 'TẦM NHÌN',
        text: 'Giữ vững vị thế Tổng thầu xây dựng vững mạnh có tiềm lực kinh tế hàng đầu Việt Nam, tiến tới phát triển thành tập đoàn đa ngành lấy xây dựng làm lĩnh vực cốt lõi.',
      },
      {
        icon: iconMission,
        eyebrow: 'Newtecons',
        heading: 'SỨ MỆNH',
        text: 'Dùng uy tín và chất lượng làm nền móng để dựng xây lên những công trình mang tầm vóc Việt, cam kết đem lại lợi ích cao nhất cho khách hàng, đối tác và người lao động, góp phần phát triển cộng đồng bền vững.',
      },
    ],
  },

  values: {
    bg: bgValues,
    titleTop: 'GIÁ TRỊ',
    titleStrong: 'CỐT LÕI',
    items: [
      { key: 'sangtao', name: 'SÁNG TẠO', icon: iSang, desc: 'Liên tục đổi mới, tìm tòi giải pháp thông minh và hiệu quả cho mọi công trình.' },
      { key: 'doanket', name: 'ĐOÀN KẾT', icon: iDoan, desc: 'Một đội ngũ — một mục tiêu — cùng nhau vượt qua mọi thử thách.' },
      { key: 'chinhtruc', name: 'CHÍNH TRỰC', icon: iChinh, desc: 'Chính trực là kim chỉ nam cho từng suy nghĩ, từng hành động của mỗi Người Newtecons.', featured: true },
      { key: 'toiuu', name: 'TỐI ƯU', icon: iToiuu, desc: 'Tối đa hiệu quả, tối thiểu lãng phí — trong từng công đoạn, từng nguồn lực.' },
      { key: 'tute', name: 'TỬ TẾ', icon: iTute, desc: 'Tử tế với khách hàng, với đồng đội, với công trình — và với cộng đồng.' },
    ],
  },

  board: {
    bg: bgBoard,
    titleTop: 'BAN',
    titleStrong: 'ĐIỀU HÀNH',
    ceo: {
      name: 'VÕ THANH LIÊM',
      role: 'Tổng Giám đốc',
      img: boardCeo,
      bio: 'Ông Võ Thanh Liêm là người đứng đầu Ban Điều hành Newtecons, định hướng chiến lược phát triển và dẫn dắt công ty trở thành Tổng thầu xây dựng hàng đầu Việt Nam. Với triết lý "Uy tín – Chuyên nghiệp – Tử tế", ông cùng đội ngũ không ngừng kiến tạo những công trình mang tầm vóc Việt.',
    },
    directors: [
      { name: 'NGUYỄN QUANG THỤY', role: 'Giám đốc Điều hành', img: b1, bio: 'Với hơn 20 năm kinh nghiệm trong ngành xây dựng, ông Nguyễn Quang Thụy đã trực tiếp điều hành nhiều dự án trọng điểm của Newtecons, góp phần khẳng định vị thế Tổng thầu uy tín hàng đầu Việt Nam.' },
      { name: 'NGÔ ĐÌNH NGỌC QUANG', role: 'Giám đốc Điều hành', img: b2, bio: 'Ông Ngô Đình Ngọc Quang phụ trách khối vận hành thi công, luôn đặt chất lượng và tiến độ làm kim chỉ nam trong từng công trình mà Newtecons thực hiện.' },
      { name: 'LÊ ĐỨC BỬU', role: 'Giám đốc Điều hành', img: b3, bio: 'Ông Lê Đức Bửu đồng hành cùng Newtecons trong nhiều giai đoạn phát triển, là người góp phần xây dựng văn hóa làm việc chuyên nghiệp và kỷ luật đặc trưng của công ty.' },
      { name: 'ĐỖ NGUYỄN THÀNH NHÂN', role: 'Giám đốc Điều hành', img: b4, bio: 'Ông Đỗ Nguyễn Thành Nhân trực tiếp dẫn dắt các dự án quy mô lớn, mang đến những giải pháp kỹ thuật tối ưu và hiệu quả cho khách hàng của Newtecons.' },
      { name: 'HÀ TIỂU ANH', role: 'Giám đốc Tài chính', img: b5, bio: 'Bà Hà Tiểu Anh phụ trách hoạch định và quản trị tài chính, đảm bảo nền tảng vững chắc cho chiến lược phát triển dài hạn của Newtecons.' },
    ],
  },

  managers: {
    bg: bgMgr,
    titleTop: 'CÁN BỘ',
    titleStrong: 'QUẢN LÝ',
    desc: 'Chúng tôi tin rằng tinh thần đoàn kết của đội ngũ nhân lực giàu kinh nghiệm, sự cải tiến liên tục trong hoạt động thi công, tính nhạy bén trong việc nắm bắt nhu cầu thị trường xây dựng và khả năng đáp ứng linh hoạt các yêu cầu của khách hàng, sẽ giúp Newtecons phát triển và lớn mạnh hơn nữa.',
    items: [
      { name: 'TRẦN NGỌC ĐỨC', role: 'Giám đốc Khối Kỹ thuật', img: m1, bio: PLACEHOLDER_MGR_BIO },
      { name: 'NGUYỄN QUỐC MINH HUY', role: 'Trưởng Phòng Đấu thầu Thiết kế', img: m2, bio: PLACEHOLDER_MGR_BIO },
      { name: 'DƯƠNG HOÀNG GIANG', role: 'Trưởng Ban HSSE', img: m3, bio: PLACEHOLDER_MGR_BIO },
      { name: 'VÕ THANH CANG', role: 'Giám đốc Khối Cơ Điện', img: m4, bio: PLACEHOLDER_MGR_BIO },
      { name: 'TÔ VĂN THẮNG', role: 'Giám đốc Kinh tế', img: m5, bio: PLACEHOLDER_MGR_BIO },
      { name: 'LÊ ĐỨC TRÚC QUỲNH', role: 'Trưởng Phòng Đấu thầu Cơ Điện', img: m6, bio: PLACEHOLDER_MGR_BIO },
      { name: 'NGUYỄN TRẦN NHỰT QUANG', role: 'Trưởng Phòng Thiết bị', img: m7, bio: PLACEHOLDER_MGR_BIO },
      { name: 'NGUYỄN TRƯỜNG DUY', role: 'Giám đốc Thi công', img: m8, bio: PLACEHOLDER_MGR_BIO },
      { name: 'NGUYỄN NGỌC TÙNG', role: 'Trưởng Phòng Kế toán', img: m9, bio: PLACEHOLDER_MGR_BIO },
      { name: 'LÊ QUỐC VIỆT', role: 'Trưởng phòng CCM', img: m10, bio: PLACEHOLDER_MGR_BIO },
    ],
  },

  partners: {
    bg: bgPartners,
    titleLine1: 'Niềm tin kiến tạo',
    titleEm: 'giá trị',
    titleTail: 'vượt thời gian.',
    lead:
      'Newtecons được tin chọn bởi những thương hiệu hàng đầu trong và ngoài nước — cùng kiến tạo những công trình biểu tượng, bền vững và vượt thời gian.',
    stats: [
      { value: '20+', label: 'Năm kinh nghiệm' },
      { value: '150+', label: 'Đối tác toàn cầu' },
      { value: '500+', label: 'Dự án đã thực hiện' },
      { value: '05', label: 'Quốc gia hoạt động' },
    ],
    pullquote: {
      body: 'Với nền tảng kinh nghiệm triển khai các dự án quy mô lớn và sự am hiểu tiêu chuẩn quốc tế, Newtecons sẽ quản lý, điều hành dự án đạt an toàn, chất lượng và tiến độ.',
      name: 'Jason Turnbull',
      role: 'Phó TGĐ kiêm GĐ Tài chính, Masterise Homes',
    },
    logos: PARTNER_LOGOS,
  },
}
