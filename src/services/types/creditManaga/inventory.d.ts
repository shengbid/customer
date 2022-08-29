import type { pageLimitProps } from './base'

// 库存查询查询列表
export interface inventorySearchListParamProps extends pageLimitProps {
  enterpriseName?: string
  financOrder?: any
  pledgeType?: string
  stockType?: string
}

// 库存查询列表
export interface inventorySearchListProps {
  id: number
  pledgeApplyNumber?: string
  enterpriseName?: string
  financOrder: string
  warehouseName?: string
  pledgeType: string
  stockType: string
  warehouseTotal: string
  goodValuation: string
  auditStatus: string
  inWarehouseStatus: string
  imperfectCount: string
}
// 库存入库查询列表
export interface inventoryEnterListParamProps extends pageLimitProps {
  enterpriseName?: string
  financOrder?: any
  pledgeType?: string
  stockType?: string
}

// 库存入库列表
export interface inventoryEnterListProps {
  id: number
  pledgeApplyNumber?: string
  enterpriseName?: string
  financOrder: string
  warehouseName?: string
  pledgeType: string
  stockType: string
  warehouseTotal: string
  goodValuation: string
  auditStatus: string
  inWarehouseStatus: string
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
