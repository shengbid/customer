import type { pageLimitProps } from './base'

// 借款客户查询参数
export interface customerListParamProps extends pageLimitProps {
  fullName?: string
  shortName?: string
}

// 借款客户列表
export interface customerListProps {
  id: string
  fullName: string
  shortName?: string
  code?: string
  createTime?: string
  status: string
}

// 借款客户详情
export interface customerDetailProps {
  userName?: string
  fullName?: string
  shortName?: string
  phoneNumber?: string
  registerAddr?: string
  phoneArea?: string
}

// 合作企业查询参数
export interface cooperateListParamProps extends pageLimitProps {
  fullName?: string
  shortName?: string
  enterpriseType?: string
}

// 合作企业列表
export interface cooperateListProps {
  id: string
  fullName: string
  shortName?: string
  code?: string
  createTime?: string
  enterpriseType: string
}
