import type { pageLimitProps } from './base'

// 授信查询参数
export interface creditListParamProps extends pageLimitProps {
  fullName?: string
  shortName?: string
}

// 企业经营情况
export interface companyBusinessProps {
  year?: string | number
  businessVolume?: string
  businessVolume2?: string
}
