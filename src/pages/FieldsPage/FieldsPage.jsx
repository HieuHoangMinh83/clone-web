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
import { fieldsData } from '../../data/fields.js'

/* Slide mode chỉ bật khi viewport landscape.
   Portrait (iPad dọc, mobile) → scroll thường. */
const SLIDE_QUERY = '(orientation: landscape)'

export default function FieldsPage() {
  const { page, banner, db, construction, mep, safety, hr, equipment, iso, outro } = fieldsData
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
        <FieldsBanner       active={index === 0} isSlide={isSlide} {...banner} />
        <FieldsDB           active={index === 1} isSlide={isSlide} {...db} />
        <FieldsConstruction active={index === 2} isSlide={isSlide} {...construction} />
        <FieldsMEP          active={index === 3} isSlide={isSlide} {...mep} />
        <FieldsSafety       active={index === 4} isSlide={isSlide} {...safety} />
        <FieldsHR           active={index === 5} isSlide={isSlide} {...hr} />
        <FieldsEquipment    active={index === 6} isSlide={isSlide} {...equipment} />
        <FieldsISO          active={index === 7} isSlide={isSlide} {...iso} />
        <FieldsOutro        active={index === 8} isSlide={isSlide} {...outro} />
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
