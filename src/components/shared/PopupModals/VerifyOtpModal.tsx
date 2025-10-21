'use client'
import ResendOtp from '@/components/web/components/auth/ResendOtp'
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from '@/hooks/useMutations'
import { LoginFormData } from '@/types/module/authModule'
import { ACCESS_TOKEN, IS_ADMIN_USER, TRUE } from '@/utils/constant'
import { appRoutes } from '@/utils/routes'
import { otpValidationSchema } from '@/utils/validationSchemas'
import { yupResolver } from '@hookform/resolvers/yup'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Text } from 'theme-ui'
import { OtpInputBox } from '../TextInputField/OtpTextInputField'
import CommonModal from './CommonModal'

interface VerifyOtpModalProps {
  isOpen: boolean
  onClose: () => void
  wrapperClass: string
  values: LoginFormData
  onVerify?: (otp: string) => void
}

interface OtpFormData {
  otp: string
}

const VerifyOtpModal = ({
  isOpen,
  onClose,
  wrapperClass,
  values,
}: VerifyOtpModalProps) => {
  const router = useRouter()
  const { mutate: resendOtp, isPending: isResendOtpPending } =
    useResendOtpMutation()
  const { mutate: verifyOtp, isPending } = useVerifyOtpMutation()
  const [countdown, setCountdown] = useState(30)
  const [isResendOtp, setResendOtp] = useState<boolean>(true)
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
    clearErrors,
    reset,
  } = useForm<OtpFormData>({
    defaultValues: {
      otp: '',
    },
    resolver: yupResolver(otpValidationSchema),
  })

  const formValues = watch()

  const onSubmit = (formData: OtpFormData) => {
    if (formData.otp.length >= 4) {
      verifyOtp(
        {
          email: values?.email || '',
          otp: formData.otp,
        },
        {
          onSuccess: (res) => {
            Cookies.set(ACCESS_TOKEN, res?.data?.data?.accessToken)
            window.location.href = appRoutes?.home
            if (res?.data?.data?.user?.isAdmin) {
              Cookies.set(IS_ADMIN_USER, TRUE)
            }
            onClose()
            reset()
          },
          onError: (error) => {
            setError('otp', { message: error?.response?.data?.message })
            setValue('otp', '')
            setCountdown(0)
            setResendOtp(false)
          },
        }
      )
    }
  }

  useEffect(() => {
    if (isOpen) {
      let timer: NodeJS.Timeout | null = null

      if (countdown > 0) {
        timer = setInterval(() => {
          setCountdown((prevCountdown) => prevCountdown - 1)
        }, 1000)
      } else if (countdown === 0) {
        setResendOtp(false)
      }

      return () => {
        if (timer) clearInterval(timer)
      }
    }

    // Return cleanup function for all code paths
    return () => { }
  }, [countdown, isOpen])
  const handleOtpChange = (otp: string) => {
    setValue('otp', otp)
  }

  const handleVerifyClick = () => {
    if (formValues.otp.length >= 4) {
      handleSubmit(onSubmit)()
      clearErrors()
    }
  }

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      showCloseIcon
      wrapperClass={wrapperClass}
      heading="Verify OTP"
      cancelButtonConfig={{
        text: 'Cancel',
        variant: 'darkSlate',
        onClick: onClose,
      }}
      submitButtonConfig={{
        text: 'Verify',
        variant: 'primary',
        onClick: handleVerifyClick,
        isLoading: isPending,
      }}
      showFooter
      width="460px"
    >
      <Text variant="Maison16Regular20" className="pb-6" color="grey_dark">
        OTP sent to your {values?.mobileNumber ? 'mobile number' : 'email'}{' '}
        <Text
          variant="Maison16Medium20"
          color="orange_500"
          className="underline cursor-pointer"
        >
          {values?.mobileNumber || values?.email}
        </Text>
      </Text>
      <OtpInputBox
        onChange={handleOtpChange}
        value={formValues.otp}
        error={errors.otp?.message}
      />
      {errors.otp && (
        <Text variant="Maison12Regular16" color="red" className="pt-2">
          {errors.otp.message}
        </Text>
      )}
      <div className="pb-7 pt-6">
        <ResendOtp
          isResendOtp={isResendOtp || isResendOtpPending}
          handleResendOtp={() => {
            console.log('resendOtp')
            resendOtp(
              {
                email: values?.email ? values.email : values.mobileNumber || '',
              },
              {
                onSuccess: () => {
                  setCountdown(30)
                  setResendOtp(false)
                },
              }
            )
          }}
          countdown={countdown}
        />
      </div>
    </CommonModal>
  )
}

export default VerifyOtpModal
