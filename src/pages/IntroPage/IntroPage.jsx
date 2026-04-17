import Header from '../../components/shared/Header/Header.jsx'
import SectionIndicator from '../../components/shared/SectionIndicator/SectionIndicator.jsx'
import useFullpageScroll from '../../components/intro/useFullpageScroll.js'
import IntroBanner from '../../components/intro/IntroBanner/IntroBanner.jsx'
import IntroChairman from '../../components/intro/IntroChairman/IntroChairman.jsx'
import IntroHistory from '../../components/intro/IntroHistory/IntroHistory.jsx'
import IntroVisionMission from '../../components/intro/IntroVisionMission/IntroVisionMission.jsx'
import IntroValues from '../../components/intro/IntroValues/IntroValues.jsx'
import IntroBoard from '../../components/intro/IntroBoard/IntroBoard.jsx'
import IntroManagers from '../../components/intro/IntroManagers/IntroManagers.jsx'
import IntroPartners from '../../components/intro/IntroPartners/IntroPartners.jsx'
import Contact from '../../components/shared/Contact/Contact.jsx'
import '../../components/intro/intro-shared.css'

const SECTION_LABELS = [
  'Banner',
  'Thông điệp',
  'Lịch sử',
  'Tầm nhìn - Sứ mệnh',
  'Giá trị cốt lõi',
  'Ban điều hành',
  'Cán bộ quản lý',
  'Đối tác',
  'Liên hệ',
]

const SECTION_TONES = [
  'light',
  'light',
  'paper',
  'light',
  'light',
  'paper',
  'paper',
  'light',
  'light',
]

export default function IntroPage() {
  const total = SECTION_LABELS.length
  const { index, goTo } = useFullpageScroll(total)

  return (
    <>
      <Header />
      <div
        className="fullpage"
        style={{ transform: `translateY(-${index * 100}vh)` }}
      >
        <IntroBanner />
        <IntroChairman />
        <IntroHistory />
        <IntroVisionMission />
        <IntroValues />
        <IntroBoard />
        <IntroManagers />
        <IntroPartners />
        <Contact />
      </div>
      <SectionIndicator
        current={index}
        total={total}
        onNav={goTo}
        labels={SECTION_LABELS}
        tone={SECTION_TONES[index]}
      />
    </>
  )
}
