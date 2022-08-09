import React, { useState } from 'react'
import { Typography, Button } from 'antd'
import ComCard from '@/components/ComPage/ComCard'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import { getCreditHistory, getActivityParams } from '@/services'
import type { ProColumns } from '@ant-design/pro-table'
import DictShow from '@/components/ComSelect/dictShow'
import styles from './index.less'
import { history } from 'umi'
import ComPageContanier from '@/components/ComPage/ComPagContanier'

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
      title: '任务编号',
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
            const { data } = await getActivityParams(recored.taskNumber)
            history.push({
              pathname: '/leaderPage/undone/approval',
              query: {
                id: data.id,
                businessKey: data.businessKey,
                taskNodeName: data.name,
                instanceId: data.instanceId,
                formKey: data.formKey,
                detail: 'detail',
              },
            })
            console.log(props.location)
            sessionStorage.setItem('preUrl', `${props.location.pathname}?${props.location.search}`)
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
