import type { pageLimitProps } from './base'

// 库存查询列表
export interface inventorySearchListParamProps extends pageLimitProps {
  warehouseName?: string
  warehouseType?: string
  logistics?: any
  logisticsEnterprise?: string
  logisticsEnterpriseId?: string
}

// 库存查询列表
export interface inventorySearchListProps {
  id: number
  warehouseName?: string
  warehouseType: string
  logisticsEnterprise?: string
  warehouseAddress: string
}
