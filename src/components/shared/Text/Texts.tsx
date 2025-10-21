import {
  CommonHeadingTextProps,
  FromToHeadingTextProps,
  PopupModalHeaderProps,
} from '@/types/module/themuiModule'
import React, { Fragment } from 'react'
import { GoArrowRight } from 'react-icons/go'
import { Box, Paragraph, Text } from 'theme-ui'
import CommonSwitch from '../Switch/Switch'

export const PopupModalHeader: React.FC<PopupModalHeaderProps> = ({
  sx,
  title,
  customClassName,
  titleVariant = 'Maison18Demi111',
}) => {
  return (
    <React.Fragment>
      <Text
        className={customClassName}
        color="#303030"
        pb={['20px']}
        as="p"
        variant={titleVariant}
        sx={sx}
      >
        {title}
      </Text>
      <Paragraph
        sx={{
          borderBottom: '2px solid #EAEAEA !important',
          width: '100%',
          position: 'absolute',
          right: 0,
        }}
      />
    </React.Fragment>
  )
}

export const CommonHeadingText: React.FC<CommonHeadingTextProps> = ({
  sx,
  title,
  label,
  customClassName,
  wrapperClass,
  titleColor,
  isChecked,
  handleSwitchOnChange,
  titleVariant = 'Maison18Medium125',
  labelColor,
  labelClass,
}) => {
  return (
    <Box as="div" className={wrapperClass}>
      <Text
        className={customClassName}
        color={titleColor}
        variant={titleVariant}
        sx={sx}
      >
        {title}
      </Text>
      {label && (
        <CommonSwitch
          labelColor={labelColor}
          labelClass={labelClass}
          handleSwitchOnChange={(e) => {
            if (handleSwitchOnChange) {
              handleSwitchOnChange(e)
            }
          }}
          label={label}
          isChecked={isChecked || false}
          switchName={`switchName-${label}`}
        />
      )}
    </Box>
  )
}

export const FromToHeadingText: React.FC<FromToHeadingTextProps> = ({
  from,
  to,
  wrapperClass,
  variant = 'Maison28Medium20',
}) => {
  return (
    <Fragment>
      <div className={`flex gap-4 items-center ${wrapperClass}`}>
        <Text variant={variant}>{from}</Text>
        <GoArrowRight size={25} />
        <Text variant={variant}>{to}</Text>
      </div>
      <Text
        variant="Maison16Medium20"
        className="top-2 relative"
        color="primary_text_dark"
      >
        Tue, 22 Apr •{' '}
        <Text as="span" color="primary_text_dark" variant="Maison16Regular20">
          {' '}
          Non-stop • 2h 15m
        </Text>{' '}
        •{' '}
        <Text as="span" color="primary_text_dark" variant="Maison16Regular20">
          Economy
        </Text>
      </Text>
    </Fragment>
  )
}
