import React, { useState, useEffect, useRef, MutableRefObject } from 'react'
import { Button, message } from 'antd'
import styles from './index.less'
import ComDescriptions from '@/components/ComPage/Descriptions'
import { history } from 'umi'
import ComCard from '@/components/ComPage/ComCard'
import ApprovalForm from './components/approvalForm'
import ComCollapse from '@/components/ComPage/ComCollapse'
import ViewBpmn from '@/components/Bpmn/ViewBpmn'
import { approvalSave, getProcessIds, getCreditDetail } from '@/services'
import CreditApproval from './businessDetail/creditApproval'
import ApprovalDom from './components/approvalDom'
import type { surveyParamProps } from '@/services/types'

const { Panel } = ComCollapse

const { DescriptionsItem } = ComDescriptions

const ApprovalPage: React.FC = (props: any) => {
  const [infoData, setInfoData] = useState<any>({})
  const [creditParams, setCreditParams] = useState<surveyParamProps>({
    infoId: '',
    enterpriseId: '',
  })
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [higLigthData, setHigLigthData] = useState<any>([])
  const title = '香港吉祥公司--授信申请'
  const approvalDomRef: MutableRefObject<any> = useRef({})

  const { query } = props.location
  const { id, businessKey, taskNodeName, instanceId, formKey = 'credit1' } = query
  // 审核历史
  const DetailDom = (
    <CreditApproval
      creditParams={creditParams}
      formName={formKey}
      id={id}
      businessKey={businessKey}
    />
  )

  useEffect(() => {
    setInfoData({
      time: '2022-07-14 13:13:13',
      name: '吉祥',
      typeNo: '33333333',
    })
  }, [])

  // 获取授信id和企业id
  const getCredit = async () => {
    // const { data } = await getCreditDetail(instanceId)
    const { data } = await getCreditDetail('11112222')
    setCreditParams({
      infoId: data.id,
      enterpriseId: data.enterpriseId,
    })
  }

  // 获取流程信息
  const getProcess = async () => {
    const { data } = await getProcessIds(instanceId)
    setHigLigthData(data)
  }

  useEffect(() => {
    getCredit()
    getProcess()
  }, [])

  // 点击审批
  const approval = async (values: any) => {
    console.log(values, approvalDomRef?.current)
    let attatchmentDatas = null
    if (approvalDomRef?.current && approvalDomRef?.current.getBusinessData) {
      const data = await approvalDomRef?.current?.getBusinessData()
      if (!data) {
        message.warning('请填写完成表单信息!')
        return
      }
      attatchmentDatas = data.businessData
      console.log(attatchmentDatas)
      // await addSurveyReport(businessData)
    }

    setConfirmLoading(true)
    await approvalSave(id, {
      formData: { ...values, formKey, businessKey, taskNodeName },
      attatchmentDatas,
    })
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
            <Button type="primary" onClick={() => history.push('/leaderPage/undone')}>
              返回
            </Button>
          }
        >
          <DescriptionsItem label="创建任务时间">{infoData.time}</DescriptionsItem>
          <DescriptionsItem label="发起人">{infoData.name}</DescriptionsItem>
          <DescriptionsItem label="任务编号">{infoData.typeNo}</DescriptionsItem>
        </ComDescriptions>
      </div>
      <ComCard title="详情信息">{DetailDom}</ComCard>

      {/* 审核业务表单 */}
      <ApprovalDom
        id={id}
        formName={formKey}
        creditParams={{ ...creditParams, taskID: id, businessKey }}
        approvalDomRef={approvalDomRef}
      />

      {/* 审核通用表单 */}
      <ApprovalForm confirmLoading={confirmLoading} handleSubmit={approval} BpmnInfo={{ id }} />
      {/* 流程图 */}
      <ComCollapse>
        <Panel header="流程图" key="1">
          <ViewBpmn info={{ instanceId }} highLightData={higLigthData} height="40vh" />
        </Panel>
      </ComCollapse>
    </div>
  )
}

export default ApprovalPage
