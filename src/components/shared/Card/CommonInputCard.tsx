'use client'
import { TextInputField } from '@/components/shared/TextInputField/TextInputField'
import { ThemeButton } from '@/components/web/core/Button/Button'
import { SelectInputField } from '@/components/web/core/SelectInputField/SelectInputField'
import { Field, FieldType } from '@/types/module/authModule'
import { ButtonProps } from '@/types/module/themuiModule'
import React, { useCallback } from 'react'
import { Box, Card, Text } from 'theme-ui'

interface CommonInputCardProps extends ButtonProps {
  wrapperClass?: string
  heading?: string
  desc?: string
  headingColor?: string
  descColor?: string
  descVariant?: string
  textHeadingClassName?: string
  headingVariant?: string
  fields: Field[]
}

const CommonInputCard: React.FC<CommonInputCardProps> = ({
  descVariant,
  descColor,
  wrapperClass,
  fields,
  heading,
  headingVariant,
  desc,
  textHeadingClassName,
  headingColor,
  ...props
}) => {
  const renderField = useCallback((field: Field) => {
    if (field.type === FieldType.SELECT_INPUT_FIELD) {
      return (
        <SelectInputField
          key={`select-input-field-${field.name}`}
          label={field.label}
          value={field.value}
          isShowRequired={field.isShowRequired}
          onChange={(e) => {
            field.onChange?.(e?.value as string)
          }}
          id="state-select"
          name="state"
          options={field.options as string[]}
          labelSx={{ display: 'block', textAlign: 'start' }}
          placeholder={field.placeholder}
          firstInputBox={field?.firstInputBox}
          instanceId="state-select-instance"
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
        firstInputBox={field?.firstInputBox}
        touched={field.touched}
        autoFocus={field.autoFocus}
        type={field?.inputType}
        isShowRequired={field.isShowRequired}
        onFocus={() => {
          field.onFocus?.()
        }}
        onBlur={field?.onBlur}
        manualErrorSX={{
          display: 'block',
          textAlign: 'start',
        }}
        onChange={(e) => {
          field.onChange?.(e)
        }}
        placeholder={field.placeholder}
        wrapperClass={`mt-0 w-[100%] ${field?.wrapperClass}`}
        labelSx={{ display: 'block', textAlign: 'start' }}
      />
    )
  }, [])

  return (
    <Card as="div" className={wrapperClass}>
      <Box className={textHeadingClassName}>
        <Text variant={headingVariant} color={headingColor}>
          {heading}
        </Text>
        {desc && (
          <Text variant={descVariant} color={descColor}>
            {desc}
          </Text>
        )}
      </Box>
      {fields
        ?.filter((field) => field.isShow)
        ?.map((field) => renderField(field))}
      <ThemeButton {...props} />
    </Card>
  )
}

export default CommonInputCard
