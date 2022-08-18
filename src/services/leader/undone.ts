import { request } from 'umi'
import type { undoneListProps, undoneListParamProps } from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const url = '/activiti/task'

/** 获取待办列表 */
export async function getUndoneList(params: undoneListParamProps) {
  return request<{ rows: undoneListProps[]; total: number }>(`${url}/list`, {
    params: paramsToPageParams(params),
  })
}
/** 查询待办列表 */
export async function searchUndoneList(params: undoneListParamProps) {
  return request<{ rows: undoneListProps[]; total: number }>(`${url}/selectDb`, {
    params: paramsToPageParams(params),
  })
}
/** 获取已办列表 */
export async function getdoneList(params: undoneListParamProps) {
  return request<{ rows: undoneListProps[]; total: number }>(`${url}/ybList`, {
    params: paramsToPageParams(params),
  })
}
/** 获取抄送列表 */
export async function geRecepetList(params: undoneListParamProps) {
  return request<{ rows: undoneListProps[]; total: number; extra: number }>(`${url}/selectCs`, {
    params: paramsToPageParams(params),
  })
}
/** 改变抄送状态 */
export async function updateRecepetStatus(data: { id: string; status: string }) {
  return request(`${url}/csEdit`, {
    data,
    method: 'put',
  })
}

/** 查询已办办列表 */
export async function searchdoneList(params: undoneListParamProps) {
  return request<{ rows: undoneListProps[]; total: number }>(`${url}/selectYb`, {
    params: paramsToPageParams(params),
  })
}
