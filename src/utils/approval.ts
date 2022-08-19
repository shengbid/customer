import { history } from 'umi'

// 流程审批详情页跳转处理
export const toApprovalDetailPage = (type: string, query: any) => {
  if (type === 'credit' || (type && type.indexOf('credit') > -1)) {
    // 授信审批
    history.push({
      pathname: '/leaderPage/undone/creditdetail',
      query,
    })
  } else {
    history.push({
      pathname: '/leaderPage/undone/approvaldetail',
      query,
    })
  }
}
