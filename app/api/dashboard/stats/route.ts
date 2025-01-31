import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data - replace with actual database calls later
  const mockData = {
    totalPets: 3,
    upcomingAppointments: 2,
    activeReminders: 5,
    recentActivities: [
      {
        id: '1',
        activity: 'Added new vaccination record',
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        activity: 'Scheduled vet appointment',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        activity: 'Updated pet profile',
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      },
    ],
  };

  return NextResponse.json(mockData);
}
