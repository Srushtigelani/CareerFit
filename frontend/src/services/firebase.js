import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "REDACTED_FIREBASE_API_KEY",
  authDomain: "careerfit-a83cf.firebaseapp.com",
  projectId: "careerfit-a83cf",
  storageBucket: "careerfit-a83cf.firebasestorage.app",
  messagingSenderId: "10399674318",
  appId: "1:10399674318:web:a689d846c95bf7fc90859f"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)