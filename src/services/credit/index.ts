import { request } from 'umi'

const Url = '/system/credit'
const url = '/system/credit'

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
