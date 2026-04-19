import { useEffect, useState } from 'react'
import Header from '../../components/shared/Header/Header.jsx'
import SectionIndicator from '../../components/shared/SectionIndicator/SectionIndicator.jsx'
import useFullpageScroll from '../../components/intro/useFullpageScroll.js'
import FieldsBanner from '../../components/fields/FieldsBanner/FieldsBanner.jsx'
import FieldsDB from '../../components/fields/FieldsDB/FieldsDB.jsx'
import FieldsConstruction from '../../components/fields/FieldsConstruction/FieldsConstruction.jsx'
import FieldsMEP from '../../components/fields/FieldsMEP/FieldsMEP.jsx'
import FieldsSafety from '../../components/fields/FieldsSafety/FieldsSafety.jsx'
import FieldsHR from '../../components/fields/FieldsHR/FieldsHR.jsx'
import FieldsEquipment from '../../components/fields/FieldsEquipment/FieldsEquipment.jsx'
import FieldsISO from '../../components/fields/FieldsISO/FieldsISO.jsx'
import FieldsOutro from '../../components/fields/FieldsOutro/FieldsOutro.jsx'
import '../../components/fields/fields-shared.css'

const SECTION_LABELS = [
  'Banner',
  'Tổng thầu D&B',
  'Xây dựng',
  'Cơ điện',
  'An toàn',
  'Nhân lực',
  'Thiết bị',
  'Chứng nhận',
  'Liên hệ',
]

const SECTION_TONES = [
  'light',
  'paper',
  'light',
  'light',
  'light',
  'light',
  'light',
  'paper',
  'light',
]

/* Slide mode chỉ bật khi viewport landscape.
   Portrait (iPad dọc, mobile) → scroll thường. */
const SLIDE_QUERY = '(orientation: landscape)'

export default function FieldsPage() {
  const total = SECTION_LABELS.length
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
      <Header />
      <div
        className={`fullpage ${isSlide ? 'fullpage--slide' : 'fullpage--scroll'}`}
        style={isSlide ? { transform: `translateY(-${index * 100}vh)` } : undefined}
      >
        <FieldsBanner active={index === 0} isSlide={isSlide} />
        <FieldsDB active={index === 1} isSlide={isSlide} />
        <FieldsConstruction active={index === 2} isSlide={isSlide} />
        <FieldsMEP active={index === 3} isSlide={isSlide} />
        <FieldsSafety active={index === 4} isSlide={isSlide} />
        <FieldsHR active={index === 5} isSlide={isSlide} />
        <FieldsEquipment active={index === 6} isSlide={isSlide} />
        <FieldsISO active={index === 7} isSlide={isSlide} />
        <FieldsOutro active={index === 8} isSlide={isSlide} />
      </div>
      {isSlide && (
        <SectionIndicator
          current={index}
          total={total}
          onNav={goTo}
          labels={SECTION_LABELS}
          tone={SECTION_TONES[index]}
        />
      )}
    </>
  )
}
