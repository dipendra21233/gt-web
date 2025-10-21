import closeIcon from '@/../public/svg/cross-circle.svg'
import { ThemeButton } from '@/components/web/core/Button/Button'
import Image from 'next/image'
import { ReactNode } from 'react'
import Modal from 'react-responsive-modal'
import { Box, Text, ThemeUIStyleObject } from 'theme-ui'

interface CommonModalProps {
  isOpen: boolean
  onClose: () => void
  showCloseIcon?: boolean
  wrapperClass?: string
  children: React.ReactNode
  heading?: string
  showHeader?: boolean
  showFooter?: boolean
  isScrollable?: boolean
  maxHeight?: string | number
  width?: string | number
  submitButtonConfig?: {
    text: string
    textColor?: string
    variant?: string
    onClick?: () => void
    sx?: ThemeUIStyleObject
    isLoading?: boolean
  }
  cancelButtonConfig?: {
    text: string
    textColor?: string
    variant?: string
    onClick?: () => void
    sx?: ThemeUIStyleObject
  }
  headerContent?: ReactNode
  footerContent?: ReactNode
  isLoading?: boolean
  classNames?: string
}

const CommonModal = ({
  isOpen,
  onClose,
  wrapperClass = '',
  children,
  heading,
  showHeader = true,
  showFooter = false,
  isScrollable = false,
  maxHeight = '630px',
  width = 'auto',
  submitButtonConfig,
  cancelButtonConfig,
  headerContent,
  footerContent,
  isLoading = false,
  classNames = '',
}: CommonModalProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={() => onClose()}
      showCloseIcon={false}
      closeOnOverlayClick={true}
      classNames={{
        modal: `${wrapperClass} flex flex-col max-h-[90vh]`,
      }}
      center
      styles={{
        modal: {
          width: width,
          margin: '0 auto',
          background: 'transparent',
        },
      }}
    >
      <div
        className="flex flex-col h-full max-h-[90vh]"
        style={{
          width: '100%',
        }}
      >
        {/* Sticky Header */}
        {showHeader && (heading || headerContent) && (
          <Box
            className="flex justify-between items-center bg-[#1e293b] rounded-t-lg flex-shrink-0"
            sx={{
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              width: '100%',
              padding: '16px 20px',
              zIndex: 10,
              color: 'white',
            }}
          >
            {heading && (
              <Text variant="Maison28Demi20" className="!text-white">
                {heading}
              </Text>
            )}
            {headerContent}
            <Image
              src={closeIcon}
              alt="close"
              width={32}
              height={32}
              className="cursor-pointer"
              onClick={onClose}
            />
          </Box>
        )}

        {/* Scrollable Content */}
        <div
          className={`flex-1 overflow-y-auto overflow-x-hidden p-20 modal-body-bg hide-scrollbar ${classNames}`}
          style={{
            maxHeight: isScrollable ? maxHeight : 'none',
          }}
        >
          {children}
        </div>

        {/* Sticky Footer */}
        {showFooter && (
          <Box
            className="p-[12px] bg-gray-100 border-t border-gray-300 rounded-b-lg flex-shrink-0"
            sx={{
              zIndex: 10,
              boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            {footerContent ? (
              footerContent
            ) : (
              <div className="flex justify-between gap-3">
                {cancelButtonConfig && (
                  <ThemeButton
                    variant={cancelButtonConfig.variant || 'darkSlate'}
                    text={cancelButtonConfig.text}
                    textColor={cancelButtonConfig.textColor}
                    onClick={cancelButtonConfig.onClick}
                    sx={cancelButtonConfig.sx}
                  />
                )}
                {submitButtonConfig && (
                  <ThemeButton
                    variant={submitButtonConfig.variant || 'primary'}
                    text={submitButtonConfig.text}
                    textColor={submitButtonConfig.textColor}
                    onClick={submitButtonConfig.onClick}
                    sx={submitButtonConfig.sx}
                    isLoading={isLoading}
                  />
                )}
              </div>
            )}
          </Box>
        )}
      </div>
    </Modal>
  )
}

export default CommonModal
