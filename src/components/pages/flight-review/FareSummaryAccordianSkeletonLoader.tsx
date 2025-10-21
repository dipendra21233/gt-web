'use client'
import { Box } from 'theme-ui';

const FareSummaryAccordianSkeletonLoader = () => {
  return (
    <Box as="div" className="w-full space-y-2">
      {/* First Accordion - Passenger Information */}
      <Box as="div" className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
        {/* Accordion Header Skeleton */}
        <Box as="div" className="px-6 py-2 bg-[#ff7b00] flex items-center justify-between">
          <Box as="div" className="flex items-center gap-3">
            <div className="h-5 bg-orange-200 rounded w-40 animate-pulse"></div>
          </Box>
          <div className="h-4 w-4 bg-orange-200 rounded animate-pulse"></div>
        </Box>
        
        {/* Accordion Content Skeleton */}
        <Box as="div" className="px-6 bg-gray-50 py-4">
          <Box as="div" className="space-y-6">
            {/* Section Title */}
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
            
            {/* Form Fields Skeleton */}
            <Box as="div" className="space-y-4">
              {/* First Row */}
              <Box as="div" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Box as="div" className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </Box>
                <Box as="div" className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </Box>
              </Box>
              
              {/* Second Row */}
              <Box as="div" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Box as="div" className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </Box>
                <Box as="div" className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-18 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </Box>
              </Box>
              
              {/* Third Row */}
              <Box as="div" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Box as="div" className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </Box>
                <Box as="div" className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-22 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Second Accordion - Contact and Payment Details */}
      <Box as="div" className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
        {/* Accordion Header Skeleton */}
        <Box as="div" className="px-6 py-2 bg-[#ff7b00] flex items-center justify-between">
          <Box as="div" className="flex items-center gap-3">
            <div className="h-5 bg-orange-200 rounded w-48 animate-pulse"></div>
          </Box>
          <div className="h-4 w-4 bg-orange-200 rounded animate-pulse"></div>
        </Box>
        
        {/* Accordion Content Skeleton */}
        <Box as="div" className="px-6 bg-gray-50 py-4">
          <Box as="div" className="space-y-6">
            {/* Contact Details Section */}
            <Box as="div" className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-28 animate-pulse"></div>
              
              <Box as="div" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Box as="div" className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </Box>
                <Box as="div" className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </Box>
              </Box>
            </Box>

            {/* Payment Methods Section */}
            <Box as="div" className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
              
              <Box as="div" className="space-y-3">
                {/* Payment Options */}
                <Box as="div" className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                </Box>
                <Box as="div" className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                </Box>
                <Box as="div" className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Third Accordion - GST Details */}
      <Box as="div" className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
        {/* Accordion Header Skeleton */}
        <Box as="div" className="px-6 py-2 bg-[#ff7b00] flex items-center justify-between">
          <Box as="div" className="flex items-center gap-3">
            <div className="h-5 bg-orange-200 rounded w-24 animate-pulse"></div>
          </Box>
          <div className="h-4 w-4 bg-orange-200 rounded animate-pulse"></div>
        </Box>
        
        {/* Accordion Content Skeleton */}
        <Box as="div" className="px-6 bg-gray-50 py-4">
          <Box as="div" className="space-y-6">
            {/* Section Title */}
            <div className="h-6 bg-gray-200 rounded w-28 animate-pulse"></div>
            
            {/* GST Form Fields Skeleton */}
            <Box as="div" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Box as="div" className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </Box>
              <Box as="div" className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-18 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </Box>
              <Box as="div" className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </Box>
              <Box as="div" className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </Box>
              <Box as="div" className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-22 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </Box>
            </Box>
            
            {/* Action Buttons Row */}
            <Box as="div" className="flex gap-4">
              <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FareSummaryAccordianSkeletonLoader;
