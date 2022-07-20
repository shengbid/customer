import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import Descriptions from '@/components/ComPage/Descriptions'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import CardTitle from '@/components/ComPage/CardTitle'
import EditCompanyFile from './editComponents/editCompanyFile'
import EditCompanyBus from './editComponents/editCompanyBus'
import EditCompany from './editComponents/editCompany'
import { formatEmpty, transferAmount } from '@/utils/base'
import ComUpload from '@/components/ComUpload'

const { DescriptionsItem } = Descriptions

interface infoProps {
  infoData: any
  handleUpdate: () => void
}
// 企业基础信息
const CompanyInfo: React.FC<infoProps> = ({ infoData, handleUpdate }) => {
  const [infoVisible, setInfoVisible] = useState<boolean>(false)
  const [companyVisible, setComapnyVisible] = useState<boolean>(false)
  const [fileVisible, setFileVisible] = useState<boolean>(false)
  const [companyData, setCompanyData] = useState<any>({})
  const [tableData, setTableData] = useState<any>([])

  // 处理企业信息清单
  const handleFileTable = () => {
    const obj = {
      lszh: '主要账户流水',
      hwqd: '货物清单',
      cgqd: '近一年采购清单',
      gysqd: '主要合作上游供应商清单',
      jyrsm: '实际经营人说明',
      btocSdqd: '近一年B2C/BBC销售订单清单',
      skjt: '平台应收款截图',
      xykhqd: '主要合作下游客户清单',
      btobSdqd: '近一年B2B销售订单清单',
      qt: '其他附件',
    }
    const arr: any[] = []
    const qyList = infoData.qyList
    const dsList = infoData.dsList
    if (qyList && dsList) {
      for (const key in qyList) {
        if (obj[key]) {
          const newItem: any = { id: key }
          newItem.fileType = obj[key]
          newItem.fileList = qyList[key]
          arr.push(newItem)
        }
      }
      for (const key in dsList) {
        if (obj[key]) {
          const newItem: any = { id: key }
          newItem.fileType = obj[key]
          newItem.fileList = dsList[key]
          arr.push(newItem)
        }
      }
    }
    // console.log(arr)
    setTableData(arr)
  }

  useEffect(() => {
    if (infoData.id) {
      setCompanyData(infoData.cusEnterprise)
      handleFileTable()
    }
  }, [infoData])

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
      render: (val: number) => <>{transferAmount(val)}</>,
    },
    {
      title: 'B2C/BBC营业额（万元）',
      key: 'btocQuota',
      dataIndex: 'btocQuota',
      render: (val: number) => <>{transferAmount(val)}</>,
    },
  ]

  const columns2 = [
    {
      title: '附件类型',
      key: 'fileType',
      dataIndex: 'fileType',
    },
    {
      title: '附件',
      key: 'fileList',
      width: '60%',
      dataIndex: 'fileList',
      render: (val: any) => <ComUpload value={val} isDetail />,
    },
  ]

  const style = { marginTop: 24 }
  return (
    <>
      <Descriptions
        title="企业基础信息"
        extra={
          <Button type="primary" onClick={() => setComapnyVisible(true)}>
            编辑
          </Button>
        }
      >
        <DescriptionsItem label="企业名称">{companyData.fullName}</DescriptionsItem>
        <DescriptionsItem label="企业注册所在地区">{companyData.registerAddr}</DescriptionsItem>
        <DescriptionsItem label="企业编号">
          {formatEmpty(companyData.enterpriseNumber)}
        </DescriptionsItem>
        <DescriptionsItem label="注册地址">
          {formatEmpty(companyData.registerDetails)}
        </DescriptionsItem>
      </Descriptions>
      <Descriptions
        style={style}
        title="企业经营信息"
        extra={
          <Button type="primary" onClick={() => setInfoVisible(true)}>
            编辑
          </Button>
        }
      >
        <DescriptionsItem label="主营业务">{infoData.businessType}</DescriptionsItem>
        <DescriptionsItem label="销售产品类型">{infoData.sellProduct}</DescriptionsItem>
        <DescriptionsItem label="企业债务情况">{infoData.enterpriseDebt}</DescriptionsItem>
        <DescriptionsItem label="申请额度(万元)">
          {transferAmount(infoData.applyQuota)}
        </DescriptionsItem>
      </Descriptions>
      <SimpleProtable
        key="year"
        columns={columns}
        dataSource={infoData.businessDetailsList || []}
      />
      <CardTitle
        title="企业资料附件清单"
        style={{ marginTop: 30 }}
        extra={
          <Button type="primary" onClick={() => setFileVisible(true)}>
            编辑
          </Button>
        }
      >
        <SimpleProtable key="id" columns={columns2} isPagination={false} dataSource={tableData} />
      </CardTitle>

      {/* 修改企业信息 */}
      <EditCompany
        info={companyData.id}
        modalVisible={companyVisible}
        handleCancel={(val: any) => {
          setComapnyVisible(false)
          if (val === 1) {
            handleUpdate()
          }
        }}
      />

      {/* 修改企业经营信息 */}
      <EditCompanyBus modalVisible={infoVisible} handleCancel={() => setInfoVisible(false)} />

      {/* 修改企业清单 */}
      <EditCompanyFile modalVisible={fileVisible} handleCancel={() => setFileVisible(false)} />
    </>
  )
}

export default CompanyInfo
