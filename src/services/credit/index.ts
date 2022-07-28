import { request } from 'umi'
import type { creditListProps, creditListParamProps } from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const Url = '/system/credit'
const url = '/system'

/** 获取授信列表 */
export async function getCeditList(params: creditListParamProps) {
  return request<{ rows: creditListProps[]; total: number }>(`${Url}/list`, {
    params: paramsToPageParams(params),
  })
}
/** 修改授信额度状态 */
export async function editCeditQutoStatus(params: { id: number; quotaStatus: string }) {
  return request(`${Url}/edit/quota`, {
    params,
  })
}

// 获取授信详情
export async function getCreditDetail(taskNumber: string) {
  return request<{ data: any }>(`${Url}/get/task/details`, {
    params: { taskNumber },
  })
}

// 获取企业详情
export async function getCompanyDetail(id: number) {
  return request<{ data: any }>(`${url}/enterprise/get/details`, {
    params: { id },
  })
}

// 修改企业
export async function editCompany(data: any) {
  return request<{ data: any }>(`${url}/enterprise/save`, {
    method: 'post',
    data,
  })
}

// 修改企业业务信息
export async function editCompanyBus(data: any) {
  return request<{ data: any }>(`${Url}/edit/enterprise`, {
    method: 'post',
    data,
  })
}
// 修改企业清单
export async function editCompanyFile(data: any) {
  return request<{ data: any }>(`${Url}/edit/operate`, {
    method: 'post',
    data,
  })
}
// 修改企业人员
export async function editCompanyPeople(data: any) {
  return request<{ data: any }>(`${Url}/edit/person`, {
    method: 'post',
    data,
  })
}
