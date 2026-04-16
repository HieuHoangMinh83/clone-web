import imgCivil from '../../assets/images/fields/civil.jpg'
import imgIndustrial from '../../assets/images/fields/industrial.jpg'
import imgInfra from '../../assets/images/fields/infrastructure.jpg'
import imgMep from '../../assets/images/fields/mep.jpg'
import imgInterior from '../../assets/images/fields/interior.jpg'
import imgFigmaTower from '../../assets/images/fields/figma-f1-tower.png'
import imgFigmaCrane from '../../assets/images/fields/figma-f5-me.png'
import imgFigmaEng from '../../assets/images/fields/figma-f4.png'
import imgFigmaMe from '../../assets/images/fields/figma-f2.png'

export const FIELDS_DATA = [
  {
    id: 'civil',
    num: '01',
    name: 'Xây dựng dân dụng',
    en: 'Civil Construction',
    tag: 'Cao ốc · Chung cư · Trung tâm thương mại',
    desc: 'Tổng thầu thi công các công trình nhà ở cao tầng, văn phòng hạng A và tổ hợp thương mại — cam kết tiến độ, chất lượng và an toàn tuyệt đối.',
    stats: [
      { k: '200+', v: 'Dự án bàn giao' },
      { k: '6M m²', v: 'Tổng diện tích sàn' },
      { k: '15', v: 'Giải thưởng' },
    ],
    img: imgCivil,
    imgAlt: imgFigmaTower,
    accent: '#3681dd',
  },
  {
    id: 'industrial',
    num: '02',
    name: 'Xây dựng công nghiệp',
    en: 'Industrial Construction',
    tag: 'Nhà máy · Kho vận · Khu công nghiệp',
    desc: 'Thi công nhà máy sản xuất, trung tâm logistics và hạ tầng khu công nghiệp đạt chuẩn quốc tế cho các tập đoàn FDI hàng đầu.',
    stats: [
      { k: '80+', v: 'Nhà máy FDI' },
      { k: '24/7', v: 'Vận hành liên tục' },
      { k: 'ISO', v: 'Chuẩn quốc tế' },
    ],
    img: imgIndustrial,
    imgAlt: imgFigmaCrane,
    accent: '#1bcdd4',
  },
  {
    id: 'infra',
    num: '03',
    name: 'Hạ tầng giao thông',
    en: 'Transport Infrastructure',
    tag: 'Cầu đường · Sân bay · Cảng biển',
    desc: 'Năng lực triển khai các dự án hạ tầng trọng điểm quốc gia: cầu, đường cao tốc, sân bay, cảng biển với tiêu chuẩn kỹ thuật cao.',
    stats: [
      { k: '1.200km', v: 'Đường cao tốc' },
      { k: '40+', v: 'Cầu lớn' },
      { k: '3', v: 'Sân bay quốc tế' },
    ],
    img: imgInfra,
    imgAlt: imgFigmaEng,
    accent: '#dda969',
  },
  {
    id: 'mep',
    num: '04',
    name: 'Cơ điện công trình',
    en: 'Mechanical & Electrical (M&E)',
    tag: 'M&E · HVAC · PCCC · BMS',
    desc: 'Cung cấp giải pháp M&E trọn gói cho toà nhà thông minh: điện, HVAC, phòng cháy chữa cháy và hệ thống tự động hoá BMS.',
    stats: [
      { k: '150+', v: 'Công trình M&E' },
      { k: 'LEED', v: 'Green building' },
      { k: '99.9%', v: 'Uptime BMS' },
    ],
    img: imgMep,
    imgAlt: imgFigmaMe,
    accent: '#cb232b',
  },
  {
    id: 'interior',
    num: '05',
    name: 'Nội thất cao cấp',
    en: 'Premium Interior',
    tag: 'Kiến trúc · Thiết kế · Hoàn thiện',
    desc: 'Tư vấn kiến trúc, thiết kế và thi công nội thất cao cấp — từ penthouse, văn phòng đến khách sạn boutique đậm chất riêng.',
    stats: [
      { k: '90+', v: 'Showroom nội thất' },
      { k: '30', v: 'Studio thiết kế' },
      { k: '5★', v: 'Khách sạn' },
    ],
    img: imgInterior,
    accent: '#b07bd9',
  },
]
