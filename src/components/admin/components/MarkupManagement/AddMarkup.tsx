'use client'
import FormSectionTitle, { AdminCard } from '@/components/shared/Card/AdminCard'
import { TextInputField } from '@/components/shared/TextInputField/TextInputField'
import { CustomModalBtn } from '@/components/web/core/Button/CustomModalBtn'
import { SelectInputField } from '@/components/web/core/SelectInputField/SelectInputField'
import Spinner from '@/components/web/core/spinner/Spinner'
import { addMarkupDetails } from '@/store/actions/coupon.action'
import { Markup } from '@/types/module/adminModules/markupModule'
import { Field, FieldType } from '@/types/module/authModule'
import { MainStoreType } from '@/types/store/reducers/main.reducers'
import {
  airlineTypeOptions,
  carrierOptions,
  selectCategoryOptions,
} from '@/utils/constant'
import { appRoutes } from '@/utils/routes'
import { translation } from '@/utils/translation'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from 'theme-ui'

export const AddMarkup = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { loading } = useSelector((state: MainStoreType) => state.couponData)

  const InitialValues = {
    category: '',
    carrier: '',
    airlineType: '',
    flat: 0,
    yq: 0,
    tax: 0,
    markup: 0,
  } as Markup

  const formik = useFormik({
    initialValues: InitialValues,
    enableReinitialize: true,
    // validationSchema: addCouponValidationSchema,
    onSubmit: (values) => {
      const { category, carrier, airlineType, flat } = values
      const payload = {
        category,
        carrier,
        airlineType,
        flat,
        markup: 0,
      }
      dispatch(
        addMarkupDetails(payload as Markup, () => {
          router.push(appRoutes?.markupManagement)
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

  const couponDetailsFields: Field[] = [
    {
      name: 'category',
      label: 'Select Category',
      value: values.category,
      placeholder: 'Select Category',
      type: FieldType.SELECT_INPUT_FIELD,
      isShowRequired: true,
      options: selectCategoryOptions,
      onChange: (val) => setFieldValue('category', val),
      error: errors.category,
      touched: touched.category,
    },
    {
      name: 'carrier',
      label: 'Select Carrier',
      value: values.carrier,
      placeholder: 'Select Carrier',
      type: FieldType.SELECT_INPUT_FIELD,
      isShowRequired: true,
      options: carrierOptions,
      onChange: (val) => setFieldValue('carrier', val),
      error: errors.carrier,
      touched: touched.carrier,
    },
    {
      name: 'airlineType',
      label: 'Select Airline Type',
      value: values.airlineType,
      options: airlineTypeOptions,
      placeholder: 'Select Airline Type',
      type: FieldType.SELECT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (val) => setFieldValue('airlineType', val),
      error: errors.airlineType,
      touched: touched.airlineType,
      onBlur: () => {
        setFieldTouched('airlineType', true)
      },
    },
    {
      name: 'flat',
      label: 'Flat',
      value: values.flat.toString(),
      placeholder: 'Enter Flat',
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (val) => setFieldValue('flat', Number(val)),
      error: errors.flat,
      touched: touched.flat,
      onBlur: () => {
        setFieldTouched('flat', true)
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

  const handleClickSubmit = () => {
    handleSubmit()
  }

  return (
    <AdminCard>
      <Box className="pt-20">
        <FormSectionTitle title="Markup Details" />

        <div
          className="grid gap-20 mt-14 mb-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          }}
        >
          {couponDetailsFields.map(renderField)}

          {values.airlineType === 'percentage' && (
            <>
              <TextInputField
                name="yq"
                label="%YQ"
                value={values.yq}
                onChange={(e) => setFieldValue('yq', e)}
                placeholder="Enter %YQ"
                errors={errors.yq}
                touched={touched.yq}
                onBlur={handleBlur}
                isShowRequired={true}
                wrapperClass="mt-0 w-[100%]"
                labelSx={{ display: 'block', textAlign: 'start' }}
              />

              <TextInputField
                name="tax"
                label="%Tax"
                value={values.tax}
                onChange={(e) => setFieldValue('tax', e)}
                placeholder="Enter %Tax"
                errors={errors.tax}
                touched={touched.tax}
                onBlur={handleBlur}
                isShowRequired={true}
                wrapperClass="mt-0 w-[100%]"
                labelSx={{ display: 'block', textAlign: 'start' }}
              />
            </>
          )}
        </div>
      </Box>

      <CustomModalBtn
        wrapperSx={{ justifyContent: 'flex-end', gap: '10px' }}
        submitBtnTitle={translation?.SUBMIT}
        submitBtnClick={handleClickSubmit}
      />
      <Spinner visible={loading} />
    </AdminCard>
  )
}
