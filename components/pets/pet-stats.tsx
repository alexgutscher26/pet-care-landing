'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PawPrint } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/lib/auth-context';

interface DashboardStats {
  totalPets: number;
  upcomingAppointments: number;
  activeReminders: number;
  recentActivities: Array<{
    id: string;
    activity: string;
    timestamp: string;
  }>;
}

export function PetStats() {
  const { user } = useAuth();
  const { data: dashboardStats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['dashboardStats', user?.id],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/stats');
      if (!response.ok) throw new Error('Failed to fetch dashboard stats');
      return response.json();
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <Card className="bg-white/50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <PawPrint className="h-4 w-4 text-purple-500" />
            <h3 className="text-sm font-medium text-muted-foreground">Total Pets</h3>
          </div>
          <div className="flex items-baseline space-x-3 mt-2">
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/50">
      <CardContent className="p-6">
        <div className="flex items-center space-x-2">
          <PawPrint className="h-4 w-4 text-purple-500" />
          <h3 className="text-sm font-medium text-muted-foreground">Total Pets</h3>
        </div>
        <div className="flex items-baseline space-x-3 mt-2">
          <p className="text-2xl font-bold">{dashboardStats?.totalPets || 0}</p>
          <span className="text-sm text-muted-foreground">
            +1 this month
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
