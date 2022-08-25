import React, { useState, useEffect } from 'react'
import { getProcessIds, getActivityParams } from '@/services'
import ComCollapse from '@/components/ComPage/ComCollapse'
import ViewBpmn from '@/components/Bpmn/ViewBpmn'
import ComCard from '@/components/ComPage/ComCard'
import Approval from '../approval'
import ApprovalDom from '../formkeyHandler/formKeyDetailDom'
import ProcessHeader from '../../components/processHeader'

const { Panel } = ComCollapse

// 详情抄送
const ApprovalDetail: React.FC = (props: any) => {
  const [higLigthData, setHigLigthData] = useState<any>([])
  const [activityParams, setActivityParams] = useState<any>({})

  const { taskNumber } = (query = props.location.query)

  const params = {}
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
    <div>
      <ProcessHeader infoData={activityParams} />

      {/* 审批历史 */}
      <ComCard title="审核信息">
        <Approval businessKey={activityParams.businessKey} />
      </ComCard>

      {/* 详情 */}
      {activityParams.formKey ? (
        <ApprovalDom params={params} activityParams={activityParams} />
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

export default ApprovalDetail
