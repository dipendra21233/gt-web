'use client'
import { Spinner } from '@/components/ui/Spinner'
import { ButtonProps } from '@/types/module/themuiModule'
import Image from 'next/image'
import { CSSProperties, forwardRef, MouseEvent } from 'react'
import { Box, Button, Text } from 'theme-ui'

const defaultButtonTextStyle: CSSProperties = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

const squareButtonTextStyle: CSSProperties = {
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  wordBreak: 'break-word',
  hyphens: 'auto',
}

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text

  const truncated = text.slice(0, maxLength - 1)
  const lastSpaceIndex = truncated.lastIndexOf(' ')

  if (lastSpaceIndex > 0) {
    return truncated.slice(0, lastSpaceIndex) + '...'
  }

  return truncated + '...'
}

export const ThemeButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      text,
      icon,
      textColor = 'white',
      iconRight,
      textVariant = 'Maison16Demi20',
      isIconOnly,
      onBlur = () => null,
      onClick = () => null,
      toggleOnClick = () => null,
      sx,
      disabled = false,
      variant = 'primary',
      type,
      className,
      textSx,
      children,
      iconStyles,
      iconClassName,
      isSquareButton = false,
      autoFocus = false,
      accessKey = '',
      isLoading = false,
      wrapperClassName,
      btnColor,
    },
    ref
  ) => {
    const baseTextStyle = isSquareButton
      ? squareButtonTextStyle
      : defaultButtonTextStyle
    const maxTextLength = 50

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (
        ref &&
        typeof ref === 'object' &&
        ref.current &&
        variant === 'iconOnlyBtn'
      ) {
        ref.current.blur()
      }
      if (onClick) {
        onClick(event)
      }
    }

    // Styles now live in theme variants; allow consumer overrides via sx

    return (
      <Button
        autoFocus={autoFocus}
        type={type}
        onClick={handleClick}
        color={btnColor}
        sx={sx}
        variant={variant}
        disabled={disabled || isLoading}
        className={className}
        onBlur={onBlur}
        accessKey={accessKey}
        ref={ref}
      >
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              position: 'relative',
              zIndex: 2,
            }}
          >
            <Spinner style={{ color: 'white', zIndex: '99999', opacity: '3' }} variant="circle" size={16} className="text-current" />
            {text && (
              <Text
                variant={textVariant}
                color={textColor || 'white'}
                sx={{
                  ...baseTextStyle,
                  ...textSx,
                }}
              >
                {text}
              </Text>
            )}
          </Box>
        ) : (
          <Box
            className={wrapperClassName}
            sx={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon && (
              <Box
                className={iconClassName}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: isIconOnly ? 0 : icon === 'string' ? 6 : 2,
                  ...iconStyles,
                }}
                onClick={toggleOnClick}
              >
                {typeof icon === 'string' ? (
                  <Image height={20} width={20} src={icon} alt="Icon" />
                ) : (
                  icon
                )}
              </Box>
            )}

            {text ? (
              <Box>
                <Text
                  variant={textVariant}
                  color={textColor}
                  sx={{
                    ...baseTextStyle,
                    ...textSx,
                  }}
                >
                  {truncateText(text, maxTextLength)}
                </Text>
              </Box>
            ) : null}

            {children}
            {iconRight && (
              <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                {typeof iconRight === 'string' ? (
                  <Image
                    height={20}
                    width={20}
                    src={iconRight}
                    alt="Right Icon"
                  />
                ) : (
                  iconRight
                )}
              </Box>
            )}
          </Box>
        )}

      </Button>
    )
  }
)

ThemeButton.displayName = 'ThemeButton'
