'use client'
import { FC, ReactNode, useEffect } from 'react'
import Select, { components, InputProps, OptionProps, SingleValueProps } from 'react-select'
import { ErrorText } from '../Text/ErrorText'

export interface AirportOption {
  value: string
  label: string
  city: string
  country: string
  airportName: string
  iataCode: string
}

interface FlightSelectProps {
  className?: string
  options: AirportOption[]
  icon?: ReactNode
  placeholder?: string
  label?: string
  value?: AirportOption | null
  onChange: (value: AirportOption | null) => void
  onInputChange?: (inputValue: string) => void
  isSearchable?: boolean
  isClearable?: boolean
  isLoading?: boolean
  error?: string
}



const CustomInput: FC<InputProps<AirportOption, false>> = (props) => {
  const inputRef = props.innerRef as unknown as React.RefObject<HTMLInputElement>;

  useEffect(() => {
    if (inputRef?.current) {
      const el = inputRef.current;
      const val = el.value;
      el.value = "";       // reset first
      el.value = val;      // set again → cursor moves to end
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <components.Input {...props} />;
};

// Custom Option Component
const CustomOption: FC<OptionProps<AirportOption, false>> = ({
  data,
  innerRef,
  innerProps,
  isFocused,
  isSelected,
}) => {
  console.log('check51', data);

  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={`flight-select-option ${isFocused ? 'focused' : ''} ${isSelected ? 'selected' : ''}`}
    >
      <div className="option-content">
        <div className="option-main">
          <span className="city-country">{data.city}, {data.country}</span>
          <span className="airport-name">{data.airportName}</span>
        </div>
        <div className="iata-code">{data.iataCode}</div>
      </div>
    </div>
  )
}

// Custom Single Value Component
const CustomSingleValue: FC<SingleValueProps<AirportOption, false>> = ({
  ...props
}) => {
  const { data } = props
  if (!data) return null

  return (
    <components.SingleValue {...props}>
      <div className="flight-select-single-value">
        <div className="single-value-content">
          <span className="city-country">{data.city}, {data.country}</span>
          <span className="airport-name">{data.airportName}</span>
        </div>
      </div>
    </components.SingleValue>
  )
}

// Custom Placeholder Component

// Custom Control Component
const CustomControl: FC<any> = ({ children, ...props }) => {
  return (
    <components.Control {...props} className="flight-select-control">
      {children}
    </components.Control>
  )
}

// Custom Menu Component
const CustomMenu: FC<any> = ({ children, ...props }) => {
  return (
    <components.Menu {...props} className="flight-select-menu">
      <div className="menu-content">
        {children}
      </div>
    </components.Menu>
  )
}

const FlightSelect: FC<FlightSelectProps> = ({
  className = '',
  options,
  icon,
  placeholder = 'Select city',
  label,
  value,
  onChange,
  onInputChange,
  isSearchable = true,
  isClearable = true,
  isLoading = false,
  error,
}) => {

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      minHeight: '60px',
      border: error
        ? '2px solid #ff7b00'
        : state.isFocused
          ? '2px solid #ff6b35'
          : '2px solid rgba(226, 232, 240, 0.8)',
      borderRadius: '16px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      boxShadow: error
        ? '0 0 0 4px rgba(255, 123, 0, 0.1), 0 8px 24px rgba(255, 123, 0, 0.15)'
        : state.isFocused
          ? '0 0 0 4px rgba(255, 107, 53, 0.1), 0 8px 24px rgba(255, 107, 53, 0.15)'
          : '0 4px 12px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        borderColor: error ? '#ff7b00' : 'rgba(255, 107, 53, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 1)',
      },
    }),
    valueContainer: (base: any) => ({
      ...base,
      padding: '8px 16px',
    }),
    input: (base: any) => ({
      ...base,
      margin: 0,
      padding: 0,
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: '#6b7280',
      padding: '8px 12px',
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 32px rgba(255, 107, 53, 0.1)',
      border: '1px solid rgba(226, 232, 240, 0.8)',
      marginTop: '8px',
      overflow: 'hidden',
    }),
    menuList: (base: any) => ({
      ...base,
      padding: 0,
      maxHeight: '300px',
    }),
  }

  return (
    <>
      <div className={`${className} flex flex-col`} style={{ gap: 0 }}>
        {label && (
          <label className="flight-select-label">
            {icon && <div className="label-icon">{icon}</div>}
            {label}
          </label>
        )}
        <>
          <Select
            value={value}
            onChange={onChange}
            options={options}
            placeholder={placeholder}
            isSearchable={isSearchable}
            isClearable={isClearable}
            isLoading={isLoading}
            onInputChange={onInputChange}
            styles={customStyles}
            components={{
              Option: CustomOption,
              SingleValue: (props) => (
                <CustomSingleValue {...props} />
              ),
              Control: CustomControl,
              Menu: CustomMenu,
              Input: CustomInput,
            }}
            formatOptionLabel={(option) => (
              <div className="option-content">
                <div className="option-main">
                  <span className="city-country">{option.city}, {option.country}</span>
                  <span className="airport-name">{option.airportName}</span>
                </div>
                <div className="iata-code">{option.iataCode}</div>
              </div>
            )}
          />
          {error && (
            <ErrorText
              errors={error as string}
              className='mt-10'
            />
          )}
        </>

      </div>

    </>
  )
}

export default FlightSelect
