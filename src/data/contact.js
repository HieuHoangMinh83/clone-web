// Contact section data — dùng chung trên mọi page có footer liên hệ.
// Đổi logo/địa chỉ/số điện thoại: chỉ sửa file này.

import visualMain from '../assets/images/contact/visual-main.png'

export const contactData = {
  ariaLabel: 'Thông tin liên hệ',
  visualImage: visualMain,
  visualAlt: '',
  titleTop: 'THÔNG TIN',
  titleStrong: 'LIÊN HỆ',
  groupTitle: 'LIÊN HỆ VỚI CHÚNG TÔI',
  subTitle: 'Thông tin bộ phận',
  subTitleTail: 'CDM (Procurement)',
  copyright: '© 2021 Newtecons. All rights reserved.',

  offices: [
    {
      label: 'Trụ sở',
      body: 'Newtecons Tower, 96 Đường Phan Đăng Lưu, Phường Đài Nhuận, Thành phố Hồ Chí Minh',
    },
    {
      label: 'Văn phòng đại diện tại Hà Nội',
      body: 'Căn số LC2A, Khu nhà ở thấp tầng AT17, Khu đô thị Embassy Garden, Đường Hoàng Minh Thảo, Phường Xuân Đỉnh, Thành phố Hà Nội',
    },
  ],

  primaryContacts: [
    { label: 'Hotline', value: '(+84) 28 3514 6699', href: 'tel:+842835146699' },
    { label: 'Email', value: 'contact@newtecons.vn', href: 'mailto:contact@newtecons.vn' },
    { label: 'Email Phòng Đầu tư', value: 'tender@newtecons.vn', href: 'mailto:tender@newtecons.vn' },
  ],

  procurementContacts: [
    { label: 'Hotline', value: '0909 683 666', href: 'tel:0909683666' },
    { label: 'Email', value: 'procurement_cm@newtecons.vn', href: 'mailto:procurement_cm@newtecons.vn' },
  ],

  socials: [
    { type: 'facebook', href: '#', label: 'Facebook' },
    { type: 'instagram', href: '#', label: 'Instagram' },
    { type: 'youtube', href: '#', label: 'YouTube' },
  ],
}
