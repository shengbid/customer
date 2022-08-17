import { request } from 'umi'
import type { warehouseListProps, warehouseListParamProps } from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const url = '/system/warehouseManage'

/** 获取授信列表 */
export async function getWarehouseList(params: warehouseListParamProps) {
  return request<{ rows: warehouseListProps[]; total: number }>(`${url}/list`, {
    params: paramsToPageParams(params),
  })
}
/** 获取物流企业列表 */
export async function getWareCompanyList() {
  return request<{ data: any[] }>(`${url}/get/byType`, {
    params: { enterpriseType: 'bonded' },
  })
}

/** 新增 */
export async function addWarehouse(data: any) {
  return request<{ data: any[] }>(`${url}/add`, {
    method: 'post',
    data,
  })
}
/** 编辑 */
export async function editWarehouse(data: any) {
  return request<{ data: any[] }>(`${url}/edit`, {
    method: 'post',
    data,
  })
}
// 详情
export async function warehouseDetail(id: string) {
  return request<{ data: any }>(`${url}/get/details`, {
    params: { id },
  })
}

/** 删除 */
export async function deleteWarehouse(id: number | string) {
  return request(`${url}/remove`, {
    method: 'delete',
    params: { id },
  })
}
