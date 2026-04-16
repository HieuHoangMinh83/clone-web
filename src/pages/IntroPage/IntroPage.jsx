import { useCallback, useEffect, useRef, useState } from 'react'
import Header from '../../components/Header/Header.jsx'
import SectionIndicator from '../../components/SectionIndicator/SectionIndicator.jsx'
import IntroBanner from './sections/IntroBanner.jsx'
import IntroChairman from './sections/IntroChairman.jsx'
import IntroHistory from './sections/IntroHistory.jsx'
import IntroVisionMission from './sections/IntroVisionMission.jsx'
import IntroValues from './sections/IntroValues.jsx'
import IntroBoard from './sections/IntroBoard.jsx'
import IntroManagers from './sections/IntroManagers.jsx'
import IntroPartners from './sections/IntroPartners.jsx'
import Contact from '../../components/Contact/Contact.jsx'
import './IntroPage.css'

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

const TRANSITION_MS = 900

export default function IntroPage() {
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
