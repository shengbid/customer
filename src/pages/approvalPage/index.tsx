import React, { useState, useEffect } from 'react'
import { Button, message } from 'antd'
import styles from './index.less'
import ComDescriptions from '@/components/ComPage/Descriptions'
import { history } from 'umi'
import ComCard from '@/components/ComPage/ComCard'
import ApprovalForm from './components/approvalForm'
import ComCollapse from '@/components/ComPage/ComCollapse'
import ViewBpmn from '@/components/Bpmn/ViewBpmn'
import { approvalSave, getProcessIds } from '@/services'
import CreditApproval from './businessDetail/creditApproval'
import CreditDetail from './businessDetail/creditDetail'
import RelatedDetail from './businessDetail/creditDetail/relatedForm'

const { Panel } = ComCollapse

const { DescriptionsItem } = ComDescriptions

const ApprovalPage: React.FC = (props: any) => {
  const [infoData, setInfoData] = useState<any>({})
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [higLigthData, setHigLigthData] = useState<any>([])
  const title = '香港吉祥公司--授信申请'
  const formName = 'credit2'

  const { query } = props.location
  const { id, businessKey, taskNodeName, instanceId } = query
  // 审核历史
  const DetailDom = <CreditApproval formName={formName} id={id} businessKey={businessKey} />
  // 审核详情
  const approvalDom = {
    credit: (
      <>
        <ComCollapse>
          <Panel header="授信基础信息" key="1">
            <CreditDetail id={id} />
          </Panel>
        </ComCollapse>
        <ComCard style={{ marginTop: 12 }} title="关联信息">
          <RelatedDetail />
        </ComCard>
      </>
    ),
    credit2: (
      <ComCard title="审核信息">
        <></>
      </ComCard>
    ),
  }

  useEffect(() => {
    setInfoData({
      time: '2022-07-14 13:13:13',
      name: '吉祥',
      typeNo: '33333333',
    })
  }, [])

  // 获取流程信息
  const getProcess = async () => {
    const { data } = await getProcessIds(instanceId)
    setHigLigthData(data)
  }

  useEffect(() => {
    getProcess()
  }, [])

  // 点击审批
  const approval = async (values: any) => {
    console.log(values)
    setConfirmLoading(true)
    await approvalSave(id, { ...values, businessKey, taskNodeName })
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
            <Button type="primary" onClick={() => history.goBack()}>
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

      {approvalDom[formName]}

      {/* 审核表单 */}
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
