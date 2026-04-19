import { useCallback, useEffect, useRef, useState } from 'react'
import Header from '../../components/shared/Header/Header.jsx'
import Hero from './Hero/Hero.jsx'
import About from './About/About.jsx'
import Achievements from './Achievements/Achievements.jsx'
import Fields from './Fields/Fields.jsx'
import Projects from './Projects/Projects.jsx'
import NewsFeatured from '../../components/shared/NewsFeatured/NewsFeatured.jsx'
import Contact from '../../components/shared/Contact/Contact.jsx'
import SectionIndicator from '../../components/shared/SectionIndicator/SectionIndicator.jsx'

const SECTION_LABELS = [
  'Banner',
  'Giới thiệu',
  'Thành tựu',
  'Dự án',
  'Tin tức',
  'Liên hệ',
]

/* Tone chỉ số indicator theo nền section:
   light = chữ trắng trên nền tối (active blue)
   dark  = chữ nâu-vàng trên nền sáng (active navy)
   gold  = chữ trắng trên nền tối, active vàng */
const SECTION_TONES = [
  'light', // Hero — navy carousel
  'light', // About — chữ trắng trên tile ảnh tối bên phải
  'paper', // Achievements — trắng, accent đỏ
  'light', // Fields — nền navy-dark, chữ trắng
  'light', // Projects — nền navy-dark, chữ trắng
  'paper', // News — white paper, xanh + xám nhạt
  'light', // Contact — navy
]

/* Header có 2 loại: 'default' = có gradient mầu xanh, 'transparent' = không mầu.
   Set true cho slide muốn tắt gradient. */
const NAV_TRANSPARENT = [
  false, // 0 Banner
  false, // 1 Giới thiệu
  false, // 2 Thành tựu
  false, // 3 Dự án
  false, // 4 Tin tức
  false, // 5 Liên hệ
]

const TRANSITION_MS = 900
/* Slide mode bật ở landscape (ngang) và desktop ≥1200px.
   Portrait (iPad dựng đứng, mobile) → scroll thường dùng config tablet riêng. */
const SLIDE_BREAKPOINT = '(orientation: landscape), (min-width: 1200px)'

export default function HomePage() {
  const total = SECTION_LABELS.length
  const [index, setIndex] = useState(0)
  // Slide mode chỉ bật khi viewport >= tablet. Mobile dùng scroll thường.
  const [isSlide, setIsSlide] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia(SLIDE_BREAKPOINT).matches
  })
  const lockRef = useRef(false)
  const indexRef = useRef(0)

  // Theo dõi resize → switch slide/scroll mode
  useEffect(() => {
    const mq = window.matchMedia(SLIDE_BREAKPOINT)
    const handler = (e) => {
      setIsSlide(e.matches)
      if (!e.matches) {
        // Reset index khi xuống mobile để tránh state stale
        indexRef.current = 0
        setIndex(0)
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Toggle body class — bật scroll thường khi không phải slide mode
  useEffect(() => {
    if (isSlide) return
    document.body.classList.add('is-scroll-page')
    document.documentElement.classList.add('is-scroll-page')
    return () => {
      document.body.classList.remove('is-scroll-page')
      document.documentElement.classList.remove('is-scroll-page')
    }
  }, [isSlide])

  const goTo = useCallback(
    (target) => {
      const next = Math.max(0, Math.min(total - 1, target))
      if (next === indexRef.current) return
      indexRef.current = next
      setIndex(next)
      lockRef.current = true
      window.setTimeout(() => {
        lockRef.current = false
      }, TRANSITION_MS)
    },
    [total],
  )

  // Wheel / key / touch handlers — chỉ attach khi slide mode
  useEffect(() => {
    if (!isSlide) return

    const onWheel = (e) => {
      e.preventDefault()
      if (lockRef.current) return
      if (Math.abs(e.deltaY) < 10) return
      goTo(indexRef.current + (e.deltaY > 0 ? 1 : -1))
    }

    const onKey = (e) => {
      if (lockRef.current) return
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault()
        goTo(indexRef.current + 1)
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        goTo(indexRef.current - 1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        goTo(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goTo(total - 1)
      }
    }

    let touchStartY = 0
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }
    const onTouchEnd = (e) => {
      if (lockRef.current) return
      const dy = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(dy) < 50) return
      goTo(indexRef.current + (dy > 0 ? 1 : -1))
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [isSlide, goTo, total])

  return (
    <>
      <Header variant={NAV_TRANSPARENT[index] ? 'transparent' : 'default'} />
      <div
        className={`fullpage ${isSlide ? 'fullpage--slide' : 'fullpage--scroll'}`}
        style={isSlide ? { transform: `translateY(-${index * 100}vh)` } : undefined}
      >
        <Hero />
        <About />
        <Achievements />
        {/* <Fields /> */}
        <Projects />
        <NewsFeatured />
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
