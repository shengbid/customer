import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { cooperateListProps, cooperateListParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { message, Typography, Popconfirm } from 'antd'
import { getLoanCustomerList, deleteLoanCustomer } from '@/services'
import DictSelect from '@/components/ComSelect'
import AddModal from './components/addModal'
import { useIntl, history } from 'umi'

// const { MenuAddButton } = MenuProTable
const { Link } = Typography

const ListManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [id] = useState<any>()
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
      title: '质押申请编号',
      key: 'fullName',
      dataIndex: 'fullName',
      hideInSearch: true,
    },
    {
      title: '货主名称',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: '关联融资单号',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: '仓库',
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
      title: '质押类型',
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
      title: '质押类型',
      key: 'enterpriseType',
      dataIndex: 'enterpriseType',
      hideInSearch: true,
      render: (_, recored) => statusData[recored.enterpriseType],
    },
    {
      title: '库存类型',
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
      title: '库存类型',
      key: 'enterpriseType',
      dataIndex: 'enterpriseType',
      hideInSearch: true,
      render: (_, recored) => statusData[recored.enterpriseType],
    },
    {
      title: '入库总数',
      key: 'code',
      dataIndex: 'code',
      valueType: 'digit',
      width: 110,
      hideInSearch: true,
    },
    {
      title: '商品估值(美元)',
      key: 'code',
      dataIndex: 'code',
      valueType: 'digit',
      width: 127,
      hideInSearch: true,
    },
    {
      title: '状态',
      key: 'createTime',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '转在仓状态',
      key: 'createTime',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({
        id: 'pages.table.option',
      }),
      width: 180,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, recored) => [
        <Link
          key="edit"
          onClick={() =>
            history.push({
              pathname: '/creditLoanManage/inventoryManage/enter/detail',
              query: {
                id: recored.id,
                type: '1',
              },
            })
          }
        >
          转在途
        </Link>,
        <Link
          key="edit2"
          onClick={() =>
            history.push({
              pathname: '/creditLoanManage/inventoryManage/enter/detail',
              query: {
                id: recored.id,
              },
            })
          }
        >
          转在仓
        </Link>,
        <Link
          key="edit3"
          onClick={() => {
            setModalVisible(true)
          }}
        >
          质押
        </Link>,
        <Link
          key="detail"
          onClick={() =>
            history.push({
              pathname: '/creditLoanManage/inventoryManage/enter/detail',
              query: {
                id: recored.id,
                type: '3',
              },
            })
          }
        >
          查看
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
        scroll={{ x: 1400 }}
        actionRef={actionRef}
        // headerTitle={
        //   <MenuAddButton
        //     authorword="system:post:add"
        //     onClick={() => {
        //       setId(null)
        //       setModalVisible(true)
        //     }}
        //   />
        // }
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
