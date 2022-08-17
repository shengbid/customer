import React, { useState, useRef, useEffect } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { warehouseListProps, warehouseListParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { message, Typography, Popconfirm, Select } from 'antd'
import { getWarehouseList, deleteWarehouse, getWareCompanyList } from '@/services'
import DictSelect from '@/components/ComSelect'
import AddModal from './components/addModal'
import { useIntl } from 'umi'

const { MenuAddButton } = MenuProTable
const { Link } = Typography
const { Option } = Select

const ListManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [id, setId] = useState<any>()
  const intl = useIntl()
  const actionRef = useRef<ActionType>()
  const [statusData, setStatusData] = useState<any>([])
  const [companyList, setCompanyList] = useState<any[]>([])

  // 获取物流企业下拉
  const getWareList = async () => {
    const { data } = await getWareCompanyList()
    if (data) {
      setCompanyList(data)
    }
  }

  useEffect(() => {
    getWareList()
  }, [])

  // 删除
  const delteRecored = async (ids: number | string) => {
    await deleteWarehouse(ids)
    message.success(
      intl.formatMessage({
        id: 'pages.form.delete',
      }),
    )
    actionRef.current?.reload()
  }

  const columns: ProColumns<warehouseListProps>[] = [
    {
      title: '仓库编号',
      key: 'id',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '仓库名称',
      key: 'warehouseName',
      dataIndex: 'warehouseName',
    },
    {
      title: '仓库类型',
      key: 'warehouseType',
      dataIndex: 'warehouseType',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return (
          <DictSelect
            authorword="warehouse_type"
            getDictData={(data: any) => {
              setStatusData(data)
            }}
          />
        )
      },
    },
    {
      title: '仓库类型',
      key: 'warehouseType',
      dataIndex: 'warehouseType',
      hideInSearch: true,
      render: (_, recored) => statusData[recored.warehouseType],
    },
    {
      title: '所属物流企业',
      key: 'logistics',
      dataIndex: 'logistics',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return (
          <Select labelInValue>
            {companyList.map((item: any) => (
              <Option key={item.id} value={item.id}>
                {item.fullName}
              </Option>
            ))}
          </Select>
        )
      },
    },
    {
      title: '所属物流企业',
      key: 'logisticsEnterprise',
      dataIndex: 'logisticsEnterprise',
      hideInSearch: true,
    },
    {
      title: '仓库地址',
      key: 'warehouseAddress',
      dataIndex: 'warehouseAddress',
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
            setId(recored.id)
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

  const getList = async (param: warehouseListParamProps) => {
    if (param.logistics) {
      param.logisticsEnterpriseId = param.logistics.value
      param.logisticsEnterprise = param.logistics.label
    }
    const { rows, total } = await getWarehouseList(param)
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
      <MenuProTable<warehouseListProps>
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
