import { Redirect, useModel } from 'umi'
import { includes, find, isEmpty } from 'lodash'
import { treeDataToFlat } from '@/utils/base'

// 对重定向路由进行判断,如果定向路由在返回路由中,直接显示;如果不在返回路由中
// 对当前path进行拆分,循环返回的路由,选择匹配的第一个
export default (props: any) => {
  const { initialState } = useModel('@@initialState')
  const { path } = props.route
  const menuData = initialState?.menus ? treeDataToFlat(initialState.menus) : []
  let redirectPath = '/'
  const isLogin = includes(
    menuData.map((item: any) => item.path),
    path,
  )
  // console.log(menuData)
  if (!isLogin) {
    const paths = path.split('/')
    const obj = find(menuData, (item: any) => {
      return includes(item.path, path.substring(0, path.lastIndexOf('/') + 1))
    })
    if (isEmpty(obj)) {
      // 如果没匹配,往上一级匹配
      redirectPath = find(menuData, (item: any) => {
        // console.log(item.path, paths[1])
        return includes(item.path, `${paths[1]}/`)
      }).path
    } else {
      redirectPath = obj.path
    }
  }
  // console.log(44, isLogin, path, redirectPath)
  if (isLogin) {
    return <div>{props.children}</div>
  } else {
    return <Redirect to={redirectPath} />
  }
}
