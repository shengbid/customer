import React from 'react'
import ComCard from '@/components/ComPage/ComCard'
import DetailApproval from '../approval'
import PurchaseInfoDetail from '../components/purchaseInfo/detail'
import ApplyDetail from '../components/applyDetail'
import SupplierAccount from '../components/supplierAccount'
import SignContract from '../components/signContract'
import RepaymentPlan from '../components/repaymentPlan'

interface detailProps {
  activityParams: any
  creditParams: any
  params: any
  detail?: string
}
const ApprovalDom: React.FC<detailProps> = ({ activityParams, creditParams }) => {
  const approvalDom = {
    purchase2: (
      <>
        <PurchaseInfoDetail creditParams={creditParams} type={1} />
        <ApplyDetail />
        {activityParams.taskNodeName !== '运营负责人审核' ? (
          <>
            <SupplierAccount creditParams={creditParams} isEdit={false} />
            <SignContract />
          </>
        ) : null}
      </>
    ),
    purchase3: (
      <>
        <PurchaseInfoDetail creditParams={creditParams} type={1} />
        <ApplyDetail />
        <SupplierAccount creditParams={creditParams} />
        <SignContract />
      </>
    ),
    purchase4: (
      <>
        <SignContract />
        <PurchaseInfoDetail creditParams={creditParams} type={1} />
        <ApplyDetail />
        <SupplierAccount creditParams={creditParams} isEdit={false} />
        <RepaymentPlan />
      </>
    ),
    inWay2: (
      <>
        <PurchaseInfoDetail type={2} creditParams={creditParams} />
        <ApplyDetail />
      </>
    ),
    inWay3: (
      <>
        <PurchaseInfoDetail type={2} creditParams={creditParams} />
        <ApplyDetail />
        <SupplierAccount creditParams={creditParams} isEdit={false} />
        <SignContract />
      </>
    ),
    inWay5: (
      <>
        <PurchaseInfoDetail
          type={2}
          showInfo={{ transferFile: true }}
          creditParams={creditParams}
        />
        <ApplyDetail />
        <SupplierAccount creditParams={creditParams} isEdit={false} />
        <SignContract />
      </>
    ),
    inWay6: (
      <>
        <PurchaseInfoDetail
          type={2}
          showInfo={{ transferFile: true }}
          creditParams={creditParams}
        />
        <ApplyDetail />
        <SupplierAccount creditParams={creditParams} isEdit={false} />
        <SignContract />
      </>
    ),
    inWay7: (
      <>
        <SignContract showInfo={{ sign: true }} />
        <PurchaseInfoDetail
          type={2}
          showInfo={{ transferFile: true }}
          creditParams={creditParams}
        />
        <ApplyDetail />
        <SupplierAccount creditParams={creditParams} isEdit={false} />
        <RepaymentPlan />
      </>
    ),
    inWareHouse2: (
      <>
        <PurchaseInfoDetail type={3} creditParams={creditParams} />
        <ApplyDetail />
      </>
    ),
    inWareHouse3: (
      <>
        <PurchaseInfoDetail type={3} creditParams={creditParams} />
        <ApplyDetail />
        <SupplierAccount creditParams={creditParams} isEdit={false} />
        <SignContract />
      </>
    ),
    inWareHouse4: (
      <>
        <PurchaseInfoDetail type={3} creditParams={creditParams} />
        <ApplyDetail />
        <SupplierAccount creditParams={creditParams} isEdit={false} />
        <SignContract />
      </>
    ),
    inWareHouse5: (
      <>
        <SignContract />
        <PurchaseInfoDetail type={3} creditParams={creditParams} />
        <ApplyDetail />
        <SupplierAccount creditParams={creditParams} isEdit={false} />
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
        {approvalDom.inWareHouse4}
        {/* {approvalDom[activityParams.formKey] ? approvalDom[activityParams.formKey] : <></>} */}
      </ComCard>
    </>
  )
}

export default ApprovalDom
