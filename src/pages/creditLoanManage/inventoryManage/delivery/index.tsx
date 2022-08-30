import React, { useState, useRef, useEffect } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { inventoryDeliveryListProps, inventoryDeliveryListParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { /*message, Popconfirm,*/ Typography, Select } from 'antd'
import { getInventoryDeliveryList, getWareHouseSelectList } from '@/services'
import { useIntl, history } from 'umi'

// const { MenuAddButton } = MenuProTable
const { Link } = Typography
const { Option } = Select

const ListManage: React.FC = () => {
  const intl = useIntl()
  const actionRef = useRef<ActionType>()
  // const [statusData, setStatusData] = useState<any>([])
  const [wareList, setWareList] = useState<any>([])

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

  // 删除
  // const delteRecored = async (ids: number | string) => {
  //   await deleteLoanCustomer(ids)
  //   message.success(
  //     intl.formatMessage({
  //       id: 'pages.form.delete',
  //     }),
  //   )
  //   actionRef.current?.reload()
  // }

  const columns: ProColumns<inventoryDeliveryListProps>[] = [
    {
      title: '出库单号',
      key: 'outWarehouseCode',
      dataIndex: 'outWarehouseCode',
      hideInSearch: true,
    },
    {
      title: '企业名称',
      key: 'enterpriseName',
      dataIndex: 'enterpriseName',
    },
    {
      title: '关联还款单号',
      key: 'repaymentCode',
      dataIndex: 'repaymentCode',
    },
    {
      title: '关联金融产品',
      key: 'financeProduct',
      dataIndex: 'financeProduct',
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
      title: '销售类型',
      key: 'saleType',
      dataIndex: 'saleType',
      hideInSearch: true,
      // render: (_, recored) => statusData[recored.enterpriseType],
    },
    {
      title: '出库数量',
      key: 'outWarehouseNumber',
      dataIndex: 'outWarehouseNumber',
      valueType: 'digit',
      width: 110,
      hideInSearch: true,
    },
    {
      title: '出库时间',
      key: 'createTime',
      dataIndex: 'createTime',
      hideInSearch: true,
      width: 148,
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
          onClick={() =>
            history.push({
              pathname: '/creditLoanManage/inventoryManage/delivery/detail',
              query: {
                id: String(recored.id),
              },
            })
          }
        >
          详情
        </Link>,
        // <Popconfirm
        //   key="delete"
        //   title="是否确认删除?"
        //   onConfirm={() => {
        //     delteRecored(recored.id)
        //   }}
        //   okText="确定"
        //   cancelText="取消"
        // >
        //   <Link>删除</Link>
        // </Popconfirm>,
      ],
    },
  ]

  const getList = async (param: inventoryDeliveryListParamProps) => {
    console.log(param)
    const { rows, total } = await getInventoryDeliveryList(param)
    return {
      data: rows,
      total,
    }
  }

  return (
    <>
      <MenuProTable<inventoryDeliveryListProps>
        request={getList}
        rowKey="id"
        scroll={{ x: 1200 }}
        columns={columns}
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
    </>
  )
}

export default ListManage
