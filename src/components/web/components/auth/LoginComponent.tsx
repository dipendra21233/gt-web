'use client'
import flightBook from '@/../public/images/flight-booking-illustration.png'
import VerifyOtpModal from '@/components/shared/PopupModals/VerifyOtpModal'
import MobileEmailTab from '@/components/shared/Tabs/MobileEmailTab'
import { TextInputField } from '@/components/shared/TextInputField/TextInputField'
import { TabType, useLoginForm } from '@/hooks/useLoginForm'
import { validMobileNumberRegex } from '@/utils/regexMatch'
import { appRoutes } from '@/utils/routes'
import { translation } from '@/utils/translation'
import Image from 'next/image'
import { Box, Link, Text } from 'theme-ui'
import { ThemeButton } from '../../core/Button/Button'
import { TermsCheckbox } from '../../core/CheckBox/TermsCheckbox'

export const LoginComponent = () => {
  const {
    getFieldState,
    updateFormField,
    onSubmit,
    values,
    formState,
    methods,
    isPending,
    isForgotPasswordPending,
  } = useLoginForm()
  console.log('check25 values', formState?.errors);

  return (
    <Box
      as="div"
      className="min-h-screen services-section flex items-center justify-center py-6 px-4 sm:py-8 sm:px-6 lg:py-16 lg:px-8"
    >
      <Box
        as="div"
        className="w-full max-w-6xl bg-white shadow-2xl rounded-2xl overflow-hidden relative z-10 grid grid-cols-1 lg:grid-cols-2 mx-2 sm:mx-4 lg:mx-0"
        sx={{
          boxShadow: '0 25px 50px -12px rgba(252, 121, 13, 0.25), 0 0 0 1px rgba(255, 123, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          minHeight: ['auto', 'auto', '550px', '600px'],
          maxHeight: ['none', 'none', '550px', '600px'],
        }}
      >
        {/* Image section - hidden on mobile and tablet */}
        <Box
          as="div"
          className="hidden lg:block relative overflow-hidden lg:h-[600px]"
          sx={{
            background: 'linear-gradient(135deg, #ffbe9d 0%, #fc790d66 50%, #ffbe9d 100%)',
            borderTopLeftRadius: '16px',
            borderBottomLeftRadius: '16px',
            minHeight: ['0', '0', '0', '600px'],
            maxHeight: ['0', '0', '0', '600px'],
          }}
        >
          <Image
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
            }}
            src={flightBook}
            alt="flightBook"
            priority
            id="flightBook"
          />
        </Box>
        
        {/* Form section */}
        <Box
          as="div"
          className={`p-4 sm:p-6 lg:p-[30px] position-relative overflow-y-auto`}
          sx={{
            background: 'linear-gradient(180deg, #ffffff 0%, #fefefe 100%)',
            minHeight: ['auto', 'auto', '550px', '600px'],
            maxHeight: ['none', 'none', '550px', '600px'],
            borderRadius: ['16px', '16px', '16px', '0 16px 16px 0'],
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '2px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#ff7b00',
              borderRadius: '2px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#e66a00',
            },
          }}
        >
          <MobileEmailTab activeTab={values?.activeTab as TabType} onTabChange={(tab) => updateFormField('activeTab', tab)} />

          <div className='flex flex-col gap-3 sm:gap-4'>
            {values?.activeTab === 'email' ? (
              <TextInputField
                label='Email'
                name="email"
                isShowRequired
                placeholder='Enter your email'
                value={values?.email}
                onChange={(value) => updateFormField('email', value)}
                errors={formState?.errors?.email?.message}
                touched={getFieldState('email')?.isTouched}
                onBlur={() => methods.setValue('email', values?.email, {
                  shouldTouch: true,
                  shouldValidate: true,
                  shouldDirty: true,
                })}
              />
            ) : (
              <TextInputField
                label='Mobile'
                name="mobileNumber"
                isShowRequired
                placeholder='Enter your mobile number'
                value={values?.mobileNumber}
                onChange={(value) => {
                  let cleaned = String(value).replace(validMobileNumberRegex, '');
                  if (cleaned.length > 0) {
                    if (!/^[6-9]/.test(cleaned)) {
                      cleaned = cleaned.slice(1);
                    }
                    if (cleaned.length > 10) {
                      cleaned = cleaned.slice(0, 10);
                    }
                  }
                  updateFormField('mobileNumber', cleaned);
                }}
                errors={formState?.errors?.mobileNumber?.message}
                touched={getFieldState('mobileNumber')?.isTouched}
                onBlur={() => methods.setValue('mobileNumber', values?.mobileNumber, {
                  shouldTouch: true,
                  shouldValidate: true,
                  shouldDirty: true,
                })}
              />
            )}
            {!values?.isForgotPassword && (
              <>
                <TextInputField
                  label='Password'
                  name="password"
                  isShowRequired
                  isEyeShow
                  type="password"
                  placeholder='Enter your password'
                  value={values?.password}
                  onChange={(value) => updateFormField('password', value)}
                  errors={formState?.errors?.password?.message}
                  touched={getFieldState('password')?.isTouched}
                  onBlur={() => methods.setValue('password', values?.password, {
                    shouldTouch: true,
                    shouldValidate: true,
                    shouldDirty: true,
                  })}
                />
                <Text
                  onClick={() => updateFormField('isForgotPassword', true)}
                  variant='Maison16Demi20'
                  color='orange_accent_alpha'
                  className="text-right my-2 whitespace-nowrap flex justify-end cursor-pointer hover:underline transition-all duration-200"
                  sx={{
                    '&:hover': {
                      color: '#e66a00',
                    }
                  }}
                >
                  {translation?.FORGOT_PASSWORD}
                </Text>
              </>
            )}

            <TermsCheckbox
              checked={values?.consentAccepted || false}
              onChange={(value) => updateFormField('consentAccepted', value.toString())}
            />
          </div>

          <Box my='16px' className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2 sm:gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#3B82F6" className="mt-0.5 flex-shrink-0">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
              <Text
                variant="Maison12Regular20"
                sx={{
                  color: '#1E40AF',
                  fontSize: ['11px', '11px', '12px', '12px'],
                  lineHeight: '1.4',
                }}
              >
                Your login is secured with industry-standard encryption. We never share your personal information.
              </Text>
            </div>
          </Box>

          <Box mt='20px' className="px-1">
            <ThemeButton
              text={translation?.LOGIN}
              className="w-full py-3 sm:py-4 text-sm sm:text-base font-medium"
              disabled={!values?.consentAccepted || false}
              onClick={onSubmit}
              isLoading={isPending || isForgotPasswordPending}
              sx={{
                fontSize: ['14px', '14px', '16px', '16px'],
                fontWeight: '600',
                padding: ['12px 16px', '12px 16px', '14px 20px', '14px 20px'],
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(255, 123, 0, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(255, 123, 0, 0.4)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            />
          </Box>
          <Box as="div" className="text-center pt-4 sm:pt-6 border-t border-gray-100">
            <Text
              variant="Maison16Regular20"
              sx={{
                color: '#666',
                marginBottom: '12px',
                fontSize: ['14px', '14px', '16px', '16px'],
                '& a': {
                  color: '#ff7b00',
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: '#e66a00',
                    textDecoration: 'underline',
                  }
                }
              }}
            >
              {translation?.NO_HAVE_ACCOUNT}{' '}
              <Link
                href={appRoutes?.userRegistration}
                className="whitespace-nowrap"
              >
                {translation?.CREATE_AN_ACCOUNT}
              </Link>
            </Text>
          </Box>
          <VerifyOtpModal isOpen={values?.isShowOtp as boolean} onClose={() => updateFormField('isShowOtp', false)} wrapperClass='w-full' values={values} />
        </Box>
      </Box>
    </Box >
  )
}
