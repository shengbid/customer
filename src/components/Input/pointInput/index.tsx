import React from 'react'
import { InputNumber } from 'antd'
import { numToThousandReg, thousandToNumReg } from '@/utils/reg'

interface inputProps {
  max?: number
  addonAfter?: any
  addonBefore?: any
  value?: any
  onChange?: () => void
}

// 小数输入框
const PointInput: React.FC<inputProps> = ({
  value,
  onChange,
  max = 99999.99,
  addonAfter,
  addonBefore,
}) => {
  return (
    <InputNumber
      addonAfter={addonAfter}
      addonBefore={addonBefore}
      onChange={onChange}
      value={value}
      max={max}
      maxLength={9}
      min={0}
      formatter={(vals: any) => numToThousandReg(vals)}
      parser={(vals: any) => thousandToNumReg(vals)}
      style={{ width: '100%' }}
    />
  )
}

export default PointInput
