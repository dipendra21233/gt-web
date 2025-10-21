import React from 'react'
import { Text } from 'theme-ui'

interface BalanceInfoProps {
  availableBalance: number
  creditLimit: number
  due: number
}

const BalanceInfo: React.FC<BalanceInfoProps> = ({
  availableBalance,
  creditLimit,
  due,
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }}
  >
    <Text variant="Maison18Medium125" color="primary_text_dark">
      Available Balance : {availableBalance.toFixed(2)}
    </Text>
    <Text
      variant="Maison18Medium125"
      color="primary_text_dark"
      style={{ margin: '0 4px' }}
    >
      |
    </Text>
    <Text variant="Maison18Medium125" color="primary_text_dark">
      Credit Limit : {creditLimit.toFixed(2)}
    </Text>
    <Text
      variant="Maison18Medium125"
      color="primary_text_dark"
      style={{ margin: '0 4px' }}
    >
      |
    </Text>
    <Text variant="Maison18Medium125" color="primary_text_dark">
      Due : {due.toFixed(2)}
    </Text>
  </div>
)

export default BalanceInfo
