import React, { useState, useEffect, useRef, MutableRefObject } from 'react'
import { message } from 'antd'
import { history } from 'umi'
import ApprovalForm from './components/approvalForm'
import ComCollapse from '@/components/ComPage/ComCollapse'
import ViewBpmn from '@/components/Bpmn/ViewBpmn'
import { approvalSave, getProcessIds, getActivityParams } from '@/services'
import { Tabs } from 'antd'
import ProcessHeader from './components/processHeader'
import { omit } from 'lodash'
import ComCard from '@/components/ComPage/ComCard'
import ApprovalHistory from './components/approvalHistroy'

const { TabPane } = Tabs
const { Panel } = ComCollapse

const ApprovalPage: React.FC = (props: any) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [higLigthData, setHigLigthData] = useState<any>([])
  const approvalDomRef: MutableRefObject<any> = useRef({})
  const [activityParams, setActivityParams] = useState<any>({})

  const { query } = props.location
  const { taskNumber, title } = query
  // 根据任务id获取流程参数
  const getActivitParams = async () => {
    const { data } = await getActivityParams(taskNumber)
    setActivityParams(data)
  }

  useEffect(() => {
    getActivitParams()
  }, [])

  // 获取流程信息
  const getProcess = async () => {
    const { data } = await getProcessIds(activityParams.instanceId)
    setHigLigthData(data)
  }

  useEffect(() => {
    if (activityParams.instanceId) {
      getProcess()
    }
  }, [activityParams.instanceId])

  // 点击审批
  const approval = async (values: any) => {
    console.log(values, approvalDomRef?.current)
    let attatchmentDatas = null
    let businessData = null
    // 通过才校验表单
    if (
      values.radioValue === 'taskComplete' &&
      approvalDomRef?.current &&
      approvalDomRef?.current.getBusinessData
    ) {
      const data = await approvalDomRef?.current?.getBusinessData()
      if (!data || data.error) {
        message.warning(data.error ? data.error : '请填写完成表单信息!')
        return
      }
      if (data.attatchmentDatas) {
        attatchmentDatas = data.attatchmentDatas
      } else if (data.businessData) {
        businessData = data.businessData
      }
      console.log(businessData)
    }

    // return
    setConfirmLoading(true)
    try {
      await approvalSave(activityParams.taskId, {
        ...values,
        ...omit(activityParams, ['endTime', 'createTime', 'id']),
        attatchmentDatas,
        businessData,
      })
    } catch (error) {
      setConfirmLoading(false)
      return
    }

    setConfirmLoading(false)
    message.success('审批成功')
    history.goBack()
  }

  return (
    <div>
      <ProcessHeader title={title} infoData={activityParams} />
      {/* 详情与审批历史 */}
      <ComCard title="审核信息">
        <Tabs type="card">
          <TabPane tab="审核记录" key="1">
            <ApprovalHistory id={activityParams.businessKey} />
          </TabPane>
        </Tabs>
      </ComCard>

      {/* 审核按钮通用表单 */}
      {activityParams.taskId ? (
        <ApprovalForm
          confirmLoading={confirmLoading}
          handleSubmit={approval}
          BpmnInfo={{ id: activityParams.taskId }}
        />
      ) : null}
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

export default ApprovalPage
