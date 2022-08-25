import React from 'react'
import { Tabs } from 'antd'
import ApprovalHistory from '../../components/approvalHistroy'
import CreditDetail from '../components'
import RealteDetail from '../components/relatedForm/detail'
import ReportDetail from '../components/surveyReport/detail'
import type { surveyParamProps } from '@/services/types'

const { TabPane } = Tabs

interface creditApprovalprops {
  businessKey: string
  id: string
  formName: string
  creditParams: surveyParamProps
}

// 授信申请的审核
const CreditApproval: React.FC<creditApprovalprops> = ({
  businessKey,
  id,
  formName,
  creditParams,
}) => {
  const reports = ['credit1', 'credit2', 'credit3', 'credit8']

  return (
    <Tabs type="card" defaultActiveKey="3">
      {formName !== 'credit1' && formName !== 'credit8' && (
        <TabPane tab="授信申请信息" key="1">
          <CreditDetail id={id} isDetail={true} />
          <RealteDetail creditParams={creditParams} />
        </TabPane>
      )}
      {!reports.includes(formName) ? (
        <TabPane tab="尽调报告和授信方案" key="2">
          <ReportDetail creditParams={creditParams} />
        </TabPane>
      ) : null}

      <TabPane tab="审核记录" key="3">
        <ApprovalHistory id={businessKey} />
      </TabPane>
    </Tabs>
  )
}

export default CreditApproval
