import { request } from 'umi'
import type { menuParamProps, menuListProps } from '@/services/types'
const url = '/cus/menu'

/** 获取菜单树形列表 */
export async function getCusMenuTreeList(params: menuParamProps) {
  return request<{ data: any[] }>(`${url}/tree/list`, {
    params,
  })
}
/** 获取菜单树形下拉列表 */
export async function getCusMenuTreeData() {
  return request<{ data: any[] }>(`${url}/tree/select`)
}

/** 新增菜单 */
export async function addCusMenu(data: menuListProps) {
  return request<{ data: any[] }>(`${url}/add`, {
    method: 'post',
    data,
  })
}
/** 编辑菜单 */
export async function editCusMenu(data: menuListProps) {
  return request<{ data: any[] }>(`${url}/edit`, {
    method: 'put',
    data,
  })
}
/** 删除菜单 */
export async function deleteCusMenu(id: number) {
  return request(`${url}/${id}`, {
    method: 'delete',
  })
}

/** 获取菜单详情 */
export async function menuCusDetail(id: number) {
  return request<{ data: menuListProps }>(`${url}/remove/${id}`)
}

// /** 获取角色菜单id */
// export async function getRoleMenu(id: number) {
//   return request<{ data: { checkedKeys: number[] } }>(`${url}/roleMenuTreeselect/${id}`)
// }
