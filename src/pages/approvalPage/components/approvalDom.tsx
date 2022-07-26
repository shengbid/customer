import React from 'react'
import ComCard from '@/components/ComPage/ComCard'
import ComCollapse from '@/components/ComPage/ComCollapse'
import CreditDetail from '../businessDetail/creditDetail'
import RelatedDetail from '../businessDetail/creditDetail/relatedForm'
import SurveyReport from '../businessDetail/creditDetail/surveyReport'
import SurveyReportDetail from '../businessDetail/creditDetail/surveyReport/detail'
import Contract from '../businessDetail/creditDetail/contract'

const { Panel } = ComCollapse

interface approvalDomProps {
  formName: string
  id: string
  approvalDomRef: any
}
const ApprovalDom: React.FC<approvalDomProps> = ({ formName, id, approvalDomRef }) => {
  const approvalDom = {
    credit: (
      <>
        <ComCollapse>
          <Panel header="授信基础信息" key="1">
            <CreditDetail id={id} />
          </Panel>
        </ComCollapse>
        <ComCard style={{ marginTop: 12 }} title="关联信息">
          <RelatedDetail />
        </ComCard>
      </>
    ),
    credit2: (
      <ComCard title="审核信息">
        <SurveyReport ref={approvalDomRef} />
      </ComCard>
    ),
    credit3: (
      <ComCard title="审核信息">
        <SurveyReportDetail />
      </ComCard>
    ),
    credit4: (
      <ComCard title="审核信息">
        <Contract ref={approvalDomRef} />
      </ComCard>
    ),
  }

  return <>{approvalDom[formName]}</>
}

export default ApprovalDom
