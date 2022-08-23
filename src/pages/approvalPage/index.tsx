import React, { useState, useEffect, useRef, MutableRefObject } from 'react'
import { Button, message } from 'antd'
import styles from './index.less'
import ComDescriptions from '@/components/ComPage/Descriptions'
import { history } from 'umi'
import ApprovalForm from './components/approvalForm'
import ComCollapse from '@/components/ComPage/ComCollapse'
import ViewBpmn from '@/components/Bpmn/ViewBpmn'
import { approvalSave, getProcessIds, getCreditDetail, getActivityParams } from '@/services'
import BusinessDetail from './businessDetail'
// import ApprovalDom from './components/approvalDom'
import type { surveyParamProps } from '@/services/types'
import { omit } from 'lodash'

const { Panel } = ComCollapse

const { DescriptionsItem } = ComDescriptions

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
    })
  }

  // 获取流程信息
  const getProcess = async () => {
    const { data } = await getProcessIds(activityParams.instanceId)
    setHigLigthData(data)
  }

  useEffect(() => {
    if (activityParams.instanceId) {
      if (activityParams.formKey.indexOf('credit') > -1) {
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
      // console.log(attatchmentDatas, businessData, data)
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
      {activityParams.formKey ? (
        <BusinessDetail
          approvalDomRef={approvalDomRef}
          creditParams={creditParams}
          activityParams={activityParams}
        />
      ) : null}

      {/* 审核业务表单 */}
      {/* {activityParams.formKey ? (
        <ApprovalDom
          id={activityParams.instanceId}
          formName={activityParams.formKey}
          creditParams={{
            ...creditParams,
            taskID: activityParams.id,
            businessKey: activityParams.businessKey,
          }}
          approvalDomRef={approvalDomRef}
        />
      ) : null} */}

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
