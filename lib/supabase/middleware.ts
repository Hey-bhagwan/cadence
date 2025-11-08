import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // Note: It's typically NEXT_PUBLIC_SUPABASE_ANON_KEY
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!, 
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // This will refresh the session cookie if needed
  const { data: { user } } = await supabase.auth.getUser()

  // --- START OF UPDATED LOGIC ---

  // 1. Define all public routes
  const publicPaths = [
    '/', // This makes the homepage public
    '/login', // The login page itself
    '/auth', // Any auth-related routes like callbacks
  ];
  
  // 2. Check if the current path is a public one
  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`)
  );

  // 3. Redirect if the user is not logged in AND is on a protected path
  if (!user && !isPublicPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login' // Redirect to your login page
    return NextResponse.redirect(url)
  }

  // --- END OF UPDATED LOGIC ---

  return supabaseResponse
}