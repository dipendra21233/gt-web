import Cookies from 'js-cookie'
import { ACCESS_TOKEN, FALSE, IS_ADMIN_USER, TRUE } from './constant'
import { appRoutes } from './routes'

export interface AuthState {
  isAuthenticated: boolean
  isAdmin: boolean
  hasValidToken: boolean
  hasValidAdminFlag: boolean
}

/**
 * Get current authentication state
 */
export function getAuthState(): AuthState {
  const accessToken = Cookies.get(ACCESS_TOKEN)
  const adminFlag = Cookies.get(IS_ADMIN_USER)

  const hasValidToken = !!(accessToken && accessToken.trim() !== '')
  const hasValidAdminFlag = adminFlag === TRUE

  return {
    isAuthenticated: hasValidToken,
    isAdmin: hasValidAdminFlag,
    hasValidToken,
    hasValidAdminFlag,
  }
}

/**
 * Check if user can access admin routes
 */
export function canAccessAdminRoutes(): boolean {
  const { isAuthenticated, isAdmin } = getAuthState()
  return isAuthenticated && isAdmin
}

/**
 * Check if current route requires admin access
 */
export function isAdminRoute(pathname: string): boolean {
  return pathname.startsWith('/admin')
}

/**
 * Check if user should be redirected to login
 */
export function shouldRedirectToLogin(pathname: string): boolean {
  const isProtectedRoute = isAdminRoute(pathname)

  if (!isProtectedRoute) {
    return false
  }

  return !canAccessAdminRoutes()
}

/**
 * Get redirect URL after successful login
 */
export function getRedirectUrl(
  searchParams: URLSearchParams,
  defaultUrl: string = appRoutes.home
): string {
  const redirectParam = searchParams.get('redirect')

  if (redirectParam) {
    // Validate redirect URL to prevent open redirects
    try {
      const url = new URL(redirectParam, window.location.origin)
      // Only allow same-origin redirects
      if (url.origin === window.location.origin) {
        return redirectParam
      }
    } catch {
      // Invalid URL, use default
    }
  }

  return defaultUrl
}

/**
 * Clear all authentication data
 */
export function clearAuthData(): void {
  Cookies.remove(ACCESS_TOKEN)
  Cookies.remove(IS_ADMIN_USER)
}

/**
 * Set authentication data
 */
export function setAuthData(
  accessToken: string,
  isAdmin: boolean = false
): void {
  // Set access token with security options
  Cookies.set(ACCESS_TOKEN, accessToken, {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  })

  // Set admin flag
  Cookies.set(IS_ADMIN_USER, isAdmin ? TRUE : FALSE, {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  })
}

/**
 * Validate token format (basic validation)
 */
export function isValidTokenFormat(token: string): boolean {
  if (!token || typeof token !== 'string') {
    return false
  }

  // Basic validation - token should be non-empty and not just whitespace
  const trimmedToken = token.trim()
  if (trimmedToken.length === 0) {
    return false
  }

  // Additional validation can be added here (e.g., JWT format check)
  return true
}

/**
 * Check if admin flag value is valid
 */
export function isValidAdminFlag(flag: string | undefined): boolean {
  return flag === TRUE || flag === FALSE
}

/**
 * Get user role as string
 */
export function getUserRole(): 'admin' | 'user' | 'guest' {
  const { isAuthenticated, isAdmin } = getAuthState()

  if (!isAuthenticated) {
    return 'guest'
  }

  return isAdmin ? 'admin' : 'user'
}

/**
 * Check if user has specific permissions
 */
export function hasPermission(permission: 'admin' | 'user'): boolean {
  const role = getUserRole()

  switch (permission) {
    case 'admin':
      return role === 'admin'
    case 'user':
      return role === 'user' || role === 'admin'
    default:
      return false
  }
}
