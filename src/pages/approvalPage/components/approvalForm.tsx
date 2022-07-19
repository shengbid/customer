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

  const [form] = Form.useForm()

  // 获取审批按钮
  const getBtns = async () => {
    setSpinning(true)
    const { data } = await approvalOpeator(BpmnInfo.id)
    setSpinning(false)
    if (data) {
      const arr: any[] = []
      data.forEach((item: any) => {
        if (item.attributes) {
          const obj = { label: '', value: '' }
          obj.value = item.attributes.code ? item.attributes.code[0].value : ''
          obj.label = item.attributes.name ? item.attributes.name[0].value : ''
          arr.push(obj)
        }
      })
      setApprovalBtns(arr)
    }
  }

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
          initialValues={{ taskId: BpmnInfo.id }}
        >
          <Form.Item label="taskId" name="taskId" style={{ display: 'none' }}>
            <Input />
          </Form.Item>
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
