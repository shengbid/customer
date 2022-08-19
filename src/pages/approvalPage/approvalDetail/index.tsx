import React, { useState, useEffect } from 'react'
import ComDescriptions from '@/components/ComPage/Descriptions'
import { getProcessIds, getActivityParams } from '@/services'
import { history } from 'umi'
import { Button, Tabs } from 'antd'
import ComCollapse from '@/components/ComPage/ComCollapse'
import ViewBpmn from '@/components/Bpmn/ViewBpmn'
import ComCard from '@/components/ComPage/ComCard'
import ApprovalHistory from '../components/approvalHistroy'
import styles from '../index.less'

const { TabPane } = Tabs

const { Panel } = ComCollapse
const { DescriptionsItem } = ComDescriptions

// 详情抄送
const ApprovalDetail: React.FC = (props: any) => {
  const [higLigthData, setHigLigthData] = useState<any>([])
  const [activityParams, setActivityParams] = useState<any>({})

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

  useEffect(() => {
    if (activityParams.instanceId) {
      getProcess()
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
      <ComCard title="审核信息">
        <Tabs type="card">
          <TabPane tab="审核记录" key="1">
            <ApprovalHistory id={activityParams.businessKey} />
          </TabPane>
        </Tabs>
      </ComCard>

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
