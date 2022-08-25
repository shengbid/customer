import React, { useState, useEffect, useRef, MutableRefObject } from 'react'
import { message } from 'antd'
import { history } from 'umi'
import ApprovalForm from '../components/approvalForm'
import ComCollapse from '@/components/ComPage/ComCollapse'
import ViewBpmn from '@/components/Bpmn/ViewBpmn'
import { approvalSave, getProcessIds, getCreditDetail, getActivityParams } from '@/services'
import ApprovalDom from './formkeyHandler/formKeyDom'
import ProcessHeader from '../components/processHeader'
import type { surveyParamProps } from '@/services/types'
import { omit } from 'lodash'

const { Panel } = ComCollapse

const ApprovalPage: React.FC = (props: any) => {
  const [creditParams, setCreditParams] = useState<surveyParamProps>({
    infoId: '',
    enterpriseId: '',
  })
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

  // console.log(detail)

  // 获取授信id和企业id
  const getCredit = async () => {
    const { data } = await getCreditDetail(activityParams.instanceId)
    // const { data } = await getCreditDetail('11112222')
    setCreditParams({
      infoId: data.id,
      enterpriseId: data.enterpriseId,
      enterpriseName: data.enterpriseName,
    })
  }

  // 获取流程信息
  const getProcess = async () => {
    const { data } = await getProcessIds(activityParams.instanceId)
    setHigLigthData(data)
  }

  useEffect(() => {
    if (activityParams.instanceId) {
      if (activityParams.formKey && activityParams.formKey.indexOf('credit') > -1) {
        getCredit()
      }
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
      {activityParams.formKey ? (
        <ApprovalDom
          approvalDomRef={approvalDomRef}
          creditParams={creditParams}
          activityParams={activityParams}
        />
      ) : null}

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
