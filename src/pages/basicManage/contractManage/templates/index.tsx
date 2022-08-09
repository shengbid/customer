import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { creditListProps, creditListParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
// import { history } from 'umi'
import { getCeditList } from '@/services'
import DictSelect from '@/components/ComSelect'

// 合同模板管理
const Agreement: React.FC = () => {
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

  const columns: ProColumns<creditListProps>[] = [
    {
      title: '合同模板编号',
      dataIndex: 'enterpriseCreditName',
      width: '20%',
    },
    {
      title: 'Docusign合同模板名称',
      dataIndex: 'enterpriseCreditName',
      width: '25%',
    },
    {
      title: 'Docusign合同模板ID',
      dataIndex: 'enterpriseCreditName',
      width: '20%',
    },
    {
      title: '合同模板类型',
      hideInSearch: true,
      dataIndex: 'quotaStatus',
      width: '15%',
      render: (_, recored) => <>{quatoStatusData[recored.quotaStatus]}</>,
    },
    {
      title: '合同模板类型',
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
  ]
  return <MenuProTable<any> rowKey="id" actionRef={actionRef} request={getList} columns={columns} />
}

export default Agreement
