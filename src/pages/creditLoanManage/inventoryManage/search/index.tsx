import React, { useState, useRef, useEffect } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { inventorySearchListProps, inventorySearchListParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { getInventorySearchList, getWareHouseSelectList } from '@/services'
import DictSelect from '@/components/ComSelect'
import { formatAmount } from '@/utils/base'
import { Select } from 'antd'
import { getDictData } from '@/utils/dictData'

const { Option } = Select

const ListManage: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const [wareList, setWareList] = useState<any>([])
  const [stockType, setStockType] = useState<any>([])
  const [pledgeType, setPledgeType] = useState<any>([])

  const getDict = async () => {
    const obj = await getDictData('stock_type')
    setStockType(obj)
  }

  // 获取仓库列表
  const getWareList = async () => {
    const { data } = await getWareHouseSelectList()
    if (data) {
      setWareList(data)
    }
  }

  useEffect(() => {
    getDict()
    getWareList()
  }, [])

  const columns: ProColumns<inventorySearchListProps>[] = [
    {
      title: '企业名称',
      key: 'enterpriseName',
      dataIndex: 'enterpriseName',
      width: '14%',
    },
    {
      title: '商品编号/ID',
      key: 'enterpriseGoodNumber',
      dataIndex: 'enterpriseGoodNumber',
      hideInSearch: true,
    },
    {
      title: '商品名称',
      key: 'goodName',
      dataIndex: 'goodName',
    },
    {
      title: '条形码',
      key: 'barCode',
      dataIndex: 'barCode',
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
      title: '质押状态',
      key: 'auditStatus',
      dataIndex: 'auditStatus',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return (
          <DictSelect
            authorword="stock_audit_status"
            getDictData={(data: any) => {
              setPledgeType(data)
            }}
          />
        )
      },
    },
    {
      title: '质押状态',
      key: 'auditStatus',
      dataIndex: 'auditStatus',
      hideInSearch: true,
      render: (_, recored) => pledgeType[recored.auditStatus],
    },
    // {
    //   title: '库存类型',
    //   key: 'stockType',
    //   dataIndex: 'stockType',
    //   hideInTable: true,
    //   renderFormItem: (_, { type }) => {
    //     if (type === 'form') {
    //       return null
    //     }
    //     return (
    //       <DictSelect
    //         authorword="stock_type"
    //         getDictData={(data: any) => {
    //           setStockType(data)
    //         }}
    //       />
    //     )
    //   },
    // },
    {
      title: '库存类型',
      key: 'stockType',
      dataIndex: 'stockType',
      hideInSearch: true,
      render: (_, recored) => stockType[recored.stockType],
    },
    {
      title: '良品数量/残次品数量',
      key: 'completeCount',
      dataIndex: 'completeCount',
      hideInSearch: true,
      width: 150,
      render: (val, recored) => (
        <>
          {val}/{recored.imperfectCount}
        </>
      ),
    },
    {
      title: '效期截止日',
      key: 'effectiveDate',
      dataIndex: 'effectiveDate',
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
      key: 'batchNumber',
      dataIndex: 'batchNumber',
      hideInSearch: true,
    },
    {
      title: '公允单价',
      key: 'fairPrice',
      dataIndex: 'fairPrice',
      // valueType: 'digit',
      width: 90,
      hideInSearch: true,
      render: (val) => formatAmount(val),
    },
    {
      title: '库存估值',
      key: 'goodValuation',
      dataIndex: 'goodValuation',
      // valueType: 'digit',
      width: 97,
      hideInSearch: true,
      render: (val) => formatAmount(val),
    },
    {
      title: '单位',
      key: 'unit',
      dataIndex: 'unit',
      width: 77,
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
