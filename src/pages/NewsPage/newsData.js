import sub1 from '../../assets/images/news/cards/sub-01.jpg'
import sub2 from '../../assets/images/news/cards/sub-02.jpg'
import sub3 from '../../assets/images/news/cards/sub-03.jpg'
import featuredMain from '../../assets/images/news/cards/featured-main.jpg'
import c01 from '../../assets/images/news/cards/card-01.jpg'
import c02 from '../../assets/images/news/cards/card-02.jpg'
import c03 from '../../assets/images/news/cards/card-03.jpg'
import c04 from '../../assets/images/news/cards/card-04.jpg'
import c05 from '../../assets/images/news/cards/card-05.jpg'
import c06 from '../../assets/images/news/cards/card-06.jpg'
import c07 from '../../assets/images/news/cards/card-07.jpg'
import c08 from '../../assets/images/news/cards/card-08.jpg'
import c09 from '../../assets/images/news/cards/card-09.jpg'
import c10 from '../../assets/images/news/cards/card-10.jpg'
import c11 from '../../assets/images/news/cards/card-11.jpg'
import c12 from '../../assets/images/news/cards/card-12.jpg'

// ============================================================
// Per-category content factories
// Mỗi category có 1 bộ sections + quote + stats + facts + gallery
// được render động ở NewsDetail.
// ============================================================

const GALLERY_POOL = [c01, c02, c03, c04, c05, c06, c07, c08, c09, c10, c11, c12, sub1, sub2, sub3, featuredMain]

// deterministic gallery pick để từng bài có 2 ảnh phụ khác nhau
function pickGallery(mainImage, seed) {
  const pool = GALLERY_POOL.filter((img) => img !== mainImage)
  const a = pool[seed % pool.length]
  const b = pool[(seed * 7 + 3) % pool.length]
  return [a, b === a ? pool[(seed + 1) % pool.length] : b]
}

// hash nhẹ từ slug để có seed ổn định
function hashSlug(slug) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return h
}

function sectionsForProject(a) {
  const primaryTag = a.tags[0] || 'dự án'
  const partner = a.tags.find((t) => /Masterise|Masteri|Vingroup|Sun|Hòa Phát|Hàn|Phú Mỹ|Long Thành|Bến Lức/i.test(t)) || 'Chủ đầu tư'
  return [
    {
      id: 'boi-canh',
      num: '01',
      kicker: 'Mở đầu',
      title: 'Bối cảnh hợp tác',
      paragraphs: [
        `Ngày ${a.date}, Newtecons và ${partner} chính thức bước vào giai đoạn triển khai mới của ${primaryTag}. Đây là cột mốc tiếp nối chuỗi dự án quy mô lớn mà Tổng thầu Newtecons đã đồng hành cùng thị trường trong hai thập kỷ qua.`,
        `Việc được lựa chọn thể hiện sự tin tưởng của Chủ đầu tư dành cho năng lực quản trị, khả năng huy động nguồn lực và cam kết tiến độ mà Newtecons đã xác lập qua hàng loạt công trình trọng điểm tại Hà Nội và TP. Hồ Chí Minh.`,
      ],
    },
    {
      id: 'noi-dung',
      num: '02',
      kicker: 'Nội dung',
      title: 'Phạm vi gói thầu',
      paragraphs: [
        `Gói thầu do Newtecons đảm nhận bao trùm công tác thi công phần ngầm, kết cấu chính và hệ thống cơ điện đồng bộ. Đội ngũ chỉ huy trưởng và kỹ sư BIM 5D được huy động ngay sau lễ ký kết để kịp tiến vào mặt bằng theo đúng kế hoạch.`,
        `Thiết kế biện pháp thi công được tối ưu dựa trên dữ liệu các gói tương tự, kết hợp giải pháp tường vây, top-down và ứng dụng công nghệ ván khuôn leo — những thế mạnh kỹ thuật đặc trưng của Newtecons.`,
      ],
    },
    {
      id: 'quy-mo',
      num: '03',
      kicker: 'Quy mô',
      title: 'Triển khai thực địa',
      paragraphs: [
        `Công trường được tổ chức theo ba phân kỳ: chuẩn bị mặt bằng, thi công phần ngầm và triển khai kết cấu phần thân. Hệ thống an toàn, môi trường và kiểm soát chất lượng được thiết lập đồng bộ với chứng chỉ ISO 45001:2018.`,
        `Nhân sự tối đa tại cao điểm dự kiến lên tới hàng nghìn kỹ sư và công nhân kỹ thuật, được điều phối qua bảng tiến độ tổng thể cập nhật hằng tuần bởi Ban Chỉ huy Dự án.`,
      ],
    },
    {
      id: 'cam-ket',
      num: '04',
      kicker: 'Cam kết',
      title: 'Định hướng của Newtecons',
      paragraphs: [
        `Với định hướng "Build on Trust", Newtecons cam kết đưa ${primaryTag} trở thành một công trình tiêu biểu về chất lượng thi công, an toàn và tiến độ — củng cố vị thế Tổng thầu hàng đầu Việt Nam.`,
        `Thành công của gói thầu sẽ tiếp tục mở rộng hệ sinh thái hợp tác giữa Newtecons và ${partner}, đồng thời hình thành nền tảng tham chiếu cho các dự án tương đương trong tương lai.`,
      ],
    },
  ]
}

function sectionsForAward(a) {
  const award = a.tags[0] || 'Giải thưởng'
  return [
    {
      id: 'vinh-du',
      num: '01',
      kicker: 'Vinh dự',
      title: 'Khoảnh khắc được công nhận',
      paragraphs: [
        `Ngày ${a.date}, Newtecons chính thức được xướng tên tại hạng mục ${award}. Đây là sự ghi nhận tập trung cho nỗ lực bền bỉ của tập thể cán bộ nhân viên, kỹ sư và đối tác đã cùng Newtecons kiến tạo những công trình chất lượng.`,
        `Kết quả này phản ánh quá trình đầu tư vào năng lực quản trị hiện đại, hệ thống an toàn chuẩn quốc tế và cam kết tiến độ mà Newtecons duy trì xuyên suốt trong nhiều năm.`,
      ],
    },
    {
      id: 'tieu-chi',
      num: '02',
      kicker: 'Tiêu chí',
      title: 'Thước đo đánh giá',
      paragraphs: [
        `Hội đồng xét giải đánh giá doanh nghiệp trên các tiêu chí năng lực tài chính, hiệu quả kinh doanh, uy tín truyền thông và mức độ hài lòng của khách hàng — dựa trên dữ liệu điều tra độc lập tại hàng trăm Chủ đầu tư đang hoạt động trong thị trường.`,
        `Kết quả khảo sát cho thấy Newtecons giữ vững xếp hạng top đầu ở các tiêu chí kỹ thuật và được đánh giá cao về mức độ cam kết bàn giao đúng hạn — một yếu tố quyết định trong giai đoạn thị trường biến động.`,
      ],
    },
    {
      id: 'hanh-trinh',
      num: '03',
      kicker: 'Hành trình',
      title: 'Nền tảng vững chắc',
      paragraphs: [
        `Hành trình chạm đến danh hiệu là kết quả tích luỹ từ hàng trăm công trình đã bàn giao thành công — từ nhà ở cao tầng, khu đô thị, nhà máy công nghiệp cho đến các dự án hạ tầng quốc gia.`,
        `Đặc biệt, trong hai năm gần nhất Newtecons liên tục mở rộng mảng cơ điện, hạ tầng và công nghiệp — qua đó nâng cấp hồ sơ năng lực thành một Tổng thầu đa ngành thực sự.`,
      ],
    },
    {
      id: 'y-nghia',
      num: '04',
      kicker: 'Ý nghĩa',
      title: 'Động lực phía trước',
      paragraphs: [
        `Giải thưởng không chỉ là sự tôn vinh mà còn là lời nhắc về trách nhiệm gìn giữ chất lượng và niềm tin của cộng đồng khách hàng, đối tác dành cho thương hiệu Newtecons.`,
        `Công ty sẽ tiếp tục đầu tư vào nhân lực trẻ, công nghệ thi công tiên tiến và các tiêu chuẩn quản trị quốc tế — biến mỗi danh hiệu nhận được thành động lực nội tại cho chặng đường kế tiếp.`,
      ],
    },
  ]
}

function sectionsForCompany(a) {
  return [
    {
      id: 'boi-canh',
      num: '01',
      kicker: 'Mở đầu',
      title: 'Ngữ cảnh chiến lược',
      paragraphs: [
        `Ngày ${a.date}, Newtecons tổ chức sự kiện "${a.title.toLowerCase()}" — một dấu mốc quan trọng thể hiện tầm nhìn phát triển dài hạn của Công ty trong bối cảnh thị trường xây dựng chuyển dịch mạnh mẽ.`,
        `Sự kiện quy tụ Ban lãnh đạo, cổ đông, đại diện Chủ đầu tư và các đối tác chiến lược, mở ra không gian trao đổi về định hướng phát triển đa ngành giai đoạn kế tiếp.`,
      ],
    },
    {
      id: 'noi-dung',
      num: '02',
      kicker: 'Nội dung',
      title: 'Những điểm then chốt',
      paragraphs: [
        `Các nội dung trọng tâm được công bố gồm định hướng đa ngành — xây dựng, cơ điện, hạ tầng, công nghiệp; mục tiêu tăng trưởng doanh thu bền vững và cam kết duy trì mức biên lợi nhuận lành mạnh xuyên suốt chu kỳ.`,
        `Song song, Newtecons khẳng định tiếp tục hoàn thiện hệ thống quản trị, chuẩn hoá quy trình theo chuẩn quốc tế và đầu tư mạnh vào đội ngũ kế cận — yếu tố nền cho chiến lược tăng trưởng 3–5 năm tới.`,
      ],
    },
    {
      id: 'dinh-huong',
      num: '03',
      kicker: 'Định hướng',
      title: 'Lộ trình triển khai',
      paragraphs: [
        `Lộ trình được chia thành ba giai đoạn: củng cố năng lực lõi, mở rộng mảng công nghiệp và hạ tầng, tiến tới quốc tế hoá một phần hoạt động. Mỗi giai đoạn có bộ KPI rõ ràng gắn với cam kết điều hành.`,
        `Hệ sinh thái đối tác chiến lược tiếp tục được mở rộng — gồm Chủ đầu tư bất động sản, đơn vị thiết kế, nhà cung cấp vật liệu và các tập đoàn quốc tế — đảm bảo chuỗi cung ứng chất lượng cho toàn bộ gói thầu Newtecons nhận triển khai.`,
      ],
    },
    {
      id: 'thong-diep',
      num: '04',
      kicker: 'Thông điệp',
      title: 'Gửi tới cộng đồng',
      paragraphs: [
        `Ban Lãnh đạo Newtecons khẳng định triết lý "Build on Trust" tiếp tục là kim chỉ nam — mọi quyết định điều hành đều hướng đến việc giữ vững niềm tin với khách hàng, đối tác và xã hội.`,
        `Trong giai đoạn mới, Newtecons cam kết đồng hành cùng các công trình trọng điểm quốc gia, đóng góp vào sự phát triển của ngành xây dựng và củng cố hình ảnh của Tổng thầu Việt trên thị trường quốc tế.`,
      ],
    },
  ]
}

function sectionsForInternal(a) {
  return [
    {
      id: 'muc-tieu',
      num: '01',
      kicker: 'Mục tiêu',
      title: 'Lý do ra đời',
      paragraphs: [
        `Chương trình ${a.title.toLowerCase()} được khởi xướng nhằm chuẩn hoá năng lực đội ngũ kỹ sư, chỉ huy trưởng và cán bộ quản lý dự án — đối tượng trực tiếp quyết định chất lượng mỗi công trình Newtecons triển khai.`,
        `Đây là bước đi tiếp nối chiến lược "đầu tư vào con người" mà Ban Tổng Giám đốc đã xác định: con người là tài sản quan trọng nhất, tạo ra lợi thế cạnh tranh bền vững cho Tổng thầu.`,
      ],
    },
    {
      id: 'noi-dung',
      num: '02',
      kicker: 'Thiết kế',
      title: 'Cấu trúc chương trình',
      paragraphs: [
        `Nội dung được thiết kế kết hợp giữa khung lý thuyết chuẩn quốc tế (PMI, LEED, ISO) và các tình huống thực chiến lấy từ chính công trường Newtecons — tối đa hoá khả năng áp dụng cho học viên sau khoá học.`,
        `Đội ngũ giảng viên bao gồm các chuyên gia nội bộ giàu kinh nghiệm và đối tác đào tạo độc lập, đảm bảo học viên được tiếp cận cả góc nhìn quản trị lẫn chuyên môn kỹ thuật sâu.`,
      ],
    },
    {
      id: 'khoa-dau',
      num: '03',
      kicker: 'Vận hành',
      title: 'Khoá học đầu tiên',
      paragraphs: [
        `Khoá đầu tiên ghi nhận sự tham gia của hàng chục kỹ sư trẻ và cán bộ tiềm năng, trải qua chương trình đánh giá đầu vào nghiêm ngặt để đảm bảo chất lượng học viên và hiệu quả đào tạo sau khoá.`,
        `Kết quả sơ bộ cho thấy học viên cải thiện rõ rệt kỹ năng quản trị tiến độ, đọc hiểu biện pháp thi công và tương tác với Chủ đầu tư — đúng mục tiêu chương trình đặt ra.`,
      ],
    },
    {
      id: 'dai-han',
      num: '04',
      kicker: 'Tầm nhìn',
      title: 'Chiến lược dài hạn',
      paragraphs: [
        `Chương trình sẽ mở rộng quy mô trong các năm tiếp theo, đồng thời phát triển thêm tuyến đào tạo chuyên sâu dành cho cán bộ quản lý cấp trung và cấp cao trong toàn hệ thống Newtecons.`,
        `Về lâu dài, Newtecons kỳ vọng xây dựng một học viện nội bộ trở thành cái nôi bồi dưỡng "tổng thầu tương lai" cho ngành xây dựng Việt Nam — không chỉ cho riêng Newtecons.`,
      ],
    },
  ]
}

function sectionsForCSR(a) {
  return [
    {
      id: 'khoi-xuong',
      num: '01',
      kicker: 'Khởi xướng',
      title: 'Lý do hành động',
      paragraphs: [
        `Chương trình ${a.title.toLowerCase()} được Newtecons khởi xướng trên nền tảng triết lý "mỗi công trình được xây nên bởi biết bao bàn tay và trái tim" — người lao động, cộng đồng xung quanh công trường luôn là một phần không thể tách rời của Newtecons.`,
        `Sự đồng lòng của Ban Lãnh đạo, Công đoàn và toàn thể cán bộ nhân viên đã biến chương trình trở thành hoạt động thường niên, được duy trì đều đặn bất kể chu kỳ kinh doanh.`,
      ],
    },
    {
      id: 'pham-vi',
      num: '02',
      kicker: 'Triển khai',
      title: 'Phạm vi đồng hành',
      paragraphs: [
        `Phạm vi triển khai trải rộng trên nhiều địa phương, ưu tiên các công trường mà Newtecons đang thi công — nơi có lực lượng người lao động trực tiếp đóng góp cho hoạt động sản xuất của Công ty mỗi ngày.`,
        `Mọi khoản hỗ trợ đều được thẩm định kỹ lưỡng, phối hợp cùng chính quyền địa phương và tổ chức Công đoàn để đảm bảo đến đúng người, đúng nhu cầu và đúng thời điểm.`,
      ],
    },
    {
      id: 'tac-dong',
      num: '03',
      kicker: 'Tác động',
      title: 'Giá trị tạo ra',
      paragraphs: [
        `Không chỉ dừng ở hỗ trợ tài chính, chương trình còn mang đến sự an tâm thực sự cho người lao động — một yếu tố trực tiếp ảnh hưởng đến năng suất, chất lượng thi công và sự gắn bó dài hạn với Newtecons.`,
        `Nhiều gia đình sau khi tham gia chương trình đã có điều kiện để tiếp tục cho con em đi học, cải thiện nơi ở — những thay đổi nhỏ tạo nên hiệu ứng lớn trong cộng đồng lao động Newtecons.`,
      ],
    },
    {
      id: 'ben-vung',
      num: '04',
      kicker: 'Bền vững',
      title: 'Đồng hành dài hạn',
      paragraphs: [
        `Newtecons xem hoạt động CSR là một phần trong mô hình phát triển bền vững của doanh nghiệp — không phải hoạt động tài trợ rời rạc, mà là chiến lược gắn liền với chu kỳ kinh doanh và văn hoá công ty.`,
        `Trong các năm tới, chương trình sẽ tiếp tục mở rộng hạng mục hỗ trợ, đồng thời kết nối với hệ sinh thái đối tác để tạo ra tác động cộng đồng lớn hơn, thay vì chỉ giới hạn trong nội bộ Newtecons.`,
      ],
    },
  ]
}

function sectionsForEvent(a) {
  return [
    {
      id: 'mo-dau',
      num: '01',
      kicker: 'Mở đầu',
      title: 'Không khí sự kiện',
      paragraphs: [
        `Ngày ${a.date}, Newtecons tổ chức "${a.title.toLowerCase()}" với sự tham gia đông đảo của cán bộ nhân viên, kỹ sư công trường và đại diện đối tác. Không khí sự kiện thể hiện sự chủ động và tinh thần nhất quán mà Công ty luôn duy trì.`,
        `Bối cảnh tổ chức được chuẩn bị kỹ lưỡng — từ khâu truyền thông, hậu cần cho tới kịch bản điều phối — nhằm đảm bảo sự kiện diễn ra chuyên nghiệp, đúng tinh thần văn hoá Newtecons.`,
      ],
    },
    {
      id: 'dien-bien',
      num: '02',
      kicker: 'Diễn biến',
      title: 'Nội dung trọng tâm',
      paragraphs: [
        `Chương trình bao gồm các phiên trao đổi chuyên môn, trình diễn thực tế và hoạt động gắn kết — tạo nên trải nghiệm tổng hợp vừa mang tính nghiệp vụ, vừa nhấn mạnh giá trị đội ngũ.`,
        `Đây cũng là dịp Ban Lãnh đạo gặp gỡ trực tiếp với lực lượng trên công trường — những người đang hàng ngày đảm bảo chất lượng, tiến độ và an toàn của mọi gói thầu Newtecons đang triển khai.`,
      ],
    },
    {
      id: 'huong-ung',
      num: '03',
      kicker: 'Hưởng ứng',
      title: 'Phản hồi từ cộng đồng',
      paragraphs: [
        `Sự kiện nhận được phản hồi tích cực từ cán bộ nhân viên và đối tác tham dự. Nhiều ý kiến đóng góp đã được ghi nhận để tiếp tục cải thiện hình thức tổ chức trong các kỳ sự kiện tiếp theo.`,
        `Đặc biệt, các nội dung được chia sẻ tại sự kiện nhanh chóng lan toả qua hệ thống truyền thông nội bộ — trở thành chất liệu đào tạo và truyền cảm hứng cho đội ngũ kế cận của Newtecons.`,
      ],
    },
    {
      id: 'danh-gia',
      num: '04',
      kicker: 'Đánh giá',
      title: 'Ý nghĩa tiếp nối',
      paragraphs: [
        `Sự kiện là lời khẳng định rằng Newtecons không chỉ là một doanh nghiệp xây dựng, mà còn là một tập thể có bản sắc văn hoá riêng — nơi mọi thành viên được tạo điều kiện phát triển và đóng góp.`,
        `Từ những trải nghiệm tích luỹ được, Công ty sẽ tiếp tục nâng cấp chuỗi hoạt động định kỳ — biến mỗi sự kiện thành một viên gạch củng cố văn hoá, gắn kết nội bộ và niềm tự hào Newtecons.`,
      ],
    },
  ]
}

function sectionsForCategory(a) {
  switch (a.category) {
    case 'Tin dự án': return sectionsForProject(a)
    case 'Giải thưởng': return sectionsForAward(a)
    case 'Tin công ty': return sectionsForCompany(a)
    case 'Nội bộ': return sectionsForInternal(a)
    case 'Hoạt động CSR': return sectionsForCSR(a)
    case 'Sự kiện': return sectionsForEvent(a)
    default: return sectionsForCompany(a)
  }
}

const QUOTE_BY_CAT = {
  'Tin dự án': {
    text:
      'Chúng tôi tiếp nhận mỗi công trình với tâm thế của một tổng thầu chuyên nghiệp — kiểm soát chất lượng, tiến độ và an toàn xuyên suốt quá trình triển khai.',
    attribution: 'Ban Tổng Giám đốc Newtecons',
  },
  'Giải thưởng': {
    text:
      'Giải thưởng là sự ghi nhận cho nỗ lực tập thể. Với chúng tôi, danh hiệu hôm nay là trách nhiệm gìn giữ niềm tin từ ngày mai.',
    attribution: 'Chủ tịch Hội đồng Quản trị Newtecons',
  },
  'Tin công ty': {
    text:
      'Mỗi chặng phát triển của Newtecons đều bắt đầu từ cam kết với khách hàng, đối tác và cộng đồng — đó là bản sắc mà chúng tôi theo đuổi.',
    attribution: 'Tổng Giám đốc Newtecons',
  },
  'Nội bộ': {
    text:
      'Chúng tôi tin rằng con người là tài sản lớn nhất của Newtecons — mỗi chương trình đào tạo đều là một khoản đầu tư cho tương lai của Tổng thầu.',
    attribution: 'Giám đốc Nhân sự Newtecons',
  },
  'Hoạt động CSR': {
    text:
      'Người lao động và cộng đồng quanh công trường là một phần không thể tách rời của Newtecons — đó là lý do hoạt động xã hội luôn đi cùng hoạt động kinh doanh.',
    attribution: 'Ban Lãnh đạo Newtecons',
  },
  'Sự kiện': {
    text:
      'Mỗi sự kiện là một dịp để đội ngũ Newtecons cùng nhau nhìn lại, chia sẻ và tiếp thêm năng lượng cho hành trình phía trước.',
    attribution: 'Ban Truyền thông Newtecons',
  },
}

const STATS_BY_CAT = {
  'Tin dự án': [
    { k: '120.000', u: 'm³', v: 'Khối lượng bê tông dự kiến' },
    { k: '4', u: 'ha', v: 'Diện tích triển khai' },
    { k: '3', u: 'tầng', v: 'Kết cấu phần hầm' },
    { k: 'Q4', u: '2025', v: 'Mốc hoàn thành' },
  ],
  'Giải thưởng': [
    { k: 'Top 10', u: '2024', v: 'Xếp hạng Nhà thầu uy tín' },
    { k: '45', u: 'điểm', v: 'Điểm năng lực tài chính' },
    { k: '92%', u: '', v: 'Độ hài lòng Chủ đầu tư' },
    { k: '20', u: 'năm', v: 'Hành trình tích luỹ' },
  ],
  'Tin công ty': [
    { k: '18', u: 'tỉnh', v: 'Địa bàn đang hoạt động' },
    { k: '6.500+', u: '', v: 'Kỹ sư & công nhân kỹ thuật' },
    { k: '120+', u: 'dự án', v: 'Đang triển khai & bàn giao' },
    { k: '2027', u: '', v: 'Mốc chiến lược trung hạn' },
  ],
  'Nội bộ': [
    { k: '80+', u: 'học viên', v: 'Quy mô khoá đầu tiên' },
    { k: '32', u: 'chuyên đề', v: 'Nội dung đào tạo cốt lõi' },
    { k: '12', u: 'giảng viên', v: 'Chuyên gia tham gia' },
    { k: '6', u: 'tháng', v: 'Thời lượng chương trình' },
  ],
  'Hoạt động CSR': [
    { k: '24', u: 'căn', v: 'Mái ấm trao tặng năm 2024' },
    { k: '5 tỷ', u: 'VNĐ', v: 'Tổng ngân sách tài trợ' },
    { k: '18', u: 'công trường', v: 'Địa bàn hưởng ứng' },
    { k: '6.000+', u: 'người', v: 'Đối tượng thụ hưởng' },
  ],
  'Sự kiện': [
    { k: '18', u: 'công trường', v: 'Tham gia đồng loạt' },
    { k: '6.000+', u: 'người', v: 'Nhân sự tham dự' },
    { k: '12', u: 'phiên', v: 'Chuyên đề & gian trình diễn' },
    { k: '100%', u: '', v: 'Hoàn thành mục tiêu đề ra' },
  ],
}

const FACTS_BY_CAT = {
  'Tin dự án': (a) => [
    { label: 'Chủ đầu tư', value: a.tags[1] || 'Đối tác chiến lược' },
    { label: 'Vai trò', value: 'Tổng thầu thi công' },
    { label: 'Khởi công', value: a.date },
    { label: 'Địa điểm', value: 'Việt Nam' },
  ],
  'Giải thưởng': () => [
    { label: 'Đơn vị trao giải', value: 'Tổ chức xếp hạng độc lập' },
    { label: 'Hạng mục', value: 'Nhà thầu xây dựng uy tín' },
    { label: 'Phạm vi', value: 'Toàn quốc' },
    { label: 'Năm', value: '2024' },
  ],
  'Tin công ty': () => [
    { label: 'Tổ chức', value: 'Newtecons' },
    { label: 'Phạm vi', value: 'Toàn hệ thống' },
    { label: 'Giai đoạn', value: '2024 – 2027' },
    { label: 'Định hướng', value: 'Đa ngành' },
  ],
  'Nội bộ': () => [
    { label: 'Đơn vị tổ chức', value: 'Phòng Nhân sự' },
    { label: 'Đối tượng', value: 'Kỹ sư & quản lý' },
    { label: 'Địa điểm', value: 'Newtecons Tower' },
    { label: 'Hình thức', value: 'Kết hợp offline' },
  ],
  'Hoạt động CSR': () => [
    { label: 'Chương trình', value: 'Mái ấm người lao động' },
    { label: 'Đối tác', value: 'Công đoàn Newtecons' },
    { label: 'Năm thứ', value: 'Thường niên' },
    { label: 'Phạm vi', value: 'Toàn quốc' },
  ],
  'Sự kiện': () => [
    { label: 'Tổ chức', value: 'Newtecons' },
    { label: 'Quy mô', value: 'Toàn hệ thống' },
    { label: 'Phạm vi', value: 'Đa công trường' },
    { label: 'Hình thức', value: 'Trực tiếp' },
  ],
}

function buildDetail(a) {
  const seed = hashSlug(a.slug)
  const gallery = pickGallery(a.image, seed)
  return {
    sections: sectionsForCategory(a),
    quote: QUOTE_BY_CAT[a.category] || QUOTE_BY_CAT['Tin công ty'],
    stats: STATS_BY_CAT[a.category] || STATS_BY_CAT['Tin công ty'],
    facts: (FACTS_BY_CAT[a.category] || FACTS_BY_CAT['Tin công ty'])(a),
    gallery,
  }
}

// ============================================================
// ARTICLES — base metadata (image, slug, category, date, …)
// detail được gắn tự động qua withDetail()
// ============================================================

function withDetail(article) {
  return { ...article, detail: buildDetail(article) }
}

const FEATURED_BASE = {
  id: 'lumiere-evergreen-tong-thau-ngam',
  slug: 'lumiere-evergreen-tong-thau-ngam',
  image: c05,
  category: 'Tin dự án',
  date: '28/12/2024',
  author: 'Phòng Truyền thông Newtecons',
  readTime: '6 phút đọc',
  title: 'Newtecons trúng thầu gói công tác ngầm siêu dự án Lumière Evergreen',
  excerpt:
    'Ngày 28/12/2024, Newtecons chính thức ký kết hợp đồng Tổng thầu gói công tác ngầm với chủ đầu tư Masterise Homes, tiếp tục khẳng định năng lực triển khai các siêu dự án quy mô lớn.',
  tags: ['Lumière Evergreen', 'Masterise Homes', 'Tổng thầu', 'Phần ngầm'],
}

export const FEATURED = withDetail(FEATURED_BASE)

export const FEATURED_SUB = [
  {
    id: 'masteri-co-loa-khoi-cong',
    slug: 'masteri-co-loa-khoi-cong',
    image: c07,
    category: 'Tin dự án',
    date: '20/12/2024',
    author: 'Phòng Truyền thông Newtecons',
    readTime: '4 phút đọc',
    title: 'Lễ khởi công dự án Masteri Cổ Loa — dấu mốc cho hệ sinh thái BĐS phía Bắc',
    excerpt:
      'Sáng 20/12/2024, Lễ khởi công dự án Masteri Cổ Loa được tổ chức trọng thể tại Đông Anh, Hà Nội, đánh dấu bước tiến quan trọng của Newtecons tại thị trường phía Bắc.',
    tags: ['Masteri Cổ Loa', 'Khởi công', 'Hà Nội'],
  },
  {
    id: 'top10-nha-thau-uy-tin-2024',
    slug: 'top10-nha-thau-uy-tin-2024',
    image: c10,
    category: 'Giải thưởng',
    date: '12/12/2024',
    author: 'Phòng Truyền thông Newtecons',
    readTime: '3 phút đọc',
    title: 'Newtecons đạt Top 10 Nhà thầu Xây dựng uy tín Việt Nam năm 2024',
    excerpt:
      'Newtecons vinh dự được Vietnam Report xếp hạng Top 10 Nhà thầu Xây dựng uy tín năm 2024 — ghi nhận cho hành trình tăng trưởng bền vững và chất lượng thi công cam kết.',
    tags: ['Giải thưởng', 'Top 10', 'Vietnam Report'],
  },
  {
    id: 'newtecons-academy-ra-mat',
    slug: 'newtecons-academy-ra-mat',
    image: sub3,
    category: 'Nội bộ',
    date: '05/12/2024',
    author: 'Phòng Nhân sự Newtecons',
    readTime: '4 phút đọc',
    title: 'Ra mắt phòng đào tạo nội bộ Newtecons Academy tại tòa nhà Newtecons Tower',
    excerpt:
      'Newtecons Academy được thành lập nhằm chuẩn hoá năng lực đội ngũ kỹ sư và chỉ huy trưởng, tiếp tục nâng cấp "tài sản con người" của công ty.',
    tags: ['Đào tạo', 'Academy', 'Nội bộ'],
  },
].map(withDetail)

export const NEWS_LIST = [
  {
    id: 'lumiere-evergreen-chuan-song',
    slug: 'lumiere-evergreen-chuan-song',
    image: c01,
    category: 'Tin dự án',
    date: '02/12/2024',
    author: 'Phòng Truyền thông Newtecons',
    readTime: '5 phút đọc',
    title: 'Newtecons và Masterise Homes cùng hướng đến chuẩn sống quốc tế tại LUMIÈRE Evergreen',
    excerpt:
      'Sự hợp tác giữa Newtecons và Masterise Homes tại LUMIÈRE Evergreen hướng đến việc thiết lập chuẩn sống quốc tế cho cư dân phía Tây Thủ đô.',
    tags: ['LUMIÈRE', 'Chuẩn quốc tế', 'Masterise Homes'],
  },
  {
    id: 'stronger-greater-20-nam',
    slug: 'stronger-greater-20-nam',
    image: c02,
    category: 'Tin công ty',
    date: '28/11/2024',
    author: 'Phòng Truyền thông Newtecons',
    readTime: '7 phút đọc',
    title: 'Stronger Greater — Hành trình 20 năm của Tổng thầu xây dựng Newtecons',
    excerpt:
      'Nhìn lại hành trình 20 năm từ nhà thầu phụ đến tổng thầu quy mô lớn — những dấu mốc, bài học và định hướng phát triển của Newtecons.',
    tags: ['20 năm', 'Chiến lược', 'Lịch sử'],
  },
  {
    id: 'lumiere-riverside-ban-giao',
    slug: 'lumiere-riverside-ban-giao',
    image: c03,
    category: 'Tin dự án',
    date: '20/11/2024',
    author: 'Phòng Truyền thông Newtecons',
    readTime: '4 phút đọc',
    title: 'Newtecons bàn giao đúng tiến độ tòa căn hộ cao cấp LUMIÈRE Riverside tại TP.HCM',
    excerpt:
      'Việc bàn giao đúng tiến độ LUMIÈRE Riverside là cam kết chất lượng và tiến độ đặc trưng của Newtecons dành cho Masterise Homes.',
    tags: ['Bàn giao', 'LUMIÈRE Riverside', 'Masterise Homes'],
  },
  {
    id: 'phu-my-iii-khoi-cong',
    slug: 'phu-my-iii-khoi-cong',
    image: c04,
    category: 'Tin dự án',
    date: '15/11/2024',
    author: 'Phòng Truyền thông Newtecons',
    readTime: '5 phút đọc',
    title: 'Khởi công nhà xưởng công nghiệp Phú Mỹ III — bước tiến mới trong mảng công nghiệp',
    excerpt:
      'Gói thầu Phú Mỹ III mở rộng năng lực của Newtecons trong mảng xây dựng công nghiệp quy mô lớn tại Đông Nam Bộ.',
    tags: ['Công nghiệp', 'Phú Mỹ', 'Khởi công'],
  },
  {
    id: 'dai-hoi-co-dong-2024',
    slug: 'dai-hoi-co-dong-2024',
    image: c05,
    category: 'Tin công ty',
    date: '08/11/2024',
    author: 'Ban Thư ký',
    readTime: '4 phút đọc',
    title: 'Đại hội đồng cổ đông thường niên Newtecons 2024: Khẳng định chiến lược đa ngành',
    excerpt:
      'ĐHĐCĐ 2024 thống nhất chiến lược phát triển đa ngành — xây dựng, cơ điện và công nghiệp — giai đoạn 2024–2027.',
    tags: ['ĐHĐCĐ', 'Chiến lược'],
  },
  {
    id: 'cao-toc-ben-luc-long-thanh',
    slug: 'cao-toc-ben-luc-long-thanh',
    image: c06,
    category: 'Tin dự án',
    date: '30/10/2024',
    author: 'Phòng Truyền thông Newtecons',
    readTime: '6 phút đọc',
    title: 'Lễ khởi công gói thầu cao tốc Bến Lức — Long Thành phân đoạn Newtecons phụ trách',
    excerpt:
      'Newtecons chính thức nhận bàn giao mặt bằng và khởi công phân đoạn cao tốc Bến Lức — Long Thành với cam kết đảm bảo tiến độ quốc gia.',
    tags: ['Hạ tầng', 'Bến Lức — Long Thành', 'Giao thông'],
  },
  {
    id: 'mai-am-nguoi-lao-dong-2024',
    slug: 'mai-am-nguoi-lao-dong-2024',
    image: c07,
    category: 'Hoạt động CSR',
    date: '22/10/2024',
    author: 'Phòng Hành chính — Công đoàn',
    readTime: '3 phút đọc',
    title: 'Newtecons đồng hành cùng chương trình "Mái ấm cho người lao động" 2024',
    excerpt:
      'Chương trình "Mái ấm" năm 2024 trao tặng 24 ngôi nhà cho người lao động Newtecons khó khăn về chỗ ở.',
    tags: ['CSR', 'Người lao động', 'Mái ấm'],
  },
  {
    id: 'san-bay-long-thanh-phan-ky-1',
    slug: 'san-bay-long-thanh-phan-ky-1',
    image: c08,
    category: 'Tin dự án',
    date: '10/10/2024',
    author: 'Phòng Truyền thông Newtecons',
    readTime: '6 phút đọc',
    title: 'Ra quân triển khai gói thầu sân bay quốc tế Long Thành — phân kỳ 1',
    excerpt:
      'Newtecons ra quân tại công trường sân bay Long Thành — phân kỳ 1, cam kết đồng hành cùng dự án trọng điểm quốc gia.',
    tags: ['Long Thành', 'Sân bay', 'Hạ tầng'],
  },
  {
    id: 'hop-tac-chien-luoc-han-quoc',
    slug: 'hop-tac-chien-luoc-han-quoc',
    image: c09,
    category: 'Tin công ty',
    date: '02/10/2024',
    author: 'Phòng Truyền thông Newtecons',
    readTime: '4 phút đọc',
    title: 'Newtecons ký kết thỏa thuận hợp tác chiến lược với đối tác Hàn Quốc',
    excerpt:
      'Ký kết MOU với đối tác Hàn Quốc mở ra cơ hội tiếp cận chuỗi cung ứng vật liệu và công nghệ thi công hiện đại.',
    tags: ['Hợp tác', 'Quốc tế', 'Hàn'],
  },
  {
    id: 'pmp-khoa-2024',
    slug: 'pmp-khoa-2024',
    image: c10,
    category: 'Nội bộ',
    date: '25/09/2024',
    author: 'Phòng Nhân sự Newtecons',
    readTime: '3 phút đọc',
    title: 'Chương trình đào tạo Giám đốc Dự án PMP khóa 2024 chính thức khởi động',
    excerpt:
      'Khoá PMP 2024 đào tạo gần 40 giám đốc dự án tiềm năng — bước kế tiếp của Newtecons Academy.',
    tags: ['Đào tạo', 'PMP', 'Academy'],
  },
  {
    id: 'ngay-hoi-an-toan-2024',
    slug: 'ngay-hoi-an-toan-2024',
    image: c11,
    category: 'Sự kiện',
    date: '18/09/2024',
    author: 'Phòng An toàn Newtecons',
    readTime: '4 phút đọc',
    title: 'Newtecons tổ chức Ngày hội An toàn vệ sinh lao động trên toàn bộ công trường',
    excerpt:
      'Ngày hội An toàn vệ sinh lao động 2024 được tổ chức đồng loạt ở 18 công trường, huy động hơn 6.000 nhân sự tham gia.',
    tags: ['An toàn', 'HSE'],
  },
  {
    id: 'iso-45001-2018',
    slug: 'iso-45001-2018',
    image: c12,
    category: 'Giải thưởng',
    date: '05/09/2024',
    author: 'Phòng Quản lý Chất lượng',
    readTime: '3 phút đọc',
    title: 'Newtecons được trao chứng nhận ISO 45001:2018 cho hệ thống quản lý an toàn',
    excerpt:
      'Chứng nhận ISO 45001:2018 đánh dấu bước chuyển từ chuẩn an toàn nội bộ lên chuẩn quốc tế được công nhận.',
    tags: ['ISO 45001', 'Chất lượng', 'An toàn'],
  },
].map(withDetail)

export const CATEGORIES = [
  { key: 'all', label: 'Tất cả' },
  { key: 'Tin công ty', label: 'Tin công ty' },
  { key: 'Tin dự án', label: 'Tin dự án' },
  { key: 'Sự kiện', label: 'Sự kiện' },
  { key: 'Giải thưởng', label: 'Giải thưởng' },
]

export const ALL_ARTICLES = [FEATURED, ...FEATURED_SUB, ...NEWS_LIST]

export function findArticleBySlug(slug) {
  return ALL_ARTICLES.find((a) => a.slug === slug) || null
}

export function getRelatedArticles(slug, limit = 3) {
  const current = findArticleBySlug(slug)
  if (!current) return NEWS_LIST.slice(0, limit)
  return ALL_ARTICLES
    .filter((a) => a.slug !== slug && a.category === current.category)
    .slice(0, limit)
    .concat(
      ALL_ARTICLES.filter((a) => a.slug !== slug && a.category !== current.category),
    )
    .slice(0, limit)
}
