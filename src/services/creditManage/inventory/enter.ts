import { request } from 'umi'
import type { inventorySearchListProps, inventorySearchListParamProps } from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const url = '/system/stockGood'

/** 获取入库列表 */
export async function getInventoryEnterList(params: inventorySearchListParamProps) {
  return request<{ rows: inventorySearchListProps[]; total: number }>(`${url}/list`, {
    params: paramsToPageParams(params),
  })
}
