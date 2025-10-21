import { FC } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { SingleValueProps, components } from 'react-select'
import { Text } from 'theme-ui'

interface OptionType {
  label: string
  value: string
}

interface CustomSingleValueProps extends SingleValueProps<OptionType, false> {
  onClickClear?: () => void
}

export const CustomSingleValue: FC<CustomSingleValueProps> = ({
  data,
  innerProps,
  onClickClear,
  ...props
}) => {
  return (
    <components.SingleValue {...props} data={data} innerProps={innerProps}>
      <div {...innerProps} className="flex justify-between items-center">
        <Text variant="Maison20SemiBold125" color="primary_text_dark">
          {data?.label}
        </Text>
        <div>
          <RxCross2
            size={24}
            onClick={(e) => {
              e.stopPropagation()
              if (onClickClear) onClickClear()
            }}
          />
        </div>
      </div>
    </components.SingleValue>
  )
}
