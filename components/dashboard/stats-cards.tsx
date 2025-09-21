"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, BarChart3, TrendingUp, Calendar } from "lucide-react"

interface StatsCardsProps {
  totalFarms: number
  totalPredictions: number
  avgYield: number
  lastPrediction: string
}

export function StatsCards({ totalFarms, totalPredictions, avgYield, lastPrediction }: StatsCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gradient-to-br from-card to-card/80 border-l-4 border-l-emerald-500 shadow-sm hover:shadow-lg transition-all duration-300 group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-semibold text-muted-foreground">🏡 Total Farms</CardTitle>
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <MapPin className="h-4 w-4 text-emerald-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-emerald-700">{totalFarms}</div>
          <p className="text-sm text-muted-foreground mt-1">Active farm locations managed</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-card/80 border-l-4 border-l-blue-500 shadow-sm hover:shadow-lg transition-all duration-300 group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-semibold text-muted-foreground">📊 Predictions Made</CardTitle>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-sky-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-700">{totalPredictions}</div>
          <p className="text-sm text-muted-foreground mt-1">AI yield predictions generated</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-card/80 border-l-4 border-l-amber-500 shadow-sm hover:shadow-lg transition-all duration-300 group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-semibold text-muted-foreground">🌾 Avg. Predicted Yield</CardTitle>
          <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <TrendingUp className="h-4 w-4 text-amber-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-amber-700">{avgYield.toFixed(1)}</div>
          <p className="text-sm text-muted-foreground mt-1">kg per hectare average</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-card/80 border-l-4 border-l-purple-500 shadow-sm hover:shadow-lg transition-all duration-300 group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-semibold text-muted-foreground">📅 Last Prediction</CardTitle>
          <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Calendar className="h-4 w-4 text-purple-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-700">{lastPrediction}</div>
          <p className="text-sm text-muted-foreground mt-1">days since last analysis</p>
        </CardContent>
      </Card>
    </div>
  )
}
