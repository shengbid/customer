import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, message, Spin, Row, Col } from 'antd'
import type { addModalProps } from '@/services/types'
import { addProduct, editProduct } from '@/services'
import IntergerInput from '@/components/Input/integerInput'
import PointInput from '@/components/Input/InputNumber'
import { useIntl } from 'umi'

const AddModal: React.FC<addModalProps> = ({ modalVisible, handleSubmit, handleCancel, info }) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [spinning] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [title, setTitle] = useState<string>('新增商品信息')

  useEffect(() => {
    if (modalVisible && info) {
      setTitle('修改商品信息')
      form.setFieldsValue(info)
    }
  }, [modalVisible, info])

  const intl = useIntl()

  const handleOk = async (values: any) => {
    setConfirmLoading(true)
    try {
      if (info) {
        await editProduct(values)
      } else {
        await addProduct(values)
      }
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
          <Form.Item label="id" name="id" style={{ display: 'none' }}>
            <Input maxLength={150} />
          </Form.Item>
          <Form.Item label="version" name="version" style={{ display: 'none' }}>
            <Input maxLength={150} />
          </Form.Item>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="商品名称"
                name="goodName"
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
            <Col span={12}>
              <Form.Item
                label="商品品牌"
                name="goodBrand"
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
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="商品条码"
                name="barCode"
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
            <Col span={12}>
              <Form.Item
                label="最近采购价"
                name="purchasePrice"
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
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="公允价"
                name="fairPrice"
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
            <Col span={12}>
              <Form.Item
                label="保质期"
                name="warrantyMonth"
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

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="商品REF码"
                name="goodRef"
                rules={[
                  {
                    required: true,
                    message: `请输入商品REF码`,
                  },
                ]}
              >
                <Input placeholder="请输入商品REF码, 如果有多个以逗号(半角)隔开" maxLength={150} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="商品HScode"
                name="goodHscode"
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
                label="商品SKU NO"
                name="goodSku"
                rules={[
                  {
                    required: true,
                    message: `请输入商品SKU NO`,
                  },
                ]}
              >
                <Input placeholder="请输入商品SKU NO, 如果有多个以逗号(半角)隔开" maxLength={150} />
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
