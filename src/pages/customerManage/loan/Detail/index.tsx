import React, { useState } from 'react'
import ComPageContanier from '@/components/ComPage/ComPagContanier'
import { Button } from 'antd'
import { history } from 'umi'
import CooperateClient from '../components/CooperateClient'
import CreditBasic from '../components/CreditBasic'
import CreditInfo from '../CreditInfo'
import PledgeRule from '@/pages/riskMonitoring/ruleCenter/collateralRules'

const Detail: React.FC = (props: any) => {
  const [activeKey, setActiveKey] = useState<string>('1')
  const { enterpriseId, companyName, status } = props.location.query

  const tabList = [
    {
      tab: '基础信息',
      key: '1',
    },
    {
      tab: '授信信息',
      key: '2',
    },
    {
      tab: '押品质押规则',
      key: '6',
    },
    {
      tab: '合作企业',
      key: '7',
    },
  ]
  return (
    <ComPageContanier
      title={companyName}
      extra={
        <Button type="primary" onClick={() => history.push('/customerManage/loan')}>
          返回
        </Button>
      }
      tabList={tabList}
      onTabClick={setActiveKey}
    >
      {activeKey === '1' ? <CreditBasic status={status} companyId={enterpriseId} /> : null}
      {activeKey === '2' && status !== '01' ? <CreditInfo enterpriseId={enterpriseId} /> : null}
      {activeKey === '6' ? <PledgeRule enterpriseId={enterpriseId} /> : null}
      {activeKey === '7' ? (
        <CooperateClient info={{ enterpriseId, enterpriseName: companyName }} />
      ) : null}
    </ComPageContanier>
  )
}

export default Detail
