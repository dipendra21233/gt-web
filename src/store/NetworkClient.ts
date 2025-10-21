import { ACCESS_TOKEN, COMMON_API_TIMEOUT } from '@/utils/constant'
import { ApiError } from '@/utils/errorHandler'
import { setInitialStorageState } from '@/utils/functions'
import { appRoutes } from '@/utils/routes'
import { translation } from '@/utils/translation'
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import Cookies from 'js-cookie'

interface apiHeaders {
  Accept: string
  [key: string]: string
}

interface ApiErrorResponse {
  message?: string
  error?: string | boolean
  success?: boolean
  status?: number
  statusCode?: number
}

class NetworkClient {
  private service: AxiosInstance
  private cancelTokens: Map<string, any> = new Map()
  private isRefreshing: boolean = false
  private failedQueue: {
    resolve: (token: string | AxiosResponse) => void
    reject: (error: AxiosError | Error | null) => void
  }[] = []

  constructor() {
    const headers: apiHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }

    this.service = axios.create({
      headers,
      withCredentials: true,
      timeout: COMMON_API_TIMEOUT,
      timeoutErrorMessage: translation.REQUEST_TIMEOUT,
    })

    this.service.interceptors.response.use(this.handleSuccess, this.handleError)
    this.service.interceptors.request.use(this.addAuthorizationHeader)
  }

  private addAuthorizationHeader(config: any) {
    const token = Cookies.get(ACCESS_TOKEN)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    config.baseURL = process.env.NEXT_PUBLIC_API_URL
    return config
  }

  private handleSuccess(response: AxiosResponse) {
    return response
  }

  private processQueue(
    error: Error | AxiosError | null,
    token: string | null = null
  ) {
    this.failedQueue.forEach((prom) => {
      if (token) {
        prom.resolve(token)
      } else {
        prom.reject(error)
      }
    })
    this.failedQueue = []
  }

  private redirectToLogin() {
    setInitialStorageState()
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname
      const redirectUrl =
        currentPath !== appRoutes.login
          ? `?redirect=${encodeURIComponent(currentPath)}`
          : ''
      window.location.href = `${appRoutes.login}${redirectUrl}`
    }
  }

  private handleTokenExpiry() {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Token expired or invalid, redirecting to login')
    }
    this.redirectToLogin()
  }

  private getErrorMessage(error: AxiosError): string {
    const response = error.response?.data as ApiErrorResponse
    if (response?.message) return response.message
    if (response?.error && typeof response.error === 'string')
      return response.error

    switch (error.response?.status) {
      case 400:
        return 'Bad Request: Please check your input data'
      case 401:
        return 'Unauthorized: Please login to continue'
      case 403:
        return 'Forbidden: You do not have permission to access this resource'
      case 404:
        return 'Not Found: The requested resource was not found'
      case 409:
        return 'Conflict: The request conflicts with current state'
      case 422:
        return 'Validation Error: Please check your input data'
      case 429:
        return 'Too Many Requests: Please try again later'
      case 500:
        return 'Internal Server Error: Something went wrong on our end'
      case 502:
        return 'Bad Gateway: Server is temporarily unavailable'
      case 503:
        return 'Service Unavailable: Please try again later'
      case 504:
        return 'Gateway Timeout: Request took too long to process'
      default:
        return error.message || 'An unexpected error occurred'
    }
  }

  private handleError = async (
    error: AxiosError
  ): Promise<AxiosResponse | ApiError> => {
    const _originalRequest = error.config
    if (!error.response) {
      const networkError = new Error(
        'Network error: Please check your internet connection'
      )
      return Promise.reject(networkError)
    }

    const { status } = error.response

    if (status === 401 && !this.isRefreshing) {
      this.isRefreshing = true
      const oldAccessToken = Cookies.get(ACCESS_TOKEN)

      if (oldAccessToken) {
        try {
          const tokenResponse = await this.refreshAccessToken(oldAccessToken)
          const newAccessToken = tokenResponse?.data?.accessToken

          if (newAccessToken) {
            Cookies.set(ACCESS_TOKEN, newAccessToken, {
              expires: 7,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
            })

            this.processQueue(null, newAccessToken)
            if (_originalRequest && _originalRequest.headers) {
              _originalRequest.headers['Authorization'] =
                `Bearer ${newAccessToken}`
            }
            return this.service(_originalRequest as AxiosRequestConfig)
          } else {
            throw new Error('New access token missing')
          }
        } catch (refreshError: any) {
          // Ensure refreshError is of type Error or AxiosError
          const errorObj =
            refreshError instanceof Error
              ? refreshError
              : new Error(String(refreshError))
          this.processQueue(errorObj, null)
          this.handleTokenExpiry()
          return Promise.reject(errorObj)
        } finally {
          this.isRefreshing = false
        }
      } else {
        this.handleTokenExpiry()
        return Promise.reject(
          new Error('No access token available for refresh')
        )
      }
    }

    return Promise.reject(error)
  }

  private async refreshAccessToken(
    accessToken: string
  ): Promise<AxiosResponse> {
    return axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}auth/refresh`,
      { accessToken },
      {
        withCredentials: true,
        timeout: COMMON_API_TIMEOUT,
        timeoutErrorMessage: translation.REQUEST_TIMEOUT,
      }
    )
  }

  async get(
    path: string,
    headers?: apiHeaders,
    timeout?: number,
    timeoutErrorMessage?: string
  ) {
    return this.service.get(path, {
      headers,
      timeout: timeout || this.service.defaults.timeout,
      timeoutErrorMessage:
        timeoutErrorMessage || this.service.defaults.timeoutErrorMessage,
    })
  }

  async post<T>(
    path: string,
    payload: T,
    headers?: apiHeaders,
    timeout?: number,
    timeoutErrorMessage?: string
  ) {
    return this.service.post(path, payload, {
      headers,
      timeout: timeout || this.service.defaults.timeout,
      timeoutErrorMessage:
        timeoutErrorMessage || this.service.defaults.timeoutErrorMessage,
    })
  }

  async patch<T>(
    path: string,
    payload: T,
    headers?: apiHeaders,
    timeout?: number,
    timeoutErrorMessage?: string
  ) {
    return this.service.patch(path, payload, {
      headers,
      timeout: timeout || this.service.defaults.timeout,
      timeoutErrorMessage:
        timeoutErrorMessage || this.service.defaults.timeoutErrorMessage,
    })
  }

  isAuthenticated(): boolean {
    const token = Cookies.get(ACCESS_TOKEN)
    return !!token
  }

  logout(): void {
    setInitialStorageState()
    this.redirectToLogin()
  }

  cancelRequest(requestId: string): void {
    const cancelToken = this.cancelTokens.get(requestId)
    if (cancelToken) {
      cancelToken.cancel('Request cancelled by user')
      this.cancelTokens.delete(requestId)
    }
  }

  cancelAllRequests(): void {
    this.cancelTokens.forEach((cancelToken) =>
      cancelToken.cancel('All requests cancelled')
    )
    this.cancelTokens.clear()
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new NetworkClient()
