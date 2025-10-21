'use client'
import FormSectionTitle, { AdminCard } from '@/components/shared/Card/AdminCard'
import DateInputField from '@/components/shared/TextInputField/DateInputField'
import { TextInputField } from '@/components/shared/TextInputField/TextInputField'
import TimeInputField from '@/components/shared/TimePicker/TimeInputField'
import { CustomModalBtn } from '@/components/web/core/Button/CustomModalBtn'
import { SelectInputField } from '@/components/web/core/SelectInputField/SelectInputField'
import Spinner from '@/components/web/core/spinner/Spinner'
import {
  showErrorToast,
  showSuccessToast,
} from '@/components/web/core/Toast/CustomToast'
import { useAddCouponDetailsMutation } from '@/hooks/useMutations'
import { Field, FieldType } from '@/types/module/authModule'
import { labelValueProps } from '@/types/module/selectInputFieldModule'
import { AddCouponFormValues } from '@/types/module/adminModules/couponModule'
import {
  airLineTerminalOptions,
  carrierOptions,
  travelClassesData,
} from '@/utils/constant'
import { appRoutes } from '@/utils/routes'
import { calculateFlightDuration, formatDuration } from '@/utils/timeUtils'
import { translation } from '@/utils/translation'
import { addCouponValidationSchema } from '@/utils/validationSchemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Box } from 'theme-ui'
import * as yup from 'yup'

export const AddCouponDetails = () => {
  const router = useRouter()
  const addCouponMutation = useAddCouponDetailsMutation()

  // Create a local validation schema that matches AddCouponFormValues exactly
  const validationSchema = yup.object().shape({
    origin: yup.string().required('Origin is required'),
    destination: yup.string().required('Destination is required'),
    journeyType: yup.string().oneOf(['Domestic', 'International']).required('Journey Type is required'),
    carrier: yup.string().required('Carrier is required'),
    flightNumber: yup.string().required('Flight Number is required'),
    flightClass: yup.string().required('Flight Class is required'),
    depTime: yup.string().required('Dep. Time is required'),
    arrTime: yup.string().required('Arr. Time is required'),
    totalDuration: yup.string().required('Total Duration is required'),
    availableSeats: yup.string().required('Available Seats is required'),
    startJourneyDate: yup.string().required('Start Journey Date is required'),
    endJourneyDate: yup.string().required('End Journey Date is required'),
    adultTax: yup.string().required('Adult Tax is required'),
    childTax: yup.string().required('Child Tax is required'),
    infantTax: yup.string().required('Infant Tax is required'),
    totalAmount: yup.string().required('Total Amount is required'),
    sectorDetails: yup.object().shape({
      carrier: yup.string().required('Carrier is required'),
      flightNumber: yup.string().required('Flight Number is required'),
      flightClass: yup.string().required('Class Type is required'),
      flightType: yup.string().oneOf(['Onward', 'Return']).required('Flight Type is required'),
      depTime: yup.string().required('Dep. Time is required'),
      arrTime: yup.string().required('Arr. Time is required'),
      origin: yup.string().required('Origin is required'),
      destination: yup.string().required('Destination is required'),
      startTerminal: yup.string().required('Start Terminal is required'),
      endTerminal: yup.string().required('End Terminal is required'),
      refundable: yup.string().oneOf(['Refundable', 'Non-Refundable']).required('Refundable is required'),
      depDate: yup.string().required('Dep. Date is required'),
      dayChange: yup.string().oneOf(['yes', 'no']).required('Day Change is required'),
    }),
  })

  const defaultValues: AddCouponFormValues = {
    origin: '',
    destination: '',
    journeyType: 'Domestic',
    carrier: '',
    flightNumber: '',
    flightClass: '',
    depTime: '',
    arrTime: '',
    totalDuration: '',
    availableSeats: '',
    startJourneyDate: '',
    endJourneyDate: '',
    adultTax: '0',
    childTax: '0',
    infantTax: '0',
    totalAmount: '0',
    sectorDetails: {
      carrier: '',
      flightNumber: '',
      flightClass: '',
      flightType: 'Onward',
      depTime: '',
      arrTime: '',
      origin: '',
      destination: '',
      startTerminal: '',
      endTerminal: '',
      refundable: 'Refundable',
      depDate: '',
      dayChange: 'yes',
    },
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors, touchedFields },
    trigger,
  } = useForm<AddCouponFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: 'onBlur', // Changed from 'onChange' to 'onBlur' for better performance
  })

  const watchedValues = watch()

  // Optimized field change handlers using useCallback
  const createFieldChangeHandler = useCallback((fieldName: keyof AddCouponFormValues) => {
    return (val: any) => {
      setValue(fieldName, val)
      clearErrors(fieldName)
    }
  }, [setValue, clearErrors])

  const createNestedFieldChangeHandler = useCallback((fieldPath: string) => {
    return (val: any) => {
      setValue(fieldPath as any, val)
      clearErrors(fieldPath as any)
    }
  }, [setValue, clearErrors])

  // Calculate total duration when depTime or arrTime changes
  useEffect(() => {
    if (watchedValues.depTime && watchedValues.arrTime) {
      const result = calculateFlightDuration(watchedValues.depTime, watchedValues.arrTime)
      const readableDuration = formatDuration(result.hours, result.minutes)
      setValue(
        'totalDuration',
        `${readableDuration} (${result.formattedDuration})`
      )
    } else {
      setValue('totalDuration', '')
    }
  }, [watchedValues.depTime, watchedValues.arrTime, setValue])

  const onSubmit = (values: AddCouponFormValues) => {
    const {
      origin,
      destination,
      journeyType,
      carrier,
      flightNumber,
      flightClass,
      depTime,
      arrTime,
      totalDuration,
      availableSeats,
      startJourneyDate,
      endJourneyDate,
      adultTax,
      childTax,
      infantTax,
      totalAmount,
      sectorDetails,
    } = values

    const payload = {
      seriesName: 'Winter Promo 2025',
      origin: origin,
      destination: destination,
      journeyType: journeyType,
      carrier: carrier,
      flightNumber: flightNumber,
      classType: flightClass,
      depTime: depTime,
      arrTime: arrTime,
      totalDuration: totalDuration,
      availableSeats: parseInt(availableSeats),
      startJourneyDate: startJourneyDate,
      endJourneyDate: endJourneyDate,
      adultTax: parseInt(adultTax),
      childTax: parseInt(childTax),
      infantTax: parseInt(infantTax),
      totalAmount: parseInt(totalAmount),
      credentials: 'include',
      couponSectors: [
        {
          carrier: sectorDetails.carrier,
          flightNumber: sectorDetails.flightNumber,
          classType: sectorDetails.flightClass,
          flightType: sectorDetails.flightType,
          depTime: sectorDetails.depTime,
          arrTime: sectorDetails.arrTime,
          origin: sectorDetails.origin,
          destination: sectorDetails.destination,
          startTerminal: sectorDetails.startTerminal,
          endTerminal: sectorDetails.endTerminal,
          refundable: sectorDetails.refundable === 'Refundable',
          depDate: sectorDetails.depDate,
          arrDate: sectorDetails.arrTime,
          dayChange: sectorDetails.dayChange === 'yes',
        },
      ],
    }

    addCouponMutation.mutate(payload, {
      onSuccess: () => {
        showSuccessToast(translation?.COUPON_ADDED_SUCCESS)
        router.push(appRoutes.surfCoupons)
      },
      onError: () => {
        showErrorToast(translation?.COUPON_ADDED_FAILED)
      },
    })
  }

  const couponDetailsFields: Field[] = useMemo(() => [
    {
      name: 'origin',
      label: 'Origin',
      value: watchedValues.origin,
      placeholder: 'Enter Origin',
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: createFieldChangeHandler('origin'),
      error: errors.origin?.message,
      touched: touchedFields.origin,
    },
    {
      name: 'destination',
      label: 'Destination',
      value: watchedValues.destination,
      placeholder: 'Enter Destination',
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: createFieldChangeHandler('destination'),
      error: errors.destination?.message,
      touched: touchedFields.destination,
    },
    {
      name: 'journeyType',
      label: 'Journey Type',
      value: watchedValues.journeyType,
      options: ['Domestic', 'International'],
      placeholder: 'Select Journey Type',
      type: FieldType.SELECT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (val) => {
        setValue('journeyType', val as 'Domestic' | 'International')
        clearErrors('journeyType')
      },
      error: errors.journeyType?.message,
      touched: touchedFields.journeyType,
      onBlur: () => trigger('journeyType'),
    },
    {
      name: 'carrier',
      label: 'Carrier',
      value: watchedValues.carrier,
      options: carrierOptions as labelValueProps[],
      placeholder: 'Select Carrier',
      type: FieldType.SELECT_INPUT_FIELD,
      isShowRequired: true,
      onChange: createFieldChangeHandler('carrier'),
      error: errors.carrier?.message,
      touched: touchedFields.carrier,
      onBlur: () => trigger('carrier'),
    },
    {
      name: 'flightNumber',
      label: 'Flight Number',
      value: watchedValues.flightNumber,
      placeholder: 'Enter Flight Number',
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: createFieldChangeHandler('flightNumber'),
      error: errors.flightNumber?.message,
      touched: touchedFields.flightNumber,
    },
    {
      name: 'flightClass',
      label: 'Class',
      value: watchedValues.flightClass,
      placeholder: 'Select Class',
      type: FieldType.SELECT_INPUT_FIELD,
      options: travelClassesData,
      isShowRequired: true,
      onChange: createFieldChangeHandler('flightClass'),
      error: errors.flightClass?.message,
      touched: touchedFields.flightClass,
      onBlur: () => trigger('flightClass'),
    },
    {
      name: 'depTime',
      label: 'Dep. Time (HH:MM)',
      value: watchedValues.depTime,
      placeholder: '--:--',
      type: FieldType.TIME_INPUT_FIELD,
      isShowRequired: true,
      onChange: createFieldChangeHandler('depTime'),
      error: errors.depTime?.message,
      touched: touchedFields.depTime,
    },
    {
      name: 'arrTime',
      label: 'Arr. Time (HH:MM)',
      value: watchedValues.arrTime,
      placeholder: '--:--',
      type: FieldType.TIME_INPUT_FIELD,
      isShowRequired: true,
      onChange: createFieldChangeHandler('arrTime'),
      error: errors.arrTime?.message,
      touched: touchedFields.arrTime,
    },
    {
      name: 'totalDuration',
      label: 'Total Duration',
      value: watchedValues.totalDuration,
      placeholder: 'Auto-calculated',
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: () => {}, // Read-only
      error: errors.totalDuration?.message,
      touched: touchedFields.totalDuration,
    },
    {
      name: 'availableSeats',
      label: 'Available Seats',
      value: watchedValues.availableSeats,
      placeholder: 'e.g. 50',
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: createFieldChangeHandler('availableSeats'),
      error: errors.availableSeats?.message,
      touched: touchedFields.availableSeats,
    },
  ], [watchedValues, errors, touchedFields, createFieldChangeHandler, setValue, clearErrors, trigger])

  const validityFields: Field[] = useMemo(() => [
    {
      name: 'startJourneyDate',
      label: 'Start Journey Date',
      value: watchedValues.startJourneyDate,
      placeholder: 'YYYY-MM-DD',
      type: FieldType.DATE_INPUT_FIELD,
      isShowRequired: true,
      onChange: createFieldChangeHandler('startJourneyDate'),
      error: errors.startJourneyDate?.message,
      touched: touchedFields.startJourneyDate,
    },
    {
      name: 'endJourneyDate',
      label: 'End Journey Date',
      value: watchedValues.endJourneyDate,
      placeholder: 'YYYY-MM-DD',
      type: FieldType.DATE_INPUT_FIELD,
      isShowRequired: true,
      onChange: createFieldChangeHandler('endJourneyDate'),
      error: errors.endJourneyDate?.message,
      touched: touchedFields.endJourneyDate,
    },
  ], [watchedValues, errors, touchedFields, createFieldChangeHandler])

  const fareDetailsFields: Field[] = useMemo(() => [
    {
      name: 'adultTax',
      label: 'Adult Tax',
      value: watchedValues.adultTax,
      placeholder: '0',
      type: FieldType.TEXT_INPUT_FIELD,
      onChange: createFieldChangeHandler('adultTax'),
      isShowRequired: true,
      error: errors.adultTax?.message,
      touched: touchedFields.adultTax,
    },
    {
      name: 'totalAmount',
      label: 'Total Amount',
      value: watchedValues.totalAmount,
      placeholder: '0',
      type: FieldType.TEXT_INPUT_FIELD,
      onChange: createFieldChangeHandler('totalAmount'),
      isShowRequired: true,
      error: errors.totalAmount?.message,
      touched: touchedFields.totalAmount,
    },
    {
      name: 'childTax',
      label: 'Child Tax',
      value: watchedValues.childTax,
      placeholder: '0',
      type: FieldType.TEXT_INPUT_FIELD,
      onChange: createFieldChangeHandler('childTax'),
      isShowRequired: true,
      error: errors.childTax?.message,
      touched: touchedFields.childTax,
    },
    {
      name: 'infantTax',
      label: 'Infant Tax',
      value: watchedValues.infantTax,
      placeholder: '0',
      type: FieldType.TEXT_INPUT_FIELD,
      onChange: createFieldChangeHandler('infantTax'),
      isShowRequired: true,
      error: errors.infantTax?.message,
      touched: touchedFields.infantTax,
    },
  ], [watchedValues, errors, touchedFields, createFieldChangeHandler])

  const sectorDetailsFields: Field[] = useMemo(() => [
    {
      name: 'sectorDetails.carrier',
      label: 'Carrier',
      value: watchedValues.sectorDetails.carrier,
      placeholder: 'Select Carrier',
      type: FieldType.SELECT_INPUT_FIELD,
      options: carrierOptions as labelValueProps[],
      onChange: createNestedFieldChangeHandler('sectorDetails.carrier'),
      error: errors?.sectorDetails?.carrier?.message,
      touched: touchedFields?.sectorDetails?.carrier,
      isShowRequired: true,
      onBlur: () => trigger('sectorDetails.carrier'),
    },
    {
      name: 'sectorDetails.flightNumber',
      label: 'Flight Number',
      value: watchedValues.sectorDetails.flightNumber,
      placeholder: 'Enter Flight Number',
      type: FieldType.TEXT_INPUT_FIELD,
      onChange: createNestedFieldChangeHandler('sectorDetails.flightNumber'),
      error: errors?.sectorDetails?.flightNumber?.message,
      touched: touchedFields?.sectorDetails?.flightNumber,
      isShowRequired: true,
    },
    {
      name: 'sectorDetails.flightClass',
      label: 'Class',
      value: watchedValues.sectorDetails.flightClass,
      placeholder: 'Select Class',
      type: FieldType.SELECT_INPUT_FIELD,
      options: travelClassesData,
      onChange: createNestedFieldChangeHandler('sectorDetails.flightClass'),
      error: errors?.sectorDetails?.flightClass?.message,
      touched: touchedFields?.sectorDetails?.flightClass,
      isShowRequired: true,
      onBlur: () => trigger('sectorDetails.flightClass'),
    },
    {
      name: 'sectorDetails.flightType',
      label: 'Flight Type',
      value: watchedValues.sectorDetails.flightType || 'Onward',
      options: ['Onward', 'Return'],
      placeholder: 'Select Flight Type',
      type: FieldType.SELECT_INPUT_FIELD,
      onChange: (val) => {
        setValue('sectorDetails.flightType', val as 'Onward' | 'Return')
        clearErrors('sectorDetails.flightType')
      },
      error: errors?.sectorDetails?.flightType?.message,
      touched: touchedFields?.sectorDetails?.flightType,
      isShowRequired: true,
      onBlur: () => trigger('sectorDetails.flightType'),
    },
    {
      name: 'sectorDetails.depTime',
      label: 'Dep. Time',
      value: watchedValues.sectorDetails.depTime,
      placeholder: '--:--',
      type: FieldType.TIME_INPUT_FIELD,
      onChange: createNestedFieldChangeHandler('sectorDetails.depTime'),
      error: errors?.sectorDetails?.depTime?.message,
      touched: touchedFields?.sectorDetails?.depTime,
      isShowRequired: true,
    },
    {
      name: 'sectorDetails.arrTime',
      label: 'Arr. Time',
      value: watchedValues.sectorDetails.arrTime,
      placeholder: '--:--',
      type: FieldType.TIME_INPUT_FIELD,
      onChange: createNestedFieldChangeHandler('sectorDetails.arrTime'),
      error: errors?.sectorDetails?.arrTime?.message,
      touched: touchedFields?.sectorDetails?.arrTime,
      isShowRequired: true,
    },
    {
      name: 'sectorDetails.origin',
      label: 'Origin',
      value: watchedValues.sectorDetails.origin,
      placeholder: 'Enter Origin',
      type: FieldType.TEXT_INPUT_FIELD,
      onChange: createNestedFieldChangeHandler('sectorDetails.origin'),
      error: errors?.sectorDetails?.origin?.message,
      touched: touchedFields?.sectorDetails?.origin,
      isShowRequired: true,
    },
    {
      name: 'sectorDetails.destination',
      label: 'Destination',
      value: watchedValues.sectorDetails.destination,
      placeholder: 'Enter Destination',
      type: FieldType.TEXT_INPUT_FIELD,
      onChange: createNestedFieldChangeHandler('sectorDetails.destination'),
      error: errors?.sectorDetails?.destination?.message,
      touched: touchedFields?.sectorDetails?.destination,
      isShowRequired: true,
    },
    {
      name: 'sectorDetails.startTerminal',
      label: 'Start Terminal',
      value: watchedValues.sectorDetails.startTerminal,
      placeholder: 'Select Start Terminal',
      type: FieldType.SELECT_INPUT_FIELD,
      options: airLineTerminalOptions,
      onChange: createNestedFieldChangeHandler('sectorDetails.startTerminal'),
      error: errors?.sectorDetails?.startTerminal?.message,
      touched: touchedFields?.sectorDetails?.startTerminal,
      isShowRequired: true,
      onBlur: () => trigger('sectorDetails.startTerminal'),
    },
    {
      name: 'sectorDetails.endTerminal',
      label: 'End Terminal',
      value: watchedValues.sectorDetails.endTerminal,
      placeholder: 'Select End Terminal',
      type: FieldType.SELECT_INPUT_FIELD,
      options: airLineTerminalOptions,
      onChange: createNestedFieldChangeHandler('sectorDetails.endTerminal'),
      error: errors?.sectorDetails?.endTerminal?.message,
      touched: touchedFields?.sectorDetails?.endTerminal,
      isShowRequired: true,
      onBlur: () => trigger('sectorDetails.endTerminal'),
    },
    {
      name: 'sectorDetails.refundable',
      label: 'Refundable',
      value: watchedValues.sectorDetails.refundable || 'Refundable',
      options: ['Refundable', 'Non-Refundable'],
      placeholder: 'Select Refund Option',
      type: FieldType.SELECT_INPUT_FIELD,
      onChange: (val) => {
        setValue('sectorDetails.refundable', val as 'Refundable' | 'Non-Refundable')
        clearErrors('sectorDetails.refundable')
      },
      error: errors?.sectorDetails?.refundable?.message,
      touched: touchedFields?.sectorDetails?.refundable,
      isShowRequired: true,
      onBlur: () => trigger('sectorDetails.refundable'),
    },
    {
      name: 'sectorDetails.depDate',
      label: 'Dep. Date',
      value: watchedValues.sectorDetails.depDate,
      placeholder: 'YYYY-MM-DD',
      type: FieldType.TEXT_INPUT_FIELD,
      onChange: createNestedFieldChangeHandler('sectorDetails.depDate'),
      error: errors?.sectorDetails?.depDate?.message,
      touched: touchedFields?.sectorDetails?.depDate,
      isShowRequired: true,
    },
    {
      name: 'sectorDetails.dayChange',
      label: 'Day Change',
      value: watchedValues.sectorDetails.dayChange || 'yes',
      options: ['yes', 'no'],
      placeholder: 'Select Day Change',
      type: FieldType.SELECT_INPUT_FIELD,
      onChange: (val) => {
        setValue('sectorDetails.dayChange', val as 'yes' | 'no')
        clearErrors('sectorDetails.dayChange')
      },
      error: errors?.sectorDetails?.dayChange?.message,
      touched: touchedFields?.sectorDetails?.dayChange,
      isShowRequired: true,
      onBlur: () => trigger('sectorDetails.dayChange'),
    },
  ], [watchedValues, errors, touchedFields, createNestedFieldChangeHandler, setValue, clearErrors, trigger])

  const renderField = useCallback(
    (field: Field) => {
      if (field.type === FieldType.SELECT_INPUT_FIELD) {
        return (
          <SelectInputField
            key={field.name}
            label={field.label}
            value={field.value}
            onChange={(e) => {
              field.onChange?.(e?.value as string)
            }}
            name={field.name}
            options={
              field.options as Array<{ value: any; label: string } | string>
            }
            labelSx={{ display: 'block', textAlign: 'start' }}
            placeholder={field.placeholder}
            firstInputBox
            id={`select-${field.name}`}
            instanceId={`select-instance-${field.name}`}
            isSearchable={field.isSearchable}
            errors={field?.error}
            touched={field.touched}
            isShowRequired={field.isShowRequired}
            onBlur={field.onBlur}
          />
        )
      }
      if (field.type === FieldType.TIME_INPUT_FIELD) {
        return (
          <TimeInputField
            key={field.name}
            label={field.label}
            id={`time-input-${field.name}`}
            value={field.value}
            placeholder={field.placeholder}
            onChange={(time) => field.onChange?.(time)}
            errors={field.error}
            touched={field.touched}
            wrapperClass="mt-0 w-[100%]"
            labelSx={{ display: 'block', textAlign: 'start' }}
            isShowRequired={field.isShowRequired}
          />
        )
      }
      if (field.type === FieldType.DATE_INPUT_FIELD) {
        return (
          <DateInputField
            key={field.name}
            label={field.label}
            value={field.value}
            placeholder={field.placeholder}
            onChange={(date) => field.onChange?.(date)}
            errors={field.error}
            id={`date-input-${field.name}`}
            touched={field.touched}
            wrapperClass="mt-0 w-[100%]"
            labelSx={{ display: 'block', textAlign: 'start' }}
            isShowRequired={field.isShowRequired}
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
          labelSx={{ display: 'block', textAlign: 'start' }}
        />
      )
    },
    []
  )

  const handleClickCancel = () => {
    router.push(appRoutes?.userRequests)
  }

  const handleClickSubmit = () => {
    handleSubmit(onSubmit)()
  }

  return (
    <AdminCard>
      <Box className="pt-20">
        <FormSectionTitle title="Coupon Details" />

        <div
          className="grid gap-20 mt-14 mb-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          }}
        >
          {couponDetailsFields.map(renderField)}
        </div>

        <FormSectionTitle title="Validity" />
        <div
          className="grid gap-20 mt-14 mb-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          }}
        >
          {validityFields.map(renderField)}
        </div>

        <FormSectionTitle title="Fare Details" />
        <div
          className="grid gap-20 mt-14 mb-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          }}
        >
          {fareDetailsFields.map(renderField)}
        </div>

        <FormSectionTitle title="Sector Details" />
        <div
          className="grid gap-20 mt-14 mb-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          }}
        >
          {sectorDetailsFields.map(renderField)}
        </div>
      </Box>

      <CustomModalBtn
        wrapperSx={{ justifyContent: 'flex-end', gap: '10px' }}
        submitBtnTitle={translation?.SUBMIT}
        cancelBtnTitle={translation?.CANCEL}
        cancelBtnClick={handleClickCancel}
        submitBtnClick={handleClickSubmit}
      />
      <Spinner visible={addCouponMutation.isPending} />
    </AdminCard>
  )
}
