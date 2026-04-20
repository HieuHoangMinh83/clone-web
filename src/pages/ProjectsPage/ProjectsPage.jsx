import { useEffect } from 'react'
import Header from '../../components/shared/Header/Header.jsx'
import Contact from '../../components/shared/Contact/Contact.jsx'
import { contactData } from '../../data/contact.js'
import ProjectsBanner from '../../components/projects/ProjectsBanner/ProjectsBanner.jsx'
import ProjectsPartners from '../../components/projects/ProjectsPartners/ProjectsPartners.jsx'
import ProjectsSpotlight from '../../components/projects/ProjectsSpotlight/ProjectsSpotlight.jsx'
import ProjectsGrid from '../../components/projects/ProjectsGrid/ProjectsGrid.jsx'
import ProjectsMilestones from '../../components/projects/ProjectsMilestones/ProjectsMilestones.jsx'
import ProjectsCTA from '../../components/projects/ProjectsCTA/ProjectsCTA.jsx'
import '../../components/projects/projects-shared.css'
import './ProjectsPage.css'

export default function ProjectsPage() {
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    html.classList.add('is-scroll-page')
    body.classList.add('is-scroll-page')

    const onWheel = (e) => {
      if (e.defaultPrevented) {
        window.scrollBy({ top: e.deltaY, left: e.deltaX, behavior: 'auto' })
      }
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => {
      html.classList.remove('is-scroll-page')
      body.classList.remove('is-scroll-page')
      window.removeEventListener('wheel', onWheel)
    }
  }, [])

  return (
    <>
      <Header variant="default" />
      <main className="prj-page">
        <ProjectsBanner />
        <ProjectsSpotlight />
        <ProjectsPartners />
        <ProjectsGrid />
        <ProjectsMilestones />
        <ProjectsCTA />
        <Contact {...contactData} />
      </main>
    </>
  )
}
