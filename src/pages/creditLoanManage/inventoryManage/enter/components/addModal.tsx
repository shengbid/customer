import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, message, Spin, Row, Col } from 'antd'
import type { addModalProps } from '@/services/types'
import { addLoanCustomer } from '@/services'
import DictSelect from '@/components/ComSelect'
import { useIntl } from 'umi'
import Descriptions from '@/components/ComPage/Descriptions'

const { DescriptionsItem } = Descriptions

const AddModal: React.FC<addModalProps> = ({ modalVisible, handleSubmit, handleCancel, info }) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [infoData, setInfoData] = useState<any>({})
  const [spinning] = useState<boolean>(false)
  const [form] = Form.useForm()

  useEffect(() => {
    if (modalVisible && info) {
      setInfoData({})
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
      title="质押"
      maskClosable={false}
      destroyOnClose
      width={900}
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
          <h3 style={{ fontWeight: 'bold' }}>选择质押类型</h3>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: `请选择质押类型`,
                  },
                ]}
              >
                <DictSelect authorword="company_register" />
              </Form.Item>
            </Col>
          </Row>

          <h3 style={{ fontWeight: 'bold' }}>当前货物信息</h3>
          <Descriptions>
            <DescriptionsItem label="关联融资单号">{infoData.frName}</DescriptionsItem>
            <DescriptionsItem label="货物估值">{infoData.frName}</DescriptionsItem>
          </Descriptions>

          <h3 style={{ fontWeight: 'bold' }}>质押前</h3>
          <Descriptions>
            <DescriptionsItem label="代理采购可用额度">{infoData.frName}</DescriptionsItem>
            <DescriptionsItem label="代理采购已用额度">{infoData.frName}</DescriptionsItem>
            <DescriptionsItem label="存货质押可用额度">{infoData.frName}</DescriptionsItem>
            <DescriptionsItem label="存货质押已用额度">{infoData.frName}</DescriptionsItem>
          </Descriptions>

          <h3 style={{ fontWeight: 'bold' }}>质押后</h3>
          <Descriptions>
            <DescriptionsItem label="代理采购可用额度">{infoData.frName}</DescriptionsItem>
            <DescriptionsItem label="代理采购已用额度">{infoData.frName}</DescriptionsItem>
            <DescriptionsItem label="存货质押可用额度">{infoData.frName}</DescriptionsItem>
            <DescriptionsItem label="存货质押已用额度">{infoData.frName}</DescriptionsItem>
          </Descriptions>

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
