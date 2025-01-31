import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get total pets for the user
    const { data: pets, error: petsError } = await supabase
      .from('pets')
      .select('created_at')
      .eq('user_id', user.id);

    if (petsError) {
      return new NextResponse(petsError.message, { status: 500 });
    }

    // Calculate pets added this month
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const petsThisMonth = pets.filter(pet => 
      new Date(pet.created_at) >= firstDayOfMonth
    ).length;

    // Get upcoming appointments
    const { data: appointments, error: appointmentsError } = await supabase
      .from('appointments')
      .select('scheduled_for')
      .eq('user_id', user.id)
      .gte('scheduled_for', new Date().toISOString())
      .order('scheduled_for', { ascending: true })
      .limit(5);

    if (appointmentsError) {
      console.error('Error fetching appointments:', appointmentsError);
    }

    // Get active reminders
    const { data: reminders, error: remindersError } = await supabase
      .from('reminders')
      .select('due_date')
      .eq('user_id', user.id)
      .eq('completed', false)
      .order('due_date', { ascending: true });

    if (remindersError) {
      console.error('Error fetching reminders:', remindersError);
    }

    // Get recent activities
    const { data: activities, error: activitiesError } = await supabase
      .from('activities')
      .select('id, activity, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(3);

    if (activitiesError) {
      console.error('Error fetching activities:', activitiesError);
    }

    const dashboardData = {
      totalPets: pets.length,
      upcomingAppointments: appointments?.length || 0,
      activeReminders: reminders?.length || 0,
      recentActivities: activities?.map(activity => ({
        id: activity.id,
        activity: activity.activity,
        timestamp: activity.created_at,
      })) || [],
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
