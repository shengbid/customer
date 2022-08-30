import { request } from 'umi'
import type { inventoryDeliveryListProps, inventoryDeliveryListParamProps } from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const url = '/system/outWarehouseManage'

/** 获取出库列表 */
export async function getInventoryDeliveryList(params: inventoryDeliveryListParamProps) {
  return request<{ rows: inventoryDeliveryListProps[]; total: number }>(`${url}/list`, {
    params: paramsToPageParams(params),
  })
}
// 列表详情
export async function getInventoryDeliveryDetail(id: string) {
  return request<{ data: any }>(`${url}/get/details`, {
    params: { id },
  })
}
// 新增编辑删除附件
export async function editDeliveryFile(data: any) {
  return request<{ data: any }>(`/system/outWarehouseAnnex/edit`, {
    method: 'put',
    data,
  })
}
