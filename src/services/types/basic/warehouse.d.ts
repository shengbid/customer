import type { pageLimitProps } from './base'

// 仓库管理列表
export interface warehouseListParamProps extends pageLimitProps {
  warehouseName?: string
  warehouseType?: string
  logistics?: any
  logisticsEnterprise?: string
  logisticsEnterpriseId?: string
}

// 仓库管理列表
export interface warehouseListProps {
  id: number
  warehouseName?: string
  warehouseType: string
  logisticsEnterprise?: string
  warehouseAddress: string
}
