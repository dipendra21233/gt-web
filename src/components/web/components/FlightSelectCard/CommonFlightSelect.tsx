'use client'
import { flightSelectStylesConfig, GroupType, newFlightSelect } from '@/utils/stylesConfig'
import { FC, ReactNode } from 'react'
import { ClassNamesConfig } from 'react-select'
import Select from 'react-select/async'
import { Text } from 'theme-ui'
import { CustomPlaceholder } from './CustomPlaceholder'
import { CustomSingleValue } from './CustomSingleValue'

interface CityOption {
  value: string
  label: string
}

interface CommonFlightSelectProps {
  className?: string
  options: CityOption[]
  icon?: ReactNode
  placeholder?: string
  onClickClear?: () => void
  onChange: (value: string) => void
  label?: string
  classNames?: ClassNamesConfig<CityOption, false, GroupType> | undefined
}

const CommonFlightSelect: FC<CommonFlightSelectProps> = ({
  className,
  placeholder,
  classNames,
  icon,
  options,
  label,
  onClickClear,
  onChange,
}) => {
  let debounceTimeout: ReturnType<typeof setTimeout> | null = null

  const loadOptions = (
    inputValue: string,
    callback: (options: CityOption[]) => void
  ) => {
    if (debounceTimeout) clearTimeout(debounceTimeout)

    debounceTimeout = setTimeout(() => {
      const filteredOptions = inputValue
        ? options
          .filter((opt) =>
            opt.label.toLowerCase().includes(inputValue.toLowerCase())
          )
          .slice(0, 50)
        : options.slice(0, 30)

      callback(filteredOptions)
    }, 200)
  }

  // Add instanceId prop
  const selectId = `select-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={`common-flight-select ${className}`}>
      {label && (
        <Text
          as="label"
          sx={{ mb: 10, ml: '10px' }}
          variant={'Maison18Medium125'}
        >
          {label}
        </Text>
      )}
      <Select
        instanceId={selectId} // Add this prop
        styles={flightSelectStylesConfig}
        classNames={classNames}
        loadOptions={loadOptions}
        onChange={(selectedOption) => onChange(selectedOption?.value as string)}
        // menuIsOpen
        defaultOptions={options.slice(0, 5)}
        components={{
          SingleValue: (props: any) => (
            <CustomSingleValue
              onClickClear={onClickClear}
              label={label}
              {...props}
            />
          ),
          // Control: (props) => (
          //   <CustomDropDownControl label={label} {...props} />
          // ),
          Placeholder: (props) => (
            <CustomPlaceholder
              placeholder={placeholder as string}
              icon={icon}
              {...props}
            />
          ),
        }}
      />
    </div>
  )
}
export const CommonFlightSelectNew: FC<CommonFlightSelectProps> = ({
  className,
  placeholder,
  classNames,
  icon,
  options,
  onClickClear,
  onChange,
}) => {
  let debounceTimeout: ReturnType<typeof setTimeout> | null = null

  const loadOptions = (
    inputValue: string,
    callback: (options: CityOption[]) => void
  ) => {
    if (debounceTimeout) clearTimeout(debounceTimeout)

    debounceTimeout = setTimeout(() => {
      const filteredOptions = inputValue
        ? options
          .filter((opt) =>
            opt.label.toLowerCase().includes(inputValue.toLowerCase())
          )
          .slice(0, 50)
        : options.slice(0, 30)

      callback(filteredOptions)
    }, 200)
  }

  return (
    <div className={`common-flight-select ${className}`}>
      <Select
        styles={newFlightSelect}
        classNames={classNames}
        loadOptions={loadOptions}
        onChange={(selectedOption) => onChange(selectedOption?.value as string)}
        // menuIsOpen
        defaultOptions={options.slice(0, 5)}
        components={{
          SingleValue: (props) => (
            <CustomSingleValue {...props} onClickClear={onClickClear} />
          ),
          Placeholder: (props) => (
            <CustomPlaceholder
              placeholder={placeholder as string}
              icon={icon}
              {...props}
            />
          ),
        }}
      />
    </div>
  )
}

export default CommonFlightSelect
