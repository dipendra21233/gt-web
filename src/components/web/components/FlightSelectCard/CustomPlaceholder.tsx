'use client'

import { FC, ReactNode } from 'react'
import { Text } from 'theme-ui'

interface CustomPlaceholderProps {
  children: React.ReactNode
  className?: string
  placeholder?: string
  icon?: ReactNode
}

const CustomPlaceholder: FC<CustomPlaceholderProps> = ({ children, className, placeholder }) => {
  return (
    <div className={className}>
      <Text className="text-gray-500 text-sm">
        {children || placeholder}
      </Text>
    </div>
  )
}

export { CustomPlaceholder }
