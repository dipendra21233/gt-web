import { FormikErrors, FormikTouched } from 'formik'
import { Theme, ThemeUIStyleObject } from 'theme-ui'

interface MyFormValues {
  [key: string]: string | number
}

export interface TextInputFieldProps {
  placeholder?: string
  variant?: string
  labelColor?: string
  customClassName?: string
  wrapperClass?: string
  mask?: string
  replacement?: string | number | RegExp | undefined
  name?: string
  iconSrc?: string
  iconWrapperClassName?: string
  showIcon?: boolean
  type?: string
  labelClassName?: string
  disabled?: boolean
  showMask?: boolean
  autoFocus?: boolean
  labelSx?: ThemeUIStyleObject<Theme>
  iconWrapperSx?: ThemeUIStyleObject<Theme>
  requiredIconSx?: ThemeUIStyleObject<Theme>
  manualErrorSX?: ThemeUIStyleObject<Theme>
  Inputsx?: ThemeUIStyleObject<Theme>
  wrapperSx?: ThemeUIStyleObject<Theme>
  onChange?: (e: string) => void
  onClick?: React.MouseEventHandler<HTMLInputElement>
  onIconClick?: () => void
  onClickWrapper?: () => void
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  value?: string | number | string[]
  touched?:
    | boolean
    | FormikTouched<MyFormValues>
    | FormikTouched<MyFormValues>[]
  errors?:
    | string
    | string[]
    | FormikErrors<MyFormValues>
    | FormikErrors<MyFormValues>[]
    | boolean
  manualErrorMessage?:
    | string
    | string[]
    | FormikErrors<MyFormValues>
    | FormikErrors<MyFormValues>[]
    | boolean
  description?: string
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  maxLength?: number
  minLength?: number
  label?: string
  labelVariant?: string
  wrapperVariant?: string
  validationVariant?: string
  ref?: React.Ref<HTMLInputElement>
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  autoComplete?: React.HTMLInputAutoCompleteAttribute
  firstInputBox?: boolean
  required?: boolean
  readOnly?: boolean
  isPasswordField?: boolean
  isShowRequired?: boolean
  isEyeShow?: boolean
  id?: string
  inputWidth?: string
  labelIcon?: React.ReactNode
}
