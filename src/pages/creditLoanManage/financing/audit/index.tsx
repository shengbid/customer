/*
 * @Author: liulinfan
 * @Date: 2022-08-24 14:03:38
 * @Last Modified by: liulinfan
 * @Last Modified time: 2022-08-24 18:32:03
 */
import React, { useState, useEffect } from 'react'
import ProTable from '@ant-design/pro-table'
import type { ProColumns } from '@ant-design/pro-table'
import { Button } from 'antd'

type FinancingAuditItem = {
  orderNo: string
  customerName: string
  product: string
  money: string[]
  limit: number
  auditNode: string
  status: string
  applyDate: string
  action: string
}

const FinancingAudit: React.FC = () => {
  const [columns, setColumns] = useState<ProColumns<FinancingAuditItem>[]>([])
  useEffect(() => {
    const col: ProColumns<FinancingAuditItem>[] = [
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
        dataIndex: 'product',
      },
      {
        title: () => {
          return (
            <>
              <span>申请代垫资金</span>
              <br />
              <span>批复代垫资金</span>
            </>
          )
        },
        dataIndex: 'money',
        hideInSearch: true,
        render: (_, record) => {
          const { money = [] } = record
          return money.map((o) => {
            return (
              <>
                <span key={o}>{o}</span>
                <br />
              </>
            )
          })
        },
      },
      {
        title: '垫资期限',
        dataIndex: 'limit',
        hideInSearch: true,
      },
      {
        title: () => {
          return (
            <>
              <span>审核节点/</span>
              <br />
              <span>节点处理人</span>
            </>
          )
        },
        dataIndex: 'auditNode',
        hideInSearch: true,
      },
      {
        title: '审核状态',
        dataIndex: 'status',
        hideInSearch: true,
      },
      {
        title: '申请时间',
        dataIndex: 'applyDate',
        hideInSearch: true,
      },
      {
        title: '申请时间',
        dataIndex: 'applyDate',
        valueType: 'dateRange',
        hideInTable: true,
      },
      {
        title: '操作',
        dataIndex: 'action',
        hideInSearch: true,
        render: () => {
          return (
            <Button size={'small'} type={'link'}>
              详情
            </Button>
          )
        },
      },
    ]
    setColumns(col)
  }, [])
  const loadData = async () => {
    const ret: FinancingAuditItem[] = []
    for (let index = 0; index < 10; index++) {
      const o: FinancingAuditItem = {
        orderNo: 'RZ2022XXX',
        customerName: '香港xxx公司',
        product: '池融易（代理采购）',
        money: ['$200000', '$300000'],
        limit: 90,
        auditNode: '',
        status: '审核中',
        applyDate: '2022-08-08 10:00:00',
        action: '详情',
      }
      ret.push(o)
    }
    return Promise.resolve({
      data: ret,
      success: true,
    })
  }
  return <ProTable columns={columns} search={{ labelWidth: 'auto' }} request={loadData} />
}

export default FinancingAudit
