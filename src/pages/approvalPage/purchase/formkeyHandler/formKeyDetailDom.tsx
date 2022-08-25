import React from 'react'
import ComCard from '@/components/ComPage/ComCard'
import DetailApproval from '../approval'

interface detailProps {
  activityParams: any
  params: any
  detail?: string
}
const ApprovalDom: React.FC<detailProps> = ({ activityParams }) => {
  const approvalDom = {
    purchase1: <></>,
    purchase2: <></>,
    purchase3: <></>,
    purchase4: <></>,
  }

  return (
    <>
      <ComCard title="详情信息">
        <DetailApproval businessKey={activityParams.businessKey} />
      </ComCard>
      <ComCard title="审核信息">
        {approvalDom[activityParams.formKey] ? approvalDom[activityParams.formKey] : <></>}
      </ComCard>
    </>
  )
}

export default ApprovalDom
