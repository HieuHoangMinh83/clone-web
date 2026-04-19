import { useEffect } from 'react'
import Header from '../../components/shared/Header/Header.jsx'
import Contact from '../../components/shared/Contact/Contact.jsx'
import ProjectsBanner from './ProjectsBanner/ProjectsBanner.jsx'
import ProjectsPartners from './ProjectsPartners/ProjectsPartners.jsx'
import ProjectsSpotlight from './ProjectsSpotlight/ProjectsSpotlight.jsx'
import ProjectsGrid from './ProjectsGrid/ProjectsGrid.jsx'
import ProjectsMilestones from './ProjectsMilestones/ProjectsMilestones.jsx'
import ProjectsCTA from './ProjectsCTA/ProjectsCTA.jsx'
import './projects-shared.css'
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
        <Contact />
      </main>
    </>
  )
}
