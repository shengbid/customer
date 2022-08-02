import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, Row, Col, message } from 'antd'
import { editCompany, getCompanyDetail } from '@/services'
import DictSelect from '@/components/ComSelect'

interface compnayProps {
  info: string
  modalVisible: boolean
  handleCancel: (val?: any) => void
}
const EditCompany: React.FC<compnayProps> = ({ info, modalVisible, handleCancel }) => {
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

  // 获取企业信息
  const getDetail = async () => {
    const { data } = await getCompanyDetail(Number(info))
    form.setFieldsValue(data)
  }

  useEffect(() => {
    if (modalVisible) {
      getDetail()
    }
  }, [modalVisible])

  // 提交
  const handleOk = async (values: any) => {
    await editCompany(values)
    setConfirmLoading(false)
    message.success('修改成功')
    handleCancel(1)
  }

  return (
    <Modal
      title={'修改企业信息'}
      maskClosable={false}
      destroyOnClose
      width={800}
      visible={modalVisible}
      footer={false}
      onCancel={handleCancel}
    >
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ id: info }}
        form={form}
        autoComplete="off"
        scrollToFirstError
        onFinish={handleOk}
      >
        <Form.Item label="id" name="id" style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="企业名称" name="fullName">
              <Input maxLength={50} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="企业注册所在地区" name="registerAddr">
              <DictSelect authorword="company_register" disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="企业编号（注册编号\社会信用代码）"
              name="enterpriseNumber"
              rules={[
                {
                  required: true,
                  message: `请输入企业编号`,
                },
              ]}
            >
              <Input maxLength={50} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="注册地址"
              name="registerDetails"
              rules={[
                {
                  required: true,
                  message: `请输入注册地址`,
                },
              ]}
            >
              <Input maxLength={50} />
            </Form.Item>
          </Col>
        </Row>
        <div className="modal-btns">
          <Button type="primary" htmlType="submit" loading={confirmLoading}>
            确定
          </Button>
          <Button onClick={handleCancel} className="cancel-btn">
            取消
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default EditCompany
