import React from 'react'
import ComCard from '@/components/ComPage/ComCard'
import ComCollapse from '@/components/ComPage/ComCollapse'
import CreditDetail from '../businessDetail/creditDetail'
import RelatedDetail from '../businessDetail/creditDetail/relatedForm'
import SurveyReport from '../businessDetail/creditDetail/surveyReport'
import SurveyReportDetail from '../businessDetail/creditDetail/surveyReport/detail'
import Contract from '../businessDetail/creditDetail/contract'
import ContractDetail from '../businessDetail/creditDetail/contract/detail'
// import SignContract from '../businessDetail/creditDetail/signContract'
import RealteDetail from '../businessDetail/creditDetail/relatedForm/detail'

const { Panel } = ComCollapse

interface approvalDomProps {
  formName: string
  id: string
  approvalDomRef: any
  creditParams: any
  detail?: string
}
const ApprovalDom: React.FC<approvalDomProps> = ({
  formName,
  id,
  approvalDomRef,
  creditParams,
  detail,
}) => {
  const approvalDom = {
    credit1: (
      <>
        <ComCollapse defaultActiveKey={['1']}>
          <Panel header="授信基础信息" key="1">
            <CreditDetail id={id} isDetail={!!detail} />
          </Panel>
        </ComCollapse>
        <ComCard style={{ marginTop: 12 }} title="关联信息">
          <RelatedDetail ref={approvalDomRef} creditParams={creditParams} />
        </ComCard>
      </>
    ),
    credit8: (
      <>
        <ComCollapse defaultActiveKey={['1']}>
          <Panel header="授信基础信息" key="1">
            <CreditDetail id={id} isDetail={!!detail} />
          </Panel>
        </ComCollapse>
        <ComCard style={{ marginTop: 12 }} title="关联信息">
          <RealteDetail isEdit={!detail} creditParams={creditParams} />
        </ComCard>
      </>
    ),
    credit2: (
      <ComCard title="审核信息">
        <SurveyReport ref={approvalDomRef} creditParams={creditParams} />
      </ComCard>
    ),
    credit3: (
      <ComCard title="审核信息">
        <SurveyReportDetail creditParams={creditParams} />
      </ComCard>
    ),
    credit4: (
      <ComCard title="审核信息">
        <Contract title="授信准备合同" ref={approvalDomRef} />
      </ComCard>
    ),
    credit5: <ContractDetail creditParams={creditParams} />,
    credit6: (
      <ComCard title="审核信息">
        <Contract title="签署现场拍摄视频" ref={approvalDomRef} />
      </ComCard>
    ),
    credit7: <ComCard title="审核信息">{/* <SignContract ref={approvalDomRef} /> */}</ComCard>,
  }

  return approvalDom[formName]
}

export default ApprovalDom
