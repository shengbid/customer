import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import { useIntl } from 'umi'
import PhoneInput from '@/components/Input/phoneInput'
import ComUpload from '@/components/ComUpload'
import { editCooperateSigner, editLoanSigner } from '@/services'
import { emailReg } from '@/utils/reg'

interface personProps {
  modalVisible: boolean
  infoData: any
  handleCancel: (val?: number) => void
  type?: number // 1合作企业 2借款企业
}

// 编辑签约经办人信息
const EditSignPerson: React.FC<personProps> = ({ modalVisible, infoData, handleCancel, type }) => {
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
    setConfirmLoading(true)
    try {
      if (type === 1) {
        await editCooperateSigner({
          ...values,
          fileName: values.files[0].fileName,
          fileUrl: values.files[0].fileUrl,
          hzEnterpriseId: infoData.companyId,
        })
      } else {
        await editLoanSigner({
          ...values,
          fileName: values.files[0].fileName,
          fileUrl: values.files[0].fileUrl,
          enterpriseId: infoData.companyId,
        })
      }
    } catch (error) {
      setConfirmLoading(false)
      return
    }
    setConfirmLoading(false)
    message.success('修改成功!')
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
        initialValues={{ phoneArea: '+86' }}
        form={form}
        autoComplete="off"
        scrollToFirstError
        onFinish={handleOk}
      >
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
          name="email"
          label="邮箱"
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}邮箱`,
            },
            emailReg,
          ]}
        >
          <Input maxLength={50} />
        </Form.Item>

        <PhoneInput initType={infoData.phoneArea} />

        <Form.Item
          name="files"
          label="授权书"
          rules={[
            {
              required: true,
              message: `请上传授权书`,
            },
          ]}
        >
          <ComUpload limit={1} />
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
