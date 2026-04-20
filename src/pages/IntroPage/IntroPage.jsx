import { useEffect, useState } from 'react'
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
import { introData } from '../../data/intro.js'
import { contactData } from '../../data/contact.js'

/* Slide mode chỉ bật khi viewport đang landscape (ngang).
   Portrait (dọc — iPad dựng đứng, mobile) → scroll thường. */
const SLIDE_QUERY = '(orientation: landscape)'

export default function IntroPage() {
  const { page, banner, chairman, history, visionMission, values, board, managers, partners } = introData
  const total = page.sectionLabels.length
  const [isSlide, setIsSlide] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia(SLIDE_QUERY).matches
  })
  const { index, goTo, setIndex } = useFullpageScroll(total, isSlide)

  useEffect(() => {
    const mq = window.matchMedia(SLIDE_QUERY)
    const handler = (e) => {
      setIsSlide(e.matches)
      if (!e.matches) setIndex(0)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [setIndex])

  useEffect(() => {
    if (isSlide) return
    document.body.classList.add('is-scroll-page')
    document.documentElement.classList.add('is-scroll-page')
    return () => {
      document.body.classList.remove('is-scroll-page')
      document.documentElement.classList.remove('is-scroll-page')
    }
  }, [isSlide])

  return (
    <>
      <Header variant={page.navTransparent[index] ? 'transparent' : 'default'} />
      <div
        className={`fullpage ${isSlide ? 'fullpage--slide' : 'fullpage--scroll'}`}
        style={isSlide ? { transform: `translateY(-${index * 100}vh)` } : undefined}
      >
        <IntroBanner {...banner} />
        <IntroChairman {...chairman} />
        <IntroHistory {...history} />
        <IntroVisionMission {...visionMission} />
        <IntroValues {...values} />
        <IntroBoard {...board} />
        <IntroManagers {...managers} />
        <IntroPartners {...partners} />
        <Contact {...contactData} />
      </div>
      {isSlide && (
        <SectionIndicator
          current={index}
          total={total}
          onNav={goTo}
          labels={page.sectionLabels}
          tone={page.sectionTones[index]}
        />
      )}
    </>
  )
}
