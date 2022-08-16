import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { cooperateListProps, cooperateListParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { message, Typography, Popconfirm } from 'antd'
import { getLoanCustomerList, deleteLoanCustomer } from '@/services'
import DictSelect from '@/components/ComSelect'
import AddModal from './components/addModal'
import { useIntl } from 'umi'

const { MenuAddButton } = MenuProTable
const { Link } = Typography

const ListManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [id, setId] = useState<any>()
  const intl = useIntl()
  const actionRef = useRef<ActionType>()
  const [statusData, setStatusData] = useState<any>([])

  // 删除
  const delteRecored = async (ids: number | string) => {
    await deleteLoanCustomer(ids)
    message.success(
      intl.formatMessage({
        id: 'pages.form.delete',
      }),
    )
    actionRef.current?.reload()
  }

  const columns: ProColumns<cooperateListProps>[] = [
    {
      title: '仓库编号',
      key: 'fullName',
      dataIndex: 'fullName',
      hideInSearch: true,
    },
    {
      title: '仓库名称',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: '仓库类型',
      key: 'enterpriseType',
      dataIndex: 'enterpriseType',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return (
          <DictSelect
            authorword="credit_status"
            getDictData={(data: any) => {
              setStatusData(data)
            }}
          />
        )
      },
    },
    {
      title: '仓库类型',
      key: 'enterpriseType',
      dataIndex: 'enterpriseType',
      hideInSearch: true,
      render: (_, recored) => statusData[recored.enterpriseType],
    },
    {
      title: '所属物流企业',
      key: 'enterpriseType',
      dataIndex: 'enterpriseType',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return (
          <DictSelect
            authorword="credit_status"
            getDictData={(data: any) => {
              setStatusData(data)
            }}
          />
        )
      },
    },
    {
      title: '所属物流企业',
      key: 'enterpriseType',
      dataIndex: 'enterpriseType',
      hideInSearch: true,
      render: (_, recored) => statusData[recored.enterpriseType],
    },
    {
      title: '仓库地址',
      key: 'createTime',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({
        id: 'pages.table.option',
      }),
      width: 110,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <Link
          key="edit"
          onClick={() => {
            setModalVisible(true)
          }}
        >
          编辑
        </Link>,
        <Popconfirm
          key="delete"
          title="是否确认删除?"
          onConfirm={() => {
            delteRecored(recored.id)
          }}
          okText="确定"
          cancelText="取消"
        >
          <Link>删除</Link>
        </Popconfirm>,
      ],
    },
  ]

  const getList = async (param: cooperateListParamProps) => {
    console.log(param)
    const { rows, total } = await getLoanCustomerList(param)
    return {
      data: rows,
      total,
    }
  }

  // 新增
  const submit = () => {
    setModalVisible(false)
    actionRef?.current?.reload()
  }

  return (
    <>
      <MenuProTable<cooperateListProps>
        request={getList}
        rowKey="id"
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
        tableAlertRender={false}
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

export default ListManage
