import React, { useState, useEffect } from 'react'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { ProColumns } from '@ant-design/pro-table'
import CardTitle from '@/components/ComPage/CardTitle'
import Descriptions from '@/components/ComPage/Descriptions'
import DictShow from '@/components/ComSelect/dictShow'
const { DescriptionsItem } = Descriptions

const Detail: React.FC = () => {
  const [infoData, setInfoData] = useState<any>({})
  const [dataSource, setDataSource] = useState<any[]>([])

  useEffect(() => {
    setInfoData({})
    setDataSource([
      {
        id: 1,
        type: '吉祥公司',
      },
    ])
  }, [])

  const columns: ProColumns<any>[] = [
    {
      title: '收件人名字',
      dataIndex: 'name',
      width: '26%',
    },
    {
      title: '签署角色',
      dataIndex: 'goodBrand',
      width: '18%',
    },
    {
      title: '邮箱',
      dataIndex: 'goodSku',
      width: '18%',
      editable: false,
    },
    {
      title: '手机号码所在地区',
      dataIndex: 'barCode',
      width: '18%',
      editable: false,
    },
    {
      title: '电话号码',
      dataIndex: 'barCode',
      width: '18%',
      editable: false,
    },
  ]

  return (
    <CardTitle title="在线签署合同">
      <Descriptions>
        <DescriptionsItem label="合同签署方式">
          <DictShow dictValue={infoData.businessTypeList} dictkey="cus_zyyw" />
        </DescriptionsItem>
        <DescriptionsItem label="采购申请书" span={3}>
          <SimpleProtable rowKey="id" columns={columns} dataSource={dataSource || []} />
        </DescriptionsItem>
        <DescriptionsItem label="采购合同" span={3}>
          <SimpleProtable rowKey="id" columns={columns} dataSource={dataSource || []} />
        </DescriptionsItem>
      </Descriptions>
    </CardTitle>
  )
}

export default Detail
