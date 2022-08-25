/*
 * @Author: liulinfan
 * @Date: 2022-08-24 10:29:11
 * @Last Modified by: liulinfan
 * @Last Modified time: 2022-08-24 19:01:25
 */
import React, { useState, useEffect } from 'react'
import ProTable from '@ant-design/pro-table'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { Button } from 'antd'
type RepayAuditItem = {
  orderId: string
  customerName: string
  money: string[]
  payDate: string
  applyDate: string
  status: string
  auditNode: string
  action: string
}

const RepayAudit: React.FC = () => {
  const [columns, setColumns] = useState<ProColumns<RepayAuditItem>[]>([])
  useEffect(() => {
    const col: ProColumns<RepayAuditItem>[] = [
      {
        title: '申请订单编号',
        dataIndex: 'orderId',
      },
      {
        title: '客户名称',
        dataIndex: 'customerName',
      },
      {
        title: () => {
          return (
            <>
              <span>偿还代垫资金</span>
              <br />
              <span>偿还费用</span>
              <br />
              <span>还款总额</span>
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
        title: '还款日期',
        dataIndex: 'payDate',
        hideInSearch: true,
      },
      {
        title: '申请时间',
        dataIndex: 'applyDate',
        hideInSearch: true,
      },
      {
        title: '状态',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: {
          auditin: {
            text: '审核中',
            status: '',
          },
          auditreject: {
            text: '审核拒绝',
            status: '',
          },
          topayover: {
            text: '待结清',
            status: '',
          },
          payover: {
            text: '已结清',
            status: '',
          },
        },
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
  const loadData = async (params, sort, filter) => {
    const ret: RepayAuditItem[] = []
    for (let index = 0; index < 10; index++) {
      const o: RepayAuditItem = {
        orderId: 'RZ2022XXX',
        customerName: '广东罗浮宫国际家具博览中心有限公司',
        money: ['$200000', '$300000', '$4000000'],
        payDate: '2022-08-22',
        applyDate: '2022-08-08 10:00:00',
        status: '审核中',
        auditNode: '正常',
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

export default RepayAudit
