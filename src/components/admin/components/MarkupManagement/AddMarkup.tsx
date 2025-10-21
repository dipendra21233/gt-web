'use client'
import FormSectionTitle, { AdminCard } from '@/components/shared/Card/AdminCard'
import { TextInputField } from '@/components/shared/TextInputField/TextInputField'
import { CustomModalBtn } from '@/components/web/core/Button/CustomModalBtn'
import { SelectInputField } from '@/components/web/core/SelectInputField/SelectInputField'
import Spinner from '@/components/web/core/spinner/Spinner'
import {
  showErrorToast,
  showSuccessToast,
} from '@/components/web/core/Toast/CustomToast'
import { useAddMarkupDetailsMutation } from '@/hooks/useMutations'
import { Markup, AddMarkupFormValues } from '@/types/module/adminModules/markupModule'
import { Field, FieldType } from '@/types/module/authModule'
import {
  airlineTypeOptions,
  carrierOptions,
  selectCategoryOptions,
} from '@/utils/constant'
import { appRoutes } from '@/utils/routes'
import { translation } from '@/utils/translation'
import { addMarkupValidationSchema } from '@/utils/validationSchemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Box } from 'theme-ui'
import * as yup from 'yup'

export const AddMarkup = () => {
  const router = useRouter()
  const addMarkupMutation = useAddMarkupDetailsMutation()

  // Create a local validation schema that matches AddMarkupFormValues exactly
  const validationSchema = yup.object().shape({
    category: yup.string().required('Category is required'),
    carrier: yup.string().required('Carrier is required'),
    airlineType: yup.string().required('Airline Type is required'),
    flat: yup.string().required('Flat is required'),
    yq: yup.string().optional(),
    tax: yup.string().optional(),
  })

  const defaultValues: AddMarkupFormValues = {
    category: '',
    carrier: '',
    airlineType: '',
    flat: '0',
    yq: '0',
    tax: '0',
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    setError,
    formState: { errors, touchedFields },
    trigger,
  } = useForm<AddMarkupFormValues>({
    defaultValues,
    mode: 'onBlur',
  })

  const watchedValues = watch()

  // Optimized field change handlers using useCallback
  const createFieldChangeHandler = useCallback((fieldName: keyof AddMarkupFormValues) => {
    return (val: any) => {
      setValue(fieldName, val)
      clearErrors(fieldName)
    }
  }, [setValue, clearErrors])

  const onSubmit = (values: AddMarkupFormValues) => {
    const { category, carrier, airlineType, flat, yq, tax } = values
    
    // Clear all previous errors
    clearErrors()
    
    let hasErrors = false
    
    // Manual validation for required fields
    if (!category || category.trim() === '') {
      setError('category', { type: 'required', message: 'Category is required' })
      hasErrors = true
    }
    if (!carrier || carrier.trim() === '') {
      setError('carrier', { type: 'required', message: 'Carrier is required' })
      hasErrors = true
    }
    if (!airlineType || airlineType.trim() === '') {
      setError('airlineType', { type: 'required', message: 'Airline Type is required' })
      hasErrors = true
    }
    if (!flat || flat.trim() === '') {
      setError('flat', { type: 'required', message: 'Flat is required' })
      hasErrors = true
    }
    
    // Custom validation for conditional fields
    if (airlineType === 'percentage') {
      if (!yq || yq.trim() === '') {
        setError('yq', { type: 'required', message: 'YQ is required when airline type is percentage' })
        hasErrors = true
      }
      if (!tax || tax.trim() === '') {
        setError('tax', { type: 'required', message: 'Tax is required when airline type is percentage' })
        hasErrors = true
      }
    }
    
    // If there are validation errors, don't submit
    if (hasErrors) {
      return
    }
    
    const payload: Markup = {
      category,
      carrier,
      airlineType,
      flat: Number(flat),
      markup: 0,
      ...(airlineType === 'percentage' && {
        yq: Number(yq),
        tax: Number(tax),
      }),
    }

    addMarkupMutation.mutate(payload, {
      onSuccess: () => {
        showSuccessToast('Markup added successfully')
        router.push(appRoutes?.markupManagement)
      },
      onError: () => {
        showErrorToast('Failed to add markup')
      },
    })
  }

  const couponDetailsFields: Field[] = useMemo(() => [
    {
      name: 'category',
      label: 'Select Category',
      value: watchedValues.category,
      placeholder: 'Select Category',
      type: FieldType.SELECT_INPUT_FIELD,
      isShowRequired: true,
      options: selectCategoryOptions,
      onChange: createFieldChangeHandler('category'),
      error: errors.category?.message,
      touched: touchedFields.category || !!errors.category,
    },
    {
      name: 'carrier',
      label: 'Select Carrier',
      value: watchedValues.carrier,
      placeholder: 'Select Carrier',
      type: FieldType.SELECT_INPUT_FIELD,
      isShowRequired: true,
      options: carrierOptions,
      onChange: createFieldChangeHandler('carrier'),
      error: errors.carrier?.message,
      touched: touchedFields.carrier || !!errors.carrier,
    },
    {
      name: 'airlineType',
      label: 'Select Airline Type',
      value: watchedValues.airlineType,
      options: airlineTypeOptions,
      placeholder: 'Select Airline Type',
      type: FieldType.SELECT_INPUT_FIELD,
      isShowRequired: true,
      onChange: createFieldChangeHandler('airlineType'),
      error: errors.airlineType?.message,
      touched: touchedFields.airlineType || !!errors.airlineType,
      onBlur: () => trigger('airlineType'),
    },
    {
      name: 'flat',
      label: 'Flat',
      value: watchedValues.flat,
      placeholder: 'Enter Flat',
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: createFieldChangeHandler('flat'),
      error: errors.flat?.message,
      touched: touchedFields.flat || !!errors.flat,
    },
  ], [watchedValues, errors, touchedFields, createFieldChangeHandler, trigger])

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

  const handleClickSubmit = () => {
    handleSubmit(onSubmit)()
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

          {watchedValues.airlineType === 'percentage' && (
            <>
              <TextInputField
                name="yq"
                label="%YQ"
                value={watchedValues.yq}
                onChange={(e) => {
                  setValue('yq', e)
                  clearErrors('yq')
                }}
                placeholder="Enter %YQ"
                errors={errors.yq?.message}
                touched={touchedFields.yq || !!errors.yq}
                isShowRequired={true}
                wrapperClass="mt-0 w-[100%]"
                labelSx={{ display: 'block', textAlign: 'start' }}
              />

              <TextInputField
                name="tax"
                label="%Tax"
                value={watchedValues.tax}
                onChange={(e) => {
                  setValue('tax', e)
                  clearErrors('tax')
                }}
                placeholder="Enter %Tax"
                errors={errors.tax?.message}
                touched={touchedFields.tax || !!errors.tax}
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
      <Spinner visible={addMarkupMutation.isPending} />
    </AdminCard>
  )
}
