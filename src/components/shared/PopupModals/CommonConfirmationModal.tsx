/* eslint-disable react/prop-types */
'use client'
import { ThemeButton } from '@/components/web/core/Button/Button'
import Spinner from '@/components/web/core/spinner/Spinner'
import { CommonConfirmationProps } from '@/types/module/commonModule'
import { translation } from '@/utils/translation'
import Modal from 'react-responsive-modal'
import { Box, Flex, Text } from 'theme-ui'
import { PopupModalHeader } from '../Text/Texts'

export const CommonConfirmationModal: React.FC<CommonConfirmationProps> = ({
  isOpen = false,
  onClose,
  onClickSubmit,
  submitButtonText,
  title,
  showCloseIcon = false,
  isLoading,
  description,
  wrapperClass = 'common-Confirmation-modal',
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={() => onClose()}
      showCloseIcon={showCloseIcon}
      closeOnOverlayClick={true}
      classNames={{
        modal: wrapperClass,
      }}
      center
    >
      <PopupModalHeader title={title} />
      <Text as="p" my="30px" className="text-center" variant="Maison16Medium20">
        {description}
      </Text>
      <Box>
        <Flex sx={{ justifyContent: 'space-between' }}>
          <ThemeButton
            variant="secondary2"
            textVariant="Maison16Medium20"
            onClick={onClickSubmit}
          >
            {submitButtonText}
          </ThemeButton>
          <ThemeButton
            textVariant="Maison16Medium20"
            className="custom-cancel-delete-modal-button"
            onClick={() => onClose()}
          >
            {translation.CANCEL}
          </ThemeButton>
        </Flex>
      </Box>
      <Spinner visible={isLoading} />
    </Modal>
  )
}
