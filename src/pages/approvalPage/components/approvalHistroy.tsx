import React, { useState } from 'react'
import { Spin } from 'antd'
// import ComCard from '@/components/ComPage/ComCard'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { ProColumns } from '@ant-design/pro-table'
import type { approvalHistoryProps } from '@/services/types'
import ComUpload from '@/components/ComUpload'

// 审核记录
const ApprovalHistory: React.FC = () => {
  const [spinning, setSpinning] = useState<boolean>(true)

  const columns: ProColumns<approvalHistoryProps>[] = [
    {
      title: '处理时间',
      key: 'time',
      dataIndex: 'time',
    },
    {
      title: '节点名称',
      key: 'nodeName',
      dataIndex: 'nodeName',
    },
    {
      title: '审批人员',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '审批意见',
      key: 'reason',
      dataIndex: 'reason',
    },
    {
      title: '处理结果',
      key: 'result',
      dataIndex: 'result',
    },
    {
      title: '附件',
      key: 'fileList',
      dataIndex: 'fileList',
      width: '25%',
      ellipsis: true,
      render: () => <ComUpload isDetail />,
    },
  ]

  // 获取审核历史
  const getList = () => {
    setSpinning(false)
    return {
      data: [],
    }
  }

  return (
    // <ComCard title="审批记录">
    <Spin spinning={spinning}>
      <SimpleProtable columns={columns} request={getList} />
    </Spin>
    // </ComCard>
  )
}

export default ApprovalHistory
