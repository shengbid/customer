import React, { useState, useEffect } from 'react'
import ComCard from '@/components/ComPage/ComCard'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { reportFileProps } from '@/services/types'
import type { ProColumns } from '@ant-design/pro-table'
import { surveyReportDetail } from '@/services'
import ComUpload from '@/components/ComUpload'

const ContractDetail: React.FC<{ enterpriseId: number }> = ({ enterpriseId }) => {
  const [dataSource, setDataSource] = useState<reportFileProps[]>([])

  const getDetail = async () => {
    const { data } = await surveyReportDetail({ enterpriseId })
    if (data) setDataSource(data)
  }

  useEffect(() => {
    if (enterpriseId) {
      getDetail()
    }
  }, [enterpriseId])

  const columns: ProColumns<reportFileProps>[] = [
    {
      title: '协议名称',
      key: 'fileName',
      dataIndex: 'fileName',
      width: '18%',
      ellipsis: true,
    },
    {
      title: '合同编号',
      dataIndex: 'fileType',
    },
    {
      title: '合同类型',
      dataIndex: 'fileType',
    },
    {
      title: '签署时间',
      dataIndex: 'createdTime',
      valueType: 'dateTime',
    },
    {
      title: '附件',
      key: 'file',
      dataIndex: 'file',
      width: '28%',
      ellipsis: true,
      render: (_, record) =>
        record.fileList ? <ComUpload isDetail value={record.fileList || []} /> : '-',
    },
  ]

  return (
    <>
      <ComCard title="合同信息">
        <SimpleProtable key="id" columns={columns} dataSource={dataSource || []} />
      </ComCard>
    </>
  )
}

export default ContractDetail
