import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Header from '../../../components/shared/Header/Header.jsx'
import Contact from '../../../components/shared/Contact/Contact.jsx'
import { contactData } from '../../../data/contact.js'
import SectionIndicator from '../../../components/shared/SectionIndicator/SectionIndicator.jsx'
import NewsHero from '../../../components/shared/NewsDetail/NewsHero/NewsHero.jsx'
import NewsOpening from '../../../components/shared/NewsDetail/NewsOpening/NewsOpening.jsx'
import NewsQuote from '../../../components/shared/NewsDetail/NewsQuote/NewsQuote.jsx'
import NewsStats from '../../../components/shared/NewsDetail/NewsStats/NewsStats.jsx'
import NewsClosing from '../../../components/shared/NewsDetail/NewsClosing/NewsClosing.jsx'
import NewsRelated from '../../../components/shared/NewsDetail/NewsRelated/NewsRelated.jsx'
import { findArticleBySlug, getRelatedArticles } from '../../../data/news.js'
import './NewsDetail.css'

const SECTION_LABELS = ['Mở đầu', 'Giới thiệu', 'Trích dẫn', 'Con số', 'Kết luận', 'Liên quan', 'Liên hệ']
const SECTION_TONES = ['light', 'paper', 'dark', 'dark', 'paper', 'paper', 'light']
const TRANSITION_MS = 900
const PORTRAIT_QUERY = '(orientation: portrait)'

function useIsPortrait() {
  const get = () =>
    typeof window !== 'undefined' &&
    window.matchMedia(PORTRAIT_QUERY).matches
  const [p, setP] = useState(get)
  useEffect(() => {
    const mq = window.matchMedia(PORTRAIT_QUERY)
    const handler = () => setP(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return p
}

function NotFoundPage() {
  return (
    <>
      <Header variant="light" />
      <main className="nd nd--empty">
        <div className="nd__empty-box">
          <p className="nd__empty-kicker">404</p>
          <h1>Không tìm thấy bài viết</h1>
          <p className="nd__empty-text">
            Đường dẫn không tồn tại hoặc bài viết đã được gỡ. Vui lòng quay về trang Tin tức.
          </p>
          <a className="nd__empty-btn" href="/tin-tuc">Về trang Tin tức</a>
        </div>
      </main>
    </>
  )
}

export default function NewsDetail({ slug }) {
  const article = useMemo(() => findArticleBySlug(slug), [slug])
  const related = useMemo(() => getRelatedArticles(slug, 3), [slug])
  const total = SECTION_LABELS.length
  const isPortrait = useIsPortrait()

  const [index, setIndex] = useState(0)
  const lockRef = useRef(false)
  const indexRef = useRef(0)

  useEffect(() => {
    if (!isPortrait) return
    document.documentElement.classList.add('is-scroll-page')
    document.body.classList.add('is-scroll-page')
    window.scrollTo(0, 0)
    return () => {
      document.documentElement.classList.remove('is-scroll-page')
      document.body.classList.remove('is-scroll-page')
    }
  }, [isPortrait, slug])

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

  // reset về section 0 khi đổi bài
  useEffect(() => {
    indexRef.current = 0
    setIndex(0)
  }, [slug])

  useEffect(() => {
    if (!article || isPortrait) return
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
  }, [article, goTo, total, isPortrait])

  if (!article) return <NotFoundPage />

  const { sections, quote, stats, facts, gallery } = article.detail
  const tags = article.tags || []
  // S2 = sections 0+1 ; S5 = sections 2+3
  const openingSecs = sections.slice(0, 2)
  const closingSecs = sections.slice(2, 4)

  return (
    <>
      <Header variant={isPortrait ? 'default' : index === 0 ? 'dark' : 'default'} />
      <div
        className={isPortrait ? 'nd-scroll-root' : 'fullpage'}
        style={isPortrait ? undefined : { transform: `translateY(-${index * 100}vh)` }}
      >
        {/* S1 */}
        <NewsHero
          article={article}
          active={isPortrait || index === 0}
          crumb={
            <>
              <a href="/">Trang chủ</a>
              <span className="sep" aria-hidden>/</span>
              <a href="/tin-tuc">Tin tức</a>
              <span className="sep" aria-hidden>/</span>
              <span className="current">{article.category}</span>
            </>
          }
        />

        {/* S2 */}
        <NewsOpening
          sections={openingSecs}
          facts={facts}
          active={isPortrait || index === 1}
          subtitle="Hai phần đầu của bài viết đưa bạn vào ngữ cảnh dự án và những nội dung then chốt được Newtecons công bố."
        />

        {/* S3 */}
        <NewsQuote
          text={quote.text}
          attribution={quote.attribution}
          bgImage={gallery?.[0]}
          active={isPortrait || index === 2}
        />

        {/* S4 */}
        <NewsStats
          items={stats}
          active={isPortrait || index === 3}
          subtitle={`Những con số minh hoạ sức vóc của ${article.category.toLowerCase()} mà Newtecons đang triển khai.`}
        />

        {/* S5 */}
        <NewsClosing
          sections={closingSecs}
          figure={gallery?.[1]}
          figureCaption={article.title}
          tags={tags}
          shareTitle={article.title}
          active={isPortrait || index === 4}
        />

        {/* S6 */}
        <NewsRelated articles={related} active={isPortrait || index === 5} />

        {/* ============================================================
            S7 — CONTACT
            ============================================================ */}
        <Contact {...contactData} />
      </div>

      {!isPortrait && (
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
