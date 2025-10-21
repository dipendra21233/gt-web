import { validateOnlyNumbers } from '@/utils/regexMatch'
import { FC } from 'react'
import OtpInput from 'react-otp-input'
import { useMediaQuery } from 'react-responsive'

interface OtpInputProps {
  onChange: (value: string) => void
  value: string
  numInputs?: number
  error?: string
}

export const OtpInputBox: FC<OtpInputProps> = ({
  onChange,
  value,
  numInputs = 4,
  error,
}) => {
  const isSmallScreen = useMediaQuery({
    query:
      '(min-height: 700px) and (max-height: 740px) and (min-width: 481px) and (max-width: 768px)',
  })

  return (
    <div className="space-y-4">
      <OtpInput
        numInputs={numInputs}
        onChange={(otp) => {
          if (validateOnlyNumbers.test(otp)) {
            onChange(otp)
          }
        }}
        value={value}
        inputStyle={{
          width: isSmallScreen ? '3.5rem' : '58px',
          height: isSmallScreen ? '3.5rem' : '58px',
          margin: '10px',
          border: error ? '1px solid red' : '1px solid #989898',
          borderRadius: '10px',
          fontWeight: 500,
          textAlign: 'center',
        }}
        renderInput={(props) => <input {...props} />}
      />
    </div>
  )
}
