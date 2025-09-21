"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Sprout, BarChart3, Users, Shield, AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [showFirebaseWarning, setShowFirebaseWarning] = useState(false)

  useEffect(() => {
    const hasFirebaseConfig = !!(
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    )

    setShowFirebaseWarning(!hasFirebaseConfig)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/40 via-background to-green-50/30 relative overflow-hidden">
      {showFirebaseWarning && (
        <div className="bg-destructive/10 border-b border-destructive/20">
          <div className="container mx-auto px-4 py-3">
            <Alert className="border-destructive/20 bg-transparent">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive">
                <strong>Firebase Configuration Required:</strong> Please set up your Firebase environment variables in
                Project Settings to enable authentication and database features.
                <br />
                <span className="text-sm">
                  Required: NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
                  NEXT_PUBLIC_FIREBASE_PROJECT_ID, NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
                  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, NEXT_PUBLIC_FIREBASE_APP_ID
                </span>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-lg shadow-sm relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <Sprout className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground">CropPredict</span>
                <span className="text-xs text-muted-foreground">AI-Powered Agriculture</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" disabled={showFirebaseWarning}>
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button disabled={showFirebaseWarning}>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-500/20 blur-3xl opacity-30 rounded-full"></div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance relative z-10">
              AI-Powered 
              <span className="bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                Crop Yield
              </span>
              <br />Prediction System
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto leading-relaxed">
            Transform your farming with intelligent predictions. Our machine learning models analyze soil, weather, and crop data to deliver precise yield forecasts, helping you optimize resources and maximize productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 shadow-lg hover:shadow-xl transition-all duration-300" disabled={showFirebaseWarning}>
                🌱 Start Predicting
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:bg-primary/5 transition-all duration-300" disabled={showFirebaseWarning}>
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          {/* Decorative background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-emerald-200/30 to-green-300/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-green-200/20 to-emerald-300/30 rounded-full blur-2xl"></div>
          </div>
          <div className="text-center p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">🎯 Accurate Predictions</h3>
            <p className="text-muted-foreground leading-relaxed">
              Advanced machine learning models trained on comprehensive agricultural data to provide reliable yield forecasts with 95%+ accuracy.
            </p>
          </div>

          <div className="text-center p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">🚜 Smart Farm Management</h3>
            <p className="text-muted-foreground leading-relaxed">
              Centralized dashboard to manage multiple farms, monitor soil health, track weather patterns, and optimize resource allocation.
            </p>
          </div>

          <div className="text-center p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">🔒 Enterprise Security</h3>
            <p className="text-muted-foreground leading-relaxed">
              Bank-level encryption protects your agricultural data. GDPR compliant with full data ownership and privacy controls.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
