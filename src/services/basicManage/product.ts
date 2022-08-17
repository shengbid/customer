import { request } from 'umi'
import type { productListProps, productListParamProps } from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const url = '/system/goodManage'

/** 获取授信列表 */
export async function getProductList(params: productListParamProps) {
  return request<{ rows: productListProps[]; total: number }>(`${url}/list`, {
    params: paramsToPageParams(params),
  })
}

/** 新增 */
export async function addProduct(data: any) {
  return request<{ data: any[] }>(`${url}/add`, {
    method: 'post',
    data,
  })
}
/** 批量新增 */
export async function addMutilProduct(data: any) {
  return request<{ data: any[] }>(`${url}/add/list`, {
    method: 'post',
    data,
  })
}
/** 编辑 */
export async function editProduct(data: any) {
  return request<{ data: any[] }>(`${url}/edit`, {
    method: 'put',
    data,
  })
}
/** 下载模板 */
export async function importProductTemplate() {
  return request<{ data: any[] }>(`${url}/importTemplate`, {
    method: 'post',
  })
}
