import { useEffect, useMemo, useState } from 'react'
import { DEPARTMENTS, LOCATIONS, JOBS } from './recruitData.js'
import Pagination from '../shared/Pagination/Pagination.jsx'
import SearchFilter from '../shared/SearchFilter/SearchFilter.jsx'

const PAGE_SIZE = 6

export default function RecruitJobs() {
  const [mount, setMount] = useState(false)
  const [dept, setDept] = useState('all')
  const [loc, setLoc] = useState('all')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)

  useEffect(() => {
    const r = requestAnimationFrame(() => setMount(true))
    return () => cancelAnimationFrame(r)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return JOBS.filter((j) => {
      if (dept !== 'all' && j.dept !== dept) return false
      if (loc !== 'all' && j.location !== loc) return false
      if (q && !j.title.toLowerCase().includes(q)) return false
      return true
    })
  }, [dept, loc, query])

  useEffect(() => {
    setPage(0)
  }, [dept, loc, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages - 1)
  const visibleJobs = filtered.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE,
  )


  return (
    <section className={`rec-sec rec-jobs ${mount ? 'is-in' : ''}`} id="jobs">
      <div className="rec-jobs__bg" aria-hidden>
        <span className="rec-jobs__bg-grid" />
        <span className="rec-jobs__bg-orb" />
      </div>

      <div className="rec-container">


        <SearchFilter
          query={query}
          onQueryChange={setQuery}
          searchPlaceholder="Tìm theo vị trí, kỹ năng…"
          tabValue={dept}
          onTabChange={setDept}
          tabs={DEPARTMENTS}
          tabsAriaLabel="Phòng ban"
          selectValue={loc}
          onSelectChange={setLoc}
          selectOptions={LOCATIONS}
          selectAriaLabel="Địa điểm"
          active={mount}
        />

        <div className="rec-jobs__stage">
          {filtered.length === 0 ? (
            <div className="rec-jobs__empty">
              <span>Không tìm thấy vị trí phù hợp</span>
              <p>Hãy thử bỏ bớt bộ lọc hoặc gửi CV tự do tới recruitment@newtecons.vn</p>
            </div>
          ) : (
            <div
              className="rec-jobs__list"
              key={`${dept}-${loc}-${query}-${currentPage}`}
            >
              {visibleJobs.map((j, i) => (
                <article key={j.id} className={`rec-job ${j.hot ? 'is-hot' : ''}`} style={{ '--i': i }}>
                 
                  <span className="rec-job__rail" aria-hidden />

                  {j.hot && <span className="rec-job__hot">HOT</span>}

                  <h3 className="rec-job__title">{j.title}</h3>

                  <ul className="rec-job__meta">
                    <li>
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                        <rect x="2" y="4" width="10" height="8" rx="1" />
                        <path d="M5 4V2h4v2" />
                      </svg>
                      {j.deptLabel}
                    </li>
                    <li>
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                        <path d="M7 1c2.5 0 4.5 2 4.5 4.5C11.5 8.5 7 13 7 13S2.5 8.5 2.5 5.5C2.5 3 4.5 1 7 1Z" />
                        <circle cx="7" cy="5.5" r="1.5" />
                      </svg>
                      {j.locationLabel}
                    </li>
                    <li>
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                        <circle cx="7" cy="7" r="5.5" />
                        <path d="M7 4v3l2 1.5" strokeLinecap="round" />
                      </svg>
                      {j.exp}
                    </li>
                  </ul>

                  {j.summary && <p className="rec-job__summary">{j.summary}</p>}

                  {j.skills?.length > 0 && (
                    <ul className="rec-job__skills">
                      {j.skills.map((s) => (
                        <li key={s} className="rec-job__skill">{s}</li>
                      ))}
                    </ul>
                  )}

                  <div className="rec-job__foot">
                    <div className="rec-job__salary">
                      <span className="rec-job__salary-k">{j.salary}</span>
                      <span className="rec-job__salary-v">Hạn {j.deadline}</span>
                    </div>

                    <a
                      href={`/tuyen-dung/${j.id}`}
                      className="rec-job__apply"
                    >
                      <span>Xem chi tiết</span>
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
                        <path
                          d="M1 5h11m0 0L8 1m4 4l-4 4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {filtered.length > 0 && totalPages > 1 && (
          <div className="rec-jobs__pager-wrap">
            <Pagination
              current={currentPage + 1}
              total={totalPages}
              onChange={(p) => setPage(p - 1)}
            />
          </div>
        )}
      </div>
    </section>
  )
}
