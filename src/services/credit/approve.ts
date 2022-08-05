import { request } from 'umi'

const url = '/cus'

// 获取关联企业列表
export async function getRelateCompany(associatedEnterpriseId: number) {
  return request<{ rows: any }>(`${url}/assoEnterprise/list`, {
    params: { associatedEnterpriseId },
  })
}

// 修改关联企业
export async function editRelateCompany(data: any) {
  return request<{ data: any }>(`${url}/assoEnterprise/edit`, {
    method: 'put',
    data,
  })
}
