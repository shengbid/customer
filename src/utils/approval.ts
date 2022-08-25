import { history } from 'umi'

// 流程审批审批页跳转处理
export const toApprovalPage = (type: string, query: any) => {
  if (type === 'credit' || (type && type.indexOf('credit') > -1)) {
    // 授信审批
    history.push({
      pathname: '/leaderPage/undone/credit',
      query,
    })
  } else if (type === 'purchase' || (type && type.indexOf('purchase') > -1)) {
    // 代理采购
    history.push({
      pathname: '/leaderPage/undone/purchase',
      query,
    })
  } else if (type === 'inway' || (type && type.indexOf('inway') > -1)) {
    // 在途质押
    history.push({
      pathname: '/leaderPage/undone/inway',
      query,
    })
  } else if (type === 'inWareHouse' || (type && type.indexOf('inWareHouse') > -1)) {
    // 在仓质押
    history.push({
      pathname: '/leaderPage/undone/inWarehouse',
      query,
    })
  } else {
    history.push({
      pathname: '/leaderPage/undone/approval',
      query,
    })
  }
}
// 流程审批详情页跳转处理
export const toApprovalDetailPage = (type: string, query: any) => {
  if (type === 'credit' || (type && type.indexOf('credit') > -1)) {
    // 授信审批
    history.push({
      pathname: '/leaderPage/undone/creditdetail',
      query,
    })
  } else if (type === 'purchase' || (type && type.indexOf('purchase') > -1)) {
    // 代理采购
    history.push({
      pathname: '/leaderPage/undone/purchasedetail',
      query,
    })
  } else if (type === 'inway' || (type && type.indexOf('inway') > -1)) {
    // 在途质押
    history.push({
      pathname: '/leaderPage/undone/inwaydetail',
      query,
    })
  } else if (type === 'inWareHouse' || (type && type.indexOf('inWareHouse') > -1)) {
    // 在仓质押
    history.push({
      pathname: '/leaderPage/undone/inWarehousedetail',
      query,
    })
  } else {
    history.push({
      pathname: '/leaderPage/undone/approvaldetail',
      query,
    })
  }
}
