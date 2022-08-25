import React from 'react'
import ComCard from '@/components/ComPage/ComCard'
import DetailApproval from '../approval'
import PurchaseInfo from '../components/purchaseInfo'
import ApplyDetail from '../components/applyDetail'
import SupplierAccount from '../components/supplierAccount'
import SignContract from '../components/signContract'
import RepaymentPlan from '../components/repaymentPlan'

interface detailProps {
  activityParams: any
  creditParams: any
  approvalDomRef: any
  detail?: string
}
const CreditDom: React.FC<detailProps> = ({ activityParams, creditParams, approvalDomRef }) => {
  const approvalDom = {
    purchase1: (
      <>
        <PurchaseInfo ref={approvalDomRef} creditParams={creditParams} />
        <ApplyDetail />
      </>
    ),
    purchase2: (
      <>
        <PurchaseInfo ref={approvalDomRef} creditParams={creditParams} />
        <ApplyDetail />
        <SupplierAccount creditParams={creditParams} />
      </>
    ),
    purchase3: (
      <>
        <PurchaseInfo ref={approvalDomRef} creditParams={creditParams} />
        <ApplyDetail />
        <SupplierAccount creditParams={creditParams} />
        <SignContract />
      </>
    ),
    purchase4: (
      <>
        <SignContract />
        <PurchaseInfo ref={approvalDomRef} creditParams={creditParams} />
        <ApplyDetail />
        <SupplierAccount creditParams={creditParams} />
        <RepaymentPlan />
      </>
    ),
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

export default CreditDom
