import React, { useState } from 'react'
import { Spin } from 'antd'
// import ComCard from '@/components/ComPage/ComCard'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { ProColumns } from '@ant-design/pro-table'
import type { approvalHistoryProps } from '@/services/types'
import ComUpload from '@/components/ComUpload'
import { leaveHistory } from '@/services'

// 审核记录
const ApprovalHistory: React.FC<{ id: string }> = ({ id }) => {
  const [spinning, setSpinning] = useState<boolean>(true)

  const obj = {
    jumpFlow: '驳回',
    taskComplete: '通过',
    reject: '拒绝',
  }
  const columns: ProColumns<approvalHistoryProps>[] = [
    {
      title: '处理时间',
      key: 'createTime',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '节点名称',
      key: 'taskNodeName',
      dataIndex: 'taskNodeName',
    },
    {
      title: '审批人员',
      key: 'createBy',
      dataIndex: 'createBy',
    },
    {
      title: '审批意见',
      key: 'approvalComments',
      dataIndex: 'approvalComments',
    },
    {
      title: '处理结果',
      key: 'radioValue',
      dataIndex: 'radioValue',
      render: (val, recored) => <>{obj[recored.radioValue]}</>,
    },
    {
      title: '附件',
      key: 'fileList',
      dataIndex: 'fileList',
      width: '25%',
      ellipsis: true,
      render: (_, recored) =>
        recored.fileList ? <ComUpload isDetail value={JSON.parse(recored.fileList)} /> : <>-</>,
    },
  ]

  // 获取审核历史
  const getList = async () => {
    const { data } = await leaveHistory(id)
    setSpinning(false)
    return {
      data,
    }
  }

  return (
    // <ComCard title="审批记录">
    <Spin spinning={spinning}>
      <SimpleProtable rowKey="id" columns={columns} request={getList} />
    </Spin>
    // </ComCard>
  )
}

export default ApprovalHistory
