import type { pageLimitProps } from './base'

// 库存查询查询列表
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
// 库存入库查询列表
export interface inventoryEnterListParamProps extends pageLimitProps {
  warehouseType?: string
  logistics?: any
  logisticsEnterprise?: string
  logisticsEnterpriseId?: string
}

// 库存入库列表
export interface inventoryEnterListProps {
  id: number
  pledgeApplyNumber?: string
  warehouseType: string
  logisticsEnterprise?: string
  warehouseAddress: string
}
// 库存出库查询列表
export interface inventoryDeliveryListParamProps extends pageLimitProps {
  warehouseName?: string
  warehouseType?: string
  logistics?: any
  logisticsEnterprise?: string
  logisticsEnterpriseId?: string
}

// 库存出库列表
export interface inventoryDeliveryListProps {
  id: number
  warehouseName?: string
  warehouseType: string
  logisticsEnterprise?: string
  warehouseAddress: string
}
