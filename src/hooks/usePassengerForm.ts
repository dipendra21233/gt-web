import { PassengerFormValues } from '@/types/module/commonModule'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

// Create dynamic validation schema based on passenger counts
const createValidationSchema = (
  adultCount: number,
  childCount: number,
  infantCount: number
) => {
  return Yup.object({
    adults: Yup.array()
      .of(
        Yup.object({
          title: Yup.string().required('Title is required'),
          firstName: Yup.string().required('First name is required'),
          lastName: Yup.string().required('Last name is required'),
          email: Yup.string().email('Invalid email format').optional(),
          mobile: Yup.string().optional(),
          dateOfBirth: Yup.string().required('Date of birth is required'),
          frequentFlierNumber: Yup.string().optional(),
        })
      )
      .min(adultCount, `At least ${adultCount} adult passenger(s) required`)
      .required(),
    children: Yup.array()
      .of(
        Yup.object({
          title: Yup.string().required('Title is required'),
          firstName: Yup.string().required('First name is required'),
          lastName: Yup.string().required('Last name is required'),
          email: Yup.string().email('Invalid email format').optional(),
          mobile: Yup.string().optional(),
          dateOfBirth: Yup.string().required('Date of birth is required'),
          frequentFlierNumber: Yup.string().optional(),
        })
      )
      .min(childCount, `At least ${childCount} child passenger(s) required`)
      .required(),
    infants: Yup.array()
      .of(
        Yup.object({
          title: Yup.string().required('Title is required'),
          firstName: Yup.string().required('First name is required'),
          lastName: Yup.string().required('Last name is required'),
          email: Yup.string().email('Invalid email format').optional(),
          mobile: Yup.string().optional(),
          dateOfBirth: Yup.string().required('Date of birth is required'),
          frequentFlierNumber: Yup.string().optional(),
        })
      )
      .min(infantCount, `At least ${infantCount} infant passenger(s) required`)
      .required(),
    contactDetails: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),
    }),
    payment: Yup.object({
      method: Yup.string()
        .oneOf(['Deposit', 'DebitCard', 'CreditCard', 'NetBanking', 'UPI'])
        .required('Payment method is required'),
      termsAccepted: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('You must accept the terms and conditions'),
    }),
    gst: Yup.object({
      number: Yup.string().required('GST number is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('GST email is required'),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/i, 'GST phone must be 10 digits')
        .required('GST phone is required'),
      address: Yup.string().required('GST address is required'),
      company: Yup.string().required('GST company is required'),
      corporate: Yup.string().nullable(),
      search: Yup.string().nullable(),
    }),
  })
}

interface UsePassengerFormProps {
  adultCount: number
  childCount: number
  infantCount: number
}

export const usePassengerForm = ({
  adultCount,
  childCount,
  infantCount,
}: UsePassengerFormProps) => {
  const initialValues: PassengerFormValues = {
    adults: Array(adultCount || 0)
      .fill(null)
      .map(() => ({
        title: '',
        firstName: '',
        lastName: '',
        frequentFlierNumber: '',
        email: '',
        mobile: '',
        dateOfBirth: '',
      })),
    children: Array(childCount || 0)
      .fill(null)
      .map(() => ({
        title: '',
        firstName: '',
        lastName: '',
        frequentFlierNumber: '',
        email: '',
        mobile: '',
        dateOfBirth: '',
      })),
    infants: Array(infantCount || 0)
      .fill(null)
      .map(() => ({
        title: '',
        firstName: '',
        lastName: '',
        frequentFlierNumber: '',
        email: '',
        mobile: '',
        dateOfBirth: '',
      })),
    contactDetails: {
      email: '',
      mobile: '',
    },
    payment: {
      method: 'Deposit' as
        | 'Deposit'
        | 'DebitCard'
        | 'CreditCard'
        | 'NetBanking'
        | 'UPI',
      termsAccepted: false,
    },
    gst: {
      corporate: '',
      number: '',
      email: '',
      phone: '',
      address: '',
      company: '',
      search: '',
    },
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
    reset,
  } = useForm<PassengerFormValues>({
    resolver: yupResolver(
      createValidationSchema(adultCount, childCount, infantCount)
    ) as any,
    defaultValues: initialValues,
    mode: 'onSubmit',
  })

  // Reset form when passenger counts change
  useEffect(() => {
    reset(initialValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adultCount, childCount, infantCount])

  // Scroll to first error
  const scrollToError = useCallback(() => {
    setTimeout(() => {
      const errorElement = document.querySelector(
        'input[aria-invalid="true"], select[aria-invalid="true"], textarea[aria-invalid="true"], .error, [class*="react-select-error"], [style*="border-color: red"]'
      )
      if (errorElement) {
        errorElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    }, 100)
  }, [])

  // Submit handler with error scrolling
  const onSubmit = useCallback(
    async (onSuccess: (data: PassengerFormValues) => void) => {
      return handleSubmit(
        (data) => {
          onSuccess(data as any)
        },
        () => {
          scrollToError()
        }
      )()
    },
    [handleSubmit, scrollToError]
  )

  return {
    control,
    errors,
    isSubmitting,
    setValue,
    watch,
    trigger,
    onSubmit,
    reset,
  }
}
