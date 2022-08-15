import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, message, Spin, Row, Col } from 'antd'
import type { addModalProps } from '@/services/types'
import { addLoanCustomer } from '@/services'
import IntergerInput from '@/components/Input/integerInput'
import PointInput from '@/components/Input/InputNumber'
import { useIntl } from 'umi'

const AddModal: React.FC<addModalProps> = ({ modalVisible, handleSubmit, handleCancel, info }) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [spinning] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [title, setTitle] = useState<string>('新增商品信息')
  const [isDetail, setIsDetail] = useState<boolean>(false)

  useEffect(() => {
    if (modalVisible && info) {
      setTitle('修改商品信息')
      setIsDetail(true)
    }
  }, [modalVisible, info])

  const intl = useIntl()

  const handleOk = async (values: any) => {
    console.log(values)
    setConfirmLoading(true)
    try {
      await addLoanCustomer(values)
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
      title={title}
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
          initialValues={{ signtype: 1 }}
          onFinish={handleOk}
          form={form}
          autoComplete="off"
          layout="vertical"
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="商品ID"
                name="name"
                rules={[
                  {
                    required: true,
                    message: `请输入商品ID`,
                  },
                ]}
              >
                <Input disabled={isDetail} maxLength={150} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="商品名称"
                name="code"
                rules={[
                  {
                    required: true,
                    message: `请输入商品名称`,
                  },
                ]}
              >
                <Input maxLength={150} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="商品品牌"
                name="name"
                rules={[
                  {
                    required: true,
                    message: `请输入商品品牌`,
                  },
                ]}
              >
                <Input maxLength={150} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="商品条码"
                name="code"
                rules={[
                  {
                    required: true,
                    message: `请输入商品条码`,
                  },
                ]}
              >
                <Input maxLength={150} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="商品REF码"
                name="name"
                rules={[
                  {
                    required: true,
                    message: `请输入商品REF码`,
                  },
                ]}
              >
                <Input maxLength={150} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="商品HScode"
                name="code4"
                rules={[
                  {
                    required: true,
                    message: `请输入商品HScode`,
                  },
                ]}
              >
                <Input maxLength={150} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="最近采购价"
                name="name3"
                rules={[
                  {
                    required: true,
                    message: `请输入最近采购价`,
                  },
                ]}
              >
                <PointInput addonAfter={'美元'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="公允价"
                name="code3"
                rules={[
                  {
                    required: true,
                    message: `请输入公允价`,
                  },
                ]}
              >
                <PointInput addonAfter={'美元'} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="保质期"
                name="date"
                rules={[
                  {
                    required: true,
                    message: `请输入保质期`,
                  },
                ]}
              >
                <IntergerInput />
              </Form.Item>
            </Col>
          </Row>

          <div className="modal-btns" style={{ marginTop: 24 }}>
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
