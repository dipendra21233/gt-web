import { translation } from '@/utils/translation'
import { Text } from 'theme-ui'

type ResendOtpProp = {
  isResendOtp: boolean
  handleResendOtp: () => void
  countdown: number
}
export default function ResendOtp({
  handleResendOtp,
  isResendOtp,
  countdown,
}: ResendOtpProp) {
  return (
    <Text variant="Maison16Regular20" color="grey_dark">
      {translation?.DIDNT_RECEIVE_CODE}
      <Text
        onClick={(e) => {
          if (isResendOtp) return
          e.preventDefault()
          e.stopPropagation()
          handleResendOtp()
        }}
        variant="Maison16Medium20"
        m={1}
        color={isResendOtp ? 'grey_dark' : 'orange_500'}
        className={`underline ${isResendOtp ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {translation?.RESEND_NOW}
      </Text>
      {/* </Button> */}
      00:{countdown < 10 ? `0${countdown}` : countdown}
    </Text>
  )
}
