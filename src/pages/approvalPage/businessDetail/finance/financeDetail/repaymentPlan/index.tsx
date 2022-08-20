import React, { useState, useEffect } from 'react'
import CardTitle from '@/components/ComPage/CardTitle'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { ProColumns } from '@ant-design/pro-table'

const Detail: React.FC = () => {
  const [dataSource, setDataSource] = useState<any[]>([])

  const getList = () => {
    setDataSource([{ id: 1 }])
  }

  useEffect(() => {
    getList()
  }, [])

  const columns: ProColumns<any>[] = [
    {
      title: '还款日',
      key: 'shareholderName',
      dataIndex: 'shareholderName',
    },
    {
      title: '本期应还总金额',
      key: 'shareholderName',
      dataIndex: 'shareholderName',
    },
    {
      title: '代垫资金',
      key: 'identityType',
      dataIndex: 'identityType',
    },
    {
      title: '代理服务费',
      key: 'identityNumber',
      dataIndex: 'identityNumber',
    },
  ]

  return (
    <CardTitle title="还款计划">
      <SimpleProtable key="id" columns={columns} dataSource={dataSource || []} />
    </CardTitle>
  )
}

export default Detail
