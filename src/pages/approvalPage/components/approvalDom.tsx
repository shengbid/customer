import React from 'react'
import ComCard from '@/components/ComPage/ComCard'
import ComCollapse from '@/components/ComPage/ComCollapse'
import CreditDetail from '../businessDetail/creditDetail'
import RelatedDetail from '../businessDetail/creditDetail/relatedForm'
import SurveyReport from '../businessDetail/creditDetail/surveyReport'
import SurveyReportDetail from '../businessDetail/creditDetail/surveyReport/detail'
import Contract from '../businessDetail/creditDetail/contract'
import ContractDetail from '../businessDetail/creditDetail/contract/detail'
import SignContract from '../businessDetail/creditDetail/signContract'

const { Panel } = ComCollapse

interface approvalDomProps {
  formName: string
  id: string
  approvalDomRef: any
}
const ApprovalDom: React.FC<approvalDomProps> = ({ formName, id, approvalDomRef }) => {
  const approvalDom = {
    credit1: (
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
        <Contract title="授信准备合同" ref={approvalDomRef} />
      </ComCard>
    ),
    credit5: <ContractDetail />,
    credit6: (
      <ComCard title="审核信息">
        <Contract title="签署现场拍摄视频" ref={approvalDomRef} />
      </ComCard>
    ),
    credit7: (
      <ComCard title="审核信息">
        <SignContract ref={approvalDomRef} />
      </ComCard>
    ),
  }

  return <>{approvalDom[formName]}</>
}

export default ApprovalDom
