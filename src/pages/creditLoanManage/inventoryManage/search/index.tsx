import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { inventorySearchListProps, inventorySearchListParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { getInventorySearchList } from '@/services'
import DictSelect from '@/components/ComSelect'
import { formatAmount } from '@/utils/base'

const ListManage: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const [statusData, setStatusData] = useState<any>([])

  const columns: ProColumns<inventorySearchListProps>[] = [
    {
      title: '企业名称',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: '商品编号/ID',
      key: 'fullName',
      dataIndex: 'fullName',
      hideInSearch: true,
    },
    {
      title: '商品名称',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: '条形码',
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
      title: '仓库名称',
      key: 'enterpriseType',
      dataIndex: 'enterpriseType',
      hideInSearch: true,
      render: (_, recored) => statusData[recored.enterpriseType],
    },
    {
      title: '是否质押',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: '库存类型',
      key: 'enterpriseType',
      dataIndex: 'enterpriseType',
      hideInTable: true,
      hideInSearch: true,
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
      title: '良品数量/残次品数量',
      key: 'createTime',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '效期截止日',
      key: 'code',
      dataIndex: 'code',
      width: 90,
      hideInSearch: true,
    },
    // {
    //   title: '入库单号',
    //   key: 'createTime',
    //   dataIndex: 'createTime',
    //   // hideInSearch: true,
    // },
    {
      title: '批次号',
      key: 'createTime',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '公允单价',
      key: 'code',
      dataIndex: 'code',
      // valueType: 'digit',
      width: 110,
      hideInSearch: true,
      render: (val) => formatAmount(val),
    },
    {
      title: '库存估值',
      key: 'code',
      dataIndex: 'code',
      // valueType: 'digit',
      width: 127,
      hideInSearch: true,
      render: (val) => formatAmount(val),
    },
    {
      title: '单位',
      key: 'createTime',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
  ]

  const getList = async (param: inventorySearchListParamProps) => {
    console.log(param)
    const { rows, total } = await getInventorySearchList(param)
    return {
      data: rows,
      total,
    }
  }

  return (
    <>
      <MenuProTable<inventorySearchListProps>
        request={getList}
        rowKey="id"
        scroll={{ x: 1400 }}
        columns={columns}
        actionRef={actionRef}
        tableAlertRender={false}
      />
    </>
  )
}

export default ListManage
