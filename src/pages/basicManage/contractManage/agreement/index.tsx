import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { creditListProps, creditListParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { Typography, message } from 'antd'
// import { history } from 'umi'
import { editCeditQutoStatus, getCeditList } from '@/services'
import DictSelect from '@/components/ComSelect'

const { Link } = Typography

const Agreement: React.FC = () => {
  const [auditStatusData, setAuditStatusData] = useState<any>()
  const [quatoStatusData, setQuatoStatusData] = useState<any>()
  const actionRef = useRef<ActionType>()

  const getList = async (param: creditListParamProps) => {
    // console.log(param)
    const { rows, total } = await getCeditList(param)

    return {
      data: rows,
      total,
    }
  }

  // 作废
  const editQutoStatus = async (params: { id: number; quotaStatus: string }) => {
    await editCeditQutoStatus(params)
    message.success('作废成功')
    actionRef.current?.reload()
  }

  const columns: ProColumns<creditListProps>[] = [
    {
      title: '合同编号',
      dataIndex: 'enterpriseCreditName',
      width: '10%',
    },
    {
      title: '合同名称',
      dataIndex: 'enterpriseCreditName',
      width: '15%',
    },
    {
      title: '合同类型',
      dataIndex: 'enterpriseCreditName',
      width: '12%',
    },
    {
      title: '签署方式',
      hideInSearch: true,
      dataIndex: 'quotaStatus',
      width: '10%',
      render: (_, recored) => <>{quatoStatusData[recored.quotaStatus]}</>,
    },
    {
      title: '签署方式',
      key: 'quotaStatus',
      dataIndex: 'quotaStatus',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return <DictSelect authorword="cus_shzt" getDictData={setQuatoStatusData} />
      },
    },
    {
      title: '签署时间',
      dataIndex: 'creditBecomDate',
      hideInSearch: true,
      valueType: 'date',
    },
    {
      title: '签署时间',
      dataIndex: 'creditBecomDate',
      hideInTable: true,
      valueType: 'dateRange',
      search: {
        transform: (value: any) => ({
          creditBecomDateStart: value[0],
          creditBecomDateEnd: value[1],
        }),
      },
    },
    {
      title: '签署企业/收件人及状态',
      key: 'auditStatus',
      dataIndex: 'auditStatus',
      width: '16%',
      hideInSearch: true,
      render: (_, recored) => <>{recored.auditStatus}</>,
    },
    {
      title: '签署状态',
      key: 'auditStatus',
      dataIndex: 'auditStatus',
      hideInSearch: true,
      render: (_, recored) => <>{auditStatusData[recored.auditStatus]}</>,
    },
    {
      title: '签署状态',
      key: 'auditStatus',
      dataIndex: 'auditStatus',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return <DictSelect authorword="cus_shzt" getDictData={setAuditStatusData} />
      },
    },
    {
      title: '操作',
      width: 170,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <Link key="approval" onClick={() => {}}>
          下载
        </Link>,
        recored.quotaStatus === 'ygq' ? (
          <Link
            key="dis"
            onClick={() => {
              editQutoStatus(recored)
            }}
          >
            作废
          </Link>
        ) : null,
        <Link key="detail" onClick={() => {}}>
          去签署
        </Link>,
      ],
    },
  ]
  return <MenuProTable<any> rowKey="id" actionRef={actionRef} request={getList} columns={columns} />
}

export default Agreement
