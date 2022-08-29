import React from 'react'
import ComCard from '@/components/ComPage/ComCard'
import DetailApproval from '../approval'
import PurchaseInfo from '../components/purchaseInfo'
import PurchaseInfoDetail from '../components/purchaseInfo/detail'
import ApplyDetail from '../components/applyDetail'
import SupplierAccount from '../components/supplierAccount'
import SignContract from '../components/signContract'
import RepaymentPlan from '../components/repaymentPlan'
import InWayPurchaseInfo from '../components/inWayPurchaseInfo'
import InWareHousePurchaseInfo from '../components/inHousePurchaseInfo'

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
        <PurchaseInfoDetail creditParams={creditParams} type={1} />
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
    inWay1: (
      <>
        <PurchaseInfoDetail type={2} creditParams={creditParams} />
        <ApplyDetail />
      </>
    ),
    inWay2: (
      <>
        <InWayPurchaseInfo ref={approvalDomRef} creditParams={creditParams} />
        <ApplyDetail />
      </>
    ),
    inWay3: (
      <>
        <PurchaseInfoDetail type={2} creditParams={creditParams} />
        <ApplyDetail />
        <SupplierAccount creditParams={creditParams} />
        <SignContract />
      </>
    ),
    inWay4: (
      <>
        <PurchaseInfoDetail type={2} showInfo={{ transfer: true }} creditParams={creditParams} />
        <ApplyDetail />
        <SupplierAccount creditParams={creditParams} />
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
        <SupplierAccount creditParams={creditParams} />
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
        <ApplyDetail showInfo={{ financeStartDate: true }} />
        <SupplierAccount creditParams={creditParams} />
        <RepaymentPlan />
      </>
    ),
    inWareHouse1: (
      <>
        <InWareHousePurchaseInfo
          ref={approvalDomRef}
          showInfo={{ repayPrice: false }}
          creditParams={creditParams}
        />
        <ApplyDetail />
      </>
    ),
    inWareHouse2: (
      <>
        <InWareHousePurchaseInfo
          ref={approvalDomRef}
          showInfo={{ repayPrice: true }}
          creditParams={creditParams}
        />
        <ApplyDetail />
      </>
    ),
    inWareHouse3: (
      <>
        <PurchaseInfoDetail type={3} creditParams={creditParams} />
        <ApplyDetail />
        <SupplierAccount creditParams={creditParams} />
        <SignContract />
      </>
    ),
    inWareHouse5: (
      <>
        <SignContract showInfo={{ sign: true }} />
        <PurchaseInfoDetail type={3} creditParams={creditParams} />
        <ApplyDetail showInfo={{ financeStartDate: true }} />
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
        {/* {approvalDom[activityParams.formKey] ? approvalDom[activityParams.formKey] : <></>} */}
        {approvalDom.inWareHouse4}
      </ComCard>
    </>
  )
}

export default CreditDom
