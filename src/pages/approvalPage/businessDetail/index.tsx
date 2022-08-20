import React from 'react'
import CreditApproval from './credit'
import FinanceApproval from './finance'
import ComCard from '@/components/ComPage/ComCard'
import { Tabs } from 'antd'
import ApprovalHistory from '../components/approvalHistroy'

const { TabPane } = Tabs

interface detailProps {
  activityParams?: any
  creditParams?: any
  approvalDomRef: any
}
const BusinessDetail: React.FC<detailProps> = ({
  activityParams,
  creditParams,
  approvalDomRef,
}) => {
  if (activityParams.formKey.indexOf('credit') > -1) {
    // 授信流程详情
    return (
      <CreditApproval
        activityParams={activityParams}
        creditParams={creditParams}
        approvalDomRef={approvalDomRef}
      />
    )
  } else if (activityParams.formKey.indexOf('purchase') > -1) {
    // 代理采购流程
    return (
      <ComCard title="详情信息">
        <FinanceApproval
          creditParams={creditParams}
          approvalDomRef={approvalDomRef}
          activityParams={activityParams}
        />
      </ComCard>
    )
  }

  return (
    <ComCard title="详情信息">
      <Tabs type="card">
        <TabPane tab="审核记录" key="3">
          <ApprovalHistory id={activityParams.businessKey} />
        </TabPane>
      </Tabs>
    </ComCard>
  )
}

export default BusinessDetail
