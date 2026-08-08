import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'

export default function Navbar() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const goToSection = (id) => (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  return (
    <nav className="w-full bg-paper/90 backdrop-blur border-b border-ink/10 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="w-7 h-7" />
          <span className="text-xl font-display font-semibold text-ink">
            CareerFit
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-ink/70">
          <Link to="/" className="hover:text-teal-600 transition">Home</Link>
          <a href="#features" onClick={goToSection('features')} className="hover:text-teal-600 transition">Features</a>
          <a href="#how-it-works" onClick={goToSection('how-it-works')} className="hover:text-teal-600 transition">How It Works</a>
          <a href="#about" onClick={goToSection('about')} className="hover:text-teal-600 transition">About</a>
        </div>

        <div className="flex items-center gap-3">
          {currentUser ? (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 text-sm font-medium text-ink/70 hover:text-teal-600 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium bg-ink/5 text-ink rounded-lg transition-all hover:bg-ink/10 hover:-translate-y-0.5"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-ink/70 hover:text-teal-600 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium bg-teal-600 text-white rounded-lg transition-all hover:bg-teal-700 hover:-translate-y-0.5 hover:shadow-md"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}