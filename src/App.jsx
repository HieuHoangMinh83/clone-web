import { useEffect, useState } from 'react'
import HomePage from './pages/HomePage/HomePage.jsx'
import IntroPage from './pages/IntroPage/IntroPage.jsx'
import FieldsPage from './pages/FieldsPage/FieldsPage.jsx'
import NewsPage from './pages/NewsPage/NewsPage.jsx'
import NewsDetail from './pages/NewsPage/NewsDetail.jsx'
import NewsBuilder from './pages/NewsBuilder/NewsBuilder.jsx'
import BlockShowcase from './pages/NewsBuilder/BlockShowcase.jsx'
import RecruitPage from './pages/RecruitPage/RecruitPage.jsx'
import JobDetail from './pages/JobDetail/JobDetail.jsx'
import ContactPage from './pages/ContactPage/ContactPage.jsx'
import ProjectsPage from './pages/ProjectsPage/ProjectsPage.jsx'
import ProjectDetail from './pages/ProjectDetail/ProjectDetail.jsx'
import LogoDemo from './pages/LogoDemo.jsx'

function parseRoute() {
  const h = window.location.hash.replace(/^#/, '') || '/'
  if (h.startsWith('/gioi-thieu')) return { name: 'intro' }
  if (h.startsWith('/linh-vuc')) return { name: 'fields' }
  if (h.startsWith('/du-an/')) {
    const slug = h.slice('/du-an/'.length).split(/[/?#]/)[0]
    if (slug) return { name: 'project-detail', slug }
  }
  if (h.startsWith('/du-an')) return { name: 'projects' }
  if (h.startsWith('/tin-tuc-builder/khoi')) return { name: 'block-showcase' }
  if (h.startsWith('/tin-tuc-builder')) return { name: 'news-builder' }
  if (h.startsWith('/tin-tuc/')) {
    const slug = h.slice('/tin-tuc/'.length).split(/[/?#]/)[0]
    if (slug) return { name: 'news-detail', slug }
  }
  if (h.startsWith('/tin-tuc')) return { name: 'news' }
  if (h.startsWith('/tuyen-dung/')) {
    const id = h.slice('/tuyen-dung/'.length).split(/[/?#]/)[0]
    if (id) return { name: 'job-detail', id }
  }
  if (h.startsWith('/tuyen-dung')) return { name: 'recruit' }
  if (h.startsWith('/lien-he')) return { name: 'contact' }
  if (h.startsWith('/logo-demo')) return { name: 'logo-demo' }
  return { name: 'home' }
}

export default function App() {
  const [route, setRoute] = useState(parseRoute)

  useEffect(() => {
    const onHash = () => setRoute(parseRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (route.name === 'intro') return <IntroPage />
  if (route.name === 'fields') return <FieldsPage />
  if (route.name === 'projects') return <ProjectsPage />
  if (route.name === 'project-detail') return <ProjectDetail slug={route.slug} />
  if (route.name === 'news') return <NewsPage />
  if (route.name === 'news-detail') return <NewsDetail slug={route.slug} />
  if (route.name === 'news-builder') return <NewsBuilder />
  if (route.name === 'block-showcase') return <BlockShowcase />
  if (route.name === 'recruit') return <RecruitPage />
  if (route.name === 'job-detail') return <JobDetail jobId={route.id} />
  if (route.name === 'contact') return <ContactPage />
  if (route.name === 'logo-demo') return <LogoDemo />
  return <HomePage />
}
