import { useEffect, useMemo, useState } from 'react'
import Header from '../../../components/shared/Header/Header.jsx'
import Contact from '../../../components/shared/Contact/Contact.jsx'
import { contactData } from '../../../data/contact.js'
import { JOBS, JOB_DETAILS } from '../../../data/recruit.js'
import JobDetailHero from '../../../components/recruit/JobDetail/JobDetailHero/JobDetailHero.jsx'
import JobDetailBody from '../../../components/recruit/JobDetail/JobDetailBody/JobDetailBody.jsx'
import JobDetailCta from '../../../components/recruit/JobDetail/JobDetailCta/JobDetailCta.jsx'
import JobDetailMissing from '../../../components/recruit/JobDetail/JobDetailMissing/JobDetailMissing.jsx'
import '../../../components/recruit/JobDetail/jobdetail-shared.css'

export default function JobDetail({ jobId }) {
  const job = useMemo(() => JOBS.find((j) => j.id === jobId), [jobId])
  const detail = job ? JOB_DETAILS[job.id] : null

  const [mount, setMount] = useState(false)
  useEffect(() => {
    document.documentElement.classList.add('is-scroll-page')
    document.body.classList.add('is-scroll-page')
    window.scrollTo(0, 0)
    const r = requestAnimationFrame(() => setMount(true))
    return () => {
      cancelAnimationFrame(r)
      document.documentElement.classList.remove('is-scroll-page')
      document.body.classList.remove('is-scroll-page')
    }
  }, [jobId])

  useEffect(() => {
    if (!mount) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-inview')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    document
      .querySelectorAll('.jd-reveal')
      .forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [mount, jobId])

  const related = useMemo(() => {
    if (!job) return []
    return JOBS.filter((j) => j.id !== job.id && j.dept === job.dept).slice(0, 3)
  }, [job])

  if (!job) {
    return (
      <>
        <Header variant="default" />
        <JobDetailMissing />
        <Contact {...contactData} />
      </>
    )
  }

  const mailtoApply = `mailto:recruitment@newtecons.vn?subject=${encodeURIComponent(
    `Ung tuyen - ${job.title} (${job.id.toUpperCase()})`,
  )}&body=${encodeURIComponent(
    `Kính gửi Phòng Tuyển dụng Newtecons,\n\nTôi xin ứng tuyển vị trí "${job.title}".\n\n— Họ tên:\n— Email / SĐT:\n— Kinh nghiệm nổi bật:\n\nCV đính kèm vui lòng xem file bên dưới.\n\nTrân trọng,`,
  )}`

  return (
    <>
      <Header variant="default" />
      <main className={`jd ${mount ? 'is-in' : ''}`}>
        <JobDetailHero job={job} detail={detail} mailtoApply={mailtoApply} />
        <JobDetailBody job={job} detail={detail} mailtoApply={mailtoApply} related={related} />
        <JobDetailCta job={job} mailtoApply={mailtoApply} />
      </main>
      <Contact {...contactData} />
    </>
  )
}
