import React from 'react'
import { Tabs } from 'antd'
import ApprovalHistory from '../../components/approvalHistroy'

const { TabPane } = Tabs

interface creditApprovalprops {
  businessKey: string
}

// 融资申请的审核
const CreditApproval: React.FC<creditApprovalprops> = ({ businessKey }) => {
  return (
    <Tabs type="card">
      <TabPane tab="审核记录" key="3">
        <ApprovalHistory id={businessKey} />
      </TabPane>
    </Tabs>
  )
}

export default CreditApproval
