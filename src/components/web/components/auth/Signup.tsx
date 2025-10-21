'use client'
import { requestSignup } from '@/store/actions/auth.action'
import { Field, FieldType } from '@/types/module/authModule'
import { RegisterAs } from '@/types/module/commonModule'
import { MainStoreType } from '@/types/store/reducers/main.reducers'
import { removeDot, toCamelCase } from '@/utils/functions'
import {
  gstRegex,
  panRegex,
  phoneNumberRegex,
  validateOnlyNumbers,
} from '@/utils/regexMatch'
import { appRoutes } from '@/utils/routes'
import { translation } from '@/utils/translation'
import { signupValidationSchema } from '@/utils/validationSchemas'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Card, Divider, Text } from 'theme-ui'
import { TextInputField } from '../../../shared/TextInputField/TextInputField'
import { ThemeButton } from '../../core/Button/Button'
import { TermsCheckbox } from '../../core/CheckBox/TermsCheckbox'
import { SelectInputField } from '../../core/SelectInputField/SelectInputField'
import { showErrorToast } from '../../core/Toast/CustomToast'
import Spinner from '../../core/spinner/Spinner'
interface FormCTASectionProps {
  onChange: (value: boolean) => void
  onClick: () => void
  checked: boolean
  disabled: boolean
}

export const FormCTASection: FC<FormCTASectionProps> = ({
  onChange,
  checked,
  onClick,
  disabled,
}) => {
  return (
    <Fragment>
      <TermsCheckbox
        privacyLabel={translation?.PRICACY_POLICY}
        termsLabel={translation?.TERMS_AND_CONDITION}
        text={translation?.READ_AND_ACCEPT}
        textClass="flex flex-wrap ms-2 whitespace-nowrap"
        wrapperClass="flex items-start mt-4 mb-4"
        textSx={{ fontSize: '16px' }}
        onChange={onChange}
        checked={checked}
      />
      <ThemeButton
        text={translation?.SUBMIT}
        disabled={disabled}
        onClick={onClick}
        sx={{ py: [2, 2, 2, 2, 2, 2, 3] }}
      />

      <Box as="div" className="text-center pt-6">
        <Text variant="Maison16Regular20">
          {translation?.ALREADY_HAVE_ACCOUNT}{' '}
          <Link
            href={appRoutes?.login}
            className="link-primary whitespace-nowrap"
          >
            {translation?.LOGIN}
          </Link>
        </Text>
      </Box>
    </Fragment>
  )
}

export const SignupComponent = () => {
  const router = useRouter()
  const authUserData = useSelector((state: MainStoreType) => state.authUserData)
  const dispatch = useDispatch()
  const [country, setCountry] = useState<string[]>()
  const [isAgree, setIsAgree] = useState<boolean>(false)

  useEffect(() => {
    const fetchCountries = async () => {
      const { Country } = await import('country-state-city')
      const countries = Country.getAllCountries()
      if (countries) {
        const state = countries.map((item) => item.name)
        setCountry(state)
      }
    }

    fetchCountries()
  }, [])

  const InitialValues = {
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    userName: '',
    companyName: '',
    registerAs: '',
    panNumber: '',
    nameOnPan: '',
    landline: '',
    faxNo: '',
    userTNC: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    gstNumber: '',
  }

  const formik = useFormik({
    initialValues: InitialValues,
    validationSchema: signupValidationSchema,
    validateOnMount: true,
    onSubmit: () => { },
  })

  const {
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
  } = formik

  const handleChangePanNo = (panNumber: string) => {
    const upperCasePan = panNumber.toUpperCase()
    setFieldValue('panNumber', upperCasePan)
    if (!panRegex.test(upperCasePan) && upperCasePan.length === 10) {
      setFieldTouched('panNumber', true)
      setFieldValue('panNumber', '')
      showErrorToast(translation?.INVALID_PAN_NO)
    }
  }

  const handleChangeGstNo = (gstNumber: string) => {
    const upperCaseGst = gstNumber.toUpperCase()
    setFieldValue('gstNumber', upperCaseGst)

    if (!gstRegex.test(upperCaseGst) && upperCaseGst.length === 15) {
      setFieldTouched('gstNumber', true)
      setFieldValue('gstNumber', '')
      showErrorToast(translation?.INVALID_GST_NO)
    }
  }

  const CompanyDetailsfieldset: Field[] = [
    {
      name: toCamelCase(translation?.COMPANY_NAME),
      label: translation?.COMPANY_NAME,
      value: values?.companyName,
      placeholder: translation?.COMPANY_NAME,
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (companyName) => {
        setFieldValue('companyName', companyName)
      },
      error: errors?.companyName,
      touched: touched?.companyName,
    },
    {
      name: toCamelCase(translation?.REGISTER_AS),
      label: translation?.REGISTER_AS,
      value: values?.registerAs,
      placeholder: translation?.REGISTER_AS,
      type: FieldType.SELECT_INPUT_FIELD,
      options: [RegisterAs.AGENT, RegisterAs.DISTRIBUTOR],
      isShowRequired: true,
      onChange: (registerAs) => {
        setFieldValue('registerAs', registerAs)
      },
      error: errors?.registerAs,
      touched: touched?.registerAs,
    },
    {
      name: toCamelCase(translation?.PAN_NO),
      label: translation?.PAN_NO,
      value: values?.panNumber,
      placeholder: translation?.PAN_NO,
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (panNumber) => {
        handleChangePanNo(panNumber)
      },
      error: errors?.panNumber,
      touched: touched?.panNumber,
    },
    {
      name: toCamelCase(translation?.NAME_ON_PAN),
      label: translation?.NAME_ON_PAN,
      value: values?.nameOnPan,
      placeholder: translation?.NAME_ON_PAN,
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (nameOnPan) => {
        setFieldValue('nameOnPan', nameOnPan)
      },
      error: errors?.nameOnPan,
      touched: touched?.nameOnPan,
    },
    {
      name: toCamelCase(translation?.ADDRESS),
      label: translation?.ADDRESS,
      value: values?.addressLine1,
      placeholder: translation?.ADDRESS,
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (addressLine1) => {
        setFieldValue('addressLine1', addressLine1)
      },
      error: errors?.addressLine1,
      touched: touched?.addressLine1,
    },
    {
      name: toCamelCase(translation?.ADDRESS_2),
      label: translation?.ADDRESS_2,
      value: values?.addressLine2,
      placeholder: translation?.ADDRESS_2,
      type: FieldType.TEXT_INPUT_FIELD,
      onChange: (addressLine2) => {
        setFieldValue('addressLine2', addressLine2)
      },
    },
    {
      name: toCamelCase(translation?.CITY),
      label: translation?.CITY,
      value: values?.city,
      placeholder: translation?.CITY,
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (city) => {
        setFieldValue('city', city)
      },
      error: errors?.city,
      touched: touched?.city,
    },
    {
      name: toCamelCase(translation?.STATE),
      label: translation?.STATE,
      value: values?.state,
      placeholder: translation?.STATE,
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (state) => {
        setFieldValue('state', state)
      },
      error: errors?.state,
      touched: touched?.state,
    },
    {
      name: toCamelCase(translation?.PIN_CODE),
      label: translation?.PIN_CODE,
      value: values?.pinCode,
      placeholder: translation?.PIN_CODE,
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (pinCode) => {
        if (validateOnlyNumbers.test(pinCode)) {
          setFieldValue('pinCode', pinCode)
        } else {
          setFieldValue('pinCode', '')
        }
      },
      error: errors?.pinCode,
      touched: touched?.pinCode,
    },
    {
      name: toCamelCase(translation?.COUNTRY),
      label: translation?.COUNTRY,
      value: values?.country,
      placeholder: translation?.COUNTRY,
      type: FieldType.SELECT_INPUT_FIELD,
      isShowRequired: true,
      options: country,
      isSearchable: true,
      onChange: (country) => {
        setFieldValue('country', country)
      },
      error: errors?.country,
      touched: touched?.country,
    },
    {
      name: toCamelCase(translation?.LANDLINE),
      label: translation?.LANDLINE,
      value: values?.landline,
      placeholder: translation?.LANDLINE,
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (mobileNumber) => {
        const numericValue = mobileNumber.replace(phoneNumberRegex, '')
        if (numericValue.length <= 10) {
          setFieldValue('landline', numericValue)
        }
      },
      error: errors?.landline,
      touched: touched?.landline,
    },
    {
      name: toCamelCase(translation?.GST_NO),
      label: translation?.GST_NO,
      value: values?.gstNumber,
      placeholder: translation?.ENTER_GST_NO,
      type: FieldType.TEXT_INPUT_FIELD,
      onChange: (gstNumber) => {
        handleChangeGstNo(gstNumber)
      },
      error: errors?.gstNumber,
      touched: touched?.gstNumber,
    },
    {
      name: toCamelCase(translation?.FAX_NO),
      label: translation?.FAX_NO,
      value: values?.faxNo,
      placeholder: translation?.FAX_NO,
      type: FieldType.TEXT_INPUT_FIELD,
      onChange: (faxNo) => {
        setFieldValue('faxNo', faxNo)
      },
    },
  ]

  const PersonalDetailsfieldset: Field[] = [
    {
      name: toCamelCase(translation?.TITLE),
      label: translation?.TITLE,
      value: values?.title,
      placeholder: translation?.TITLE,
      type: FieldType.SELECT_INPUT_FIELD,
      isShowRequired: true,
      options: ['Mr.', 'Mrs.', 'Ms.'],
      onChange: (title) => {
        setFieldValue('title', title)
      },
      error: errors?.title,
      touched: touched?.title,
      onBlur: () => {
        setFieldTouched('title', true)
      },
    },
    {
      name: toCamelCase(translation?.FIRST_NAME),
      label: translation?.FIRST_NAME,
      value: values?.firstName,
      placeholder: translation?.FIRST_NAME,
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (firstName) => {
        setFieldValue('firstName', firstName)
      },
      error: errors?.firstName,
      touched: touched?.firstName,
    },
    {
      name: toCamelCase(translation?.LAST_NAME),
      label: translation?.LAST_NAME,
      value: values?.lastName,
      placeholder: translation?.LAST_NAME,
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (lastName) => {
        setFieldValue('lastName', lastName)
      },
      error: errors?.lastName,
      touched: touched?.lastName,
    },
    {
      name: toCamelCase(translation?.EMAIL),
      label: translation?.EMAIL,
      value: values?.email,
      placeholder: translation?.EMAIL,
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (email) => {
        setFieldValue('email', email)
      },
      error: errors?.email,
      touched: touched?.email,
    },
    {
      name: 'mobileNumber',
      label: translation?.PHONE_NO,
      value: values?.mobileNumber,
      placeholder: translation?.PHONE_NO,
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (mobileNumber) => {
        const numericValue = mobileNumber.replace(phoneNumberRegex, '')
        if (numericValue.length <= 10) {
          setFieldValue('mobileNumber', numericValue)
        }
      },
      error: errors?.mobileNumber,
      touched: touched?.mobileNumber,
    },
    {
      name: toCamelCase(translation?.USER_NAME),
      label: translation?.USER_NAME,
      value: values?.userName,
      placeholder: translation?.USER_NAME,
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (userName) => {
        setFieldValue('userName', userName)
      },
      error: errors?.userName,
      touched: touched?.userName,
    },
  ]

  const renderField = useCallback(
    (field: Field) => {
      if (field.type === FieldType.SELECT_INPUT_FIELD) {
        return (
          <SelectInputField
            key={`select-input-field-${field.name}`}
            label={field.label}
            value={field.value}
            isShowRequired={field.isShowRequired}
            onChange={(e) => {
              field.onChange?.(e?.value as string)
            }}
            id="state-select"
            name="state"
            options={field.options as string[]}
            labelSx={{ display: 'block', textAlign: 'start' }}
            placeholder={field.placeholder}
            firstInputBox
            instanceId="state-select-instance"
            isSearchable={field.isSearchable}
            errors={field?.error}
            touched={field.touched}
            onBlur={field.onBlur}
          />
        )
      }
      return (
        <TextInputField
          key={field.name}
          name={field.name}
          ref={field.ref}
          label={field.label}
          value={field.value}
          errors={field?.error}
          touched={field.touched}
          autoFocus={field.autoFocus}
          isShowRequired={field.isShowRequired}
          onFocus={() => {
            field.onFocus?.()
          }}
          onBlur={handleBlur}
          manualErrorSX={{
            display: 'block',
            textAlign: 'start',
          }}
          onChange={(e) => {
            field.onChange?.(e)
          }}
          placeholder={field.placeholder}
          wrapperClass="mt-0 w-[100%]"
          labelSx={{ display: 'block', textAlign: 'start' }}
        />
      )
    },
    [handleBlur]
  )

  const checkIsDisabled = (): boolean => {
    return !(
      values?.title &&
      values?.firstName &&
      values?.lastName &&
      values?.email &&
      values?.mobileNumber &&
      values?.userName &&
      values?.companyName &&
      values?.registerAs &&
      values?.panNumber &&
      values?.nameOnPan &&
      values?.landline &&
      values?.addressLine1 &&
      values?.city &&
      values?.state &&
      values?.pinCode &&
      values?.country &&
      isAgree
    )
  }

  const handleClickSubmit = () => {
    dispatch(
      requestSignup(
        {
          ...values,
          title: removeDot(values?.title),
          userTNC: true,
        },
        (res) => {
          if (res) {
            router.push(appRoutes.login)
          }
        }
      )
    )
  }

  return (
    <Box
      as="div"
      className="min-h-screen bg-[#f2f2f2] flex items-center justify-center pt-100 sm:px-4 p-10"
    >
      <Card className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden p-14 sm:p-30">
        <Text
          variant="Maison24Medium125"
          color="orange_accent_alpha"
          className="mb-6 text-center"
        >
          {translation?.REGISTRATION}
        </Text>
        <Divider
          sx={{ color: 'orange_accent_alpha', borderWidth: '2px' }}
          className="my-4"
        />
        <Box className="sm:pt-6">
          <Text variant="Maison18Demi125" className="text-center sm:text-left">
            {translation?.PEARSONAL_DETAILS}
          </Text>
          <div
            className="grid gap-20 sm:mt-14 mb-14"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            }}
          >
            {PersonalDetailsfieldset?.map(renderField)}
          </div>
          <Text variant="Maison18Demi125" className="text-center sm:text-left">
            {translation?.COMPANY_DETAILS}
          </Text>
          <div
            className="grid gap-20 mt-14 mb-10"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            }}
          >
            {CompanyDetailsfieldset?.map(renderField)}
          </div>
        </Box>
        <FormCTASection
          checked={isAgree as boolean}
          disabled={checkIsDisabled()}
          onClick={handleClickSubmit}
          onChange={(e) => {
            setIsAgree(e)
          }}
        />
        <Spinner visible={authUserData?.loading} />
      </Card>
    </Box>
  )
}
