import { request } from 'umi'
import type { cooperateListProps } from '@/services/types'
// import { paramsToPageParams } from '@/utils/base'

// const url = '/system/cus'

/** 获取借款企业合作物流,合作仓储列表 */
export async function getLoanCooperateSignList(params: any) {
  return request(`/cus/partner/listByEnterprise`, {
    params,
  })
}

/** 获取docusign合同模板列表 */
export async function getDocusignTemplates(params?: any) {
  return request(`/cus/template/list`, {
    params,
  })
}

/** 获取合作物流/仓储企业列表 */
export async function getCooperatelogisticsList(enterpriseTypes: string) {
  return request<{ rows: cooperateListProps[]; total: number }>(`/cus/HzEnterprise/list`, {
    params: { enterpriseTypes },
  })
}

/** 新增合作物流/仓储企业列表 */
export async function addCooperatelogisticsList(data: any) {
  return request(`/cus/partner/add`, {
    method: 'post',
    data,
  })
}

/** 根据模板id查询签约人列表 */
export async function getSignerListByTemplateId(params: any) {
  return request(`/cus/recipients/showView`, {
    params,
  })
}
