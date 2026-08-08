import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getAnalyses } from '../services/history'
import Sidebar from '../components/Sidebar'

export default function Dashboard() {
  const { currentUser } = useAuth()
  const analyses = getAnalyses(currentUser.uid)

  const getScoreColor = (score) => {
    if (score >= 75) return 'text-teal-600'
    if (score >= 50) return 'text-gold'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-paper pt-16">
      <Sidebar analyses={analyses} />

      <div className="md:ml-64">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <p className="text-xs font-mono uppercase tracking-widest text-teal-600 mb-2">Dashboard</p>
          <h1 className="font-display text-3xl font-semibold text-ink">
            Welcome back{currentUser?.email ? `, ${currentUser.email.split('@')[0]}` : ''}
          </h1>
          <p className="mt-2 text-ink/60">
            Ready to see how well your resume matches your next job?
          </p>

          <div className="mt-8 bg-white rounded-2xl border border-ink/10 p-8 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-ink">Analyze a new resume</h2>
              <p className="mt-1 text-sm text-ink/60">
                Upload your resume and paste a job description to get your match score.
              </p>
            </div>
            <Link
              to="/analyze"
              className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium transition-all hover:bg-teal-700 hover:-translate-y-0.5 hover:shadow-md whitespace-nowrap"
            >
              Analyze Resume
            </Link>
          </div>

          <div className="mt-8 bg-white rounded-2xl border border-ink/10 p-8">
            <h2 className="text-lg font-semibold text-ink">Recent Analyses</h2>

            {analyses.length === 0 ? (
              <p className="mt-2 text-sm text-ink/50">
                No analyses yet. Run your first one above.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-ink/10">
                {analyses.map((entry) => (
                  <li key={entry.id} className="py-4 flex items-center justify-between">
                    <div>
                      <p className={`font-mono text-lg font-semibold ${getScoreColor(entry.score)}`}>
                        {entry.score}%
                      </p>
                      <p className="text-xs text-ink/40">
                        {new Date(entry.date).toLocaleString()}
                      </p>
                    </div>
                    <Link
                      to="/results"
                      state={{ result: entry }}
                      className="text-sm text-teal-600 font-medium hover:underline"
                    >
                      View Details
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}