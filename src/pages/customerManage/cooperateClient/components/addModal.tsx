import React, { useState } from 'react'
import { Modal, Button, Form, Input, message, Spin, Row, Col } from 'antd'
import type { addModalProps } from '@/services/types'
import { addCooperateCustomer } from '@/services'
import DictSelect from '@/components/ComSelect'
import { useIntl } from 'umi'

const { TextArea } = Input

const AddModal: React.FC<addModalProps> = ({ modalVisible, handleSubmit, handleCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [spinning] = useState<boolean>(false)
  const [form] = Form.useForm()
  const intl = useIntl()

  const handleOk = async (values: any) => {
    console.log(values)
    setConfirmLoading(true)
    try {
      await addCooperateCustomer({
        ...values,
        enterpriseType: values.enterpriseType.join(','),
      })
      setConfirmLoading(false)
    } catch (error) {
      setConfirmLoading(false)
      return
    }
    message.success(`新增成功`)
    handleSubmit()
    form.resetFields()
  }

  const cancel = () => {
    handleCancel()
    form.resetFields()
  }

  return (
    <Modal
      title="新建合作企业"
      maskClosable={false}
      destroyOnClose
      width={800}
      visible={modalVisible}
      footer={false}
      onCancel={cancel}
    >
      <Spin spinning={spinning}>
        <Form
          name="basic"
          initialValues={{ phoneArea: '+86' }}
          onFinish={handleOk}
          form={form}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item label="id" name="id" style={{ display: 'none' }}>
            <Input />
          </Form.Item>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  id: 'customer.loan.register',
                })}
                name="companyRegister"
                rules={[
                  {
                    required: true,
                    message: `${intl.formatMessage({
                      id: 'pages.form.select',
                    })}${intl.formatMessage({
                      id: 'customer.loan.register',
                    })}`,
                  },
                ]}
              >
                <DictSelect authorword="company_register" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="企业类型"
                name="enterpriseType"
                rules={[
                  {
                    required: true,
                    message: '请选择企业类型',
                  },
                ]}
              >
                <DictSelect authorword="enterprise_type" mode="multiple" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  id: 'customer.loan.companyName',
                })}
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: `${intl.formatMessage({
                      id: 'pages.form.input',
                    })}${intl.formatMessage({
                      id: 'customer.loan.companyName',
                    })}`,
                  },
                ]}
              >
                <Input maxLength={50} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  id: 'customer.loan.companyShort',
                })}
                name="shortName"
                rules={[
                  {
                    required: true,
                    message: `${intl.formatMessage({
                      id: 'pages.form.input',
                    })}${intl.formatMessage({
                      id: 'customer.loan.companyShort',
                    })}`,
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="企业编号（注册编号\社会信用代码）"
                name="enterpriseCode"
                rules={[
                  {
                    required: true,
                    message: `${intl.formatMessage({
                      id: 'pages.form.input',
                    })}企业编号`,
                  },
                ]}
              >
                <Input maxLength={18} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="注册地址"
                name="registrationAddress"
                rules={[
                  {
                    required: true,
                    message: `${intl.formatMessage({
                      id: 'pages.form.input',
                    })}注册地址`,
                  },
                ]}
              >
                <TextArea autoSize={{ minRows: 1, maxRows: 3 }} />
              </Form.Item>
            </Col>
          </Row>

          <div className="modal-btns">
            <Button type="primary" htmlType="submit" loading={confirmLoading}>
              {intl.formatMessage({
                id: 'pages.btn.confirm',
              })}
            </Button>
            <Button onClick={cancel} className="cancel-btn">
              {intl.formatMessage({
                id: 'pages.btn.cancel',
              })}
            </Button>
          </div>
        </Form>
      </Spin>
    </Modal>
  )
}

export default AddModal
