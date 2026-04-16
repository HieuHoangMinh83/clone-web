import { useCallback, useEffect, useRef, useState } from 'react'
import Header from '../../components/Header/Header.jsx'
import SectionIndicator from '../../components/SectionIndicator/SectionIndicator.jsx'
import FieldsBanner from './sections/FieldsBanner.jsx'
import FieldsDB from './sections/FieldsDB.jsx'
import FieldsPanel from './sections/FieldsPanel.jsx'
import FieldsOutro from './sections/FieldsOutro.jsx'
import { FIELDS_DATA } from './fieldsData.js'
import './FieldsPage.css'

const SECTION_LABELS = [
  'Banner',
  'Tổng thầu D&B',
  'Dân dụng',
  'Công nghiệp',
  'Hạ tầng',
  'Cơ điện',
  'Nội thất',
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
  'light',
]

const TRANSITION_MS = 900

export default function FieldsPage() {
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
      <a className="intro-home-link" href="#/" aria-label="Về trang chủ">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5" strokeLinecap="round" />
          <path d="M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Trang chủ</span>
      </a>
      <div
        className="fullpage"
        style={{ transform: `translateY(-${index * 100}vh)` }}
      >
        <FieldsBanner active={index === 0} />
        <FieldsDB active={index === 1} />
        {FIELDS_DATA.map((f, i) => (
          <FieldsPanel
            key={f.id}
            field={f}
            index={i + 1}
            total={FIELDS_DATA.length}
            active={index === i + 2}
            reversed={i % 2 === 1}
          />
        ))}
        <FieldsOutro active={index === total - 1} />
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
