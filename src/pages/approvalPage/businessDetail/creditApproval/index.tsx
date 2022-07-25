import React from 'react'
import { Tabs } from 'antd'
import ApprovalHistory from '../../components/approvalHistroy'
import CreditDetail from '../creditDetail'
import RealteDetail from '../creditDetail/relatedForm/detail'

const { TabPane } = Tabs

// 授信申请的审核
const CreditApproval: React.FC<{ businessKey: string; id: string; formName: string }> = ({
  businessKey,
  id,
  formName,
}) => {
  return (
    <Tabs type="card">
      {formName === 'credit2' && (
        <TabPane tab="授信申请信息" key="1">
          <CreditDetail id={id} isDetail={true} />
          <RealteDetail />
        </TabPane>
      )}
      {formName === 'credit3' && (
        <TabPane tab="尽调报告和授信方案" key="2">
          Content of Tab Pane 2
        </TabPane>
      )}
      <TabPane tab="审核记录" key="3">
        <ApprovalHistory id={businessKey} />
      </TabPane>
    </Tabs>
  )
}

export default CreditApproval
