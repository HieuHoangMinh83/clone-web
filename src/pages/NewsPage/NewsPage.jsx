import { useEffect, useState } from 'react'
import Header from '../../components/shared/Header/Header.jsx'
import Contact from '../../components/shared/Contact/Contact.jsx'
import SectionIndicator from '../../components/shared/SectionIndicator/SectionIndicator.jsx'
import useFullpageScroll from '../../components/shared/useFullpageScroll.js'
import NewsBanner from './NewsBanner/NewsBanner.jsx'
import NewsFeatured from '../../components/shared/NewsFeatured/NewsFeatured.jsx'
import NewsGrid from './NewsGrid/NewsGrid.jsx'
import './NewsPage.css'

const SECTION_LABELS = ['Banner', 'Nổi bật', 'Tin tức', 'Liên hệ']
const SECTION_TONES = ['light', 'paper', 'paper', 'light']

/* Slide mode chỉ bật khi viewport đang landscape (ngang).
   Portrait (dọc — iPad dựng đứng, mobile) → scroll thường. */
const SLIDE_QUERY = '(orientation: landscape)'

export default function NewsPage() {
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
        <NewsBanner />
        <NewsFeatured />
        <NewsGrid />
        <Contact />
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
