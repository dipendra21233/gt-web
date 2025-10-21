'use client'

import Link from 'next/link'
import { FC } from 'react'
import { Box, Text, ThemeUIStyleObject } from 'theme-ui'

export interface TermsCheckboxProps {
  wrapperClass?: string
  wrapperSx?: ThemeUIStyleObject
  checked: boolean
  onChange: (value: boolean) => void
  text?: string
  textClass?: string
  textSx?: ThemeUIStyleObject
  termsLabel?: string
  privacyLabel?: string
}

export const TermsCheckbox: FC<TermsCheckboxProps> = ({
  wrapperClass = '',
  wrapperSx,
  checked,
  onChange,
  text,
  textClass,
  textSx,
  termsLabel = 'Terms of Service',
  privacyLabel = 'Privacy Policy',
}) => {
  return (
    <Box
      className={`flex items-start gap-2 mt-4 ${wrapperClass}`}
      sx={wrapperSx}
    >
      <input
        type="checkbox"
        key={checked.toString()}
        id="terms-checkbox"
        checked={Boolean(checked)}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 cursor-pointer accent-blue-600"
      />

      <Text
        style={{
          color: '#666',
          ...textSx
        } as any}
        variant='Maison16Regular20'
        className={`text-sm text-gray-700 cursor-pointer ${textClass || ''}`}
      >
        {text || `By proceeding, I agree to Streetgains's User Agreement, `}
        <Link
          href="/terms-of-service"
          className="text-blue-600 underline hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          {termsLabel}
        </Link>
        {' '}and{' '}
        <Link
          href="/privacy-policy"
          className="text-blue-600 underline hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          {privacyLabel}
        </Link>
        .
      </Text>
    </Box>
  )
}
