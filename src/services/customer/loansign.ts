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
export async function getDocusignTemplates(data?: any) {
  return request(`/cus/template/list`, {
    data,
    method: 'post',
  })
}

/** 获取合作物流/仓储/供应商企业列表 */
export async function getCooperatelogisticsList(enterpriseType: string) {
  return request<{ rows: cooperateListProps[]; total: number }>(`/cus/HzEnterprise/list`, {
    params: { enterpriseType },
  })
}

/** 新增合作物流/仓储企业列表 */
export async function addCooperatelogistics(data: any) {
  return request(`/cus/partner/add`, {
    method: 'post',
    data,
  })
}
/** 删除合作物流/仓储企业列表 */
export async function deleteCooperatelogistics(ids: number) {
  return request(`/cus/partner/remove`, {
    params: { ids },
  })
}

/** 供应商列表 */
export async function cooperateSupplierList() {
  return request<{ rows: any[] }>(`/cus/supplier/add`, {})
}
/** 新增供应商 */
export async function addCooperateSupplier(data: any) {
  return request(`/cus/supplier/add`, {
    method: 'post',
    data,
  })
}
/** 编辑供应商 */
export async function editCooperateSupplier(data: any) {
  return request(`/cus/supplier/edit`, {
    method: 'post',
    data,
  })
}
/** 删除供应商 */
export async function deleteCooperateSupplier(ids: number) {
  return request(`/cus/supplier/remove`, {
    params: { ids },
  })
}

/** 根据模板id查询签约人列表 */
export async function getSignerListByTemplateId(data: any) {
  return request(`/cus/recipients/showView`, {
    method: 'post',
    data,
  })
}
