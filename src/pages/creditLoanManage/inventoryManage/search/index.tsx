import React, { useState, useRef, useEffect } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { inventorySearchListProps, inventorySearchListParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { getInventorySearchList, getWareHouseSelectList } from '@/services'
import DictSelect from '@/components/ComSelect'
import { formatAmount } from '@/utils/base'
import { Select } from 'antd'

const { Option } = Select

const ListManage: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const [wareList, setWareList] = useState<any>([])
  const [stockType, setStockType] = useState<any>([])

  // 获取仓库列表
  const getWareList = async () => {
    const { data } = await getWareHouseSelectList()
    if (data) {
      setWareList(data)
    }
  }

  useEffect(() => {
    getWareList()
  }, [])

  const columns: ProColumns<inventorySearchListProps>[] = [
    {
      title: '企业名称',
      key: 'enterpriseName',
      dataIndex: 'enterpriseName',
    },
    {
      title: '商品编号/ID',
      key: 'fullName',
      dataIndex: 'fullName',
      hideInSearch: true,
    },
    {
      title: '商品名称',
      key: 'goodName',
      dataIndex: 'goodName',
    },
    {
      title: '条形码',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: '仓库名称',
      key: 'warehouseName',
      dataIndex: 'warehouseName',
      hideInTable: true,
      renderFormItem: () => (
        <Select>
          {wareList.map((item: any) => (
            <Option key={item.id} value={item.id}>
              {item.warehouseName}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: '仓库名称',
      key: 'warehouseName',
      dataIndex: 'warehouseName',
      hideInSearch: true,
    },
    {
      title: '是否质押',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: '库存类型',
      key: 'stockType',
      dataIndex: 'stockType',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return (
          <DictSelect
            authorword="stock_type"
            getDictData={(data: any) => {
              setStockType(data)
            }}
          />
        )
      },
    },
    {
      title: '库存类型',
      key: 'stockType',
      dataIndex: 'stockType',
      hideInSearch: true,
      render: (_, recored) => stockType[recored.stockType],
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
      key: 'unit',
      dataIndex: 'unit',
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
