// Furutec — Contact section data
// Mirror shape của src/data/contact.js (Newtecons) để dùng chung Contact component.

import visualMain from '../../../assets/images/furutec/slides/page-37.png'

export const furutecContactData = {
  ariaLabel: 'Thông tin liên hệ Furutec Việt Nam',
  visualImage: visualMain,
  visualAlt: '',
  titleTop: 'THÔNG TIN',
  titleStrong: 'LIÊN HỆ',
  groupTitle: 'LIÊN HỆ VỚI CHÚNG TÔI',
  subTitle: 'Đại diện kinh doanh',
  subTitleTail: 'tại Việt Nam',
  copyright: '© 2026 Furutec Electrical Sdn Bhd — A member of EITA Resources Berhad.',

  offices: [
    {
      label: 'Trụ sở chính (Malaysia)',
      body: 'Furutec Electrical Sdn Bhd, Plot 89 Lorong Perindustrian Bukit Minyak 11, Kawasan Perindustrian Bukit Minyak MK13, 14100 Seberang Perai Tengah, Penang, Malaysia',
    },
    {
      label: 'Văn phòng đại diện Việt Nam',
      body: 'Liên hệ trực tiếp đại diện kinh doanh để được tư vấn báo giá và giải pháp busduct cho dự án.',
    },
  ],

  primaryContacts: [
    { label: 'Hotline VN', value: '(+84) 906 139 089', href: 'tel:+84906139089' },
    { label: 'Hotline phụ', value: '(+84) 772 011 180', href: 'tel:+84772011180' },
    {
      label: 'Email',
      value: 'trungdang@furutec.com.my',
      href: 'mailto:trungdang@furutec.com.my',
    },
    { label: 'Website', value: 'www.furutec.com.my', href: 'https://www.furutec.com.my' },
  ],

  procurementContacts: [
    { label: 'Phụ trách kinh doanh', value: 'Mr. Trung Dang', href: 'mailto:trungdang@furutec.com.my' },
    { label: 'Email kỹ thuật', value: 'trungdang@furutec.com.my', href: 'mailto:trungdang@furutec.com.my' },
  ],

  socials: [
    { type: 'facebook', href: '#', label: 'Facebook' },
    { type: 'youtube', href: '#', label: 'YouTube' },
  ],
}
