const STORAGE_KEY_PREFIX = 'careerfit_analyses_'

function getKey(uid) {
  return `${STORAGE_KEY_PREFIX}${uid}`
}

export function saveAnalysis(uid, analysis) {
  const existing = getAnalyses(uid)
  const entry = {
    id: Date.now(),
    date: new Date().toISOString(),
    score: analysis.score,
    matching_skills: analysis.matching_skills,
    missing_skills: analysis.missing_skills,
    suggestions: analysis.suggestions,
  }
  const updated = [entry, ...existing].slice(0, 10) // keep last 10
  localStorage.setItem(getKey(uid), JSON.stringify(updated))
}

export function getAnalyses(uid) {
  try {
    const raw = localStorage.getItem(getKey(uid))
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}