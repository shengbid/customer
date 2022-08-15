import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button } from 'antd'
import { useIntl } from 'umi'
import { idReg } from '@/utils/reg'
import DictSelect from '@/components/ComSelect'
import { editCooperateLegal } from '@/services'

interface personProps {
  modalVisible: boolean
  infoData: any
  handleCancel: (val?: number) => void
}

// 编辑企业法人信息
const EditSignPerson: React.FC<personProps> = ({ modalVisible, infoData, handleCancel }) => {
  const intl = useIntl()
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [idType, setIdTyp] = useState<string>('dlsfz')

  useEffect(() => {
    if (modalVisible && infoData && infoData.id) {
      form.setFieldsValue({ ...infoData })
      if (infoData.identityType) setIdTyp(infoData.identityType)
    }
  }, [modalVisible, infoData])

  // 修改
  const handleOk = async (values: any) => {
    console.log(values)
    try {
      setConfirmLoading(true)
      await editCooperateLegal({
        ...values,
        hzEnterpriseId: infoData.hzEnterpriseId,
      })
    } catch (error) {
      setConfirmLoading(false)
      return
    }
    setConfirmLoading(false)
    handleCancel(1)
  }

  return (
    <Modal
      title="修改企业相关人员信息"
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
        initialValues={{ identityType: 'dlsfz' }}
        form={form}
        autoComplete="off"
        scrollToFirstError
        onFinish={handleOk}
      >
        <Form.Item label="id" name="id" style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item
          name="frName"
          label="法人/董事姓名"
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}法人/董事姓名姓名`,
            },
          ]}
        >
          <Input maxLength={50} />
        </Form.Item>

        <Form.Item
          name="identityType"
          label="身份证件类型"
          rules={[
            {
              required: true,
              message: `请选择身份证件类型`,
            },
          ]}
        >
          <DictSelect
            allowClear={false}
            authorword="cus_sfzlx"
            onChange={(val: string) => setIdTyp(val)}
          />
        </Form.Item>

        <Form.Item
          name="identityNumber"
          label="证件号码"
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}证件号码`,
            },
            idReg[idType],
          ]}
        >
          <Input maxLength={50} />
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
