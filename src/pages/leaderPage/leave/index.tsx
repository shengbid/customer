import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { leaveListProps, leaveListParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { Typography } from 'antd'
import { getLeaveList } from '@/services'
import React, { useState, useRef } from 'react'
import AddModal from './components/addModal'
import { useIntl } from 'umi'

const { MenuAddButton } = MenuProTable

const { Link } = Typography
const Leave: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [id, setId] = useState<any>()
  const intl = useIntl()
  const actionRef = useRef<ActionType>()

  const getList = async (param: leaveListParamProps) => {
    // console.log(param)
    const { rows, total } = await getLeaveList(param)

    return {
      data: rows,
      total,
    }
  }

  const columns: ProColumns<leaveListProps>[] = [
    {
      title: '请假类型',
      dataIndex: 'type',
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '原因',
      key: 'reason',
      dataIndex: 'reason',
      hideInSearch: true,
    },
    {
      title: '开始时间',
      key: 'leaveStartTime',
      dataIndex: 'leaveStartTime',
      hideInSearch: true,
    },
    {
      title: '结束时间',
      key: 'leaveEndTime',
      dataIndex: 'leaveEndTime',
      hideInSearch: true,
    },
    {
      title: '状态',
      key: 'taskName',
      dataIndex: 'taskName',
    },
    {
      title: intl.formatMessage({
        id: 'pages.table.option',
      }),
      width: 220,
      key: 'option',
      valueType: 'option',
      render: () => [
        <Link key="picture" onClick={() => {}}>
          审批详情
        </Link>,
        <Link key="look" onClick={() => {}}>
          查看进度
        </Link>,
      ],
    },
  ]

  // 新增
  const submit = () => {
    setModalVisible(false)
    actionRef?.current?.reload()
  }

  return (
    <>
      <MenuProTable<any>
        rowKey="id"
        request={getList}
        columns={columns}
        actionRef={actionRef}
        headerTitle={
          <MenuAddButton
            authorword="system:post:add"
            onClick={() => {
              setId(null)
              setModalVisible(true)
            }}
          />
        }
      />

      <AddModal
        modalVisible={modalVisible}
        handleSubmit={submit}
        info={id}
        handleCancel={() => setModalVisible(false)}
      />
    </>
  )
}

export default Leave
