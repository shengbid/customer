import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, message, Spin, Input } from 'antd'
import type { addModalProps } from '@/services/types'
import { addLoanCustomer } from '@/services'
import { useIntl } from 'umi'
import styles from './rule.less'

interface detailProps extends addModalProps {
  isDetail?: boolean
}

const AddModal: React.FC<detailProps> = ({
  modalVisible,
  handleSubmit,
  handleCancel,
  info,
  isDetail,
}) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [spinning] = useState<boolean>(false)
  const [form] = Form.useForm()

  useEffect(() => {
    if (modalVisible && info) {
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
      title="存货质押规则配置"
      maskClosable={false}
      destroyOnClose
      width={1000}
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
          <div className="tipcontent">商品最终价值=该商品的公允价 * 当前商品效期折扣率</div>

          <div className={styles.ruleline}>
            <span className={styles.text}>1、商品剩余有效天数≥商品整体有效期的</span>
            <div className={styles.rate}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: `请输入折扣率`,
                  },
                ]}
              >
                <Input addonAfter="%" />
              </Form.Item>
            </div>
            <span className={styles.text}>，则商品效期折扣率为</span>
            <div className={styles.rate}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: `请输入折扣率`,
                  },
                ]}
              >
                <Input addonAfter="%" />
              </Form.Item>
            </div>
          </div>

          <div className={styles.ruleline}>
            <span className={styles.text}>2、商品整体有效期的</span>
            <div className={styles.rate}>
              <Form.Item
                name="name2"
                rules={[
                  {
                    required: true,
                    message: `请输入折扣率`,
                  },
                ]}
              >
                <Input addonAfter="%" />
              </Form.Item>
            </div>
            <span className={styles.text}> ＜ 商品剩余有效天数 ＜ 商品整体有效期的</span>
            <div className={styles.rate}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: `请输入折扣率`,
                  },
                ]}
              >
                <Input addonAfter="%" />
              </Form.Item>
            </div>
            <span className={styles.text}>，则商品效期折扣率为</span>
            <div className={styles.rate}>
              <Form.Item
                name="name4"
                rules={[
                  {
                    required: true,
                    message: `请输入折扣率`,
                  },
                ]}
              >
                <Input addonAfter="%" />
              </Form.Item>
            </div>
          </div>

          <div className={styles.ruleline}>
            <span className={styles.text}>3、商品剩余有效天数 ≤ 商品整体有效期的</span>
            <div className={styles.rate}>
              <Form.Item
                name="name24"
                rules={[
                  {
                    required: true,
                    message: `请输入折扣率`,
                  },
                ]}
              >
                <Input addonAfter="%" />
              </Form.Item>
            </div>
            <span className={styles.text}>，则商品效期折扣率为</span>
            <div className={styles.rate}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: `请输入折扣率`,
                  },
                ]}
              >
                <Input addonAfter="%" />
              </Form.Item>
            </div>
          </div>

          {isDetail ? null : (
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
          )}
        </Form>
      </Spin>
    </Modal>
  )
}

export default AddModal
