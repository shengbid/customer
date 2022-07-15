import { request } from 'umi'
import type { templateParamProps, templateProps } from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const url = '/system/templateManage'

/** 获取模板列表 */
export async function getTemplateList(params: templateParamProps) {
  return request<{ rows: templateProps[]; total: number }>(`${url}/list`, {
    params: paramsToPageParams(params),
  })
}

/** 新增模板 */
export async function addTemplate(data: templateProps) {
  return request<{ data: any[] }>(`${url}/add`, {
    method: 'post',
    data,
  })
}
/** 编辑模板 */
export async function editTemplate(data: templateProps) {
  return request(`${url}/edit`, {
    method: 'put',
    data,
  })
}

/** 获取模板详情 */
export async function templateDetail(templateId: string) {
  return request<{ data: templateProps }>(`${url}/get/template`, {
    params: { templateId },
  })
}
