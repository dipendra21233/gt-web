/* eslint-disable react-hooks/exhaustive-deps */
import {
  showErrorToast,
  showSuccessToast,
} from '@/components/web/core/Toast/CustomToast'
import { LoginFormData } from '@/types/module/authModule'
import { translation } from '@/utils/translation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useForgotPasswordMutation, useLoginMutation } from './useMutations'

export type TabType = 'mobile' | 'email'

const validationSchema = yup.object({
  activeTab: yup.mixed<TabType>().oneOf(['mobile', 'email']).required(),

  email: yup.string().when('activeTab', {
    is: 'email',
    then: (schema) =>
      schema
        .required('Email is required')
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          'Invalid email format'
        ),
    otherwise: (schema) => schema.optional(),
  }),

  mobileNumber: yup.string().when('activeTab', {
    is: 'mobile',
    then: (schema) =>
      schema
        .required(translation.REQUIRED)
        .matches(/^\d{10}$/, translation.INVALID_MOBILE_NUMBER),
    otherwise: (schema) => schema.optional(),
  }),

  password: yup
    .string()
    .required(translation.REQUIRED)
    .when('isForgotPassword', {
      is: true,
      then: (schema) => schema.required(translation.REQUIRED),
      otherwise: (schema) => schema.optional(),
    }),

  consentAccepted: yup
    .boolean()
    .oneOf([true], 'You must agree to the terms and conditions'),

  isShowOtp: yup.boolean().optional(),
}) as yup.ObjectSchema<LoginFormData>

export const useLoginForm = () => {
  const { mutate: loginMutation, isPending } = useLoginMutation()
  const { mutate: forgotPasswordMutation, isPending: isForgotPasswordPending } =
    useForgotPasswordMutation()
  const [activeTab, setActiveTab] = useState<TabType>('mobile')

  const initialValues: LoginFormData = {
    userName: '',
    password: '',
    isShowOtp: false,
    email: '',
    mobileNumber: '',
    activeTab: 'email',
    consentAccepted: false,
    isForgotPassword: false,
  }

  const methods = useForm<LoginFormData>({
    defaultValues: initialValues,
    mode: 'all',
    resolver: yupResolver(validationSchema),
  })

  const {
    handleSubmit: handleSubmitForm,
    formState,
    setValue,
    watch,
    clearErrors,
    getFieldState,
    setError,
  } = methods

  const values = watch()

  const updateFormField = useCallback(
    (field: keyof LoginFormData, value: string | boolean) => {
      setValue(field, value)
      if (methods.formState.errors[field]) methods.clearErrors(field)
    },
    [setValue, methods]
  )

  const handleTabChange = useCallback(
    (tab: TabType) => {
      setActiveTab(tab)
      updateFormField('activeTab', tab)
      methods.reset({ ...initialValues, activeTab: tab })
      clearErrors()
    },
    [methods, clearErrors, updateFormField]
  )

  const onSubmit = () => {
    handleSubmitForm(
      () => {
        if (values?.isForgotPassword) {
          forgotPasswordMutation(
            {
              emailOrMobile:
                values?.activeTab === 'email'
                  ? values.email
                  : values.mobileNumber || '',
            },
            {
              onSuccess: (success) => {
                showSuccessToast(success?.data?.message)
                updateFormField('isForgotPassword', false)
              },
              onError: (error) => {
                showErrorToast(error?.response?.data?.message)
                updateFormField('isForgotPassword', false)
              },
            }
          )
        } else {
          const userName =
            values.activeTab === 'email' ? values.email : values.mobileNumber

          if (userName && values.password) {
            loginMutation(
              { userName, password: values.password },
              {
                onSuccess: (success) => {
                  console.log('check107 success', success)

                  updateFormField('isShowOtp', true)
                },
                onError: (error) => {
                  console.log('check107 error', error)
                  setError('password', {
                    message: error.response?.data?.message,
                  })
                  updateFormField('isShowOtp', false)
                },
              }
            )
          }
        }
      },
      () => {}
    )()
  }

  return {
    //  state
    methods,
    values,
    isPending,
    activeTab,
    formState,
    isForgotPasswordPending,

    //  functions
    onSubmit,
    handleSubmitForm,
    updateFormField,
    handleTabChange,
    getFieldState,
  }
}
