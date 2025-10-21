import {
  AuthState,
  getAuthState,
  getRedirectUrl,
  getUserRole,
} from '@/utils/authUtils'
import { ACCESS_TOKEN, IS_ADMIN_USER } from '@/utils/constant'
import { appRoutes } from '@/utils/routes'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

interface UseAuthReturn extends AuthState {
  isLoading: boolean
  userRole: 'admin' | 'user' | 'guest'
  logout: () => void
  checkAuth: () => boolean
  redirectToLogin: (returnUrl?: string) => void
  handleLoginSuccess: (accessToken: string, isAdmin?: boolean) => void
}

export const useAuth = (): UseAuthReturn => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isAdmin: false,
    hasValidToken: false,
    hasValidAdminFlag: false,
  })
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  const checkAuth = useCallback((): boolean => {
    const currentAuthState = getAuthState()
    setAuthState(currentAuthState)
    return currentAuthState.isAuthenticated
  }, [])

  const logout = useCallback(() => {
    // clearAuthData()
    setAuthState({
      isAuthenticated: false,
      isAdmin: false,
      hasValidToken: false,
      hasValidAdminFlag: false,
    })

    // Redirect to login with current path as return URL
    const currentPath = window.location.pathname + window.location.search
    const returnUrl =
      currentPath !== appRoutes.login
        ? `?redirect=${encodeURIComponent(currentPath)}`
        : ''
    router.push(`${appRoutes.login}${returnUrl}`)
  }, [router])

  const redirectToLogin = useCallback(
    (returnUrl?: string) => {
      const currentPath =
        returnUrl || window.location.pathname + window.location.search
      const redirectUrl =
        currentPath !== appRoutes.login
          ? `?redirect=${encodeURIComponent(currentPath)}`
          : ''

      router.push(`${appRoutes.login}${redirectUrl}`)
    },
    [router]
  )

  const handleLoginSuccess = useCallback(
    (accessToken: string, isAdmin: boolean = false) => {
      // This would typically be called after successful login
      // The actual token setting should be done by the login API handler

      // Update local state
      const newAuthState = {
        isAuthenticated: true,
        isAdmin,
        hasValidToken: true,
        hasValidAdminFlag: isAdmin,
      }
      setAuthState(newAuthState)

      // Redirect to intended page or default
      const redirectUrl = getRedirectUrl(
        searchParams,
        isAdmin ? appRoutes.userRequests : appRoutes.home
      )
      router.push(redirectUrl)
    },
    [router, searchParams]
  )

  // Initial auth check
  useEffect(() => {
    setIsLoading(true)
    checkAuth()
    setIsLoading(false)
  }, [checkAuth])

  // Listen for storage changes (e.g., logout in another tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === ACCESS_TOKEN || e.key === IS_ADMIN_USER) {
        checkAuth()
      }
    }

    // Listen for custom events (useful for same-tab updates)
    const handleAuthChange = () => {
      checkAuth()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('auth-change', handleAuthChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('auth-change', handleAuthChange)
    }
  }, [checkAuth])

  // Periodically check auth state (every 30 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      checkAuth()
    }, 30000)

    return () => clearInterval(interval)
  }, [checkAuth])

  return {
    ...authState,
    isLoading,
    userRole: getUserRole(),
    logout,
    checkAuth,
    redirectToLogin,
    handleLoginSuccess,
  }
}

// Utility function to trigger auth change event
export const triggerAuthChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth-change'))
  }
}
