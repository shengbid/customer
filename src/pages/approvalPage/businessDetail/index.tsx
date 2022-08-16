import React from 'react'
import CreditApproval from './creditApproval'
import ComCard from '@/components/ComPage/ComCard'

interface detailProps {
  activityParams?: any
  creditParams?: any
}
const BusinessDetail: React.FC<detailProps> = ({ activityParams, creditParams }) => {
  if (activityParams.formKey.indexOf('credit') > -1) {
    // 授信流程详情
    return (
      <ComCard title="详情信息">
        <CreditApproval
          creditParams={creditParams}
          formName={activityParams.formKey}
          id={activityParams.instanceId}
          businessKey={activityParams.businessKey}
        />
      </ComCard>
    )
  }
  return <></>
}

export default BusinessDetail
