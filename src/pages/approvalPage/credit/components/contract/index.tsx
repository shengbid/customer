import { useImperativeHandle, forwardRef } from 'react'
import CardTitle from '@/components/ComPage/CardTitle'
import { Form } from 'antd'
import ComUpload from '@/components/ComUpload'

interface contractprops {
  title: string
}
const Contract = ({ title }: contractprops, ref: any) => {
  const [form] = Form.useForm()

  useImperativeHandle(ref, () => ({
    // 暴露给父组件的方法
    getBusinessData: async () => {
      try {
        await form.validateFields()
        const businessData = form.getFieldsValue()
        return { attatchmentDatas: businessData.fileList }
      } catch (error) {
        return ''
      }
    },
  }))

  return (
    <CardTitle title="合同信息">
      <Form name="basic" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} form={form}>
        <Form.Item
          name="fileList"
          label={title}
          rules={[
            {
              required: true,
              message: `请上传${title}`,
            },
          ]}
        >
          <ComUpload />
        </Form.Item>
      </Form>
    </CardTitle>
  )
}

export default forwardRef(Contract)
