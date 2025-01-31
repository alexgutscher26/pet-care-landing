import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single();

    if (error) {
      return new NextResponse(error.message, { status: 500 });
    }

    if (!data) {
      return new NextResponse('Pet not found', { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();

    // Validate that the pet belongs to the user
    const { data: existingPet, error: fetchError } = await supabase
      .from('pets')
      .select('id')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existingPet) {
      return new NextResponse('Pet not found', { status: 404 });
    }

    const { data, error } = await supabase
      .from('pets')
      .update({
        name: body.name,
        breed: body.breed,
        age: body.age,
        weight: body.weight,
        photo_url: body.photo_url,
        description: body.description,
      })
      .eq('id', params.id)
      .eq('user_id', user.id)
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { error } = await supabase
      .from('pets')
      .delete()
      .eq('id', params.id)
      .eq('user_id', user.id);

    if (error) {
      return new NextResponse(error.message, { status: 500 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
