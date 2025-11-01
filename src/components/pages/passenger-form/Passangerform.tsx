import DateInputField from "@/components/shared/TextInputField/DateInputField";
import { TextInputField } from "@/components/shared/TextInputField/TextInputField";
import { SelectInputField } from "@/components/web/core/SelectInputField/SelectInputField";
import { validMobileNumberRegex } from "@/utils/regexMatch";
import dayjs from "dayjs";
import { memo } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Box, Divider, Text } from "theme-ui";

import { useIsMobile } from "@/hooks/use-mobile";

const modernCardStyle = {
  background: "#fff",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  padding: "0",
  marginBottom: "1.5rem",
  border: "1px solid #e5e7eb",
  transition: "all 0.3s ease",
  overflow: "hidden",
  "&:hover": {
    boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
    transform: "translateY(-2px)"
  }
};

const modernHeaderStyle = {
  background: "linear-gradient(135deg, #ff7b00 0%, #ff9500 100%)",
  padding: "1rem 1.5rem",
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  position: "relative" as const,
  "&::before": {
    content: '""',
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
    pointerEvents: "none" as const
  }
};

const modernSectionTitle = {
  color: "orange_accent_alpha",
  textShadow: "0 1px 2px rgba(0,0,0,0.1)"
};

const modernContentStyle = {
  padding: "1.5rem"
};

const PassangerformComponent = ({
  control,
  errors,
  adultCount = 0,
  childCount = 0,
  infantCount = 0,
}: {
  control: Control<any>;
  errors: FieldErrors<any>;
  adultCount?: number;
  childCount?: number;
  infantCount?: number;
}) => {
  const isMobile = useIsMobile();

  const titleOptions = [
    { value: '', label: 'Select Title' },
    { value: 'Mr', label: 'Mr' },
    { value: 'Mrs', label: 'Mrs' },
    { value: 'Ms', label: 'Ms' }
  ];

  const childrenTitleOptions = [
    { value: '', label: 'Select Title' },
    { value: 'Master', label: 'Master' },
    { value: 'Miss', label: 'Miss' },
    { value: 'Ms', label: 'Ms' }
  ];

  return (
    <Box as="div" sx={{ width: "100%" }}>
      {/* Adults */}
      {Array.from({ length: adultCount }).map((_, index) => (
        <Box as="div" key={`adult-${index}`} sx={{
          ...modernCardStyle,
          marginBottom: isMobile ? "1rem" : "1.5rem",
          borderRadius: isMobile ? "12px" : "16px",
        }}>
          <Box as="div" sx={{ padding: isMobile ? "10px 16px" : "12px 20px" }}>
            <Text mt={isMobile ? 1 : 2} variant="Maison18Demi125" color="orange_accent_alpha" sx={{ fontSize: isMobile ? "16px" : undefined }}>Adult Passenger {index + 1}</Text>
          </Box>
          <Divider color="#c5c5c591" />
          <Box as="div" sx={{ padding: isMobile ? "1rem" : "1.5rem" }}>

            <Box as="div" className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-3 gap-4'}`}>
              <Controller
                name={`adults.${index}.title`}
                control={control}
                render={({ field }) => (
                  <SelectInputField
                    firstInputBox
                    label="Title"
                    value={field.value ? { value: field.value, label: field.value } : ''}
                    options={titleOptions}
                    placeholder="Select Title"
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption?.value || '')
                      // Clear field error on change when value is selected
                      try {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        if ((control as any)?.clearErrors) {
                          (control as any).clearErrors(`adults.${index}.title`)
                        }
                      } catch {
                        // no-op
                      }
                    }}
                    errors={(errors.adults as any)?.[index]?.title?.message || ''}
                    wrapperSx={{ mb: 0 }}
                  />
                )}
              />
              <Controller
                name={`adults.${index}.firstName`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    label="First Name"
                    placeholder="First Name"
                    value={field.value || ''}
                    onChange={field.onChange}
                    errors={(errors.adults as any)?.[index]?.firstName?.message || ''}
                    wrapperSx={{ mb: 0 }}
                  />
                )}
              />
              <Controller
                name={`adults.${index}.lastName`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    label="Last Name"
                    placeholder="Last Name"
                    value={field.value || ''}
                    onChange={field.onChange}
                    errors={(errors.adults as any)?.[index]?.lastName?.message || ''}
                    wrapperSx={{ mb: 0 }}
                  />
                )}
              />
              <Controller
                name={`adults.${index}.frequentFlierNumber`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    label="Frequent Flier Number"
                    placeholder="Frequent Flier Number"
                    value={field.value || ''}
                    onChange={field.onChange}
                    errors={(errors.adults as any)?.[index]?.frequentFlierNumber?.message || ''}
                    wrapperSx={{ mb: 0 }}
                  />
                )}
              />
              <Controller
                name={`adults.${index}.email`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    label="Email"
                    placeholder="Email"
                    type="email"
                    value={field.value || ''}
                    onChange={field.onChange}
                    errors={(errors.adults as any)?.[index]?.email?.message || ''}
                    wrapperSx={{ mb: 0 }}
                  />
                )}
              />
              <Controller
                name={`adults.${index}.mobile`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    label="Mobile"
                    placeholder="Mobile"
                    type="tel"
                    value={field.value || ''}
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
                      field.onChange(cleaned);
                      // Clear field error on change when value becomes valid length
                      try {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        if ((control as any)?.clearErrors) {
                          (control as any).clearErrors(`adults.${index}.mobile`)
                        }
                      } catch {
                        // no-op
                      }
                    }}
                    errors={(errors.adults as any)?.[index]?.mobile?.message || ''}
                    wrapperSx={{ mb: 0 }}

                  />
                )}
              />
              <Controller
                name={`adults.${index}.dateOfBirth`}
                control={control}
                render={({ field }) => (
                  <DateInputField
                    label="Date of Birth"
                    placeholder="Date of Birth"
                    value={field.value || ''}
                    onChange={(value) => {
                      field.onChange(value)
                      // Clear field error on change when value is selected
                      try {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        if ((control as any)?.clearErrors) {
                          (control as any).clearErrors(`adults.${index}.dateOfBirth`)
                        }
                      } catch {
                        // no-op
                      }
                    }}
                    errors={(errors.adults as any)?.[index]?.dateOfBirth?.message || ''}
                    wrapperSx={{ mb: 0 }}
                    disabledDate={(date) => {
                      // Disable dates that would make the person under 18 years old
                      const today = dayjs()
                      const eighteenYearsAgo = today.subtract(18, 'year')
                      // Disable dates after 18 years ago (i.e., dates that are too recent)
                      return date.isAfter(eighteenYearsAgo, 'day')
                    }}
                  />
                )}
              />
            </Box>
          </Box>
        </Box>
      ))}

      {/* Children */}
      {Array.from({ length: childCount }).map((_, index) => (
        <Box as="div" key={`child-${index}`} sx={{
          ...modernCardStyle,
          marginBottom: isMobile ? "1rem" : "1.5rem",
          borderRadius: isMobile ? "12px" : "16px",
        }}>
          <Box as="div" sx={{
            ...modernHeaderStyle,
            padding: isMobile ? "0.75rem 1rem" : "1rem 1.5rem",
          }}>
            <Box
              as="div"
              sx={{
                width: isMobile ? "32px" : "40px",
                height: isMobile ? "32px" : "40px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "0.9rem" : "1.1rem",
                fontWeight: 700,
                color: "#ffffff",
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                border: "2px solid rgba(255, 255, 255, 0.3)"
              }}
            >
              👶
            </Box>
            <Box as="div" sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Text sx={{
                ...modernSectionTitle,
                fontSize: isMobile ? "16px" : undefined,
              }}>Child Passenger {index + 1}</Text>
              <Text sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem", color: "rgba(255, 255, 255, 0.9)", fontWeight: 400 }}>
                Child traveler information (2-11 years)
              </Text>
            </Box>
          </Box>
          <Box as="div" sx={{ padding: isMobile ? "1rem" : "1.5rem" }}>
            <Box as="div" className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-3 gap-4'}`}>
              <Controller
                name={`children.${index}.title`}
                control={control}
                render={({ field }) => (
                  <SelectInputField
                    firstInputBox
                    label="Title"
                    value={field.value ? { value: field.value, label: field.value } : ''}
                    options={childrenTitleOptions}
                    placeholder="Select Title"
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption?.value || '')
                      // Clear field error on change when value is selected
                      try {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        if ((control as any)?.clearErrors) {
                          (control as any).clearErrors(`children.${index}.title`)
                        }
                      } catch {
                        // no-op
                      }
                    }}
                    errors={(errors.children as any)?.[index]?.title?.message || ''}
                    wrapperSx={{ mb: 0 }}
                  />
                )}
              />
              <Controller
                name={`children.${index}.firstName`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    label="First Name"
                    placeholder="First Name"
                    value={field.value || ''}
                    onChange={field.onChange}
                    errors={(errors.children as any)?.[index]?.firstName?.message || ''}
                    wrapperSx={{ mb: 0 }}
                  />
                )}
              />
              <Controller
                name={`children.${index}.lastName`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    label="Last Name"
                    placeholder="Last Name"
                    value={field.value || ''}
                    onChange={field.onChange}
                    errors={(errors.children as any)?.[index]?.lastName?.message || ''}
                    wrapperSx={{ mb: 0 }}
                  />
                )}
              />
              <Controller
                name={`children.${index}.frequentFlierNumber`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    label="Frequent Flier Number"
                    placeholder="Frequent Flier Number"
                    value={field.value || ''}
                    onChange={field.onChange}
                    errors={(errors.children as any)?.[index]?.frequentFlierNumber?.message || ''}
                    wrapperSx={{ mb: 0 }}
                  />
                )}
              />
              <Controller
                name={`children.${index}.email`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    label="Email"
                    placeholder="Email"
                    type="email"
                    value={field.value || ''}
                    onChange={field.onChange}
                    errors={(errors.children as any)?.[index]?.email?.message || ''}
                    wrapperSx={{ mb: 0 }}
                  />
                )}
              />
              <Controller
                name={`children.${index}.mobile`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    label="Mobile"
                    placeholder="Mobile"
                    type="tel"
                    value={field.value || ''}
                    onChange={field.onChange}
                    errors={(errors.children as any)?.[index]?.mobile?.message || ''}
                    wrapperSx={{ mb: 0 }}
                  />
                )}
              />
              <Controller
                name={`children.${index}.dateOfBirth`}
                control={control}
                render={({ field }) => (
                  <DateInputField
                    label="Date of Birth"
                    placeholder="Date of Birth"
                    value={field.value || ''}
                    onChange={(value) => {
                      field.onChange(value)
                      // Clear field error on change when value is selected
                      try {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        if ((control as any)?.clearErrors) {
                          (control as any).clearErrors(`children.${index}.dateOfBirth`)
                        }
                      } catch {
                        // no-op
                      }
                    }}
                    errors={(errors.children as any)?.[index]?.dateOfBirth?.message || ''}
                    wrapperSx={{ mb: 0 }}
                  />
                )}
              />
            </Box>
          </Box>
        </Box>
      ))}

      {/* Infants */}
      {Array.from({ length: infantCount }).map((_, index) => (
        <Box as="div" key={`infant-${index}`} sx={{
          ...modernCardStyle,
          marginBottom: isMobile ? "1rem" : "1.5rem",
          borderRadius: isMobile ? "12px" : "16px",
        }}>
          <Box as="div" sx={{
            ...modernHeaderStyle,
            padding: isMobile ? "0.75rem 1rem" : "1rem 1.5rem",
          }}>
            <Box
              as="div"
              sx={{
                width: isMobile ? "32px" : "40px",
                height: isMobile ? "32px" : "40px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "0.9rem" : "1.1rem",
                fontWeight: 700,
                color: "#ffffff",
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                border: "2px solid rgba(255, 255, 255, 0.3)"
              }}
            >
              🍼
            </Box>
            <Box as="div" sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Text sx={{
                ...modernSectionTitle,
                fontSize: isMobile ? "16px" : undefined,
              }}>Infant Passenger {index + 1}</Text>
              <Text sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem", color: "rgba(255, 255, 255, 0.9)", fontWeight: 400 }}>
                Infant traveler information (under 2 years)
              </Text>
            </Box>
          </Box>
          <Box as="div" sx={{ padding: isMobile ? "1rem" : "1.5rem" }}>
            <Box as="div" className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-3 gap-4'}`}>
              <Controller
                name={`infants.${index}.title`}
                control={control}
                render={({ field }) => (
                  <SelectInputField
                    firstInputBox
                    label="Title"
                    value={field.value ? { value: field.value, label: field.value } : ''}
                    options={childrenTitleOptions}
                    placeholder="Select Title"
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption?.value || '')
                      // Clear field error on change when value is selected
                      try {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        if ((control as any)?.clearErrors) {
                          (control as any).clearErrors(`infants.${index}.title`)
                        }
                      } catch {
                        // no-op
                      }
                    }}
                    errors={(errors.infants as any)?.[index]?.title?.message || ''}
                    wrapperSx={{ mb: 0 }}
                  />
                )}
              />
              <Controller
                name={`infants.${index}.firstName`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    label="First Name"
                    placeholder="First Name"
                    value={field.value || ''}
                    onChange={field.onChange}
                    errors={(errors.infants as any)?.[index]?.firstName?.message || ''}
                    wrapperSx={{ mb: 0 }}
                  />
                )}
              />
              <Controller
                name={`infants.${index}.lastName`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    label="Last Name"
                    placeholder="Last Name"
                    value={field.value || ''}
                    onChange={field.onChange}
                    errors={(errors.infants as any)?.[index]?.lastName?.message || ''}
                    wrapperSx={{ mb: 0 }}
                  />
                )}
              />
              <Controller
                name={`infants.${index}.frequentFlierNumber`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    label="Frequent Flier Number"
                    placeholder="Frequent Flier Number"
                    value={field.value || ''}
                    onChange={field.onChange}
                    errors={(errors.infants as any)?.[index]?.frequentFlierNumber?.message || ''}
                    wrapperSx={{ mb: 0 }}
                  />
                )}
              />
              <Controller
                name={`infants.${index}.email`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    label="Email"
                    placeholder="Email"
                    type="email"
                    value={field.value || ''}
                    onChange={field.onChange}
                    errors={(errors.infants as any)?.[index]?.email?.message || ''}
                    wrapperSx={{ mb: 0 }}
                  />
                )}
              />
              <Controller
                name={`infants.${index}.mobile`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    label="Mobile"
                    placeholder="Mobile"
                    type="tel"
                    value={field.value || ''}
                    onChange={field.onChange}
                    errors={(errors.infants as any)?.[index]?.mobile?.message || ''}
                    wrapperSx={{ mb: 0 }}
                  />
                )}
              />
              <Controller
                name={`infants.${index}.dateOfBirth`}
                control={control}
                render={({ field }) => (
                  <DateInputField
                    label="Date of Birth"
                    placeholder="Date of Birth"
                    value={field.value || ''}
                    onChange={(value) => {
                      field.onChange(value)
                      // Clear field error on change when value is selected
                      try {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        if ((control as any)?.clearErrors) {
                          (control as any).clearErrors(`infants.${index}.dateOfBirth`)
                        }
                      } catch {
                        // no-op
                      }
                    }}
                    errors={(errors.infants as any)?.[index]?.dateOfBirth?.message || ''}
                    wrapperSx={{ mb: 0 }}
                  />
                )}
              />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

// Memoize to prevent unnecessary re-renders
export const Passangerform = memo(PassangerformComponent);
