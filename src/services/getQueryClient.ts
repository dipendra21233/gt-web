import { QueryClient } from '@tanstack/react-query'

export function makeQueryClient() {
  return new QueryClient({
    // defaultOptions: {
    //   queries: {
    //     staleTime: 5 * 60 * 1000, // 5 minutes (increased from 1 minute)
    //     gcTime: 10 * 60 * 1000, // 10 minutes (increased from 5 minutes)
    //     // retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    //     refetchOnWindowFocus: false,
    //     refetchOnReconnect: true,
    //     refetchOnMount: true,
    //     networkMode: 'online',
    //     retry: false,
    //   },
    //   mutations: {
    //     retry: false,
    //     retryDelay: 1000,
    //   },
    // },
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes (increase if necessary)
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false, // Do not refetch on window focus
        refetchOnReconnect: false, // Do not refetch when reconnecting
        refetchOnMount: false, // Avoid refetch on component mount
        networkMode: 'online', // Make queries online only
        retry: false, // Do not retry failed requests
        retryDelay: 1000, // Set retry delay if retry is true (not needed since retry is false)
      },
      mutations: {
        retry: false,
        retryDelay: 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}
