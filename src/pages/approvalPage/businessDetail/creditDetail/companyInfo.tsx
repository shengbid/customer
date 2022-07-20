import React from 'react'
import { Button } from 'antd'
import Descriptions from '@/components/ComPage/Descriptions'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import CardTitle from '@/components/ComPage/CardTitle'

const { DescriptionsItem } = Descriptions

// 企业基础信息
const CompanyInfo: React.FC = () => {
  const infoData = {
    companyName: '吉祥',
  }
  const tableData: any[] = []

  const columns = [
    {
      title: '年度',
      key: 'year',
      dataIndex: 'year',
    },
    {
      title: 'B2B营业额（万元）',
      key: 'btobQuota',
      dataIndex: 'btobQuota',
    },
    {
      title: 'B2C/BBC营业额（万元）',
      key: 'btocQuota',
      dataIndex: 'btocQuota',
    },
  ]

  const columns2 = [
    {
      title: '附件类型',
      key: 'year',
      dataIndex: 'year',
    },
    {
      title: '附件',
      key: 'btobQuota',
      dataIndex: 'btobQuota',
    },
  ]

  const style = { marginTop: 24 }
  return (
    <>
      <Descriptions title="企业基础信息">
        <DescriptionsItem label="企业名称">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="企业注册所在地区">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="企业编号">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="注册地址">{infoData.companyName}</DescriptionsItem>
      </Descriptions>
      <Descriptions style={style} title="企业经营信息" extra={<Button type="primary">编辑</Button>}>
        <DescriptionsItem label="主营业务">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="销售产品类型">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="企业债务情况">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="申请额度(万元)">{infoData.companyName}</DescriptionsItem>
      </Descriptions>
      <SimpleProtable columns={columns} dataSource={tableData} />
      <CardTitle
        title="企业资料附件清单"
        style={{ marginTop: 30 }}
        extra={<Button type="primary">编辑</Button>}
      >
        <SimpleProtable columns={columns2} dataSource={tableData} />
      </CardTitle>
    </>
  )
}

export default CompanyInfo
