import { useEffect, useState } from 'react'
import HomePage from './pages/HomePage/HomePage.jsx'
import IntroPage from './pages/IntroPage/IntroPage.jsx'
import FieldsPage from './pages/FieldsPage/FieldsPage.jsx'
import NewsPage from './pages/NewsPage/NewsPage.jsx'
import NewsDetail from './pages/NewsPage/NewsDetail.jsx'
import NewsBuilder from './pages/NewsBuilder/NewsBuilder.jsx'
import BlockShowcase from './pages/NewsBuilder/BlockShowcase.jsx'
import RecruitPage from './pages/RecruitPage/RecruitPage.jsx'
import JobDetail from './pages/RecruitPage/JobDetail/JobDetail.jsx'
import ContactPage from './pages/ContactPage/ContactPage.jsx'
import ProjectsPage from './pages/ProjectsPage/ProjectsPage.jsx'
import ProjectDetail from './pages/ProjectsPage/ProjectDetail/ProjectDetail.jsx'
import ComponentLibrary from './pages/ComponentLibrary/ComponentLibrary.jsx'
import LogoDemo from './pages/LogoDemo.jsx'

function parseRoute() {
  const h = window.location.pathname || '/'
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
  if (h.startsWith('/thu-vien-component')) return { name: 'component-library' }
  if (h.startsWith('/logo-demo')) return { name: 'logo-demo' }
  return { name: 'home' }
}

export default function App() {
  const [route, setRoute] = useState(parseRoute)

  useEffect(() => {
    const onPop = () => setRoute(parseRoute())
    window.addEventListener('popstate', onPop)

    // Intercept clicks on internal <a href="/..."> và dùng history.pushState
    // thay cho full page reload — cho phép SPA mà không cần # trong URL.
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest('a')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href) return
      if (a.target && a.target !== '_self') return
      if (a.hasAttribute('download')) return
      // Chỉ handle link nội bộ dạng "/..." (không phải "//..." external, không phải "#...")
      if (!href.startsWith('/') || href.startsWith('//')) return
      e.preventDefault()
      if (href !== window.location.pathname + window.location.search + window.location.hash) {
        window.history.pushState({}, '', href)
        setRoute(parseRoute())
        window.scrollTo(0, 0)
      }
    }
    document.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('popstate', onPop)
      document.removeEventListener('click', onClick)
    }
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
  if (route.name === 'component-library') return <ComponentLibrary />
  if (route.name === 'logo-demo') return <LogoDemo />
  return <HomePage />
}
