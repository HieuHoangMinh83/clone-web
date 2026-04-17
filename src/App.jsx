import { useEffect, useState } from 'react'
import HomePage from './pages/HomePage/HomePage.jsx'
import IntroPage from './pages/IntroPage/IntroPage.jsx'
import FieldsPage from './pages/FieldsPage/FieldsPage.jsx'
import NewsPage from './pages/NewsPage/NewsPage.jsx'
import LogoDemo from './pages/LogoDemo.jsx'

function getRoute() {
  const h = window.location.hash.replace(/^#/, '') || '/'
  if (h.startsWith('/gioi-thieu')) return 'intro'
  if (h.startsWith('/linh-vuc')) return 'fields'
  if (h.startsWith('/tin-tuc')) return 'news'
  if (h.startsWith('/logo-demo')) return 'logo-demo'
  return 'home'
}

export default function App() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const onHash = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (route === 'intro') return <IntroPage />
  if (route === 'fields') return <FieldsPage />
  if (route === 'news') return <NewsPage />
  if (route === 'logo-demo') return <LogoDemo />
  return <HomePage />
}
