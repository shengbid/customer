import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { cooperateListProps, cooperateListParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { message, Typography } from 'antd'
import { getCooperateCustomerList, deleteCooperateCustomer } from '@/services'
import DictSelect from '@/components/ComSelect'
import AddModal from './components/addModal'
import { useIntl, history } from 'umi'
import DictShow from '@/components/ComSelect/dictShow'

const { MenuAddButton } = MenuProTable
const { Link } = Typography

const RoleManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [id, setId] = useState<any>()
  const intl = useIntl()
  const actionRef = useRef<ActionType>()
  const [statusData, setStatusData] = useState<any>([])

  // 删除
  const delteRecored = async (ids: number | string) => {
    await deleteCooperateCustomer(ids)
    message.success(
      intl.formatMessage({
        id: 'pages.form.delete',
      }),
    )
    actionRef.current?.reload()
  }

  const columns: ProColumns<cooperateListProps>[] = [
    {
      title: '客户名称',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: '客户简称',
      key: 'shortName',
      dataIndex: 'shortName',
    },
    {
      title: '企业类型',
      key: 'enterpriseTypes',
      dataIndex: 'enterpriseTypes',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return (
          <DictSelect
            authorword="enterprise_type"
            mode="multiple"
            dataType="array"
            getDictData={(data: any) => {
              setStatusData(data)
            }}
          />
        )
      },
    },
    {
      title: '企业类型',
      key: 'enterpriseType',
      dataIndex: 'enterpriseType',
      hideInSearch: true,
      render: (_, recored) => (
        <DictShow dictValue={recored.enterpriseType.split(',')} dictData={statusData} />
      ),
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      hideInSearch: true,
      valueType: 'dateTime',
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
          key="detail"
          onClick={() => {
            history.push({
              pathname: '/customerManage/cooperate/detail',
              query: {
                enterpriseId: String(recored.id),
                companyName: recored.fullName,
              },
            })
          }}
        >
          详情
        </Link>,
        <Link
          key="delete"
          onClick={() => {
            delteRecored(recored.id)
          }}
        >
          删除
        </Link>,
      ],
    },
  ]

  const getList = async (param: cooperateListParamProps) => {
    if (param.enterpriseTypes) {
      Reflect.set(param, 'enterpriseType', param.enterpriseTypes.join(','))
    }
    const { rows, total } = await getCooperateCustomerList(param)
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

export default RoleManage
