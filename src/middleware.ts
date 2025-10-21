import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { isValidAdminFlag, isValidTokenFormat } from './utils/authUtils'
import { ACCESS_TOKEN, IS_ADMIN_USER, TRUE } from './utils/constant'

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const accessTokenCookie = request.cookies.get(ACCESS_TOKEN)
  const adminFlagCookie = request.cookies.get(IS_ADMIN_USER)

  const accessToken = accessTokenCookie?.value
  const isAdminFlag = adminFlagCookie?.value
  const isAdminRoute = pathname.startsWith('/admin')

  // Handle admin routes
  if (isAdminRoute) {
    // Check if user has a valid access token
    if (!accessToken || !isValidTokenFormat(accessToken)) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
      }
      return createLoginRedirect(request, pathname + search, 'invalid_token')
    }

    // Check if user has valid admin privileges
    if (!isValidAdminFlag(isAdminFlag) || isAdminFlag !== TRUE) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
      }

      // Clear invalid cookies to prevent confusion
      const response = createLoginRedirect(
        request,
        pathname + search,
        'insufficient_privileges'
      )

      if (isAdminFlag && isAdminFlag !== TRUE) {
        response.cookies.delete(IS_ADMIN_USER)
      }

      return response
    }

    // All checks passed - grant admin access
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
    }

    // Add security headers for admin routes
    const response = NextResponse.next()
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

    return response
  }

  // Handle specific non-admin protected routes (if any)
  const protectedUserRoutes = ['/booking', '/profile', '/my-bookings']
  const isProtectedUserRoute = protectedUserRoutes.some((route) =>
    pathname.startsWith(route)
  )

  if (isProtectedUserRoute) {
    // Check if user has valid access token for user routes
    if (!accessToken || !isValidTokenFormat(accessToken)) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(
          'Middleware: User route requires authentication, redirecting to login'
        )
      }
      return createLoginRedirect(
        request,
        pathname + search,
        'authentication_required'
      )
    }
  }

  // Handle auth pages - redirect authenticated users to home
  const authPages = ['/login', '/user-registration']
  const isAuthPage = authPages.some((route) => pathname === route)

  if (isAuthPage) {
    // Check if user is already authenticated
    if (accessToken && isValidTokenFormat(accessToken)) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(
          'Middleware: Authenticated user accessing auth page, redirecting to home'
        )
      }
      return createHomeRedirect(request, 'already_authenticated')
    }
  }

  // For all other routes, allow access
  return NextResponse.next()
}

/**
 * Creates a redirect response to login with return URL and reason
 */
function createLoginRedirect(
  request: NextRequest,
  returnUrl?: string,
  reason?: string
): NextResponse {
  const loginUrl = new URL('/login', request.url)

  // Add return URL as query parameter if provided and not already login
  if (returnUrl && !returnUrl.includes('/login')) {
    loginUrl.searchParams.set('redirect', returnUrl)
  }

  // Add reason for redirect (useful for debugging and user messaging)
  if (reason) {
    loginUrl.searchParams.set('reason', reason)
  }

  const response = NextResponse.redirect(loginUrl)

  // Add security headers to prevent caching of protected routes
  response.headers.set(
    'Cache-Control',
    'no-cache, no-store, must-revalidate, private'
  )
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')

  // Add CSRF protection header
  response.headers.set('X-Content-Type-Options', 'nosniff')

  return response
}

/**
 * Creates a redirect response to home page for authenticated users accessing auth pages
 */
function createHomeRedirect(
  request: NextRequest,
  reason?: string
): NextResponse {
  const homeUrl = new URL('/', request.url)

  // Add reason for redirect (useful for debugging)
  if (reason) {
    homeUrl.searchParams.set('reason', reason)
  }

  const response = NextResponse.redirect(homeUrl)

  // Add security headers
  response.headers.set(
    'Cache-Control',
    'no-cache, no-store, must-revalidate, private'
  )
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
  response.headers.set('X-Content-Type-Options', 'nosniff')

  return response
}

export const config = {
  matcher: [
    // Match all admin routes
    '/admin/:path*',
    // Match protected user routes
    '/booking/:path*',
    '/profile/:path*',
    '/my-bookings/:path*',
    // Match auth pages for redirect logic
    '/login',
    '/user-registration',
    // Exclude API routes, static files, and Next.js internals
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*|_next).*)',
  ],
}
