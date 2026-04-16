import { useCallback, useEffect, useRef, useState } from 'react'
import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import About from './components/About/About.jsx'
import Achievements from './components/Achievements/Achievements.jsx'
import Fields from './components/Fields/Fields.jsx'
import Projects from './components/Projects/Projects.jsx'
import News from './components/News/News.jsx'
import Contact from './components/Contact/Contact.jsx'
import SectionIndicator from './components/SectionIndicator/SectionIndicator.jsx'

const SECTION_LABELS = [
  'Banner',
  'Giới thiệu',
  'Thành tựu',
  'Lĩnh vực',
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

const TRANSITION_MS = 900

export default function App() {
  const total = SECTION_LABELS.length
  const [index, setIndex] = useState(0)
  const lockRef = useRef(false)
  const indexRef = useRef(0)

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

  useEffect(() => {
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
  }, [goTo, total])

  return (
    <>
      <Header />
      <div
        className="fullpage"
        style={{ transform: `translateY(-${index * 100}vh)` }}
      >
        <Hero />
        <About />
        <Achievements />
        <Fields />
        <Projects />
        <News />
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
