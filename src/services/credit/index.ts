import { request } from 'umi'

const Url = '/system/credit'

// 获取详情
export async function getCreditDetail() {
  return request<{ data: any }>(`${Url}/get/details`)
}
