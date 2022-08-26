import React, { useState, useRef, useEffect } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { inventoryEnterListProps, inventoryEnterListParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { /*message, Popconfirm,*/ Typography, Select } from 'antd'
import { getInventoryEnterList, getWareHouseSelectList } from '@/services'
import DictSelect from '@/components/ComSelect'
import AddModal from './components/addModal'
import { useIntl, history } from 'umi'
import { formatAmount } from '@/utils/base'
import { getDictData } from '@/utils/dictData'

const { Link } = Typography
const { Option } = Select

const ListManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [id, setId] = useState<any>()
  const intl = useIntl()
  const actionRef = useRef<ActionType>()
  const [statusData, setStatusData] = useState<any>([])
  const [auditStatus, setAuditStatus] = useState<any>([])
  const [pledgeType, setPledgeType] = useState<any>([])
  const [stockType, setStockType] = useState<any>([])
  const [wareList, setWareList] = useState<any>([])

  const getDict = async () => {
    const obj = await getDictData('in_warehouse_status')
    setStatusData(obj)
  }
  const getDict2 = async () => {
    const obj = await getDictData('pledge_audit_status')
    setAuditStatus(obj)
  }
  useEffect(() => {
    getDict()
    getDict2()
  }, [])

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

  const columns: ProColumns<inventoryEnterListProps>[] = [
    {
      title: '质押申请编号',
      key: 'pledgeApplyNumber',
      dataIndex: 'pledgeApplyNumber',
      hideInSearch: true,
    },
    {
      title: '货主名称',
      key: 'enterpriseName',
      dataIndex: 'enterpriseName',
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
      title: '仓库',
      key: 'warehouseName',
      dataIndex: 'warehouseName',
      hideInSearch: true,
    },
    {
      title: '关联融资单号',
      key: 'financOrder',
      dataIndex: 'financOrder',
    },
    {
      title: '质押类型',
      key: 'pledgeType',
      dataIndex: 'pledgeType',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return (
          <DictSelect
            authorword="pledge_type"
            getDictData={(data: any) => {
              setPledgeType(data)
            }}
          />
        )
      },
    },
    {
      title: '质押类型',
      key: 'pledgeType',
      dataIndex: 'pledgeType',
      hideInSearch: true,
      render: (_, recored) => pledgeType[recored.pledgeType],
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
      title: '入库总数',
      key: 'warehouseTotal',
      dataIndex: 'warehouseTotal',
      valueType: 'digit',
      width: 110,
      hideInSearch: true,
    },
    {
      title: '商品估值',
      key: 'goodValuation',
      dataIndex: 'goodValuation',
      // valueType: 'digit',
      width: 127,
      hideInSearch: true,
      render: (val) => formatAmount(val),
    },
    {
      title: '状态',
      key: 'auditStatus',
      dataIndex: 'auditStatus',
      hideInSearch: true,
      render: (_, recored) => auditStatus[recored.auditStatus],
    },
    {
      title: '转在仓状态',
      key: 'inWarehouseStatus',
      dataIndex: 'inWarehouseStatus',
      hideInSearch: true,
      render: (_, recored) => statusData[recored.auditStatus],
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
      width: 150,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, recored) => [
        Number(recored.auditStatus) === 5 && recored.stockType === 'dqrkc' ? (
          <Link
            key="edit"
            onClick={() =>
              history.push({
                pathname: '/creditLoanManage/inventoryManage/enter/addPledge',
                query: {
                  id: String(recored.id),
                  type: '2',
                },
              })
            }
          >
            转在途
          </Link>
        ) : null,
        Number(recored.auditStatus) === 5 && recored.inWarehouseStatus === 'wzzczt' ? (
          <Link
            key="edit2"
            onClick={() =>
              history.push({
                pathname: '/creditLoanManage/inventoryManage/enter/addPledge',
                query: {
                  id: String(recored.id),
                  type: '3',
                },
              })
            }
          >
            转在仓
          </Link>
        ) : null,
        Number(recored.auditStatus) === 3 ? (
          <Link
            key="edit3"
            onClick={() => {
              setModalVisible(true)
              setId(recored.id)
            }}
          >
            质押
          </Link>
        ) : null,
        <Link
          key="detail"
          onClick={() =>
            history.push({
              pathname: '/creditLoanManage/inventoryManage/enter/detail',
              query: {
                id: String(recored.id),
              },
            })
          }
        >
          查看
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

  const getList = async (param: inventoryEnterListParamProps) => {
    console.log(param)
    const { rows, total } = await getInventoryEnterList(param)
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
      <MenuProTable<inventoryEnterListProps>
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
