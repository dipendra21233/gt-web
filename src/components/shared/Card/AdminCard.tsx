import { ThemeButton } from '@/components/web/core/Button/Button'
import Link from 'next/link'
import { FC, ReactNode } from 'react'
import { Box, Card, Divider, Text, ThemeUIStyleObject } from 'theme-ui'

export interface AdminCardProps {
  children?: ReactNode
  cardVariant?: string
  cardClassName?: string
  sx?: ThemeUIStyleObject
  heading?: string
  showFooter?: boolean
  isScrollable?: boolean
  maxHeight?: string | number
  actionButtonConfig?: {
    text: string
    textColor?: string
    variant?: string
    onClick?: () => void
    sx?: ThemeUIStyleObject
    icon?: ReactNode
    href?: string
  }
  submitButtonConfig?: {
    text: string
    textColor?: string
    variant?: string
    onClick?: () => void
    sx?: ThemeUIStyleObject
  }
  cancelButtonConfig?: {
    text: string
    textColor?: string
    variant?: string
    onClick?: () => void
    sx?: ThemeUIStyleObject
  }
}

export const AdminCard: FC<AdminCardProps> = ({
  children,
  showFooter = false,
  cardVariant = 'selectStoreCard',
  cardClassName = 'show-entire',
  sx,
  heading,
  actionButtonConfig,
  isScrollable = false,
  maxHeight = '630px',
  submitButtonConfig,
  cancelButtonConfig,
}) => {
  return (
    <div className="content">
      <div className="row">
        <div className="col-sm-12">
          <Card
            className={cardClassName}
            variant={cardVariant}
            sx={{ p: 'unset', ...sx }}
          >
            {(heading || actionButtonConfig) && (
              <Box
                className="flex justify-between items-center bg-[#1e293b] rounded-t-lg"
                sx={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 1, // Ensure it stays above the scrollable content
                  paddingBottom: '10px',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  width: '100%',
                  scrollbarWidth: 'none',
                  padding: '16px 20px',
                }}
              >
                {heading && (
                  <Text variant="Maison28Demi20" className="text-white">
                    {heading}
                  </Text>
                )}
                {actionButtonConfig && (
                  <Link
                    href={actionButtonConfig?.href || '#'}
                    style={{ textDecoration: 'none' }}
                  >
                    <ThemeButton
                      wrapperClassName="flex item-center"
                      text={actionButtonConfig.text}
                      textColor={actionButtonConfig.textColor || 'white'}
                      variant={actionButtonConfig.variant || 'primary'}
                      onClick={actionButtonConfig.onClick}
                      sx={actionButtonConfig?.sx}
                      icon={actionButtonConfig?.icon}
                    />
                  </Link>
                )}
              </Box>
            )}

            <div className="p-20">
              {isScrollable ? (
                <div
                  style={{
                    maxHeight: maxHeight,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    paddingRight: '8px',
                    marginRight: '-8px',
                    // Hide scrollbar for all browsers
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE and Edge
                  }}
                  className="scrollable-content admin-card-scroll"
                >
                  {children}
                </div>
              ) : (
                children
              )}
            </div>

            {showFooter && (
              <Box
                className="p-[12px] bg-gray-100 border-t border-gray-300 rounded-b-lg"
                sx={{
                  position: 'sticky',
                  bottom: 0,
                  zIndex: 1,
                }}
              >
                <div className="flex justify-end gap-3">
                  {cancelButtonConfig && (
                    <ThemeButton
                      variant={cancelButtonConfig.variant || 'darkSlate'}
                      text={cancelButtonConfig.text}
                    />
                  )}
                  {submitButtonConfig && (
                    <ThemeButton
                      variant={submitButtonConfig.variant || 'primary'}
                      text={submitButtonConfig.text}
                    />
                  )}
                </div>
              </Box>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function FormSectionTitle({ title }: { title: string }) {
  return (
    <>
      <Text variant="Maison24Medium125" color="orange_accent_alpha">
        {title}
      </Text>
      <Divider className="my-3" />
    </>
  )
}
