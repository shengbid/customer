import React, { useState, useEffect } from 'react'
import { useIntl } from 'umi'
import DictSelect from '@/components/ComSelect'
import { phoneReg } from '@/utils/reg'
import RequiredLabel from '@/components/RequiredLabel'
import { Form, Input, Button, message } from 'antd'
import { editCompanyPeople } from '@/services'

interface reralProps {
  handleCancel: () => void
  info: any
}

// 财务负责人信息
const MetalPersonInfo: React.FC<reralProps> = ({ handleCancel, info }) => {
  const intl = useIntl()
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

  useEffect(() => {
    form.setFieldsValue(info)
  }, [])

  // 修改
  const handleOk = async (values: any) => {
    await editCompanyPeople(values)
    setConfirmLoading(false)
    handleCancel()
    message.success('修改成功')
  }

  return (
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
        label={intl.formatMessage({
          id: 'credit.apply.financeAdminName',
        })}
        rules={[
          {
            required: true,
            message: `${intl.formatMessage({
              id: 'pages.form.input',
            })}${intl.formatMessage({
              id: 'credit.apply.financeAdminName',
            })}`,
          },
        ]}
      >
        <Input maxLength={50} />
      </Form.Item>

      <Form.Item
        name="duty"
        label={intl.formatMessage({
          id: 'credit.apply.duty',
        })}
        rules={[
          {
            required: true,
            message: `${intl.formatMessage({
              id: 'pages.form.input',
            })}${intl.formatMessage({
              id: 'credit.apply.duty',
            })}`,
          },
        ]}
      >
        <Input maxLength={50} />
      </Form.Item>

      <Form.Item
        label={
          <RequiredLabel
            label={intl.formatMessage({
              id: 'credit.apply.phone',
            })}
          />
        }
      >
        <Form.Item
          name="phoneArea"
          style={{ display: 'inline-block', marginBottom: 0, width: '30%' }}
        >
          <DictSelect authorword="phone_code" allowClear={false} />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          style={{ display: 'inline-block', marginBottom: 0, width: '70%' }}
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}${intl.formatMessage({
                id: 'credit.apply.phone',
              })}`,
            },
            phoneReg,
          ]}
        >
          <Input maxLength={50} />
        </Form.Item>
      </Form.Item>
      <div className="modal-btns">
        <Button type="primary" htmlType="submit" loading={confirmLoading}>
          {intl.formatMessage({
            id: 'pages.btn.confirm',
          })}
        </Button>
        <Button onClick={handleCancel} className="cancel-btn">
          {intl.formatMessage({
            id: 'pages.btn.cancel',
          })}
        </Button>
      </div>
    </Form>
  )
}

export default MetalPersonInfo
