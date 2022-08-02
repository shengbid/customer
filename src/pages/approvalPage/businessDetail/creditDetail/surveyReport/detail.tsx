import React, { useState, useEffect } from 'react'
import CardTitle from '@/components/ComPage/CardTitle'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { reportFileProps, surveyParamProps } from '@/services/types'
import type { ProColumns } from '@ant-design/pro-table'
import { surveyReportDetail } from '@/services'
import ComUpload from '@/components/ComUpload'

const RealteDetail: React.FC<{ creditParams: surveyParamProps }> = ({ creditParams }) => {
  const [dataSource, setDataSource] = useState<reportFileProps[]>([])

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

  return (
    <>
      <CardTitle title="尽调报告和审贷会审批表">
        <SimpleProtable key="id" columns={columns} dataSource={dataSource || []} />
      </CardTitle>
    </>
  )
}

export default RealteDetail
