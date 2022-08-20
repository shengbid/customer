import React, { useState, useEffect } from 'react'
import Descriptions from '@/components/ComPage/Descriptions'
import CardTitle from '@/components/ComPage/CardTitle'
import ComUpload from '@/components/ComUpload'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { ProColumns } from '@ant-design/pro-table'

const { DescriptionsItem } = Descriptions

const Detail: React.FC = () => {
  const [infoData, setInfoData] = useState<any>({})
  const [dataSource, setDataSource] = useState<any[]>([])

  useEffect(() => {
    setInfoData({})
    setDataSource([])
  }, [])

  const columns: ProColumns<any>[] = [
    {
      title: '合同名称',
      dataIndex: 'name',
      width: '20%',
    },
    {
      title: '合同编号',
      dataIndex: 'number',
      width: '15%',
    },
    {
      title: '合同类型',
      dataIndex: 'fileType',
      width: '15%',
    },
    {
      title: '签署时间',
      dataIndex: 'time',
      width: '15%',
      valueType: 'date',
    },
    {
      title: '附件',
      dataIndex: 'time',
      width: '35%',
      ellipsis: true,
      render: (_, recored: any) => (recored.files ? <ComUpload /> : <>-</>),
    },
  ]

  return (
    <>
      <CardTitle title="合同信息">
        <Descriptions>
          <DescriptionsItem label="现场拍摄视频">
            <ComUpload isDetail value={infoData.creditReport} />
          </DescriptionsItem>
          <DescriptionsItem label="授信生效日">{infoData.sellProduct}</DescriptionsItem>
          <DescriptionsItem label="授信到期日">{infoData.sellProduct}</DescriptionsItem>
        </Descriptions>
        <SimpleProtable key="year" columns={columns} dataSource={dataSource || []} />
      </CardTitle>
    </>
  )
}

export default Detail
