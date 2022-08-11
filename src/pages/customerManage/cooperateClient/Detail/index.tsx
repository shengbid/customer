import React, { useState } from 'react'
import ComPageContanier from '@/components/ComPage/ComPagContanier'
import { Button } from 'antd'
import { history } from 'umi'
import BasicInfo from '../components/BasicInfo'

const Detail: React.FC = (props: any) => {
  const [activeKey, setActiveKey] = useState<string>('1')
  const { enterpriseId, companyName } = props.location.query

  const tabList = [
    {
      tab: '基础信息',
      key: '1',
    },
  ]
  return (
    <ComPageContanier
      title={companyName}
      extra={
        <Button type="primary" onClick={() => history.push('/customerManage/cooperate')}>
          返回
        </Button>
      }
      tabList={tabList}
      onTabClick={setActiveKey}
    >
      {activeKey === '1' ? <BasicInfo companyId={enterpriseId} /> : null}
    </ComPageContanier>
  )
}

export default Detail
