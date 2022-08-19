import React, { useState } from 'react'
import { Typography, Button } from 'antd'
import ComCard from '@/components/ComPage/ComCard'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import { getCreditHistory } from '@/services'
import type { ProColumns } from '@ant-design/pro-table'
import DictShow from '@/components/ComSelect/dictShow'
import styles from './index.less'
import { history } from 'umi'
import ComPageContanier from '@/components/ComPage/ComPagContanier'
import { toApprovalDetailPage } from '@/utils/approval'

const { Link } = Typography

const Detail: React.FC = (props: any) => {
  const [activeKey, setActiveKey] = useState<string>('1')
  const { enterpriseId, cusEnterpriseCredit, companyName } = props.location.query

  const getDetail = async () => {
    const { rows } = await getCreditHistory(enterpriseId, cusEnterpriseCredit)
    return {
      data: rows,
    }
  }

  const columns: ProColumns<any>[] = [
    {
      title: '流程编号',
      key: 'taskNumber',
      dataIndex: 'taskNumber',
    },
    {
      title: '审核状态',
      dataIndex: 'auditStatus',
      width: '30%',
      render: (_, recored) => <DictShow dictValue={recored.auditStatus} dictkey="cus_shzt" />,
    },
    {
      title: '审核完成时间',
      key: 'updateTime',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      width: 170,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <Link
          key="approval"
          onClick={async () => {
            toApprovalDetailPage('credit', {
              title: `${companyName}-授信审核`,
              taskNumber: recored.taskNumber,
            })
            // console.log(props.location)
            const search =
              props.location.search.indexOf('?') > -1
                ? props.location.search
                : `?${props.location.search}`
            sessionStorage.setItem('preUrl', `${props.location.pathname}${search}`)
          }}
        >
          详情
        </Link>,
      ],
    },
  ]

  const tabList = [
    {
      tab: '授信信息',
      key: '1',
    },
    {
      tab: '授信审核记录',
      key: '2',
    },
  ]
  return (
    <ComPageContanier
      title={companyName}
      extra={
        <Button
          className={styles.back}
          type="primary"
          onClick={() => history.push('/creditLoanManage/creditManage')}
        >
          返回
        </Button>
      }
      tabList={tabList}
      onTabClick={setActiveKey}
    >
      {activeKey === '2' ? (
        <ComCard title="授信审核记录">
          <SimpleProtable key="id" columns={columns} request={getDetail} />
        </ComCard>
      ) : null}
    </ComPageContanier>
  )
}

export default Detail
