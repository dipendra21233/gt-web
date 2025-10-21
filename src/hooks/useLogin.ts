import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

const useLogin = () => {
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),
  })

  const { handleSubmit, handleChange, resetForm } = useFormik({
    initialValues: {
      phoneNumber: '',
    },
    validationSchema,
    onSubmit: (values) => {
      setPhoneNumber(values.phoneNumber)
      setIsOtpSent(true)
    },
  })

  const handleResendOtp = () => {
    // Resend OTP logic here
  }

  const handleVerifyOtp = () => {
    // Verify OTP logic here
  }

  return {
    isOtpSent,
    phoneNumber,
    handleSubmit,
    handleChange,
    handleResendOtp,
    handleVerifyOtp,
    resetForm,
  }
}

export default useLogin
