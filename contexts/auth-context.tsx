"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface LocalUser {
  uid: string
  email: string | null
  displayName: string | null
}

interface AuthContextType {
  user: LocalUser | null
  profile: any | null
  loading: boolean
  refreshProfile: () => Promise<void>
  firebaseConfigured: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LocalUser | null>(null)
  const [profile, setProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [firebaseConfigured, setFirebaseConfigured] = useState(false)

  const refreshProfile = async () => {
    if (!firebaseConfigured) return
    // Will implement when Firebase is configured
  }

  useEffect(() => {
    const hasFirebaseConfig = !!(
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET &&
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID &&
      process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    )

    if (!hasFirebaseConfig) {
      console.warn("Firebase environment variables are not configured. Authentication features will be disabled.")
      setFirebaseConfigured(false)
      setLoading(false)
      return
    }

    setFirebaseConfigured(true)

    const initializeAuth = async () => {
      try {
        const { onAuthStateChange, getUserProfile } = await import("@/lib/auth")

        const unsubscribe = onAuthStateChange(async (firebaseUser) => {
          if (firebaseUser) {
            const localUser: LocalUser = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
            }
            setUser(localUser)

            const userProfile = await getUserProfile(firebaseUser.uid)
            setProfile(userProfile)
          } else {
            setUser(null)
            setProfile(null)
          }
          setLoading(false)
        })

        return unsubscribe
      } catch (error) {
        console.error("Failed to initialize Firebase auth:", error)
        setFirebaseConfigured(false)
        setLoading(false)
        return undefined
      }
    }

    let unsubscribe: (() => void) | undefined

    initializeAuth().then((unsub) => {
      unsubscribe = unsub
    })

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, profile, loading, refreshProfile, firebaseConfigured }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
