import { FC } from 'react'
import { Box, Text } from 'theme-ui'

export interface SectionTitleBarProps {
  primaryText?: string
  primaryVariant?: string
  primaryClass?: string
  secondaryText?: string
  secondaryVariant?: string
  secondaryClass?: string
  secondaryColor?: string
  primaryColor?: string
  onActionClick?: () => void
}
const SectionTitleBar: FC<SectionTitleBarProps> = ({
  primaryText,
  primaryColor = 'grey_medium',
  secondaryColor = 'grey_medium',
  primaryVariant = 'Maison16Medium20',
  primaryClass,
  secondaryClass,
  secondaryText,
  secondaryVariant = 'Maison16Medium20',
  onActionClick,
}) => {
  return (
    <Box
      as="div"
      className="flex items-center justify-between py-2 border-b-2 border-[#e7e7e8]"
    >
      <Text
        variant={primaryVariant}
        color={primaryColor}
        className={primaryClass}
      >
        {primaryText}
      </Text>

      <Text
        color={secondaryColor}
        variant={secondaryVariant}
        className={secondaryClass}
        onClick={onActionClick}
      >
        {secondaryText}
      </Text>
    </Box>
  )
}

export default SectionTitleBar
