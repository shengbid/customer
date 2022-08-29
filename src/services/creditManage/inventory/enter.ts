import { request } from 'umi'
import type { inventoryEnterListProps, inventoryEnterListParamProps } from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const url = '/system/intoWarehouseManage'

/** 获取入库列表 */
export async function getInventoryEnterList(params: inventoryEnterListParamProps) {
  return request<{ rows: inventoryEnterListProps[]; total: number }>(`${url}/list`, {
    params: paramsToPageParams(params),
  })
}

// 列表详情
export async function getInventoryEnterDetail(id: string) {
  return request<{ data: any }>(`${url}/get/details`, {
    params: { id },
  })
}
// 质押详情
export async function pledgeDetail(id: string) {
  return request<{ data: any }>(`${url}/get/pledgeInfo`, {
    params: { id },
  })
}

// 转在仓
export async function turnToWareHouse(data: any) {
  return request<{ data: any }>(`${url}/update/turnIn`, {
    method: 'post',
    data,
  })
}
// 转在途
export async function turnToWay(data: any) {
  return request<{ data: any }>(`${url}/update/turnOn`, {
    method: 'post',
    data,
  })
}
// 入库质押
export async function turnToPledge(data: any) {
  return request<{ data: any }>(`${url}/pledge`, {
    method: 'post',
    data,
  })
}
// 新增编辑删除理货报告
export async function editCargoFile(data: any) {
  return request<{ data: any }>(`/system/stockAnnex/edit`, {
    method: 'put',
    data,
  })
}
