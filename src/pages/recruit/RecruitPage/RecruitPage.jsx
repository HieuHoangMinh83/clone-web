import Header from '../../../components/shared/Header/Header.jsx'
import Contact from '../../../components/shared/Contact/Contact.jsx'
import SectionIndicator from '../../../components/shared/SectionIndicator/SectionIndicator.jsx'
import useFullpageScroll from '../../../components/intro/useFullpageScroll.js'
import RecruitBanner from '../../../components/recruit/RecruitPage/RecruitBanner/RecruitBanner.jsx'
import RecruitWhy from '../../../components/recruit/RecruitPage/RecruitWhy/RecruitWhy.jsx'
import RecruitLife from '../../../components/recruit/RecruitPage/RecruitLife/RecruitLife.jsx'
import RecruitJobs from '../../../components/recruit/RecruitPage/RecruitJobs/RecruitJobs.jsx'
import '../../../components/recruit/RecruitPage/recruit-shared.css'
import { contactData } from '../../../data/contact.js'
import { RECRUIT_PAGE } from '../../../data/recruit.js'

const { sectionLabels: SECTION_LABELS, sectionTones: SECTION_TONES } = RECRUIT_PAGE

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
        <Contact {...contactData} />
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
