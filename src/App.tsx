import { Footer } from './components/Footer/Footer'
import { Navigation } from './components/Navigation/Navigation'
import { FilmsPage } from './pages/Films'
import { Home } from './pages/Home'

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation current={path} />
      <main id="main">{path === '/films' ? <FilmsPage /> : <Home />}</main>
      <Footer />
    </>
  )
}

export default App
