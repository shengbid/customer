import React, { useState, useEffect } from 'react'
import CardTitle from '@/components/ComPage/CardTitle'
import Descriptions from '@/components/ComPage/Descriptions'
import DictShow from '@/components/ComSelect/dictShow'
import { formatAmount } from '@/utils/base'

const { DescriptionsItem } = Descriptions

const ApplyDetail: React.FC = () => {
  const [infoData, setInfoData] = useState<any>({})

  const getDetail = () => {
    setInfoData({})
  }

  useEffect(() => {
    getDetail()
  }, [])

  return (
    <CardTitle title="融资信息" style={{ marginTop: 30 }}>
      <Descriptions>
        <DescriptionsItem label="融资企业">{infoData.sellProduct}</DescriptionsItem>
        <DescriptionsItem label="融资编号">{infoData.sellProduct}</DescriptionsItem>
        <DescriptionsItem label="融资产品/用款方式">{infoData.sellProduct}</DescriptionsItem>
        <DescriptionsItem label="批复代垫资金">
          {formatAmount(infoData.sellProduct)}
        </DescriptionsItem>
        <DescriptionsItem label="垫资期限(天)">{infoData.sellProduct}</DescriptionsItem>
        <DescriptionsItem label="还款方式">
          <DictShow dictValue={infoData.businessTypeList} dictkey="cus_zyyw" />
        </DescriptionsItem>
        <DescriptionsItem label="产品可用额度">
          {formatAmount(infoData.enterpriseDebt)}
        </DescriptionsItem>
        <DescriptionsItem label="委托方应付保证金">
          {formatAmount(infoData.enterpriseDebt)}
        </DescriptionsItem>
      </Descriptions>
    </CardTitle>
  )
}

export default ApplyDetail
