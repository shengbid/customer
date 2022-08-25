/*
 * @Author: liulinfan
 * @Date: 2022-08-24 14:03:26
 * @Last Modified by: liulinfan
 * @Last Modified time: 2022-08-24 19:01:58
 */
import React, { useState, useEffect } from 'react'
import ProTable from '@ant-design/pro-table'
import type { ProColumns } from '@ant-design/pro-table'
import type { FinancingOrderType } from '@/services/types'

const FinancingOrder: React.FC = () => {
  const [columns, setColumns] = useState<ProColumns<FinancingOrderType>[]>([])
  useEffect(() => {
    const col: ProColumns<FinancingOrderType>[] = [
      {
        title: '融资订单编号',
        dataIndex: 'orderNo',
      },
      {
        title: '客户名称',
        dataIndex: 'customerName',
      },
      {
        title: '金融产品',
        dataIndex: 'productName',
      },
      {
        title: '申请代垫资金',
        dataIndex: 'moneyUse',
        hideInSearch: true,
      },
      {
        title: '垫资期限',
        dataIndex: 'timeLimit',
        hideInSearch: true,
      },
      {
        title: '融资起止时间',
        dataIndex: 'datePeriod',
      },
      {
        title: '审核节点',
        dataIndex: 'orderNo',
        hideInSearch: true,
      },
      {
        title: '融资状态',
        dataIndex: 'financingStatus',
      },
      {
        title: '逾期状态',
        dataIndex: 'overdueStatus',
      },
      {
        title: '申请时间',
        dataIndex: 'applyDate',
        hideInSearch: true,
      },
      {
        title: '操作',
        dataIndex: 'action',
        hideInSearch: true,
      },
    ]
    setColumns(col)
  }, [])
  return <ProTable columns={columns} search={{ labelWidth: 'auto' }} />
}

export default FinancingOrder
