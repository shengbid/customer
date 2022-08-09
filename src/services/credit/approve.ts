import { request } from 'umi'

const url = '/cus'

// 获取关联企业列表
export async function getRelateCompany(associatedEnterpriseId: number) {
  return request<{ rows: any }>(`${url}/assoEnterprise/list`, {
    params: { associatedEnterpriseId },
  })
}

// 修改关联企业
export async function editRelateCompany(associatedEnterpriseId: any, data: any) {
  return request<{ data: any }>(`${url}/assoEnterprise/editlist/${associatedEnterpriseId}`, {
    method: 'put',
    data,
  })
}

// 获取关联股东列表
export async function getRelateShareholder(associatedEnterpriseId: number) {
  return request<{ rows: any }>(`${url}/shareholder/list`, {
    params: { associatedEnterpriseId },
  })
}

// 修改关联股东
export async function editRelateShareholder(associatedEnterpriseId: any, data: any) {
  return request<{ data: any }>(`${url}/shareholder/editlist/${associatedEnterpriseId}`, {
    method: 'put',
    data,
  })
}

// 获取授信审批记录
export async function getCreditHistory(enterpriseId: string, cusEnterpriseCredit: string) {
  return request<{ rows: any }>(`${url}/credit/shjlList`, {
    params: { enterpriseId, cusEnterpriseCredit },
  })
}
