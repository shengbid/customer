import React, { useState, useEffect } from 'react'
import ComDescriptions from '@/components/ComPage/Descriptions'
import { getProcessIds, getCreditDetail, getActivityParams } from '@/services'
import { history } from 'umi'
import { Button } from 'antd'
import ComCollapse from '@/components/ComPage/ComCollapse'
import ViewBpmn from '@/components/Bpmn/ViewBpmn'
import type { surveyParamProps } from '@/services/types'
import ComCard from '@/components/ComPage/ComCard'
import ApprovalDom from './detail'
import CreditApproval from '../../businessDetail/credit/creditApproval'
import styles from '../../index.less'

const { Panel } = ComCollapse
const { DescriptionsItem } = ComDescriptions

// 详情抄送
const ApprovalDetail: React.FC = (props: any) => {
  const [higLigthData, setHigLigthData] = useState<any>([])
  const [activityParams, setActivityParams] = useState<any>({})
  const [creditParams, setCreditParams] = useState<surveyParamProps>({
    infoId: '',
    enterpriseId: '',
  })

  const { taskNumber, title } = props.location.query

  // 获取流程高亮信息
  const getProcess = async () => {
    const { data } = await getProcessIds(activityParams.instanceId)
    setHigLigthData(data)
  }

  // 根据任务id获取流程参数
  const getActivitParams = async () => {
    const { data } = await getActivityParams(taskNumber)
    setActivityParams(data)
  }

  useEffect(() => {
    getActivitParams()
  }, [])

  // 获取授信id和企业id
  const getCredit = async () => {
    const { data } = await getCreditDetail(activityParams.instanceId)
    setCreditParams({
      infoId: data.id,
      enterpriseId: data.enterpriseId,
    })
  }

  useEffect(() => {
    if (activityParams.instanceId) {
      getProcess()
      if (activityParams.formKey.indexOf('credit') > -1) {
        getCredit()
      }
    }
  }, [activityParams.instanceId])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ComDescriptions
          title={title}
          extra={
            <Button
              type="primary"
              onClick={() => {
                const url = sessionStorage.getItem('preUrl')
                history.push(url ? url : '/leaderPage/undone')
              }}
            >
              返回
            </Button>
          }
        >
          <DescriptionsItem label="创建时间">{activityParams.createTime}</DescriptionsItem>
          <DescriptionsItem label="发起人">{activityParams.fqrNickname}</DescriptionsItem>
          <DescriptionsItem label="流程编号">{activityParams.processNo}</DescriptionsItem>
        </ComDescriptions>
      </div>

      {/* 详情与审批历史 */}
      <ComCard title="详情信息">
        <CreditApproval
          creditParams={creditParams}
          formName={activityParams.formKey}
          id={activityParams.instanceId}
          businessKey={activityParams.businessKey}
        />
      </ComCard>

      <ApprovalDom
        creditParams={creditParams}
        formName={activityParams.formKey}
        id={activityParams.instanceId}
      />

      {/* 流程图 */}
      <ComCollapse>
        <Panel header="流程图" key="1">
          <ViewBpmn
            info={{ instanceId: activityParams.instanceId }}
            highLightData={higLigthData}
            height="40vh"
          />
        </Panel>
      </ComCollapse>
    </div>
  )
}

export default ApprovalDetail
