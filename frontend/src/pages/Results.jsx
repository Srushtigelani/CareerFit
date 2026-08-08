import { useLocation, useNavigate, Link } from 'react-router-dom'
import ScoreDial from '../components/ScoreDial'

export default function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const result = location.state?.result

  if (!result) {
    return (
      <div className="min-h-screen bg-paper pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-ink/60">No results to show.</p>
          <Link
            to="/analyze"
            className="mt-4 inline-block px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition"
          >
            Analyze a Resume
          </Link>
        </div>
      </div>
    )
  }

  const { score, matching_skills, missing_skills, suggestions } = result

  const getMatchLabel = (score) => {
    if (score >= 75) return 'Good Match'
    if (score >= 50) return 'Moderate Match'
    return 'Weak Match'
  }

  const getScoreColor = (score) => {
    if (score >= 75) return 'text-teal-600'
    if (score >= 50) return 'text-gold'
    return 'text-red-600'
  }

  const getRingColor = (score) => {
    if (score >= 75) return 'border-teal-600'
    if (score >= 50) return 'border-gold'
    return 'border-red-600'
  }

  return (
    <div className="min-h-screen bg-paper pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-mono uppercase tracking-widest text-teal-600 mb-2">Results</p>
        <h1 className="font-display text-3xl font-semibold text-ink">Your Results</h1>

        <div className="mt-6 bg-white rounded-2xl border border-ink/10 p-8 flex flex-col items-center">
          <ScoreDial score={score} />
          <p className="mt-4 text-lg font-medium text-ink">{getMatchLabel(score)}</p>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-ink/10 p-6">
            <h2 className="font-semibold text-ink">Matching Skills</h2>
            {matching_skills.length > 0 ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {matching_skills.map((skill) => (
                  <li
                    key={skill}
                    className="px-3 py-1 bg-teal-50 text-teal-700 text-sm rounded-full capitalize"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-ink/50">No direct skill matches found.</p>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-ink/10 p-6">
            <h2 className="font-semibold text-ink">Potential Gaps</h2>
            {missing_skills.length > 0 ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {missing_skills.map((skill) => (
                  <li
                    key={skill}
                    className="px-3 py-1 bg-red-50 text-red-700 text-sm rounded-full capitalize"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-ink/50">No obvious skill gaps detected.</p>
            )}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-2xl border border-ink/10 p-6">
          <h2 className="font-semibold text-ink">Suggestions</h2>
          <ul className="mt-3 space-y-2">
            {suggestions.map((tip, i) => (
              <li key={i} className="text-sm text-ink/70 leading-relaxed">
                • {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={() => navigate('/analyze')}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium transition-all hover:bg-teal-700 hover:-translate-y-0.5 hover:shadow-md"
          >
            Analyze Another Resume
          </button>
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-ink/5 text-ink rounded-lg font-medium transition-all hover:bg-ink/10 hover:-translate-y-0.5"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}