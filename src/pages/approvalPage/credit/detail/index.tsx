import React, { useState, useEffect } from 'react'
import { getProcessIds, getCreditDetail, getActivityParams } from '@/services'
import ComCollapse from '@/components/ComPage/ComCollapse'
import ViewBpmn from '@/components/Bpmn/ViewBpmn'
import type { surveyParamProps } from '@/services/types'
import ComCard from '@/components/ComPage/ComCard'
import ApprovalDom from '../formkeyHandler/formKeyDetailDom'
import CreditApproval from '../approval'
import ProcessHeader from '../../components/processHeader'

const { Panel } = ComCollapse

// 详情抄送
const ApprovalDetail: React.FC = (props: any) => {
  const [higLigthData, setHigLigthData] = useState<any>([])
  const [activityParams, setActivityParams] = useState<any>({})
  const [creditParams, setCreditParams] = useState<surveyParamProps>({
    infoId: '',
    enterpriseId: '',
  })

  const { taskNumber } = props.location.query

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
      if (activityParams.formKey && activityParams.formKey.indexOf('credit') > -1) {
        getCredit()
      }
    }
  }, [activityParams.instanceId])

  return (
    <div>
      <ProcessHeader infoData={activityParams} />

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
        activityParams={activityParams}
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
