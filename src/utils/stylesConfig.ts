import { GroupBase, StylesConfig } from 'react-select'

export type OptionType = { label: string; value: string }
export const isMultiple = false
export type GroupType = GroupBase<OptionType>

export const stylesConfig = (
  hasError: boolean = false
): StylesConfig<OptionType, typeof isMultiple, GroupType> => ({
  control: (baseStyles, state) => {
    let paddingValue = '14px 20px'
    if (
      state.selectProps.name === 'selectClose' ||
      state.selectProps.name === 'selectOpen' ||
      state.selectProps.name === 'itemType'
    ) {
      paddingValue = '14px 20px'
    } else if (state.selectProps.name === 'state') {
      paddingValue = '14px 20px'
    }

    // hasError is passed as parameter to the stylesConfig function

    return {
      ...baseStyles,
      border: hasError
        ? '2px solid #ef4444 !important'
        : state.isFocused
          ? '2px solid #ff7b00 !important'
          : '2px solid rgba(226, 232, 240, 0.8) !important',
      boxShadow: hasError
        ? state.isFocused
          ? '0 0 0 4px rgba(239, 68, 68, 0.15), 0 8px 24px rgba(239, 68, 68, 0.2) !important'
          : '0 0 0 4px rgba(239, 68, 68, 0.1), 0 4px 12px rgba(239, 68, 68, 0.15) !important'
        : state.isFocused
          ? '0 0 0 4px rgba(255, 123, 0, 0.12), 0 8px 24px rgba(255, 123, 0, 0.15) !important'
          : '0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1) !important',
      backgroundColor: state.isDisabled
        ? '#F8F9FA'
        : state.isFocused
          ? 'rgba(255, 255, 255, 1)'
          : 'rgba(255, 255, 255, 0.95)',
      padding: paddingValue,
      color: '#2e4244',
      borderRadius: '16px',
      fontFamily: 'maison',
      fontWeight: 'medium',
      fontSize: 16,
      lineHeight: '125%',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: state.isFocused ? 'translateY(-1px)' : 'none',
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      '&:hover': {
        borderColor: hasError
          ? '#ef4444 !important'
          : 'rgba(255, 123, 0, 0.4) !important',
        backgroundColor: state.isDisabled
          ? '#F8F9FA'
          : 'rgba(255, 255, 255, 1)',
        boxShadow: hasError
          ? '0 0 0 4px rgba(239, 68, 68, 0.1), 0 4px 12px rgba(239, 68, 68, 0.15) !important'
          : '0 6px 20px rgba(255, 123, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.08) !important',
        transform: 'translateY(-1px)',
      },
    }
  },
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none',
  }),
  option: (base, { data, isFocused, isSelected, options }) => {
    const isLastOption = data.label === options[options.length - 1]?.label
    return {
      ...base,
      backgroundColor: isFocused ? '#DEF0F6' : 'rgba(255, 255, 255, 1)',
      color: isSelected ? 'black' : '',
      padding: '6px 15px',
      fontSize: 16,
      fontFamily: 'Maison',
      fontWeight: '500',
      lineHeight: '20px',
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      height: '50px',
      ':active': {
        backgroundColor: '#DEF0F6 !important',
      },
      ...(isLastOption
        ? {}
        : {
            marginBottom: '1px',
          }),
    }
  },
  dropdownIndicator: (base) => ({
    ...base,
    padding: 'unset !important',
  }),
  menu: (base) => ({
    ...base,
    left: 0,
    boxShadow: '4px 4px 30px rgba(0, 0, 0, 0.15)',
    '& ::-webkit-scrollbar-thumb': {
      backgroundColor: '#a6a6a6',
      height: '60px',
      borderRadius: '10px',
      border: '5px solid transparent',
      backgroundClip: 'content-box',
    },
    '& ::-webkit-scrollbar-corner': {
      backgroundColor: '#fff',
    },
    '& ::-webkit-scrollbar': {
      width: '15px',
      backgroundColor: '#EAEAEA !important',
    },
    textAlign: 'center',
    backgroundColor: '#EAEAEA !important',
  }),
  menuList: (base) => ({
    ...base,
    display: 'flex',
    flexDirection: 'column',
    padding: 'unset',
    maxHeight: '152px !important',
    flexFlow: 'wrap',
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 'unset',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#9CA3AF',
    fontSize: 16,
    fontFamily: 'maison',
    fontWeight: 'medium',
    lineHeight: '125%',
    opacity: 0.8,
  }),
  singleValue: (base) => ({
    ...base,
    color: '#2e4244',
    fontFamily: 'maison',
    fontWeight: 'medium',
    fontSize: 16,
    lineHeight: '125%',
  }),
})

export const flightSelectStylesConfig: StylesConfig<
  OptionType,
  typeof isMultiple,
  GroupType
> = {
  control: (baseStyles, state) => {
    return {
      ...baseStyles,
      border: state.isFocused
        ? '2px solid #00C6B7 !important'
        : '1px solid #e7e7e7 !important',
      boxShadow: '0px 0px 2px 0px rgba(2, 0, 0, 0.20) !important',
      backgroundColor: state.isDisabled ? '#F1F1F1' : 'transparent',
      fontFamily: 'Maison',
      fontWeight: '500',
      height: '110px',
      borderRadius: '14px',
    }
  },
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none',
  }),
  option: (base, { data, isFocused, isSelected, options }) => {
    const isLastOption = data.label === options[options.length - 1]?.label
    return {
      ...base,
      backgroundColor: isFocused ? '#DEF0F6' : 'rgba(255, 255, 255, 1)',
      color: isSelected ? 'black' : '',
      padding: '6px 15px',
      fontSize: 16,
      fontFamily: 'Maison',
      fontWeight: '500',
      lineHeight: '20px',
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      height: '50px',
      ':active': {
        backgroundColor: '#DEF0F6 !important',
      },
      ...(isLastOption
        ? {}
        : {
            marginBottom: '1px',
          }),
    }
  },
  dropdownIndicator: (base) => ({
    ...base,
    display: 'none',
    padding: 'unset !important',
  }),
  menu: (base) => ({
    ...base,
    left: 0,
    boxShadow: '4px 4px 30px rgba(0, 0, 0, 0.15)',
    '& ::-webkit-scrollbar-thumb': {
      backgroundColor: '#a6a6a6',
      height: '60px',
      border: '5px solid transparent',
      backgroundClip: 'content-box',
    },
    '& ::-webkit-scrollbar-corner': {
      backgroundColor: '#fff',
    },
    '& ::-webkit-scrollbar': {
      width: '15px',
      backgroundColor: '#EAEAEA !important',
    },
    textAlign: 'center',
    backgroundColor: '#EAEAEA !important',
  }),
  menuList: (base) => ({
    ...base,
    display: 'flex',
    flexDirection: 'column',
    padding: 'unset',
    maxHeight: '152px !important',
    flexFlow: 'wrap',
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 'unset',
  }),
}

export const newFlightSelect: StylesConfig<
  OptionType,
  typeof isMultiple,
  GroupType
> = {
  control: (baseStyles, state) => {
    return {
      ...baseStyles,
      border: 'none',
      boxShadow: state.isFocused
        ? '0px 0px 8px 0px rgba(102, 102, 102, 0.2) !important'
        : '0px 0px 2px 0px rgba(2, 0, 0, 0.20) !important',
      backgroundColor: state.isDisabled ? '#F1F1F1' : '#F8F8F8',
      fontFamily: 'Maison',
      fontWeight: '500',
      fontSize: 12,
      // height: '110px',
      transition: 'all 0.3s ease',
      '&:hover': {
        border: '1px solid #999999 !important',
        boxShadow: '0px 0px 4px 0px rgba(102, 102, 102, 0.15) !important',
      },
    }
  },
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none',
  }),
  option: (base, { data, isFocused, isSelected, options }) => {
    const isLastOption = data.label === options[options.length - 1]?.label

    return {
      ...base,
      backgroundColor: isFocused ? '#F0F0F0' : 'rgba(255, 255, 255, 1)',
      color: isSelected ? '#333333' : '#666666',
      padding: '6px 15px',
      fontSize: 16,
      fontFamily: 'Maison',
      fontWeight: isSelected ? '600' : '500',
      lineHeight: '20px',
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      height: '50px',
      transition: 'all 0.2s ease',
      ':active': {
        backgroundColor: '#E8E8E8 !important',
      },
      ':hover': {
        backgroundColor: '#F5F5F5',
        transform: 'translateX(2px)',
      },
      ...(isLastOption
        ? {}
        : {
            marginBottom: '1px',
          }),
    }
  },
  dropdownIndicator: (base) => ({
    ...base,
    display: 'none',
    padding: 'unset !important',
  }),
  menu: (base) => ({
    ...base,
    left: 0,
    boxShadow: '4px 4px 30px rgba(0, 0, 0, 0.15)',
    borderRadius: '14px',
    border: '1px solid #e7e7e7',
    '& ::-webkit-scrollbar-thumb': {
      backgroundColor: '#a6a6a6',
      height: '60px',
      border: '5px solid transparent',
      backgroundClip: 'content-box',
    },
    '& ::-webkit-scrollbar-corner': {
      backgroundColor: '#fff',
    },
    '& ::-webkit-scrollbar': {
      width: '15px',
      backgroundColor: '#EAEAEA !important',
    },
    textAlign: 'center',
    backgroundColor: '#EAEAEA !important',
  }),
  menuList: (base) => ({
    ...base,
    display: 'flex',
    flexDirection: 'column',
    padding: 'unset',
    maxHeight: '152px !important',
    flexFlow: 'wrap',
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 'unset',
  }),
  singleValue: (base) => ({
    ...base,
    color: '#333333',
    fontFamily: 'Maison',
    fontWeight: '500',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#999999',
    fontFamily: 'Maison',
    fontWeight: '400',
    fontSize: 10, // Reduced size for placeholder
  }),
}
