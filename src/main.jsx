import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import IntroPage from './pages/IntroPage/IntroPage.jsx'
import FieldsPage from './pages/FieldsPage/FieldsPage.jsx'
import NewsPage from './pages/NewsPage/NewsPage.jsx'
import './styles/tokens.css'
import './styles/global.css'

function getRoute() {
  const h = window.location.hash.replace(/^#/, '') || '/'
  if (h.startsWith('/gioi-thieu')) return 'intro'
  if (h.startsWith('/linh-vuc')) return 'fields'
  if (h.startsWith('/tin-tuc')) return 'news'
  return 'home'
}

function Router() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const onHash = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (route === 'intro') return <IntroPage />
  if (route === 'fields') return <FieldsPage />
  if (route === 'news') return <NewsPage />
  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
