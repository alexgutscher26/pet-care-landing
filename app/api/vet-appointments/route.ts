import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { Database } from '@/lib/database.types';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error('Auth error:', authError);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get vet appointments for the user's pets
    const { data: appointments, error } = await supabase
      .from('vet_appointments')
      .select('*, pets(name)')
      .eq('user_id', user.id)
      .order('appointment_date', { ascending: true });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error('Auth error:', authError);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the request body
    const body = await request.json();
    const { pet_id, vet_name, purpose, appointment_date, notes } = body;

    // Validate required fields
    if (!pet_id || !vet_name || !purpose || !appointment_date) {
      console.error('Missing required fields:', { pet_id, vet_name, purpose, appointment_date });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify that the pet belongs to the user
    const { data: pet, error: petError } = await supabase
      .from('pets')
      .select('id')
      .eq('id', pet_id)
      .eq('user_id', user.id)
      .single();

    if (petError || !pet) {
      console.error('Pet verification error:', petError);
      return NextResponse.json(
        { error: 'Invalid pet ID or pet does not belong to user' },
        { status: 400 }
      );
    }

    // Insert the appointment
    const { data: appointment, error } = await supabase
      .from('vet_appointments')
      .insert({
        pet_id,
        user_id: user.id,
        vet_name,
        purpose,
        appointment_date,
        notes: notes || null,
      })
      .select('*, pets(name)')
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error('Auth error:', authError);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the request body
    const body = await request.json();
    const { id, pet_id, vet_name, purpose, appointment_date, status, notes } = body;

    // Validate required fields
    if (!id || !pet_id || !vet_name || !purpose || !appointment_date) {
      console.error('Missing required fields:', { id, pet_id, vet_name, purpose, appointment_date });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify that the appointment exists and belongs to the user
    const { data: existingAppointment, error: appointmentError } = await supabase
      .from('vet_appointments')
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (appointmentError || !existingAppointment) {
      console.error('Appointment verification error:', appointmentError);
      return NextResponse.json(
        { error: 'Appointment not found or does not belong to user' },
        { status: 404 }
      );
    }

    // Verify that the pet belongs to the user
    const { data: pet, error: petError } = await supabase
      .from('pets')
      .select('id')
      .eq('id', pet_id)
      .eq('user_id', user.id)
      .single();

    if (petError || !pet) {
      console.error('Pet verification error:', petError);
      return NextResponse.json(
        { error: 'Invalid pet ID or pet does not belong to user' },
        { status: 400 }
      );
    }

    // Update the appointment
    const { data: appointment, error } = await supabase
      .from('vet_appointments')
      .update({
        pet_id,
        vet_name,
        purpose,
        appointment_date,
        status: status || 'scheduled',
        notes: notes || null,
      })
      .eq('id', id)
      .eq('user_id', user.id)
      .select('*, pets(name)')
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error('Auth error:', authError);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the appointment ID from the URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      console.error('Missing appointment ID');
      return NextResponse.json(
        { error: 'Appointment ID is required' },
        { status: 400 }
      );
    }

    // Delete the appointment
    const { error } = await supabase
      .from('vet_appointments')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
