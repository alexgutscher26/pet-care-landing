'use client';

import { useAuth } from '@/lib/auth-context';
import { PawPrint, Calendar, Bell, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Analytics } from '@/lib/analytics';

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

const quickActions = [
  { 
    label: "Add Pet", 
    href: "/pets/add",
    description: "Register a new pet to your profile"
  },
  { 
    label: "Schedule Appointment", 
    href: "/appointments/schedule",
    description: "Book a new appointment"
  },
  { 
    label: "Set Reminder", 
    href: "/reminders/new",
    description: "Create a new reminder"
  },
  { 
    label: "View Records", 
    href: "/records",
    description: "Access medical records"
  },
];

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const firstName = user?.email?.split('@')[0] || 'there';

  const { data: dashboardStats, isLoading: statsLoading, error } = useQuery<DashboardStats>({
    queryKey: ['dashboardStats', user?.id],
    queryFn: async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (!response.ok) throw new Error('Failed to fetch dashboard stats');
        return response.json();
      } catch (err) {
        throw new Error('Error fetching dashboard data');
      }
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (user) {
      Analytics.track('dashboard_viewed', {
        userId: user.id,
        timestamp: new Date().toISOString(),
      });
    }
  }, [user]);

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to load dashboard data. Please try again later.",
    });
  }

  const statsCards = [
    {
      title: "Total Pets",
      value: dashboardStats?.totalPets.toString() || "0",
      change: "+1 this month",
      icon: PawPrint,
    },
    {
      title: "Upcoming Appointments",
      value: dashboardStats?.upcomingAppointments.toString() || "0",
      change: "Next: Tomorrow",
      icon: Calendar,
    },
    {
      title: "Active Reminders",
      value: dashboardStats?.activeReminders.toString() || "0",
      change: "2 due today",
      icon: Bell,
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {firstName}!</h1>
          <p className="text-gray-600">Here's what's happening with your pets today.</p>
        </div>
        {authLoading && <Loader2 className="h-6 w-6 animate-spin" />}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((stat) => (
          <Card 
            key={stat.title} 
            className="p-6 bg-white hover:shadow-lg transition-shadow duration-200"
          >
            {statsLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-8 w-[60px]" />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <stat.icon className="h-6 w-6 text-indigo-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <span className="text-sm text-gray-500">{stat.change}</span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6 bg-white">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {statsLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-2 w-2 rounded-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))
            ) : dashboardStats?.recentActivities.length ? (
              dashboardStats.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-indigo-500" />
                  <span className="text-gray-600">{activity.activity}</span>
                  <span className="text-sm text-gray-400 ml-auto">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No recent activity</p>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 bg-white">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="justify-start text-gray-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 group relative"
                onClick={() => {
                  Analytics.track('quick_action_clicked', {
                    action: action.label,
                    userId: user?.id,
                  });
                  router.push(action.href);
                }}
              >
                <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
                {action.label}
                <span className="absolute invisible group-hover:visible bg-gray-900 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2">
                  {action.description}
                </span>
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
