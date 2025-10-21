// components/shared/AirportInfo/AirportInfo.tsx
import { MainStoreType } from '@/types/store/reducers/main.reducers';
import { useSelector } from 'react-redux';
import { Text } from 'theme-ui';

interface AirportInfoProps {
  code: string;
  className?: string;
}

export const AirportInfo = ({ code, className = '' }: AirportInfoProps) => {
  const { airports } = useSelector((state: MainStoreType) => state.filterFlightData);
  const airport = airports?.find(a => a.iata_code === code);

  return (
    <Text variant="Maison14Regular20" color="grey1" className={className}>
      {airport?.name || code}
    </Text>
  );
};
