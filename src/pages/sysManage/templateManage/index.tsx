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
  const [info, setInfo] = useState<any>()
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
      title: '模板名称',
      dataIndex: 'type',
    },
    {
      title: '模板ID',
      dataIndex: 'title',
      hideInSearch: true,
    },
    {
      title: '附件',
      key: 'reason',
      dataIndex: 'reason',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({
        id: 'pages.table.option',
      }),
      width: 220,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <Link
          key="picture"
          onClick={() => {
            setInfo(recored.id)
            setModalVisible(true)
          }}
        >
          修改
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
              setInfo(null)
              setModalVisible(true)
            }}
          />
        }
      />

      <AddModal
        modalVisible={modalVisible}
        handleSubmit={submit}
        info={info}
        handleCancel={() => setModalVisible(false)}
      />
    </>
  )
}

export default Leave
