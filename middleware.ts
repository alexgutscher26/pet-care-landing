import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Get session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Define route types
  const publicRoutes = ['/', '/signin', '/signup'];
  const isPublicRoute = publicRoutes.some((path) => 
    req.nextUrl.pathname === path
  );

  // If user is not signed in and tries to access any non-public route
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  // If user is signed in and tries to access auth routes
  if (session && ['/signin', '/signup'].includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|api/).*)',
  ],
};
