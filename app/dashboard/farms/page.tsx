"use client";

import { useEffect, useState, useCallback } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AddFarmDialog } from "@/components/farms/add-farm-dialog";
import { FarmCard } from "@/components/farms/farm-card";
import { useAuth } from "@/contexts/auth-context";
import { apiClient } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

// Type for a farm
interface Farm {
  id: string;
  name: string;
  location?: string;
}

export default function FarmsPage() {
  const { user, loading } = useAuth();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [isLoadingFarms, setIsLoadingFarms] = useState(true);
  const router = useRouter();

  // Function to load farms from API
  const loadFarms = useCallback(async () => {
    setIsLoadingFarms(true);
    try {
      const response = await apiClient.getFarms();
      setFarms(response.farms || []);
    } catch (error) {
      console.error("Error loading farms:", error);
    } finally {
      setIsLoadingFarms(false);
    }
  }, []);

  // Redirect unauthenticated users and load farms
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else {
        loadFarms();
      }
    }
  }, [user, loading, router, loadFarms]);

  // Show full-page loader if auth or farm data is loading
  if (loading || !user || isLoadingFarms) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading farms...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Farms</h1>
            <p className="text-muted-foreground mt-2">
              Manage your farm locations and properties.
            </p>
          </div>
          <AddFarmDialog onFarmAdded={loadFarms} />
        </div>

        {/* Farms Grid */}
        {farms.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {farms.map((farm) => (
              <FarmCard key={farm.id} farm={farm} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No farms added yet.</p>
            <AddFarmDialog onFarmAdded={loadFarms} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
