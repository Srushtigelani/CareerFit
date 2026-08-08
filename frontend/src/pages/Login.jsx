import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError('Failed to login. Check your email and password.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper pt-16">
      <div className="w-full max-w-md bg-white rounded-2xl border border-ink/10 p-8">
        <h1 className="font-display text-2xl font-semibold text-ink text-center">Welcome Back</h1>
        <p className="mt-2 text-sm text-ink/60 text-center">
          Login to access your dashboard
        </p>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-ink/80">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-ink/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 bg-paper/50"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/80">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-ink/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 bg-paper/50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-teal-600 text-white font-medium rounded-lg transition-all hover:bg-teal-700 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-ink/60">
          Don't have an account?{' '}
          <Link to="/signup" className="text-teal-600 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}