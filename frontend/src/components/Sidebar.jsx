import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { label: 'Overview', path: '/dashboard' },
  { label: 'Analyze Resume', path: '/analyze' },
]

export default function Sidebar({ analyses = [] }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <aside className="hidden md:flex flex-col w-64 fixed top-16 bottom-0 left-0 bg-white border-r border-ink/10 pt-6 px-4">
      <nav className="space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition ${
                active
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-ink/70 hover:bg-paper hover:text-ink'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      {analyses.length > 0 && (
        <div className="mt-8">
          <p className="px-3 text-xs font-mono uppercase tracking-widest text-ink/40 mb-2">
            Recent
          </p>
          <div className="space-y-1">
            {analyses.slice(0, 5).map((entry) => (
              <Link
                key={entry.id}
                to="/results"
                state={{ result: entry }}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-ink/70 hover:bg-paper hover:text-ink transition"
              >
                <span>{new Date(entry.date).toLocaleDateString()}</span>
                <span className="font-mono text-xs">{entry.score}%</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto mb-6 pt-6 border-t border-ink/10">
        <p className="px-3 text-xs text-ink/40 truncate">{currentUser?.email}</p>
        <button
          onClick={handleLogout}
          className="mt-2 w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-ink/70 hover:bg-paper hover:text-ink transition"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}