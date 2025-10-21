'use client'
import { AdminCard } from '@/components/shared/Card/AdminCard'
import { TextInputField } from '@/components/shared/TextInputField/TextInputField'
import { ThemeButton } from '@/components/web/core/Button/Button'
import { SelectInputField } from '@/components/web/core/SelectInputField/SelectInputField'
import Spinner from '@/components/web/core/spinner/Spinner'
import { useInitiateDepositMutation } from '@/hooks/useMutations'
import { Field, FieldType } from '@/types/module/authModule'
import { UploadBalanceDataProps } from '@/types/module/paymentMethods'
import { MainStoreType } from '@/types/store/reducers/main.reducers'
import { paymentModeOptions } from '@/utils/constant'
import { getPaymentMethodId } from '@/utils/functions'
import { uploadBalanceValidationSchema } from '@/utils/validationSchemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import {
  FaCreditCard,
  FaMobile,
  FaShieldAlt,
  FaUniversity,
  FaWallet,
} from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Card, Text } from 'theme-ui'

const paymentMethodIcons = {
  'Credit Card': <FaCreditCard className="text-blue-600" />,
  'Debit Card': <FaCreditCard className="text-green-600" />,
  Amex: <FaCreditCard className="text-blue-800" />,
  NetBanking: <FaUniversity className="text-purple-600" />,
  UPI: <FaMobile className="text-orange-600" />,
}

export const UploadBalance = () => {
  const { loading } = useSelector((state: MainStoreType) => state.balanceData)
  const { mutate: initiateDeposit, isPending } = useInitiateDepositMutation()

  const initialValues: UploadBalanceDataProps = {
    paymentMode: '',
    transactionAmount: 0,
  }

  const {
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UploadBalanceDataProps>({
    defaultValues: initialValues,
    mode: 'all',
    resolver: yupResolver(uploadBalanceValidationSchema),
  })

  const watchedValues = watch()

  const onSubmit = useCallback(
    (values: UploadBalanceDataProps) => {
      const { paymentMode, transactionAmount } = values
      initiateDeposit(
        {
          paymentMode: getPaymentMethodId(paymentMode)?.toString() || '',
          transactionAmount: Number(transactionAmount),
        },
        {
          onSuccess: (res) => {
            if (res?.data?.redirectUrl) {
              window.location.href = res?.data?.redirectUrl
            }
          },
        }
      )
    },
    [initiateDeposit]
  )

  const couponDetailsFields: Field[] = [
    {
      name: 'paymentMode',
      label: 'Select Payment Method',
      value: watchedValues.paymentMode,
      placeholder: 'Choose your payment method',
      type: FieldType.SELECT_INPUT_FIELD,
      isShowRequired: true,
      options: paymentModeOptions,
      onChange: (val) => setValue('paymentMode', val, { shouldValidate: true }),
      error: errors.paymentMode?.message,
    },
    {
      name: 'amount',
      label: 'Deposit Amount',
      value: watchedValues.transactionAmount?.toString() || '',
      placeholder: '0.00',
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (val) =>
        setValue('transactionAmount', Number(val) || 0, {
          shouldValidate: true,
        }),
      error: errors.transactionAmount?.message,
    },
  ]

  const renderField = useCallback(
    (field: Field) => {
      if (field.type === FieldType.SELECT_INPUT_FIELD) {
        return (
          <div key={field.name} className="space-y-2">
            <div className="relative">
              <SelectInputField
                label={field.label}
                value={field.value}
                onChange={(e) => {
                  field.onChange?.(e?.value as string)
                }}
                name={field.name}
                options={
                  field.options as Array<{ value: any; label: string } | string>
                }
                placeholder={field.placeholder}
                firstInputBox
                id={`select-${field.name}`}
                instanceId={`select-instance-${field.name}`}
                isSearchable={field.isSearchable}
                errors={field?.error}
                isShowRequired={false}
                onBlur={field.onBlur}
              />
              {field.value &&
                paymentMethodIcons[
                  field.value as keyof typeof paymentMethodIcons
                ] && (
                  <div className="absolute right-4 top-[54px] z-10 opacity-100 transform -translate-y-1/2 pointer-events-none">
                    {
                      paymentMethodIcons[
                        field.value as keyof typeof paymentMethodIcons
                      ]
                    }
                  </div>
                )}
            </div>
            {field.error && (
              <Text className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span className="text-xs">⚠</span>
                {String(field.error)}
              </Text>
            )}
          </div>
        )
      }

      return (
        <div key={field.name} className="space-y-2">
          <div className="relative">
            <TextInputField
              name={field.name}
              label={field.label}
              value={field.value}
              errors={field?.error}
              autoFocus={field.autoFocus}
              isShowRequired={false}
              onFocus={() => {
                field.onFocus?.()
              }}
              onBlur={() => {
                setValue(
                  field.name as keyof UploadBalanceDataProps,
                  field.name === 'amount'
                    ? Number(field.value) || 0
                    : field.value,
                  { shouldValidate: true }
                )
              }}
              manualErrorSX={{
                display: 'block',
                textAlign: 'start',
              }}
              onChange={(e) => {
                field.onChange?.(e)
              }}
              placeholder={field.placeholder}
              wrapperClass="mt-0 w-[100%]"
              id={`input-${field.name}`}
            />
          </div>
          {field.error && (
            <Text className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <span className="text-xs">⚠</span>
              {String(field.error)}
            </Text>
          )}
        </div>
      )
    },
    [setValue]
  )

  const handleClickSubmit = useCallback(() => {
    handleSubmit(onSubmit)()
  }, [handleSubmit, onSubmit])

  return (
    <AdminCard
      sx={{ p: 0, background: 'none', border: 'none', boxShadow: 'none' }}
    >
      <div className="w-full">
        <Card className="bg-white rounded-2xl shadow-xl border-0 overflow-hidden">
          <div className=" bg-[#1e293b] p-20">
            <div className="flex items-center gap-[10px]">
              <FaShieldAlt className="text-white text-xl" size={24} />

              <Text
                variant="Maison28Demi20"
                className="text-xl font-semibold text-white"
              >
                Upload Balance
              </Text>
            </div>
          </div>

          <div className="p-20">
            <div className="space-y-[20px]">
              {couponDetailsFields.map(renderField)}
            </div>
          </div>

          {/* Card Footer */}
          <div className="p-[18px] bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              {/* Help text on the left */}
              <div className="text-sm text-gray-500">
                Need help?{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Contact Support
                </a>
              </div>

              {/* Button on the right */}
              <ThemeButton
                onClick={handleClickSubmit}
                disabled={
                  loading ||
                  !watchedValues.paymentMode ||
                  !watchedValues.transactionAmount
                }
                variant="darkSlate"
                text={loading ? 'Processing...' : 'Add Balance'}
                icon={loading ? undefined : <FaWallet />}
                isLoading={isPending}
              />
            </div>
          </div>
        </Card>
      </div>

      <Spinner visible={loading} />
    </AdminCard>
  )
}
