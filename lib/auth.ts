import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { getFirebaseAuth, getFirebaseDb } from "./firebase"

export interface UserProfile {
  uid: string
  name: string
  email: string
  phone?: string
  role: string
  createdAt: Date
  updatedAt: Date
}

// Sign up with email and password
export const signUpWithEmail = async (email: string, password: string, name: string) => {
  try {
    const auth = getFirebaseAuth()
    const db = getFirebaseDb()
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Create user profile in Firestore
    const userProfile: Omit<UserProfile, "uid"> = {
      name,
      email: user.email!,
      role: "farmer",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await setDoc(doc(db, "users", user.uid), userProfile)

    return { user, profile: userProfile }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const auth = getFirebaseAuth()
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error: any) {
    throw new Error(error.message)
  }
}

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const auth = getFirebaseAuth()
    const db = getFirebaseDb()
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(auth, provider)
    const user = userCredential.user

    // Check if user profile exists, if not create one
    const userDoc = await getDoc(doc(db, "users", user.uid))
    if (!userDoc.exists()) {
      const userProfile: Omit<UserProfile, "uid"> = {
        name: user.displayName || "User",
        email: user.email!,
        role: "farmer",
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      await setDoc(doc(db, "users", user.uid), userProfile)
    }

    return user
  } catch (error: any) {
    throw new Error(error.message)
  }
}

// Sign out
export const signOutUser = async () => {
  try {
    const auth = getFirebaseAuth()
    await signOut(auth)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

// Get user profile from Firestore
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const db = getFirebaseDb()
    const userDoc = await getDoc(doc(db, "users", uid))
    if (userDoc.exists()) {
      return { uid, ...userDoc.data() } as UserProfile
    }
    return null
  } catch (error) {
    console.error("Error getting user profile:", error)
    return null
  }
}

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  const auth = getFirebaseAuth()
  return onAuthStateChanged(auth, callback)
}

// Get Firebase ID token
export const getIdToken = async (): Promise<string | null> => {
  try {
    const auth = getFirebaseAuth()
    const user = auth.currentUser
    if (user) {
      return await user.getIdToken()
    }
    return null
  } catch (error) {
    console.error("Error getting ID token:", error)
    return null
  }
}
