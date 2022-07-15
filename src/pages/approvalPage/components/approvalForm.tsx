import React, { useState, useEffect } from 'react'
import ComCard from '@/components/ComPage/ComCard'
import { Button, Form, Input, Spin, Radio } from 'antd'
import ComUpload from '@/components/ComUpload'
import { approvalOpeator } from '@/services'

const { TextArea } = Input

interface approvalProps {
  confirmLoading: boolean
  handleSubmit: (value: any) => void
  BpmnInfo: any
  // handleCancel: () => void
}
const ApprovalForm: React.FC<approvalProps> = ({ confirmLoading, handleSubmit, BpmnInfo }) => {
  const [spinning, setSpinning] = useState<boolean>(true)
  const [approvalBtns, setApprovalBtns] = useState<any[]>([])
  const [approvalData, setApprovalData] = useState<any[]>([])

  const [form] = Form.useForm()

  const getBtns = () => {
    setApprovalBtns([
      {
        label: '通过',
        value: 1,
      },
      {
        label: '拒绝',
        value: 2,
      },
      {
        label: '驳回',
        value: 3,
      },
    ])
    setSpinning(false)
  }

  const getDetail = async () => {
    setSpinning(true)
    const { data } = await approvalOpeator(BpmnInfo.deploymentId)
    setSpinning(false)
    if (data) {
      const arr: any[] = []
      data.forEach((item: any) => {
        const strings = item.split('--__!!')
        arr.push({
          controlId: strings[0],
          controlType: strings[1],
          controlLable: strings[2],
          controlIsParam: strings[3],
          controlValue: '',
          controlDefault: strings[4] ? strings[4] : null,
        })
      })
      setApprovalData(arr)
      console.log(approvalData, arr)
    }
  }

  useEffect(() => {
    getDetail()
  }, [])

  useEffect(() => {
    getBtns()
  }, [])

  const handleOk = (values: any) => {
    handleSubmit(values)
  }

  return (
    <ComCard title="审批意见">
      <Spin spinning={spinning}>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          onFinish={handleOk}
          form={form}
          autoComplete="off"
        >
          <Form.Item
            label="处理结果"
            name="instanceName"
            rules={[
              {
                required: true,
                message: '请选择处理结果',
              },
            ]}
          >
            <Radio.Group>
              {approvalBtns.map((item) => (
                <Radio key={item.value} value={item.value}>
                  {item.label}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="审批意见"
            name="reason"
            rules={[
              {
                required: true,
                message: `请输入审批意见`,
              },
            ]}
          >
            <TextArea autoSize={{ minRows: 3, maxRows: 5 }} maxLength={500} />
          </Form.Item>

          <Form.Item
            label="上传附件"
            name="file"
            rules={[
              {
                required: false,
                message: `请上传附件`,
              },
            ]}
          >
            <ComUpload limit={10} />
          </Form.Item>

          <div className="middle-btns">
            <Button type="primary" htmlType="submit" loading={confirmLoading}>
              提交
            </Button>
          </div>
        </Form>
      </Spin>
    </ComCard>
  )
}

export default ApprovalForm
