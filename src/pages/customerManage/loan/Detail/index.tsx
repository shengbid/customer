import React, { useState } from 'react'
import ComPageContanier from '@/components/ComPage/ComPagContanier'
import { Button } from 'antd'
import { history } from 'umi'
import CooperateClient from '../components/CooperateClient'
import CreditBasic from '../components/CreditBasic'
import CreditInfo from '../CreditInfo'

const Detail: React.FC = (props: any) => {
  const [activeKey, setActiveKey] = useState<string>('1')
  const { enterpriseId, companyName } = props.location.query

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
      tab: '合作客户',
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
      {activeKey === '1' ? <CreditBasic companyId={enterpriseId} /> : null}
      {activeKey === '2' ? <CreditInfo enterpriseId={enterpriseId} /> : null}
      {activeKey === '7' ? <CooperateClient /> : null}
    </ComPageContanier>
  )
}

export default Detail
