import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
}

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null

const initializeFirebase = () => {
  if (app) return { app, auth: auth!, db: db! }

  const hasValidConfig = firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.authDomain

  if (!hasValidConfig) {
    throw new Error("Firebase configuration is missing. Please check your environment variables.")
  }

  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
    auth = getAuth(app)
    db = getFirestore(app)

    return { app, auth, db }
  } catch (error) {
    console.error("Firebase initialization failed:", error)
    throw error
  }
}

export const getFirebaseAuth = () => {
  const { auth } = initializeFirebase()
  return auth
}

export const getFirebaseDb = () => {
  const { db } = initializeFirebase()
  return db
}

export const getFirebaseApp = () => {
  const { app } = initializeFirebase()
  return app
}

// Legacy exports for backward compatibility
export { getFirebaseAuth as auth, getFirebaseDb as db }
export default getFirebaseApp
