import Alert from '@/../public/svg/Alert.svg';
import Image from 'next/image';
import { CSSProperties } from 'react';
import { Text } from 'theme-ui';

interface ErrorTextProps {
  iconClassName?: string;
  className?: string;
  textClassName?: string;
  manualErrorSX?: CSSProperties;
  errors?:
  | string
  | string[]
  | boolean
  | { message?: string; type?: string } // React Hook Form error type
  | undefined;
}

export const ErrorText = ({
  iconClassName,
  manualErrorSX,
  errors,
  className,
  textClassName,
}: ErrorTextProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src={Alert}
        alt="icon"
        width={18}
        height={18}
        className={`${iconClassName}`}
      />
      <Text
        className={`text-primary-red ${textClassName}`}
        variant='Maison16Regular20'
        style={{ color: '#ff0000', ...manualErrorSX }}
      >
        {errors?.toString()}
      </Text>
    </div>
  );
};
