import React from 'react'
import ComCard from '@/components/ComPage/ComCard'
import ComCollapse from '@/components/ComPage/ComCollapse'
import CreditDetail from '../../businessDetail/credit/creditDetail'
import SurveyReportDetail from '../../businessDetail/credit/creditDetail/surveyReport/detail'
import ContractDetail from '../../businessDetail/credit/creditDetail/contract/detail'
import RealteDetail from '../../businessDetail/credit/creditDetail/relatedForm/detail'
import SignContract from '../../businessDetail/credit/creditDetail/signContract/detail'

const { Panel } = ComCollapse

interface approvalDomProps {
  formName: string
  id: string
  creditParams: any
  activityParams: any
}
const ApprovalDom: React.FC<approvalDomProps> = ({
  formName,
  id,
  creditParams,
  activityParams,
}) => {
  const approvalDom = {
    credit1: (
      <>
        <ComCollapse defaultActiveKey={['1']}>
          <Panel header="授信基础信息" key="1">
            <CreditDetail id={id} isDetail={true} />
          </Panel>
        </ComCollapse>
      </>
    ),
    credit8: (
      <>
        <ComCollapse defaultActiveKey={['1']}>
          <Panel header="授信基础信息" key="1">
            <CreditDetail id={id} isDetail={true} />
          </Panel>
        </ComCollapse>
        <ComCard style={{ marginTop: 12 }} title="关联信息">
          <RealteDetail isEdit={false} creditParams={creditParams} />
        </ComCard>
      </>
    ),
    credit3: (
      <ComCard title="审核信息">
        <SurveyReportDetail creditParams={creditParams} />
      </ComCard>
    ),
    credit5: (
      <ContractDetail businessKey={activityParams.businessKey} taskID={activityParams.taskId} />
    ),
    credit7: <SignContract creditParams={creditParams} activityParams={activityParams} />,
  }

  return approvalDom[formName] ? approvalDom[formName] : <></>
}

export default ApprovalDom
