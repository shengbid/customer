import { request } from 'umi'
import type {
  cooperateListParamProps,
  cooperateListProps,
  customerDetailProps,
} from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const url = '/cus/HzEnterprise'

/** 获取合作企业列表 */
export async function getCooperateCustomerList(params: cooperateListParamProps) {
  return request<{ rows: cooperateListProps[]; total: number }>(`${url}/list`, {
    params: paramsToPageParams(params),
  })
}

/** 新增 */
export async function addCooperateCustomer(data: customerDetailProps) {
  return request<{ data: any[] }>(`${url}/add`, {
    method: 'post',
    data,
  })
}

/** 删除 */
export async function deleteCooperateCustomer(id: number | string) {
  return request(`${url}/remove`, {
    method: 'delete',
    params: { id },
  })
}

/** 获取企业基础信息 */
export async function getCooperateBasic(id: number | string) {
  return request(`${url}/getDetails`, {
    params: { id },
  })
}
/** 获取企业法人信息 */
export async function getCooperateLegal(id: number | string) {
  return request(`${url}/getXgryDetails`, {
    params: { id },
  })
}
/** 获取企业签约人信息 */
export async function getCooperateSigner(id: number | string) {
  return request(`${url}/getJbrDetails`, {
    params: { id },
  })
}

/** 修改企业基础信息 */
export async function editCooperateBasic(data: any) {
  return request(`${url}/BasicEdit`, {
    method: 'put',
    data,
  })
}
/** 修改法人信息 */
export async function editCooperateLegal(data: any) {
  return request(`${url}/xgryEdit`, {
    method: 'put',
    data,
  })
}
/** 修改企业签约人信息 */
export async function editCooperateSigner(data: any) {
  return request(`${url}/jbrEdit`, {
    method: 'put',
    data,
  })
}
