'use client'
import { TextInputFieldProps } from '@/types/module/textInputField'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import React, { forwardRef, useState } from 'react'
import { Box, Input, Text } from 'theme-ui'
import { ErrorText } from '../Text/ErrorText'

const TextInputField = forwardRef<HTMLInputElement, TextInputFieldProps>(
  (
    {
      placeholder,
      variant = 'primaryInput',
      validationVariant = 'Maison16Regular20',
      name = '',
      type,
      disabled = false,
      autoFocus,
      requiredIconSx,
      Inputsx,
      onChange,
      onIconClick,
      onClickWrapper,
      onClick,
      onBlur,
      onKeyDown,
      onFocus,
      value,
      wrapperClass = '',
      showIcon,
      customClassName = '',
      errors,
      description,
      maxLength,
      minLength,
      label,
      wrapperSx,
      manualErrorMessage,
      iconSrc,
      labelVariant = 'Maison18Medium125',
      wrapperVariant = '',
      labelClassName,
      autoComplete = 'off',
      required,
      labelSx,
      iconWrapperClassName,
      iconWrapperSx,
      manualErrorSX,
      readOnly = false,
      isShowRequired = false,
      isEyeShow = true,
      id = '',
      inputWidth = '',
      labelColor,
      labelIcon,
    },
    ref
  ) => {
    const [maskedField, setMaskedField] = useState(false)

    const handleIconClick = () => {
      setMaskedField(!maskedField)
    }

    const uniqueId = id || `input-${name}` // Ensure the ID is unique

    const labelProps: { htmlFor: string } = {
      htmlFor: uniqueId, // Use the unique ID here
    }

    return (
      <React.Fragment>
        <Box
          className={wrapperClass}
          variant={wrapperVariant}
          onClick={onClickWrapper}
          // mt={firstInputBox ? 0 : '14px'}
          sx={{
            ...wrapperSx,
            position: 'relative',
          }}
        >
          <div className='flex items-center gap-2'>
            <label className='mb-[10px] label-icon'>{labelIcon}</label>
            {label && (
              <Text
                className={labelClassName}
                as="label"
                sx={{
                  mb: 10,
                  ...labelSx,
                }}
                variant={labelVariant}
                color={labelColor}
                aria-labelledby={uniqueId}
                {...labelProps}
              >
                {label}
                {isShowRequired && (
                  <Text
                    as="span"
                    color="red_600"
                    sx={{
                      ...requiredIconSx,
                      color: 'red_600',
                      ml: '4px',
                    }}
                  >
                    *
                  </Text>
                )}
              </Text>
            )}
          </div>
          <Input
            id={uniqueId}
            variant={variant}
            placeholder={placeholder}
            autoComplete={autoComplete}
            name={name}
            ref={ref}
            type={maskedField && type === 'password' ? 'text' : type}
            disabled={disabled}
            maxLength={maxLength}
            minLength={minLength}
            autoFocus={autoFocus}
            className={`mx-0  ${inputWidth ? inputWidth : 'w-100'} ${customClassName}`}
            sx={{
              ...Inputsx,
              borderColor: errors ? 'red_500' : '',
              ...(errors && {
                borderColor: 'red_500 !important',
                boxShadow: '0 0 0 4px rgba(255, 0, 0, 0.1), 0 4px 12px rgba(255, 0, 0, 0.15)',
                '&:focus': {
                  borderColor: 'red_500 !important',
                  boxShadow: '0 0 0 4px rgba(255, 0, 0, 0.15), 0 8px 24px rgba(255, 0, 0, 0.2)',
                },
              }),
            }}
            aria-invalid={!!errors}
            data-error={errors ? 'true' : 'false'}
            onChange={(e) => {
              if (onChange) {
                onChange(e?.target.value)
              }
            }}
            onClick={onClick}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            value={value}
            required={required}
            readOnly={readOnly}
          />
          {errors ? (
            <ErrorText
              errors={errors as string}
              className='mt-10'
            />
          ) : (
            <Text
              variant={validationVariant}
              sx={{ my: '5px', minHeight: '11px' }}
            >
              {description}
            </Text>
          )}
          {manualErrorMessage && (
            <Text variant={validationVariant} sx={manualErrorSX}>
              {manualErrorMessage as string}
            </Text>
          )}
          {type === 'password' && isEyeShow && (
            <Box
              onClick={handleIconClick}
              className={iconWrapperClassName}
              sx={{
                ...iconWrapperSx,
                position: 'absolute',
                right: '16px',
                top: '58px',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#6B7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '24px',
                width: '24px',
                '&:hover': {
                  color: '#4B5563', // Darker gray on hover
                },
                transition: 'color 0.2s ease-in-out',
              }}
            >
              {maskedField ? (
                <Eye size={24} />
              ) : (
                <EyeOff size={24} />
              )}
            </Box>
          )}
          {showIcon && iconSrc && (
            <Box
              onClick={onIconClick}
              className={iconWrapperClassName}
              sx={iconWrapperSx}
            >
              <Image
                height={20}
                width={20}
                className="primary-input-icon"
                src={iconSrc}
                alt={'icon'}
              />
            </Box>
          )}
        </Box>
      </React.Fragment>
    )
  }
)

TextInputField.displayName = 'TextInputField'
export { TextInputField }
