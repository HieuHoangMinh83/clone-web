import { useEffect, useMemo, useRef, useState } from 'react'
import Contact from '../../../../components/shared/Contact/Contact.jsx'
import NewsHero from '../../../../components/shared/NewsDetail/NewsHero/NewsHero.jsx'
import NewsOpening from '../../../../components/shared/NewsDetail/NewsOpening/NewsOpening.jsx'
import NewsQuote from '../../../../components/shared/NewsDetail/NewsQuote/NewsQuote.jsx'
import NewsStats from '../../../../components/shared/NewsDetail/NewsStats/NewsStats.jsx'
import NewsClosing from '../../../../components/shared/NewsDetail/NewsClosing/NewsClosing.jsx'
import NewsRelated from '../../../../components/shared/NewsDetail/NewsRelated/NewsRelated.jsx'
import { FEATURED, getRelatedArticles } from '../../newsData.js'
import './BlockShowcase.css'

// ============================================================
// BlockShowcase — "Thư viện khối / Quản lý component"
// Library view: grid cards với mini preview thật.
// Detail view: full-screen render khối + sidebar chuyển khối.
// ============================================================

const BLOCKS = [
  {
    id: 'hero',
    num: '01',
    name: 'Ảnh bìa (Hero)',
    subtitle: 'Ảnh nền full viewport · Tiêu đề lớn · Byline',
    desc:
      'Banner mở đầu bài viết — ảnh bìa toàn màn hình, nhãn chuyên mục, tiêu đề và excerpt. Mỗi bài chỉ dùng 1 khối Hero.',
    component: 'NewsHero',
  },
  {
    id: 'columns-open',
    num: '02',
    name: 'Văn bản nhiều cột — Mở đầu',
    subtitle: 'Kicker · 2 cột · Facts 4 ô',
    desc:
      'Phần bối cảnh & nội dung: 2 cột văn bản có số thứ tự và kicker, kèm khối facts 4 ô (Chủ đầu tư, Vai trò, Khởi công, Địa điểm).',
    component: 'NewsOpening',
  },
  {
    id: 'quote',
    num: '03',
    name: 'Trích dẫn',
    subtitle: 'Nền tối · Dấu ngoặc vàng · Câu trích cỡ lớn',
    desc:
      'Nhấn nhịp giữa các khối văn bản. Đặt trên nền ảnh gallery có veil tối, ký hiệu dấu ngoặc kép vàng và gạch ngắn trước tên phát biểu.',
    component: 'NewsQuote',
  },
  {
    id: 'stats',
    num: '04',
    name: 'Con số',
    subtitle: 'Lưới 4 ô · Số to · Đơn vị vàng',
    desc:
      'Tóm tắt quy mô/thành tích bằng các con số ấn tượng — 4 ô gồm STT nhỏ, con số cỡ lớn và mô tả ngắn phía dưới.',
    component: 'NewsStats',
  },
  {
    id: 'columns-close',
    num: '05',
    name: 'Văn bản + Ảnh — Kết bài',
    subtitle: 'Ảnh minh hoạ · 2 cột kết · Tags · Share',
    desc:
      'Phần kết: ảnh minh hoạ lớn + 2 cột triển khai/cam kết + danh sách tag + nút chia sẻ Facebook / LinkedIn / X.',
    component: 'NewsClosing',
  },
  {
    id: 'related',
    num: '06',
    name: 'Bài liên quan',
    subtitle: '3 thẻ bài · Ảnh · Danh mục · CTA',
    desc:
      'Tự động hiển thị 3 bài cùng chuyên mục khi render trên trang thật. Có CTA "Xem tất cả tin" ở header.',
    component: 'NewsRelated',
  },
  {
    id: 'contact',
    num: '07',
    name: 'Liên hệ',
    subtitle: 'Component <Contact /> chung',
    desc:
      'Khối liên hệ cuối bài — cùng 1 thiết kế thống nhất cho toàn site. Không có dữ liệu tuỳ chỉnh theo từng bài.',
    component: 'Contact',
  },
]

export default function BlockShowcase() {
  const article = FEATURED
  const related = useMemo(() => getRelatedArticles(article.slug, 3), [article.slug])
  const { sections, quote, stats, facts, gallery } = article.detail
  const openingSecs = sections.slice(0, 2)
  const closingSecs = sections.slice(2, 4)
  const tags = article.tags || []

  // null = library view · blockId = detail view
  const [activeId, setActiveId] = useState(null)

  // ESC để quay về library
  useEffect(() => {
    if (!activeId) return
    const onKey = (e) => {
      if (e.key === 'Escape') setActiveId(null)
      if (e.key === 'ArrowLeft') {
        const i = BLOCKS.findIndex((b) => b.id === activeId)
        if (i > 0) setActiveId(BLOCKS[i - 1].id)
      }
      if (e.key === 'ArrowRight') {
        const i = BLOCKS.findIndex((b) => b.id === activeId)
        if (i < BLOCKS.length - 1) setActiveId(BLOCKS[i + 1].id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeId])

  // renderer chung: dùng cho cả mini preview và detail view
  const renderBlock = (blockId) => {
    switch (blockId) {
      case 'hero':
        return (
          <NewsHero
            article={article}
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
        )
      case 'columns-open':
        return (
          <NewsOpening
            sections={openingSecs}
            facts={facts}
            subtitle="Hai phần đầu của bài viết đưa bạn vào ngữ cảnh dự án và những nội dung then chốt được Newtecons công bố."
          />
        )
      case 'quote':
        return <NewsQuote text={quote.text} attribution={quote.attribution} bgImage={gallery?.[0]} />
      case 'stats':
        return (
          <NewsStats
            items={stats}
            subtitle={`Những con số minh hoạ sức vóc của ${article.category.toLowerCase()} mà Newtecons đang triển khai.`}
          />
        )
      case 'columns-close':
        return (
          <NewsClosing
            sections={closingSecs}
            figure={gallery?.[1]}
            figureCaption={article.title}
            tags={tags}
            shareTitle={article.title}
          />
        )
      case 'related':
        return <NewsRelated articles={related} />
      case 'contact':
        return <Contact />
      default:
        return null
    }
  }

  if (activeId) {
    return <DetailView activeId={activeId} setActiveId={setActiveId} renderBlock={renderBlock} />
  }
  return <LibraryView article={article} setActiveId={setActiveId} renderBlock={renderBlock} />
}

// ============================================================
// Library view — grid các card component
// ============================================================
const PAGE_SIZE = 6 // 3 cols × 2 rows

function LibraryView({ article, setActiveId, renderBlock }) {
  const [page, setPage] = useState(0)
  const totalPages = Math.max(1, Math.ceil(BLOCKS.length / PAGE_SIZE))
  const visible = BLOCKS.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  return (
    <div className="bs-lib">
      <header className="bs-lib__bar">
        <div className="bs-lib__bar-left">
          <a className="bs-lib__back" href="/tin-tuc-builder">← Trình thiết kế</a>
          <span className="bs-lib__bar-sep" aria-hidden />
          <span className="bs-lib__bar-title">Thư viện khối · Tin tức</span>
        </div>
        <span className="bs-lib__count" title={`Dữ liệu mẫu: ${article.title}`}>
          {BLOCKS.length} khối
        </span>
      </header>

      <main className="bs-lib__grid" key={page}>
        {visible.map((block) => (
          <button
            key={block.id}
            type="button"
            className="bs-lib__card"
            onClick={() => setActiveId(block.id)}
          >
            <div className="bs-lib__card-thumb">
              <BlockMiniPreview blockId={block.id} renderBlock={renderBlock} />
            </div>
            <div className="bs-lib__card-body">
              <div className="bs-lib__card-head">
                <span className="bs-lib__card-num">{block.num}</span>
                <h3 className="bs-lib__card-name">{block.name}</h3>
              </div>
              <p className="bs-lib__card-sub">{block.subtitle}</p>
            </div>
          </button>
        ))}
      </main>

      {totalPages > 1 && (
        <nav className="bs-lib__pager" aria-label="Phân trang">
          <button
            type="button"
            className="bs-lib__pager-btn"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            aria-label="Trang trước"
          >
            ←
          </button>
          <div className="bs-lib__pager-dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`bs-lib__pager-dot ${i === page ? 'is-active' : ''}`}
                onClick={() => setPage(i)}
                aria-label={`Trang ${i + 1}`}
                aria-current={i === page ? 'page' : undefined}
              >
                <span>{String(i + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="bs-lib__pager-btn"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            aria-label="Trang sau"
          >
            →
          </button>
        </nav>
      )}
    </div>
  )
}

// ============================================================
// Detail view — full screen render khối + sidebar nav
// ============================================================
function DetailView({ activeId, setActiveId, renderBlock }) {
  const current = BLOCKS.find((b) => b.id === activeId) || BLOCKS[0]
  const idx = BLOCKS.findIndex((b) => b.id === activeId)
  const prev = idx > 0 ? BLOCKS[idx - 1] : null
  const next = idx < BLOCKS.length - 1 ? BLOCKS[idx + 1] : null

  const [uiCollapsed, setUiCollapsed] = useState(false)

  // Phím tắt: F → toggle fullscreen
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        setUiCollapsed((c) => !c)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className={`bs-det ${uiCollapsed ? 'is-collapsed' : ''}`}>
      <header className="bs-det__bar">
        <div className="bs-det__bar-left">
          <button className="bs-det__back" onClick={() => setActiveId(null)}>
            ← Thư viện
          </button>
          <div className="bs-det__title">
            <span className="bs-det__num">KHỐI {current.num}</span>
            <h2>{current.name}</h2>
            <span className="bs-det__sub">{current.subtitle}</span>
          </div>
        </div>
        <div className="bs-det__nav">
          <button
            className="bs-det__nav-btn"
            disabled={!prev}
            onClick={() => prev && setActiveId(prev.id)}
            title={prev ? `Khối trước: ${prev.name}` : 'Khối đầu tiên'}
          >
            ←
          </button>
          <span className="bs-det__nav-count">{idx + 1} / {BLOCKS.length}</span>
          <button
            className="bs-det__nav-btn"
            disabled={!next}
            onClick={() => next && setActiveId(next.id)}
            title={next ? `Khối tiếp: ${next.name}` : 'Khối cuối'}
          >
            →
          </button>
          <span className="bs-det__nav-sep" aria-hidden />
          <button
            className="bs-det__nav-btn bs-det__nav-btn--fs"
            onClick={() => setUiCollapsed(true)}
            title="Ẩn bảng điều khiển (F)"
            aria-label="Ẩn bảng điều khiển"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 5V1h4M13 5V1H9M1 9v4h4M13 9v4H9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </header>

      <div className="bs-det__body">
        <aside className="bs-det__side" aria-label="Danh sách khối">
          <div className="bs-det__side-head">Các khối</div>
          <ul className="bs-det__side-list">
            {BLOCKS.map((b) => (
              <li key={b.id}>
                <button
                  type="button"
                  className={`bs-det__side-item ${b.id === activeId ? 'is-active' : ''}`}
                  onClick={() => setActiveId(b.id)}
                >
                  <span className="bs-det__side-num">{b.num}</span>
                  <div className="bs-det__side-text">
                    <strong>{b.name}</strong>
                    <span>{b.subtitle}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <div className="bs-det__side-foot">
            <span className="bs-det__side-kicker">Về khối này</span>
            <p>{current.desc}</p>
            <span className="bs-det__side-tag">
              <code>&lt;{current.component} /&gt;</code>
            </span>
          </div>
        </aside>

        <main className="bs-det__stage" key={activeId}>
          {renderBlock(activeId)}
        </main>
      </div>

      {uiCollapsed && (
        <button
          type="button"
          className="bs-det__expand"
          onClick={() => setUiCollapsed(false)}
          title="Hiện bảng điều khiển (F)"
          aria-label="Hiện bảng điều khiển"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M6 2H2v4M14 6V2h-4M2 10v4h4M10 14h4v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  )
}

// ============================================================
// BlockMiniPreview — scale render thật xuống thumbnail
// Hover → replay animation bằng cách remount component thông qua key.
// ============================================================
function BlockMiniPreview({ blockId, renderBlock }) {
  const hostRef = useRef(null)
  const [scale, setScale] = useState(0.22)
  const [playKey, setPlayKey] = useState(0)

  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    const update = () => {
      const w = el.getBoundingClientRect().width
      if (w > 0) setScale(w / 1440)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const replay = () => setPlayKey((k) => k + 1)

  return (
    <div
      ref={hostRef}
      className="bs-mini"
      onMouseEnter={replay}
      onFocus={replay}
      aria-hidden
    >
      <div className="bs-mini__stage" style={{ transform: `scale(${scale})` }}>
        <div key={playKey}>{renderBlock(blockId)}</div>
      </div>
    </div>
  )
}
