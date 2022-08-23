import React from 'react'
import ComCard from '@/components/ComPage/ComCard'
import CreditApproval from './creditApproval'
import ComCollapse from '@/components/ComPage/ComCollapse'
import CreditDetail from './creditDetail'
import RelatedDetail from './creditDetail/relatedForm'
import SurveyReport from './creditDetail/surveyReport'
import SurveyReportDetail from './creditDetail/surveyReport/detail'
import Contract from './creditDetail/contract'
import ContractDetail from './creditDetail/contract/detail'
import SignContract from './creditDetail/signContract'
import RealteDetail from './creditDetail/relatedForm/detail'

const { Panel } = ComCollapse

interface detailProps {
  activityParams: any
  creditParams: any
  approvalDomRef: any
  detail?: boolean
}
const CreditDom: React.FC<detailProps> = ({
  activityParams,
  creditParams,
  approvalDomRef,
  detail = false,
}) => {
  const approvalDom = {
    credit1: (
      <>
        <ComCollapse defaultActiveKey={['1']}>
          <Panel header="授信基础信息" key="1">
            <CreditDetail id={activityParams.instanceId} isDetail={detail} />
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
            <CreditDetail id={activityParams.instanceId} isDetail={detail} />
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
    credit7: (
      <ComCard title="审核信息">
        <SignContract ref={approvalDomRef} />
      </ComCard>
    ),
  }

  return (
    <>
      <ComCard title="详情信息">
        <CreditApproval
          creditParams={creditParams}
          formName={activityParams.formKey}
          id={activityParams.instanceId}
          businessKey={activityParams.businessKey}
        />
      </ComCard>

      {approvalDom[activityParams.formKey] ? approvalDom[activityParams.formKey] : <></>}
    </>
  )
}

export default CreditDom
