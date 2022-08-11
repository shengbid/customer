import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button } from 'antd'
import { useIntl } from 'umi'
import PhoneInput from '@/components/Input/phoneInput'
import ComUpload from '@/components/ComUpload'

interface personProps {
  modalVisible: boolean
  infoData: any
  handleCancel: (val?: number) => void
}

// 编辑签约经办人信息
const EditSignPerson: React.FC<personProps> = ({ modalVisible, infoData, handleCancel }) => {
  const intl = useIntl()
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [form] = Form.useForm()

  useEffect(() => {
    if (modalVisible && infoData && infoData.id) {
      form.setFieldsValue({ ...infoData })
    }
  }, [modalVisible, infoData])

  // 修改
  const handleOk = async (values: any) => {
    console.log(values)
    setConfirmLoading(false)
    handleCancel(1)
  }

  return (
    <Modal
      title="修改签约经办人"
      maskClosable={false}
      destroyOnClose
      width={800}
      visible={modalVisible}
      footer={false}
      onCancel={() => {
        handleCancel()
      }}
    >
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ phoneArea: '1' }}
        form={form}
        autoComplete="off"
        scrollToFirstError
        onFinish={handleOk}
      >
        <Form.Item label="identity" name="creditId" style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item label="id" name="id" style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="姓名"
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}姓名`,
            },
          ]}
        >
          <Input maxLength={50} />
        </Form.Item>

        <Form.Item
          name="duty"
          label="邮箱"
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}邮箱`,
            },
          ]}
        >
          <Input maxLength={50} />
        </Form.Item>

        <PhoneInput initType={infoData.phoneArea} />

        <Form.Item
          name="file"
          label="授权书"
          rules={[
            {
              required: true,
              message: `请上传授权书`,
            },
          ]}
        >
          <ComUpload />
        </Form.Item>

        <div className="modal-btns">
          <Button type="primary" htmlType="submit" loading={confirmLoading}>
            {intl.formatMessage({
              id: 'pages.btn.confirm',
            })}
          </Button>
          <Button onClick={() => handleCancel()} className="cancel-btn">
            {intl.formatMessage({
              id: 'pages.btn.cancel',
            })}
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default EditSignPerson
