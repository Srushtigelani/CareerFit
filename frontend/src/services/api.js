const API_BASE_URL = 'http://localhost:5000'

export async function checkHealth() {
  const response = await fetch(`${API_BASE_URL}/api/health`)
  if (!response.ok) {
    throw new Error('Backend health check failed')
  }
  return response.json()
}

export async function analyzeResume(file, jobDescription) {
  const formData = new FormData()
  formData.append('resume', file)
  formData.append('job_description', jobDescription)

  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || 'Analysis failed. Please try again.')
  }

  return response.json()
}