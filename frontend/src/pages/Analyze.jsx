import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { analyzeResume } from '../services/api'
import { saveAnalysis } from '../services/history'

export default function Analyze() {
  const [file, setFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (!selected) return

    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]

    if (!validTypes.includes(selected.type)) {
      setError('Only PDF or DOCX files are allowed.')
      setFile(null)
      return
    }

    if (selected.size > 5 * 1024 * 1024) {
      setError('File must be smaller than 5MB.')
      setFile(null)
      return
    }

    setError('')
    setFile(selected)
  }

  const handleRemoveFile = () => {
    setFile(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!file) {
      setError('Please upload your resume.')
      return
    }
    if (!jobDescription.trim()) {
      setError('Please paste a job description.')
      return
    }

    setLoading(true)

    try {
      const data = await analyzeResume(file, jobDescription)
      saveAnalysis(currentUser.uid, data)
      navigate('/results', { state: { result: data } })
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Could not reach the server. Is the backend running?'
          : err.message
      )
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-paper pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-mono uppercase tracking-widest text-teal-600 mb-2">Analyze</p>
        <h1 className="font-display text-3xl font-semibold text-ink">Analyze Your Resume</h1>
        <p className="mt-2 text-ink/60">
          Upload your resume and paste the job description you're targeting.
        </p>

        {error && (
          <div className="mt-6 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 bg-white rounded-2xl border border-ink/10 p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-ink/80 mb-2">
              Resume (PDF or DOCX)
            </label>

            {!file ? (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-ink/20 rounded-xl py-10 cursor-pointer hover:border-teal-500 transition bg-paper/40">
                <span className="text-sm text-ink/70">
                  Click to upload your resume
                </span>
                <span className="text-xs text-ink/40 mt-1">PDF or DOCX, max 5MB</span>
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="flex items-center justify-between border border-ink/15 rounded-xl px-4 py-3">
                <span className="text-sm font-medium text-ink truncate">
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-sm text-red-600 hover:underline ml-4"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/80 mb-2">
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 border border-ink/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 bg-paper/40"
              placeholder="Paste the full job description here..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-600 text-white font-medium rounded-xl transition-all hover:bg-teal-700 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        </form>
      </div>
    </div>
  )
}