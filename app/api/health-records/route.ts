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

    // Get health records for the user's pets
    const { data: records, error } = await supabase
      .from('health_records')
      .select('*, pets(name)')
      .eq('user_id', user.id)
      .order('date', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(records);
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
    console.log('Request body:', body);
    const { pet_id, type, date, next_due, notes } = body;

    // Validate required fields
    if (!pet_id || !type || !date) {
      console.error('Missing required fields:', { pet_id, type, date });
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

    // Insert the health record
    const { data: record, error } = await supabase
      .from('health_records')
      .insert({
        pet_id,
        user_id: user.id,
        type,
        date,
        next_due: next_due || null,
        notes: notes || null,
      })
      .select('*, pets(name)')
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(record);
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
    const { id, pet_id, type, date, next_due, notes } = body;

    // Validate required fields
    if (!id || !pet_id || !type || !date) {
      console.error('Missing required fields:', { id, pet_id, type, date });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify that the record exists and belongs to the user
    const { data: existingRecord, error: recordError } = await supabase
      .from('health_records')
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (recordError || !existingRecord) {
      console.error('Record verification error:', recordError);
      return NextResponse.json(
        { error: 'Record not found or does not belong to user' },
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

    // Update the health record
    const { data: record, error } = await supabase
      .from('health_records')
      .update({
        pet_id,
        type,
        date,
        next_due: next_due || null,
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

    return NextResponse.json(record);
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

    // Get the record ID from the URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      console.error('Missing record ID');
      return NextResponse.json(
        { error: 'Record ID is required' },
        { status: 400 }
      );
    }

    // Delete the record
    const { error } = await supabase
      .from('health_records')
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
