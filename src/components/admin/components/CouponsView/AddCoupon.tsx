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
import { addCouponDetails } from '@/store/actions/coupon.action'
import { Field, FieldType } from '@/types/module/authModule'
import { labelValueProps } from '@/types/module/selectInputFieldModule'
import { MainStoreType } from '@/types/store/reducers/main.reducers'
import {
  airLineTerminalOptions,
  carrierOptions,
  travelClassesData,
} from '@/utils/constant'
import { appRoutes } from '@/utils/routes'
import { calculateFlightDuration, formatDuration } from '@/utils/timeUtils'
import { translation } from '@/utils/translation'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from 'theme-ui'

export const AddCouponDetails = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading } = useSelector((state: MainStoreType) => state.couponData)

  const InitialValues = {
    origin: '',
    destination: '',
    journeyType: '',
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
      flightType: '',
      depTime: '',
      arrTime: '',
      origin: '',
      destination: '',
      startTerminal: '',
      endTerminal: '',
      refundable: '',
      depDate: '',
      dayChange: 'yes',
    },
  }

  const formik = useFormik({
    initialValues: InitialValues,
    enableReinitialize: true,
    // validationSchema: addCouponValidationSchema,
    onSubmit: (values) => {
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
      dispatch(
        addCouponDetails(payload, (success: boolean) => {
          if (success) {
            showSuccessToast(translation?.COUPON_ADDED_SUCCESS)
            router.push(appRoutes.surfCoupons)
          } else {
            showErrorToast(translation?.COUPON_ADDED_FAILED)
          }
        })
      )
    },
  })

  const {
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
  } = formik
  useEffect(() => {
    if (values.depTime && values.arrTime) {
      const result = calculateFlightDuration(values.depTime, values.arrTime)
      const readableDuration = formatDuration(result.hours, result.minutes)
      setFieldValue(
        'totalDuration',
        `${readableDuration} (${result.formattedDuration})`
      )
    } else {
      setFieldValue('totalDuration', '')
    }
  }, [values.depTime, values.arrTime, setFieldValue])

  const couponDetailsFields: Field[] = [
    {
      name: 'origin',
      label: 'Origin',
      value: values.origin,
      placeholder: 'Enter Origin',
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (val) => setFieldValue('origin', val),
      error: errors.origin,
      touched: touched.origin,
    },
    {
      name: 'destination',
      label: 'Destination',
      value: values.destination,
      placeholder: 'Enter Destination',
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (val) => setFieldValue('destination', val),
      error: errors.destination,
      touched: touched.destination,
    },
    {
      name: 'journeyType',
      label: 'Journey Type',
      value: values.journeyType,
      options: ['Domestic', 'International'],
      placeholder: 'Select Journey Type',
      type: FieldType.SELECT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (val) => setFieldValue('journeyType', val),
      error: errors.journeyType,
      touched: touched.journeyType,
      onBlur: () => {
        setFieldTouched('journeyType', true)
      },
    },
    {
      name: 'carrier',
      label: 'Carrier',
      value: values.carrier,
      options: carrierOptions as labelValueProps[],
      placeholder: 'Select Carrier',
      type: FieldType.SELECT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (val) => setFieldValue('carrier', val),
      error: errors.carrier,
      touched: touched.carrier,
      onBlur: () => {
        setFieldTouched('carrier', true)
      },
    },
    {
      name: 'flightNumber',
      label: 'Flight Number',
      value: values.flightNumber,
      placeholder: 'Enter Flight Number',
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (val) => setFieldValue('flightNumber', val),
      error: errors.flightNumber,
      touched: touched.flightNumber,
    },
    {
      name: 'flightClass',
      label: 'Class',
      value: values.flightClass,
      placeholder: 'Select Class',
      type: FieldType.SELECT_INPUT_FIELD,
      options: travelClassesData,
      isShowRequired: true,
      onChange: (val) => setFieldValue('flightClass', val),
      error: errors.flightClass,
      touched: touched.flightClass,
      onBlur: () => {
        setFieldTouched('flightClass', true)
      },
    },
    {
      name: 'depTime',
      label: 'Dep. Time (HH:MM)',
      value: values.depTime,
      placeholder: '--:--',
      type: FieldType.TIME_INPUT_FIELD, // Changed from TEXT_INPUT_FIELD
      isShowRequired: true,
      onChange: (val) => setFieldValue('depTime', val),
      error: errors.depTime,
      touched: touched.depTime,
    },
    {
      name: 'arrTime',
      label: 'Arr. Time (HH:MM)',
      value: values.arrTime,
      placeholder: '--:--',
      type: FieldType.TIME_INPUT_FIELD, // Changed from TEXT_INPUT_FIELD
      isShowRequired: true,
      onChange: (val) => setFieldValue('arrTime', val),
      error: errors.arrTime,
      touched: touched.arrTime,
    },
    {
      name: 'totalDuration',
      label: 'Total Duration',
      value: values.totalDuration,
      placeholder: 'Auto-calculated',
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: () => {}, // Read-only
      error: errors.totalDuration,
      touched: touched.totalDuration,
    },
    {
      name: 'availableSeats',
      label: 'Available Seats',
      value: values.availableSeats,
      placeholder: 'e.g. 50',
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (val) => setFieldValue('availableSeats', val),
      error: errors.availableSeats,
      touched: touched.availableSeats,
    },
  ]

  const validityFields: Field[] = [
    {
      name: 'startJourneyDate',
      label: 'Start Journey Date',
      value: values.startJourneyDate,
      placeholder: 'YYYY-MM-DD',
      type: FieldType.DATE_INPUT_FIELD,
      isShowRequired: true,
      onChange: (val) => setFieldValue('startJourneyDate', val),
      error: errors.startJourneyDate,
      touched: touched.startJourneyDate,
    },
    {
      name: 'endJourneyDate',
      label: 'End Journey Date',
      value: values.endJourneyDate,
      placeholder: 'YYYY-MM-DD',
      type: FieldType.DATE_INPUT_FIELD,
      isShowRequired: true,
      onChange: (val) => setFieldValue('endJourneyDate', val),
      error: errors.endJourneyDate,
      touched: touched.endJourneyDate,
    },
  ]

  const fareDetailsFields: Field[] = [
    {
      name: 'adultTax',
      label: 'Adult Tax',
      value: values.adultTax,
      placeholder: '0',
      type: FieldType.TEXT_INPUT_FIELD,
      onChange: (val) => setFieldValue('adultTax', val),
      isShowRequired: true,
      error: errors.adultTax,
      touched: touched.adultTax,
    },
    {
      name: 'totalAmount',
      label: 'Total Amount',
      value: values.totalAmount,
      placeholder: '0',
      type: FieldType.TEXT_INPUT_FIELD,
      onChange: (val) => setFieldValue('totalAmount', val),
      isShowRequired: true,
      error: errors.totalAmount,
      touched: touched.totalAmount,
    },
    {
      name: 'childTax',
      label: 'Child Tax',
      value: values.childTax,
      placeholder: '0',
      type: FieldType.TEXT_INPUT_FIELD,
      onChange: (val) => setFieldValue('childTax', val),
      isShowRequired: true,
      error: errors.childTax,
      touched: touched.childTax,
    },
    {
      name: 'infantTax',
      label: 'Infant Tax',
      value: values.infantTax,
      placeholder: '0',
      type: FieldType.TEXT_INPUT_FIELD,
      onChange: (val) => setFieldValue('infantTax', val),
      isShowRequired: true,
      error: errors.infantTax,
      touched: touched.infantTax,
    },
  ]

  const sectorDetailsFields: Field[] = [
    {
      name: 'sectorDetails.carrier',
      label: 'Carrier',
      value: values.sectorDetails.carrier,
      placeholder: 'Select Carrier',
      type: FieldType.SELECT_INPUT_FIELD,
      options: carrierOptions as labelValueProps[],
      onChange: (val) => setFieldValue('sectorDetails.carrier', val),
      error: errors?.sectorDetails?.carrier,
      touched: touched?.sectorDetails?.carrier,
      isShowRequired: true,
      onBlur: () => {
        setFieldTouched('sectorDetails.carrier', true)
      },
    },
    {
      name: 'sectorDetails.flightNumber',
      label: 'Flight Number',
      value: values.sectorDetails.flightNumber,
      placeholder: 'Enter Flight Number',
      type: FieldType.TEXT_INPUT_FIELD,
      onChange: (val) => setFieldValue('sectorDetails.flightNumber', val),
      error: errors?.sectorDetails?.flightNumber,
      touched: touched?.sectorDetails?.flightNumber,
      isShowRequired: true,
    },
    {
      name: 'sectorDetails.flightClass',
      label: 'Class',
      value: values.sectorDetails.flightClass,
      placeholder: 'Select Class',
      type: FieldType.SELECT_INPUT_FIELD,
      options: travelClassesData,
      onChange: (val) => setFieldValue('sectorDetails.flightClass', val),
      error: errors?.sectorDetails?.flightClass,
      touched: touched?.sectorDetails?.flightClass,
      isShowRequired: true,
      onBlur: () => {
        setFieldTouched('sectorDetails.flightClass', true)
      },
    },
    {
      name: 'sectorDetails.flightType',
      label: 'Flight Type',
      value: values.sectorDetails.flightType || 'Onward',
      options: ['Onward', 'Return'],
      placeholder: 'Select Flight Type',
      type: FieldType.SELECT_INPUT_FIELD,
      onChange: (val) => setFieldValue('sectorDetails.flightType', val),
      error: errors?.sectorDetails?.flightType,
      touched: touched?.sectorDetails?.flightType,
      isShowRequired: true,
      onBlur: () => {
        setFieldTouched('sectorDetails.flightType', true)
      },
    },
    {
      name: 'sectorDetails.depTime',
      label: 'Dep. Time',
      value: values.sectorDetails.depTime,
      placeholder: '--:--',
      type: FieldType.TIME_INPUT_FIELD,
      onChange: (val) => setFieldValue('sectorDetails.depTime', val),
      error: errors?.sectorDetails?.depTime,
      touched: touched?.sectorDetails?.depTime,
      isShowRequired: true,
    },
    {
      name: 'sectorDetails.arrTime',
      label: 'Arr. Time',
      value: values.sectorDetails.arrTime,
      placeholder: '--:--',
      type: FieldType.TIME_INPUT_FIELD,
      onChange: (val) => setFieldValue('sectorDetails.arrTime', val),
      error: errors?.sectorDetails?.arrTime,
      touched: touched?.sectorDetails?.arrTime,
      isShowRequired: true,
    },
    {
      name: 'sectorDetails.origin',
      label: 'Origin',
      value: values.sectorDetails.origin,
      placeholder: 'Enter Origin',
      type: FieldType.TEXT_INPUT_FIELD,
      onChange: (val) => setFieldValue('sectorDetails.origin', val),
      error: errors?.sectorDetails?.origin,
      touched: touched?.sectorDetails?.origin,
      isShowRequired: true,
    },
    {
      name: 'sectorDetails.destination',
      label: 'Destination',
      value: values.sectorDetails.destination,
      placeholder: 'Enter Destination',
      type: FieldType.TEXT_INPUT_FIELD,
      onChange: (val) => setFieldValue('sectorDetails.destination', val),
      error: errors?.sectorDetails?.destination,
      touched: touched?.sectorDetails?.destination,
      isShowRequired: true,
    },
    {
      name: 'sectorDetails.startTerminal',
      label: 'Start Terminal',
      value: values.sectorDetails.startTerminal,
      placeholder: 'Select Start Terminal',
      type: FieldType.SELECT_INPUT_FIELD,
      options: airLineTerminalOptions,
      onChange: (val) => setFieldValue('sectorDetails.startTerminal', val),
      error: errors?.sectorDetails?.startTerminal,
      touched: touched?.sectorDetails?.startTerminal,
      isShowRequired: true,
      onBlur: () => {
        setFieldTouched('sectorDetails.startTerminal', true)
      },
    },
    {
      name: 'sectorDetails.endTerminal',
      label: 'End Terminal',
      value: values.sectorDetails.endTerminal,
      placeholder: 'Select End Terminal',
      type: FieldType.SELECT_INPUT_FIELD,
      options: airLineTerminalOptions,
      onChange: (val) => setFieldValue('sectorDetails.endTerminal', val),
      error: errors?.sectorDetails?.endTerminal,
      touched: touched?.sectorDetails?.endTerminal,
      isShowRequired: true,
      onBlur: () => {
        setFieldTouched('sectorDetails.endTerminal', true)
      },
    },
    {
      name: 'sectorDetails.refundable',
      label: 'Refundable',
      value: values.sectorDetails.refundable || 'Refundable',
      options: ['Refundable', 'Non-Refundable'],
      placeholder: 'Select Refund Option',
      type: FieldType.SELECT_INPUT_FIELD,
      onChange: (val) => setFieldValue('sectorDetails.refundable', val),
      error: errors?.sectorDetails?.refundable,
      touched: touched?.sectorDetails?.refundable,
      isShowRequired: true,
      onBlur: () => {
        setFieldTouched('sectorDetails.refundable', true)
      },
    },
    {
      name: 'sectorDetails.depDate',
      label: 'Dep. Date',
      value: values.sectorDetails.depDate,
      placeholder: 'YYYY-MM-DD',
      type: FieldType.TEXT_INPUT_FIELD,
      onChange: (val) => setFieldValue('sectorDetails.depDate', val),
      error: errors?.sectorDetails?.depDate,
      touched: touched?.sectorDetails?.depDate,
      isShowRequired: true,
    },
    {
      name: 'sectorDetails.dayChange',
      label: 'Day Change',
      value: values.sectorDetails.dayChange || 'yes',
      options: ['yes', 'no'],
      placeholder: 'Select Day Change',
      type: FieldType.SELECT_INPUT_FIELD,
      onChange: (val) => setFieldValue('sectorDetails.dayChange', val),
      error: errors?.sectorDetails?.dayChange,
      touched: touched?.sectorDetails?.dayChange,
      isShowRequired: true,
      onBlur: () => {
        setFieldTouched('sectorDetails.dayChange', true)
      },
    },
  ]

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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
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
          id={`input-${field.name}`}
          labelSx={{ display: 'block', textAlign: 'start' }}
        />
      )
    },
    [handleBlur]
  )

  const handleClickCancel = () => {
    router.push(appRoutes?.userRequests)
  }

  const handleClickSubmit = () => {
    handleSubmit()
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
      <Spinner visible={loading} />
    </AdminCard>
  )
}
