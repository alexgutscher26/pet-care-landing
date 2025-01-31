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
  const protectedRoutes = ['/dashboard'];
  const authRoutes = ['/signin', '/signup'];
  
  const isProtectedRoute = protectedRoutes.some((path) => 
    req.nextUrl.pathname.startsWith(path)
  );
  
  const isAuthRoute = authRoutes.some((path) => 
    req.nextUrl.pathname.startsWith(path)
  );

  // If user is signed in and tries to access auth routes
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // If user is not signed in and tries to access protected routes
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL('/signin', req.url));
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
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
