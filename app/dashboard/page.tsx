'use client';

import { useAuth } from '@/lib/auth-context';
import { PawPrint, Calendar, Bell, Plus, Loader2, Sun, Thermometer, Heart, Activity, Gift, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Analytics } from '@/lib/analytics';
import { Progress } from '@/components/ui/progress';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface DashboardStats {
  totalPets: number;
  petsThisMonth: number;
  upcomingAppointments: number;
  activeReminders: number;
  petHealthSummary: {
    excellent: number;
    good: number;
    needsAttention: number;
  };
  upcomingBirthdays: Array<{
    id: string;
    name: string;
    date: string;
    age: number;
  }>;
  activityData: Array<{
    date: string;
    walks: number;
    playtime: number;
  }>;
  recentActivities: Array<{
    id: string;
    activity: string;
    timestamp: string;
  }>;
  weather: {
    temperature: number;
    condition: string;
    recommendation: string;
  };
}

const quickActions = [
  { 
    label: "Add Pet",
    icon: PawPrint,
    href: "/pets/add",
    description: "Register a new pet to your profile",
    color: "text-purple-500"
  },
  { 
    label: "Schedule Appointment",
    icon: Calendar,
    href: "vet-appointments",
    description: "Book a new appointment",
    color: "text-blue-500"
  },
  { 
    label: "Set Reminder",
    icon: Bell,
    href: "/reminders/new",
    description: "Create a new reminder",
    color: "text-yellow-500"
  },
  { 
    label: "View Records",
    icon: Activity,
    href: "/records",
    description: "Access medical records",
    color: "text-green-500"
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
      change: {
        value: dashboardStats?.petsThisMonth || 0,
        trend: 'up'
      },
      icon: PawPrint,
      color: "bg-purple-50 text-purple-500",
    },
    {
      title: "Upcoming Appointments",
      value: dashboardStats?.upcomingAppointments.toString() || "0",
      change: {
        value: 2,
        trend: 'up'
      },
      icon: Calendar,
      color: "bg-blue-50 text-blue-500",
    },
    {
      title: "Active Reminders",
      value: dashboardStats?.activeReminders.toString() || "0",
      change: {
        value: 1,
        trend: 'down'
      },
      icon: Bell,
      color: "bg-yellow-50 text-yellow-500",
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {firstName}!</h1>
          <p className="text-gray-600">Here's what's happening with your pets today.</p>
        </div>
        {authLoading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : dashboardStats?.weather && (
          <Card className="p-4 flex items-center gap-3 bg-gradient-to-r from-blue-50 to-blue-100">
            <Sun className="h-6 w-6 text-yellow-500" />
            <div>
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{dashboardStats.weather.temperature}°C</span>
              </div>
              <p className="text-sm text-gray-600">{dashboardStats.weather.recommendation}</p>
            </div>
          </Card>
        )}
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
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                      <div className={`flex items-center text-sm ${
                        stat.change.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {stat.change.trend === 'up' ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        )}
                        {stat.change.value}
                      </div>
                    </div>
                  </div>
                </div>
                <Progress value={65} className="h-1" />
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pet Health Summary */}
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Pet Health Summary</h2>
            <Heart className="h-5 w-5 text-red-500" />
          </div>
          {statsLoading ? (
            <div className="space-y-4">
              {Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          ) : dashboardStats?.petHealthSummary && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Excellent</span>
                <div className="flex-1 mx-4">
                  <Progress value={dashboardStats.petHealthSummary.excellent} className="h-2" />
                </div>
                <span className="text-sm font-medium">{dashboardStats.petHealthSummary.excellent}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Good</span>
                <div className="flex-1 mx-4">
                  <Progress value={dashboardStats.petHealthSummary.good} className="h-2" />
                </div>
                <span className="text-sm font-medium">{dashboardStats.petHealthSummary.good}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Needs Attention</span>
                <div className="flex-1 mx-4">
                  <Progress value={dashboardStats.petHealthSummary.needsAttention} className="h-2" />
                </div>
                <span className="text-sm font-medium">{dashboardStats.petHealthSummary.needsAttention}%</span>
              </div>
            </div>
          )}
        </Card>

        {/* Activity Chart */}
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Pet Activity Trends</h2>
            <Activity className="h-5 w-5 text-blue-500" />
          </div>
          {statsLoading ? (
            <Skeleton className="h-[200px] w-full" />
          ) : dashboardStats?.activityData && (
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardStats.activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="walks" stroke="#8884d8" />
                  <Line type="monotone" dataKey="playtime" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
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
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
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

        {/* Upcoming Birthdays */}
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Upcoming Pet Birthdays</h2>
            <Gift className="h-5 w-5 text-pink-500" />
          </div>
          <div className="space-y-4">
            {statsLoading ? (
              Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))
            ) : dashboardStats?.upcomingBirthdays?.length ? (
              dashboardStats.upcomingBirthdays.map((pet) => (
                <div key={pet.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{pet.name}</h3>
                    <p className="text-sm text-gray-600">Turning {pet.age + 1}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{new Date(pet.date).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">
                      {Math.ceil((new Date(pet.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No upcoming birthdays</p>
            )}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-white">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto py-4 justify-start text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 group relative"
              onClick={() => {
                Analytics.track('quick_action_clicked', {
                  action: action.label,
                  userId: user?.id,
                });
                router.push(action.href);
              }}
            >
              <div className="flex flex-col items-center w-full gap-2">
                <action.icon className={`h-6 w-6 ${action.color} group-hover:scale-110 transition-transform`} />
                <span>{action.label}</span>
              </div>
              <span className="absolute invisible group-hover:visible bg-gray-900 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                {action.description}
              </span>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
