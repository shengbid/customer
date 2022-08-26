import { request } from 'umi'

const url = '/system/goodRule'

/** 获取质押规则 */
export async function getRiskRuleList(params?: any) {
  return request<{ data: any }>(`${url}/list`, {
    params,
  })
}

/** 修改质押规则 */
export async function editRiskRuleList(data: any) {
  return request<{ data: any }>(`${url}/edit`, {
    method: 'put',
    data,
  })
}
