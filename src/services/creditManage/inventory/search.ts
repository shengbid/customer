import { request } from 'umi'
import type { inventorySearchListProps, inventorySearchListParamProps } from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const url = '/system/stockGood'

/** 获取库存查询列表 */
export async function getInventorySearchList(params: inventorySearchListParamProps) {
  return request<{ rows: inventorySearchListProps[]; total: number }>(`${url}/list`, {
    params: paramsToPageParams(params),
  })
}
