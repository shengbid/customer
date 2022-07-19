import React from 'react'
import { Tabs } from 'antd'
import ApprovalHistory from '../../components/approvalHistroy'

const { TabPane } = Tabs

// 授信申请的审核
const CreditApproval: React.FC = () => {
  return (
    <Tabs type="card">
      <TabPane tab="授信申请信息" key="1">
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab="尽调报告和授信方案" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="审核记录" key="3">
        <ApprovalHistory />
      </TabPane>
    </Tabs>
  )
}

export default CreditApproval
