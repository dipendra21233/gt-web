import { ChangeEvent, MouseEvent, ReactNode, Ref } from 'react'
import { ThemeUIStyleObject } from 'theme-ui'

export interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void
  toggleFavorite?: () => void
  toggleOnClick?: () => void
  text?: string
  textVariant?: string
  textColor?: string
  btnColor?: string
  sx?: ThemeUIStyleObject
  textSx?: ThemeUIStyleObject
  multilineTextSx?: ThemeUIStyleObject
  variant?: string
  icon?: ReactNode | string
  iconClassName?: string
  wrapperClassName?: string
  iconRight?: ReactNode | string
  isIconOnly?: string
  iconStyles?: React.CSSProperties
  disabled?: boolean
  selected?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  children?: React.ReactNode
  isFavoriteIcon?: boolean
  isFavorite?: boolean
  multilineText?: string[]
  quantity?: number
  isSquareButton?: boolean
  isUpArrow?: boolean
  isDownArrow?: boolean
  isLoading?: boolean
  ref?: Ref<HTMLButtonElement>
  autoFocus?: boolean
  accessKey?: string
}
export interface CheckBoxProps {
  options: Array<{ label: string; value: string }>
  onChange: (value: string | ChangeEvent<HTMLInputElement>) => void
  selectedValue: string
  wrapperClass?: string
  wrapperSx?: ThemeUIStyleObject
  disabled?: boolean
  isOnchangeEvent?: boolean
}

export interface CustomModalProps {
  wrapperClass?: string
  cancelBtnClassName?: string
  cancelBtnVariant?: string
  submitBtnClassName?: string
  submitBtnVariant?: string
  submitBtnTitle?: string
  cancelBtnDisabled?: boolean
  submitBtnDisabled?: boolean
  cancelBtnSx?: ThemeUIStyleObject
  wrapperSx?: ThemeUIStyleObject
  submitBtnSx?: ThemeUIStyleObject
  cancelBtnTitle?: string
  cancelBtnClick?: () => void
  submitBtnClick?: () => void
}

export interface PopupModalHeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sx?: ThemeUIStyleObject
  title: string
  titleVariant?: string
  customClassName?: string
  onClose?: () => void
}

export interface CommonHeadingTextProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sx?: ThemeUIStyleObject
  title: string
  isChecked?: boolean
  titleColor?: string
  wrapperClass?: string
  label?: string
  titleVariant?: string
  labelClass?: string
  labelColor?: string
  customClassName?: string
  handleSwitchOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface FromToHeadingTextProps {
  from: string
  to: string
  wrapperClass?: string
  variant?: string
}
