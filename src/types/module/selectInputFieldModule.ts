import { GroupType, OptionType, isMultiple } from '@/utils/stylesConfig'
import { FormikErrors, FormikTouched } from 'formik'
import { ReactNode } from 'react'
import { ClassNamesConfig, StylesConfig } from 'react-select'
import { ThemeUIStyleObject } from 'theme-ui'

export interface SelectInputFieldProps {
  indicatorIconClassName?: string
  wrapperClass?: string
  wrapperSx?: ThemeUIStyleObject
  variant?: string
  labelSx?: ThemeUIStyleObject
  requiredIconSx?: ThemeUIStyleObject
  manualErrorSX?: ThemeUIStyleObject
  errorsSx?: ThemeUIStyleObject
  id?: string
  classNames?:
    | ClassNamesConfig<
        {
          value: string
          label: string
        },
        false,
        GroupType
      >
    | undefined
  isDisabled?: boolean
  customClassName?: string
  value: string | { value: string; label: string }
  defaultValue?: string
  placeholder?: string
  labelClassName?: string
  labelIcon?: ReactNode
  description?: string
  labelVariant?: string
  label?: string
  name?: string
  options: Array<{ value: string; label: string } | string>
  onChange: (e: { value?: string | boolean; label?: string }) => void
  isSearchable?: boolean
  firstInputBox?: boolean
  isLoading?: boolean
  iconSx?: ThemeUIStyleObject
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[]
  errors?: string | string[] | FormikErrors<any> | FormikErrors<any>[]

  stylesConfigs?:
    | StylesConfig<OptionType, typeof isMultiple, GroupType>
    | ((
        hasError?: boolean
      ) => StylesConfig<OptionType, typeof isMultiple, GroupType>)
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement, Element>,
    value: string | { value: string | boolean; label: string }
  ) => void
  readOnly?: boolean
  isShowRequired?: boolean
  inputId?: string
  instanceId?: string
  validationVariant?: string
}

export interface labelValueProps {
  value: string
  label: string
}
