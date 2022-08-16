import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { cooperateListProps, cooperateListParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { Typography } from 'antd'
import { getLoanCustomerList } from '@/services'
import DictSelect from '@/components/ComSelect'
import { useIntl } from 'umi'

const { Link } = Typography

const ListManage: React.FC = () => {
  const intl = useIntl()
  const actionRef = useRef<ActionType>()
  const [statusData, setStatusData] = useState<any>([])

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
      render: () => [
        <Link key="edit" onClick={() => {}}>
          详情
        </Link>,
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

  return (
    <>
      <MenuProTable<cooperateListProps>
        request={getList}
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        tableAlertRender={false}
      />
    </>
  )
}

export default ListManage
