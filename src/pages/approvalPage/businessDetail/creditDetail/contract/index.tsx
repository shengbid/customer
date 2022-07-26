import { useImperativeHandle, forwardRef } from 'react'
import CardTitle from '@/components/ComPage/CardTitle'
import { Form } from 'antd'
import ComUpload from '@/components/ComUpload'

const Contract = ({}, ref: any) => {
  const [form] = Form.useForm()

  useImperativeHandle(ref, () => ({
    // 暴露给父组件的方法
    getBusinessData: async () => {
      try {
        await form.validateFields()
        const businessData = form.getFieldsValue()
        return { businessData }
      } catch (error) {
        return ''
      }
    },
  }))

  return (
    <CardTitle title="合同信息">
      <Form name="basic" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} form={form}>
        <Form.Item
          name="creditReport"
          label="授信准备合同"
          rules={[
            {
              required: true,
              message: `请上传授信准备合同`,
            },
          ]}
        >
          <ComUpload limit={10} />
        </Form.Item>
      </Form>
    </CardTitle>
  )
}

export default forwardRef(Contract)
