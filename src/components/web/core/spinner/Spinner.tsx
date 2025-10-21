'use client'
import { SpinnerProps } from '@/types/module/commonModule'
import { FC } from 'react'
import { Spinner as BaseSpinner, Box } from 'theme-ui'

const Spinner: FC<SpinnerProps> = ({ visible, size = 50, sx = {} }) => {
  if (!visible) return null

  return (
    <Box className="spinner" sx={{ ...sx }}>
      <BaseSpinner size={size} />
    </Box>
  )
}

export default Spinner
