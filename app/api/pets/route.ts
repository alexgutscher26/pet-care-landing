import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { name, breed, age, weight, photoUrl, description } = await req.json();

    if (!name || !breed || !age || !weight) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const { data, error } = await supabase
      .from('pets')
      .insert({
        name,
        breed,
        age,
        weight,
        photo_url: photoUrl,
        description,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) {
      return new NextResponse(error.message, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return new NextResponse(error.message, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const petId = searchParams.get('id');

    if (!petId) {
      return new NextResponse('Pet ID is required', { status: 400 });
    }

    const { error } = await supabase
      .from('pets')
      .delete()
      .eq('id', petId)
      .eq('user_id', user.id);

    if (error) {
      return new NextResponse(error.message, { status: 500 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
