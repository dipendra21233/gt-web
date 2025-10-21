'use client'
import { Box } from 'theme-ui';

const FareSummarySidebarSkeletonLoader = () => {
  return (
    <Box as='div' className="w-full lg:w-1/3 p-4 flex flex-col gap-4 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header Skeleton */}
      <Box as="div" className="bg-gray-200 p-3 -mx-4 -mt-4 animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-32 mx-auto"></div>
      </Box>

      {/* Fare/Pax Type Section Skeleton */}
      <Box as="div" className="space-y-2">
        <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
        <Box className="space-y-3">
          {/* Adult Fares Skeleton */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
          </div>

          {/* Child Fares Skeleton */}
          <div className="space-y-2 mt-4">
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
          </div>

          {/* Infant Fares Skeleton */}
          <div className="space-y-2 mt-4">
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
          </div>
        </Box>
      </Box>

      {/* Additional Charges Section Skeleton */}
      <Box as="div" className="space-y-2">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
        </div>
      </Box>

      {/* Total Amount Section Skeleton */}
      <Box className="space-y-2 border-t pt-4">
        <div className="flex justify-between">
          <div className="h-5 bg-gray-300 rounded w-24 animate-pulse"></div>
          <div className="h-5 bg-gray-300 rounded w-20 animate-pulse"></div>
        </div>
      </Box>
    </Box>
  );
};

export default FareSummarySidebarSkeletonLoader;
