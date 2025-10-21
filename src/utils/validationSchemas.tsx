import * as yup from 'yup'
import { gstRegex, panRegex } from './regexMatch'
import { translation, translationWithFunction } from './translation'

export const signupValidationSchema = yup.object().shape({
  title: yup.string().required(translation.TITLE_IS_REQUIRED),
  firstName: yup.string().required(translation.FIRST_NAME_IS_REQUIRED),
  lastName: yup.string().required(translation.LAST_NAME_IS_REQUIRED),
  email: yup
    .string()
    .email(translation.INVALID_EMAIL_FORMAT)
    .required(translation.EMAIL_IS_REQUIRED),
  mobileNumber: yup
    .string()
    .matches(/^\d{10}$/, translation.INVALID_MOBILE_NUMBER)
    .required(translation.MOBILE_NUMBER_IS_REQUIRED),
  userName: yup.string().required(translation.USERNAME_IS_REQUIRED),
  companyName: yup.string().required(translation.COMPANY_NAME_IS_REQUIRED),
  registerAs: yup.string().required(translation.REGISTER_AS_IS_REQUIRED),
  panNumber: yup
    .string()
    .matches(
      panRegex,
      'Invalid PAN format. It should be in the format AAAAA1234A.'
    )
    .required('PAN number is required'),
  gstNumber: yup.string().matches(gstRegex, 'Invalid GST number format.'),
  nameOnPan: yup.string().required(translation.NAME_ON_PAN_IS_REQUIRED),
  landline: yup.string().required(translation.LANDLINE_IS_REQUIRED),
  addressLine1: yup.string().required(translation.ADDRESS_LINE1_IS_REQUIRED),
  city: yup.string().required(translation.CITY_IS_REQUIRED),
  state: yup.string().required(translation.STATE_IS_REQUIRED),
  pinCode: yup.string().required(translation.PIN_CODE_IS_REQUIRED),
  country: yup.string().required(translation.COUNTRY_IS_REQUIRED),
})

export const addCouponValidationSchema = yup?.object()?.shape({
  origin: yup
    ?.string()
    .required(translationWithFunction?.requiredValidation('Origin')),
  destination: yup
    ?.string()
    ?.required(translationWithFunction?.requiredValidation('Destination')),
  journeyType: yup
    ?.string()
    .oneOf(['Domestic', 'International'])
    .required(translationWithFunction?.requiredValidation('Journey Type')),
  carrier: yup
    ?.string()
    ?.required(translationWithFunction?.requiredValidation('Carrier')),
  flightNumber: yup
    ?.string()
    ?.required(translationWithFunction?.requiredValidation('Flight Number')),
  flightClass: yup
    ?.string()
    ?.required(
      translationWithFunction?.requiredValidation('Flight Class Type')
    ),
  depTime: yup
    ?.string()
    ?.required(translationWithFunction?.requiredValidation('Dep. Time')),
  arrTime: yup
    ?.string()
    ?.required(translationWithFunction?.requiredValidation('Arr. Time')),
  totalDuration: yup
    ?.string()
    ?.required(translationWithFunction?.requiredValidation('Total Duration')),
  availableSeats: yup
    ?.string()
    ?.required(translationWithFunction?.requiredValidation('Available Seats')),
  startJourneyDate: yup
    ?.string()
    ?.required(
      translationWithFunction?.requiredValidation('Start Journey Date')
    ),
  endJourneyDate: yup
    ?.string()
    ?.required(translationWithFunction?.requiredValidation('End Journey Date')),
  adultTax: yup
    ?.string()
    ?.required(translationWithFunction?.requiredValidation('Adult Tax')),
  childTax: yup
    ?.string()
    ?.required(translationWithFunction?.requiredValidation('Child Tax')),
  infantTax: yup
    ?.string()
    ?.required(translationWithFunction?.requiredValidation('Infant Tax')),
  totalAmount: yup
    ?.string()
    ?.required(translationWithFunction?.requiredValidation('Total Amount')),
  sectorDetails: yup.object().shape({
    carrier: yup
      .string()
      .required(translationWithFunction?.requiredValidation('Carrier')),
    flightNumber: yup
      .string()
      .required(translationWithFunction?.requiredValidation('Flight Number')),
    flightClass: yup
      .string()
      .required(translationWithFunction?.requiredValidation('Class Type')),
    flightType: yup
      .string()
      .oneOf(['Onward', 'Return'])
      .required(translationWithFunction?.requiredValidation('Flight Type')),
    depTime: yup
      .string()
      .required(translationWithFunction?.requiredValidation('Dep. Time')),
    arrTime: yup
      .string()
      .required(translationWithFunction?.requiredValidation('Arr. Time')),
    origin: yup
      .string()
      .required(translationWithFunction?.requiredValidation('Origin')),
    destination: yup
      .string()
      .required(translationWithFunction?.requiredValidation('Destination')),
    startTerminal: yup
      .string()
      .required(translationWithFunction?.requiredValidation('Start Terminal')),
    endTerminal: yup
      .string()
      .required(translationWithFunction?.requiredValidation('End Terminal')),
    refundable: yup
      .string()
      .oneOf(['Refundable', 'Non-Refundable'])
      .required(translationWithFunction?.requiredValidation('Refundable')),
    depDate: yup
      .string()
      .required(translationWithFunction?.requiredValidation('Dep. Date')),
    dayChange: yup
      .string()
      .oneOf(['yes', 'no'])
      .required(translationWithFunction?.requiredValidation('Day Change')),
  }),
})

export const addMarkupValidationSchema = yup.object().shape({
  category: yup
    .string()
    .required('Category is required'),
  carrier: yup
    .string()
    .required('Carrier is required'),
  airlineType: yup
    .string()
    .required('Airline Type is required'),
  flat: yup
    .number()
    .typeError('Flat must be a number')
    .min(0, 'Flat must be greater than or equal to 0')
    .required('Flat is required'),
  yq: yup
    .number()
    .typeError('YQ must be a number')
    .min(0, 'YQ must be greater than or equal to 0')
    .when('airlineType', {
      is: 'percentage',
      then: (schema) => schema.required('YQ is required when airline type is percentage'),
      otherwise: (schema) => schema.notRequired(),
    }),
  tax: yup
    .number()
    .typeError('Tax must be a number')
    .min(0, 'Tax must be greater than or equal to 0')
    .when('airlineType', {
      is: 'percentage',
      then: (schema) => schema.required('Tax is required when airline type is percentage'),
      otherwise: (schema) => schema.notRequired(),
    }),
})

export const loginValidationSchema = yup.object().shape({
  userName: yup.string().required(translation.REQUIRED),
  password: yup.string().required(translation.REQUIRED),
})

export const uploadBalanceValidationSchema = yup.object().shape({
  transactionAmount: yup
    .number()
    .min(1, 'Amount must be greater than 0')
    .positive('Amount must be greater than 0')
    .required(translation.REQUIRED),
  paymentMode: yup.string().required(translation.REQUIRED),
})

export const bannerLoginValidationSchema = yup.object().shape({
  userName: yup.string().required(translation.REQUIRED),
  password: yup.string().required(translation.REQUIRED),
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, translation.INVALID_EMAIL_FORMAT)
    .optional(),
  mobileNumber: yup
    .string()
    .matches(/^\d{10}$/, translation.INVALID_MOBILE_NUMBER)
    .optional(),
  isShowOtp: yup.boolean().optional(),
})

export const otpValidationSchema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^\d{4}$/, 'OTP must be exactly 4 digits')
    .required('OTP is required'),
})


export const flightSearchSchemaRecommended = yup.object().shape({
  from: yup
    .mixed()
    .required('From is required')
    .test('not-null', 'From is required', (value) => value !== null),
  to: yup
    .mixed()
    .required('To is required')
    .test('not-null', 'To is required', (value) => value !== null),
  departureDate: yup.string().required('Departure date is required'),
  returnDate: yup.string().when('tripType', {
    is: (tripType: string) => tripType === 'round-trip',
    then: (schema) => schema.required('Return date is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  travelClass: yup.string().required('Travel class is required'),
  tripType: yup.string().required('Trip type is required'),
  passengers: yup.object().shape({
    adults: yup.number().required('Adults is required'),
    children: yup.number().required('Children is required'),
    infants: yup.number().required('Infants is required'),
  }),
})
