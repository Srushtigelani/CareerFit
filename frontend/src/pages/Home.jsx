import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
      }
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  return (
    <div className="pt-16 bg-paper">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="opacity-0 animate-fadeInUp">
          <p className="text-xs font-mono uppercase tracking-widest text-teal-600 mb-4">
            Resume × Job Description
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink leading-tight">
            Know how well your resume matches the job — instantly.
          </h1>
          <p className="mt-6 text-lg text-ink/70">
            CareerFit compares your resume against any job description
            using semantic AI matching, and gives you a score, matching
            skills, and improvement suggestions.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium transition-all hover:bg-teal-700 hover:-translate-y-0.5 hover:shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div
          className="bg-white rounded-2xl border border-ink/10 shadow-sm p-8 flex flex-col gap-4 opacity-0 animate-fadeInUp"
          style={{ animationDelay: '150ms' }}
        >
          <div className="border border-ink/10 rounded-lg p-4">
            <p className="text-xs font-mono uppercase tracking-wide text-ink/40">Resume</p>
            <p className="font-medium text-ink mt-1">resume_john.pdf</p>
          </div>
          <div className="border border-ink/10 rounded-lg p-4">
            <p className="text-xs font-mono uppercase tracking-wide text-ink/40">Job Description</p>
            <p className="font-medium text-ink mt-1">Backend Developer @ TechCorp</p>
          </div>
          <div className="flex items-center justify-center gap-3 bg-teal-50 rounded-lg p-5">
            <span className="font-mono text-3xl font-semibold text-teal-700">82%</span>
            <span className="text-sm text-teal-700">Match Score</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-paper2 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-3xl font-semibold text-center text-ink">Features</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[
              ['Resume Analysis', 'Extracts and understands your resume content automatically.'],
              ['AI Semantic Matching', 'Goes beyond keyword matching using sentence embeddings.'],
              ['Match Score', 'Get a clear percentage score for every job you apply to.'],
              ['Skill Comparison', 'See exactly which skills match and which are missing.'],
              ['Improvement Suggestions', 'Actionable tips to strengthen your resume.'],
              ['Job Description Matching', 'Paste any job description and compare instantly.'],
            ].map(([title, desc], i) => (
              <div
                key={title}
                className="bg-white rounded-xl p-6 border border-ink/10 opacity-0 animate-fadeInUp hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <h3 className="font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm text-ink/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-3xl font-semibold text-center text-ink">How It Works</h2>

          <div className="mt-16 relative">
            <div className="hidden md:block absolute top-5 left-0 right-0 h-0.5 bg-teal-200 z-0" />
            <div className="relative z-10 grid md:grid-cols-4 gap-8">
              {[
                'Upload Resume',
                'Paste Job Description',
                'AI Analyzes Both',
                'Get Your Match Results',
              ].map((step, i) => (
                <div
                  key={step}
                  className="text-center opacity-0 animate-fadeInUp"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-10 h-10 mx-auto rounded-full bg-teal-600 text-white flex items-center justify-center font-mono font-semibold hover:scale-110 transition-transform ring-4 ring-paper">
                    {i + 1}
                  </div>
                  <p className="mt-4 text-sm font-medium text-ink/80">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-paper2 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-semibold text-ink">About CareerFit</h2>
          <p className="mt-4 text-ink/70">
            CareerFit helps job seekers understand how well their resume
            fits a specific role using real AI-based semantic comparison —
            not just keyword counting.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/10 py-8 text-center text-sm text-ink/50 bg-paper">
        © {new Date().getFullYear()} CareerFit
      </footer>
    </div>
  )
}