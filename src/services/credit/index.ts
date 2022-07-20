import { request } from 'umi'

const Url = '/system/credit'
const url = '/system'

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
  return request<{ data: any }>(`${Url}/enterprise/get/details`, {
    method: 'post',
    data,
  })
}
// 修改企业清单
export async function editCompanyFile(data: any) {
  return request<{ data: any }>(`${Url}/edit`, {
    method: 'post',
    data,
  })
}
// 修改企业人员
export async function editCompanyPeople(data: any) {
  return request<{ data: any }>(`${Url}/enterprise/get/details`, {
    method: 'post',
    data,
  })
}
