import React, { useState, useEffect } from 'react'
import CardTitle from '@/components/ComPage/CardTitle'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { dictListProps, reportFileProps } from '@/services/types'
import type { ProColumns } from '@ant-design/pro-table'
import DictShow from '@/components/ComSelect/dictShow'
import { getDictSelectList } from '@/services'
import ComUpload from '@/components/ComUpload'

const RealteDetail: React.FC = () => {
  const [dataSource, setDataSource] = useState<reportFileProps[]>([])
  const [dictList, setDictList] = useState<dictListProps[]>([])

  useEffect(() => {
    setDataSource([
      {
        id: 1,
        fileType: '尽调报告',
        fileList: [],
      },
    ])
  }, [])

  const getDictData = async () => {
    const { data } = await getDictSelectList('cus_sfzlx')
    if (data) setDictList(data)
  }

  useEffect(() => {
    getDictData()
  }, [])

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
      render: (_, record) => <DictShow dictValue={record.fileType} dictData={dictList} />,
    },
    {
      title: '附件',
      key: 'fileList',
      dataIndex: 'fileList',
      render: (_, record) => <ComUpload isDetail value={record.fileList || []} />,
    },
  ]

  return (
    <>
      <CardTitle title="尽调报告和审贷会审批表">
        <SimpleProtable key="id" columns={columns} dataSource={dataSource || []} />
      </CardTitle>
    </>
  )
}

export default RealteDetail
