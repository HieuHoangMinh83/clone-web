import Header from '../../components/shared/Header/Header.jsx'
import Contact from '../../components/shared/Contact/Contact.jsx'
import SectionIndicator from '../../components/shared/SectionIndicator/SectionIndicator.jsx'
import useFullpageScroll from '../../components/shared/useFullpageScroll.js'
import RecruitBanner from './RecruitBanner/RecruitBanner.jsx'
import RecruitWhy from './RecruitWhy/RecruitWhy.jsx'
import RecruitLife from './RecruitLife/RecruitLife.jsx'
import RecruitJobs from './RecruitJobs/RecruitJobs.jsx'
import './RecruitPage.css'

const SECTION_LABELS = ['Banner', 'Vì sao', 'Đời sống', 'Vị trí', 'Liên hệ']
const SECTION_TONES = ['light', 'paper', 'light', 'paper', 'light']

export default function RecruitPage() {
  const total = SECTION_LABELS.length
  const { index, goTo } = useFullpageScroll(total)

  return (
    <>
      <Header variant={index === 0 ? 'transparent' : 'default'} />
      <div
        className="fullpage"
        style={{ transform: `translateY(-${index * 100}vh)` }}
      >
        <RecruitBanner />
        <RecruitWhy />
        <RecruitLife />
        <RecruitJobs />
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
