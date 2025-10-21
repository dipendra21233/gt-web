import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export interface ApiErrorResponse {
  message?: string
  error?: string
  statusCode?: number
  details?: any
}

export class ApiError extends Error {
  statusCode: number
  details?: any

  constructor(message: string, statusCode: number, details?: any) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.details = details
  }
}

export const handleApiError = (
  error: unknown,
  showToast: boolean = true
): ApiError => {
  let apiError: ApiError

  if (error instanceof AxiosError) {
    const response = error.response?.data as ApiErrorResponse
    const statusCode = error.response?.status || 500

    let message = 'An unexpected error occurred'

    if (response?.message) {
      message = response.message
    } else if (response?.error) {
      message = response.error
    } else {
      // Default messages based on status code
      switch (statusCode) {
        case 400:
          message = 'Bad Request: Please check your input data'
          break
        case 401:
          message = 'Unauthorized: Please login to continue'
          break
        case 403:
          message =
            'Forbidden: You do not have permission to access this resource'
          break
        case 404:
          message = 'Not Found: The requested resource was not found'
          break
        case 409:
          message = 'Conflict: The request conflicts with current state'
          break
        case 422:
          message = 'Validation Error: Please check your input data'
          break
        case 429:
          message = 'Too Many Requests: Please try again later'
          break
        case 500:
          message = 'Internal Server Error: Something went wrong on our end'
          break
        case 502:
          message = 'Bad Gateway: Server is temporarily unavailable'
          break
        case 503:
          message = 'Service Unavailable: Please try again later'
          break
        case 504:
          message = 'Gateway Timeout: Request took too long to process'
          break
        default:
          message = error.message || 'An unexpected error occurred'
      }
    }

    apiError = new ApiError(message, statusCode, response?.details)
  } else if (error instanceof Error) {
    apiError = new ApiError(error.message, 500)
  } else if (typeof error === 'string') {
    apiError = new ApiError(error, 500)
  } else {
    apiError = new ApiError('An unexpected error occurred', 500)
  }

  // Log error for debugging
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.error('API Error:', {
      message: apiError.message,
      statusCode: apiError.statusCode,
      details: apiError.details,
      originalError: error,
    })
  }

  // Show toast notification if requested
  if (showToast) {
    showErrorToast(apiError)
  }

  return apiError
}

export const showErrorToast = (error: ApiError | string) => {
  const message = typeof error === 'string' ? error : error.message

  // Don't show toast for certain status codes that are handled elsewhere
  if (typeof error !== 'string' && [401, 403].includes(error.statusCode)) {
    return
  }

  toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

export const showWarningToast = (message: string) => {
  toast.warning(message, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

export const showInfoToast = (message: string) => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

// Utility function to check if error is a network error
export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    return !error.response && error.code !== 'ECONNABORTED'
  }
  return false
}

// Utility function to check if error is a timeout error
export const isTimeoutError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    return error.code === 'ECONNABORTED' || error.message.includes('timeout')
  }
  return false
}

// Utility function to retry failed requests
export const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: unknown

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn()
    } catch (error) {
      lastError = error

      // Don't retry on certain status codes
      if (error instanceof AxiosError && error.response) {
        const statusCode = error.response.status
        if ([400, 401, 403, 404, 422].includes(statusCode)) {
          throw error
        }
      }

      // Wait before retrying
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)))
      }
    }
  }

  throw lastError
}
