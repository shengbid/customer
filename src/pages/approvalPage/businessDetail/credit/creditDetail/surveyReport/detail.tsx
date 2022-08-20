import React, { useState, useEffect } from 'react'
import CardTitle from '@/components/ComPage/CardTitle'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { reportFileProps, surveyParamProps } from '@/services/types'
import type { ProColumns } from '@ant-design/pro-table'
import { surveyReportDetail } from '@/services'
import ComUpload from '@/components/ComUpload'
import Descriptions from '@/components/ComPage/Descriptions'
import { transferAmount } from '@/utils/base'

const { DescriptionsItem } = Descriptions

const RealteDetail: React.FC<{ creditParams: surveyParamProps }> = ({ creditParams }) => {
  const [dataSource, setDataSource] = useState<reportFileProps[]>([])
  const [infoData] = useState<any>({})

  // useEffect(() => {
  //   setDataSource([
  //     {
  //       id: 1,
  //       fileType: '尽调报告',
  //       fileList: [],
  //     },
  //   ])
  // }, [])

  const getDetail = async () => {
    const { data } = await surveyReportDetail(creditParams)
    if (data) setDataSource(data)
  }

  useEffect(() => {
    if (creditParams) {
      getDetail()
    }
  }, [creditParams])

  const columns: ProColumns<reportFileProps>[] = [
    {
      title: '序号',
      key: 'index',
      dataIndex: 'index',
    },
    {
      title: '附件类型',
      dataIndex: 'fileType',
      width: '30%',
    },
    {
      title: '附件',
      key: 'fileList',
      dataIndex: 'fileList',
      render: (_, record) => <ComUpload isDetail value={record.fileList || []} />,
    },
  ]

  const columns2 = [
    {
      title: '金融产品',
      key: 'year',
      dataIndex: 'year',
    },
    {
      title: '额度(美元)',
      key: 'year',
      dataIndex: 'year',
    },
    {
      title: '代理服务费(%)',
      key: 'year',
      dataIndex: 'year',
    },
    {
      title: '用款方式/垫资期限',
      key: 'year',
      dataIndex: 'year',
    },
  ]

  return (
    <>
      <CardTitle title="尽调报告和审贷会审批表">
        <SimpleProtable key="id" columns={columns} dataSource={dataSource || []} />
      </CardTitle>

      <CardTitle title="授信方案">
        <Descriptions>
          <DescriptionsItem label="客户质押率(%)">{infoData.rate}</DescriptionsItem>
          <DescriptionsItem label="授信期限(月)">{infoData.sellProduct}</DescriptionsItem>
          <DescriptionsItem label="授信总额度(美元)">{infoData.sellProduct}</DescriptionsItem>
          <DescriptionsItem label="客户申请金额(万元)">
            {transferAmount(infoData.applyQuota)}
          </DescriptionsItem>
        </Descriptions>
        <SimpleProtable
          key="id"
          columns={columns2}
          dataSource={infoData.businessDetailsList || []}
        />
      </CardTitle>
    </>
  )
}

export default RealteDetail
