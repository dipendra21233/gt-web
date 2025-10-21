import React from 'react'
import { Box, Switch, Text, ThemeUIStyleObject } from 'theme-ui'

interface CustomSwitchProps {
  id?: string
  name?: string
  variant?: string
  label?: string
  textVariant?: string
  wrapperClassName?: string
  checked: boolean
  switchSx?: ThemeUIStyleObject
  wrapperSx?: ThemeUIStyleObject
  onChange: (e: boolean) => void
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  id,
  name,
  checked,
  label,
  switchSx,
  wrapperSx,
  variant = 'switchInput',
  wrapperClassName,
  textVariant = 'Maison16Regular20',
  onChange,
}) => {
  return (
    <Box
      className={wrapperClassName}
      sx={{
        display: 'inline-block',
        alignItems: 'center',
        ...wrapperSx,
      }}
    >
      <Text variant={textVariant}>{label}</Text>
      <Switch
        id={id}
        name={name}
        checked={checked}
        onChange={(e) => {
          onChange(e?.target?.checked)
        }}
        variant={variant}
        sx={switchSx}
      />
    </Box>
  )
}

export default CustomSwitch
