import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { creditListProps, creditListParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { Typography, message, Popconfirm } from 'antd'
import { history } from 'umi'
import { editCeditQutoStatus, getCeditList } from '@/services'
import DictSelect from '@/components/ComSelect'
import { formatEmpty } from '@/utils/base'
import { toApprovalPage } from '@/utils/approval'

const { Link } = Typography

const CreditManage: React.FC = () => {
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

  // 改变额度状态
  const editQutoStatus = async (params: { id: number; quotaStatus: string }) => {
    await editCeditQutoStatus(params)
    message.success('更新成功')
    actionRef.current?.reload()
  }

  const columns: ProColumns<creditListProps>[] = [
    {
      title: '授信企业名称',
      dataIndex: 'enterpriseCreditName',
      width: '27%',
    },
    {
      title: '授信生效日/授信到期日',
      dataIndex: 'creditBecomDate',
      hideInSearch: true,
      render: (_, recored) => (
        <>
          {formatEmpty(recored.creditBecomDate)}
          {recored.creditExpireDate ? `/${recored.creditExpireDate}` : ''}
        </>
      ),
    },
    {
      title: '授信生效日',
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
      title: '授信到期日',
      dataIndex: 'creditExpireDate',
      hideInTable: true,
      valueType: 'dateRange',
      search: {
        transform: (value: any) => ({
          creditExpireDateStart: value[0],
          creditExpireDateEnd: value[1],
        }),
      },
    },
    {
      title: '审核状态',
      key: 'auditStatus',
      dataIndex: 'auditStatus',
      hideInSearch: true,
      render: (_, recored) => <>{auditStatusData[recored.auditStatus]}</>,
    },
    {
      title: '审核状态',
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
      title: '额度状态',
      key: 'quotaStatus',
      dataIndex: 'quotaStatus',
      hideInSearch: true,
      render: (_, recored) => <>{quatoStatusData[recored.quotaStatus]}</>,
    },
    {
      title: '额度状态',
      key: 'quotaStatus',
      dataIndex: 'quotaStatus',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return <DictSelect authorword="cus_edzt" getDictData={setQuatoStatusData} />
      },
    },
    {
      title: '操作',
      width: 170,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <Link
          key="approval"
          disabled={Number(recored.auditStatus) !== 2}
          onClick={() => {
            toApprovalPage('crtedit', {
              taskNumber: recored.taskNumber,
            })
            // const { data } = await getActivityParams(recored.taskNumber)
            // history.push({
            //   pathname: '/leaderPage/undone/approval',
            //   query: {
            //     id: data.id,
            //     businessKey: data.businessKey,
            //     taskNodeName: data.name,
            //     instanceId: data.instanceId,
            //     formKey: data.formKey,
            //     title: `${recored.enterpriseCreditName}-授信审核-${data.name}`,
            //   },
            // })
            sessionStorage.setItem('preUrl', '/creditLoanManage/creditManage')
          }}
        >
          审核
        </Link>,
        <Link
          key="detail"
          onClick={() => {
            history.push({
              pathname: '/creditLoanManage/creditManage/detail',
              query: {
                cusEnterpriseCredit: String(recored.id),
                enterpriseId: String(recored.enterpriseId),
                companyName: recored.enterpriseCreditName,
              },
            })
          }}
        >
          详情
        </Link>,
        recored.quotaStatus ? (
          <Popconfirm
            key="dis"
            title={recored.quotaStatus === 'ky' ? '是否确定禁用?' : '是否确定启用?'}
            onConfirm={() => editQutoStatus({ id: recored.id, quotaStatus: recored.quotaStatus })}
            okText="确定"
            cancelText="取消"
          >
            <Link disabled={recored.quotaStatus === 'ygq' || recored.quotaStatus === 'wsx'}>
              {recored.quotaStatus === 'ky' ? '禁用' : '启用'}
            </Link>
          </Popconfirm>
        ) : null,
      ],
    },
  ]
  return <MenuProTable<any> rowKey="id" actionRef={actionRef} request={getList} columns={columns} />
}

export default CreditManage
