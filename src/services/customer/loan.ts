import { request } from 'umi'
import type {
  customerListParamProps,
  customerListProps,
  customerDetailProps,
} from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const url = '/system/cus'

/** 获取借款客户列表 */
export async function getLoanCustomerList(params: customerListParamProps) {
  return request<{ rows: customerListProps[]; total: number }>(`${url}/list`, {
    params: paramsToPageParams(params),
  })
}

/** 新增编辑 */
export async function addLoanCustomer(data: customerDetailProps) {
  return request<{ data: any[] }>(`${url}/add`, {
    method: 'post',
    data,
  })
}

/** 删除 */
export async function deleteLoanCustomer(id: number | string) {
  return request(`${url}/remove`, {
    method: 'delete',
    params: { id },
  })
}

/** 获取客户合同列表 */
export async function getLoanCustomerContractList(params: any) {
  return request(`/cus/credit/HtxxList`, {
    params,
  })
}

/** 获取签约人信息 */
export async function getLoanSigner(id: number | string) {
  return request(`/cus/enterprise/getJbrDetails`, {
    params: { id },
  })
}

/** 修改签约人信息 */
export async function editLoanSigner(data: any) {
  return request(`/cus/enterprise/jbrEdit`, {
    method: 'put',
    data,
  })
}
