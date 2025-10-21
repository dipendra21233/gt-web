'use client'
import { AdminCard } from '@/components/shared/Card/AdminCard'
import { TextInputField } from '@/components/shared/TextInputField/TextInputField'
import { SelectInputField } from '@/components/web/core/SelectInputField/SelectInputField'
import Spinner from '@/components/web/core/spinner/Spinner'
import CustomSwitch from '@/components/web/core/Switch/Switch'
import { showErrorToast } from '@/components/web/core/Toast/CustomToast'
import { getUsersData, manageUserAccess } from '@/store/actions/user.action'
import { ApprovalStatus } from '@/types/module/adminModules/userModule'
import { Field, FieldType, UserRegistration } from '@/types/module/authModule'
import { RegisterAs } from '@/types/module/commonModule'
import { MainStoreType } from '@/types/store/reducers/main.reducers'
import { EDIT_FORM_MAX_HEIGHT } from '@/utils/constant'
import { toCamelCase } from '@/utils/functions'
import {
  gstRegex,
  panRegex,
  phoneNumberRegex,
  validateOnlyNumbers,
} from '@/utils/regexMatch'
import { translation, translationWithFunction } from '@/utils/translation'
import { signupValidationSchema } from '@/utils/validationSchemas'
import { useFormik } from 'formik'
import { FC, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Divider, Text } from 'theme-ui'

interface UserDetailsProps {
  userId: string
}
export const UserDetails: FC<UserDetailsProps> = ({ userId }) => {
  const dispatch = useDispatch()
  const currentUserData = useSelector(
    (state: MainStoreType) => state.userData?.selectedUserData
  )
  const userData = useSelector((state: MainStoreType) => state.userData)
  const [country, setCountry] = useState<string[]>()

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

  useEffect(() => {
    if (userId) {
      dispatch(
        getUsersData({
          userId: userId,
        })
      )
    }
  }, [userId, dispatch])

  const InitialValues = {
    title: currentUserData?.title || '',
    firstName: currentUserData?.firstName || '',
    lastName: currentUserData?.lastName || '',
    email: currentUserData?.email || '',
    mobileNumber: currentUserData?.mobileNumber || '',
    userName: currentUserData?.userName || '',
    companyName: currentUserData?.companyName || '',
    registerAs: currentUserData?.registerAs || '',
    panNumber: currentUserData?.panNumber || '',
    nameOnPan: currentUserData?.nameOnPan || '',
    landline: currentUserData?.landline || '',
    faxNo: currentUserData?.faxNo || '',
    userTNC: currentUserData?.userTNC || '',
    addressLine1: currentUserData?.address?.addressLine1 || '',
    addressLine2: currentUserData?.address?.addressLine2 || '',
    city: currentUserData?.address?.city || '',
    state: currentUserData?.address?.state || '',
    pinCode: currentUserData?.address?.pinCode || '',
    country: currentUserData?.address?.country || '',
    gstNumber: currentUserData?.gstNumber || '',
    approvalStatus: currentUserData?.approvalStatus || '',
  } as UserRegistration

  const formik = useFormik({
    initialValues: InitialValues,
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: signupValidationSchema,
    onSubmit: () => {},
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
      options: [RegisterAs.AGENT, RegisterAs.DISTRIBUTOR, RegisterAs.ADMIN],
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
  const checkIsApproved = (): boolean => {
    if (values?.approvalStatus === ApprovalStatus?.approved) {
      return true
    }
    return false
  }

  const handleChangeSwitch = (value: boolean) => {
    dispatch(
      manageUserAccess(
        {
          userEmailId: values?.email,
          approvedByAdmin: value,
        },
        (res) => {
          if (res) {
            return window.location.reload()
          }
        }
      )
    )
  }

  const renderField = useCallback(
    (field: Field) => {
      if (field.type === FieldType.SELECT_INPUT_FIELD) {
        return (
          <SelectInputField
            key={field.name}
            label={field.label}
            value={field.value}
            isShowRequired={false}
            onChange={(e) => {
              field.onChange?.(e?.value as string)
            }}
            id={`select-${field.name}`}
            name={field.name}
            options={field.options as string[]}
            labelSx={{ display: 'block', textAlign: 'start' }}
            placeholder={field.placeholder}
            firstInputBox
            instanceId={`select-instance-${field.name}`}
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
          isShowRequired={false}
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

  // const handleClickCancel = () => {
  //   router.push(appRoutes?.userRequests)
  // }

  // const handleClickSubmit = () => {
  //   if (currentUserData?._id) {
  //     const updatedFields: Partial<UserRegistration> = {}

  //     Object.keys(values).forEach((key) => {
  //       const typedKey = key as keyof UserRegistration
  //       const newValue = values[typedKey]
  //       const initialValue = InitialValues[typedKey]

  //       if (newValue !== undefined && newValue !== initialValue) {
  //         updatedFields[typedKey] = newValue as any
  //       }
  //     })

  //     if (Object.keys(updatedFields).length > 0) {
  //       dispatch(
  //         updateUserData(currentUserData._id, updatedFields, (res) => {
  //           if (res) {
  //             showSuccessToast(translation?.USER_UPDATED_SUCCESS)
  //             router.push(appRoutes?.userRequests)
  //           }
  //         })
  //       )
  //     } else {
  //       showErrorToast(translation?.NO_CHANGES_MADE)
  //     }
  //   }
  // }
  return (
    <AdminCard
      isScrollable
      maxHeight={EDIT_FORM_MAX_HEIGHT}
      heading="User Details"
      showFooter
      submitButtonConfig={{
        text: translation?.SUBMIT,
        variant: 'darkSlate',
      }}
      cancelButtonConfig={{
        text: translation?.CANCEL,
        variant: 'primary',
      }}
    >
      <div className="p-20">
        <Box as="div" className="flex-space-between-center">
          <Text variant="Maison24Medium125" color="orange_accent_alpha">
            {translation?.COMPANY_DETAILS}
          </Text>

          <Box as="div" className="flex-row-centered-gap-10">
            <Text
              color="orange_accent_alpha"
              sx={{ fontSize: '18px' }}
              variant="Maison16Regular20"
            >
              {translationWithFunction.accountStatus(
                values?.userName,
                checkIsApproved()
              )}
            </Text>
            <CustomSwitch
              checked={checkIsApproved()}
              onChange={handleChangeSwitch}
            />
          </Box>
        </Box>

        <Divider className="my-3" />
        <div
          className="grid gap-20 mt-14 mb-10"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          }}
        >
          {CompanyDetailsfieldset?.map(renderField)}
        </div>
        <Box className="pt-20">
          <Text variant="Maison24Medium125" color="orange_accent_alpha">
            {translation?.PEARSONAL_DETAILS}
          </Text>
          <Divider className="my-3" />
          <div
            key={`user-pearsonal-details`}
            className="grid gap-20 mt-14 mb-10"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            }}
          >
            {PersonalDetailsfieldset?.map(renderField)}
          </div>
        </Box>
      </div>
      {/* <CustomModalBtn
        wrapperSx={{ justifyContent: 'flex-end', gap: '10px' }}
        submitBtnTitle={translation?.SUBMIT}
        cancelBtnTitle={translation?.CANCEL}
        cancelBtnClick={handleClickCancel}
        submitBtnClick={handleClickSubmit}
      /> */}

      <Spinner visible={userData?.loading} />
    </AdminCard>
  )
}
