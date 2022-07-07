import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, message, Spin, DatePicker, Select } from 'antd'
import type { addModalProps } from '@/services/types'
import { addLeva, postDetail } from '@/services'
// import DictSelect from '@/components/ComSelect'
import { useIntl } from 'umi'
import { dateFormat } from '@/utils/base'
import moment from 'moment'

const { TextArea } = Input
const { Option } = Select

const AddModal: React.FC<addModalProps> = ({ modalVisible, handleSubmit, handleCancel, info }) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [spinning, setSpinning] = useState<boolean>(false)
  const [form] = Form.useForm()
  const intl = useIntl()
  const text = info
    ? intl.formatMessage({
        id: 'pages.btn.edit',
      })
    : intl.formatMessage({
        id: 'pages.btn.add',
      })

  const getDetail = async () => {
    setSpinning(true)
    const { data } = await postDetail(info)
    setSpinning(false)
    if (data) {
      form.setFieldsValue({ ...data })
    }
  }

  useEffect(() => {
    if (modalVisible && info) {
      getDetail()
    }
  }, [modalVisible])

  const handleOk = async (values: any) => {
    setConfirmLoading(true)
    try {
      Reflect.set(values, 'leaveStartTime', moment(values.leaveStartTime).format(dateFormat))
      Reflect.set(values, 'leaveEndTime', moment(values.leaveEndTime).format(dateFormat))
      await addLeva(values)
      setConfirmLoading(false)
    } catch (error) {
      setConfirmLoading(false)
      return
    }
    message.success(
      `${text}${intl.formatMessage({
        id: 'pages.form.success',
      })}`,
    )
    handleSubmit()
    form.resetFields()
  }

  const cancel = () => {
    handleCancel()
    form.resetFields()
  }

  return (
    <Modal
      title={`${text}${intl.formatMessage({
        id: 'sys.post.name',
      })}`}
      maskClosable={false}
      destroyOnClose
      width={600}
      visible={modalVisible}
      footer={false}
      onCancel={cancel}
    >
      <Spin spinning={spinning}>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          onFinish={handleOk}
          form={form}
          autoComplete="off"
        >
          <Form.Item label="id" name="id" style={{ display: 'none' }}>
            <Input />
          </Form.Item>
          <Form.Item
            label="请假类型"
            name="type"
            rules={[
              {
                required: true,
                message: '请选择请假类型',
              },
            ]}
          >
            <Select>
              <Option value="年假">年假</Option>
              <Option value="病假">病假</Option>
              <Option value="事假">事假</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: '请选择标题',
              },
            ]}
          >
            <Input maxLength={50} />
          </Form.Item>
          <Form.Item
            label="开始时间"
            name="leaveStartTime"
            rules={[
              {
                required: true,
                message: '请选择开始时间',
              },
            ]}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item
            label="结束时间"
            name="leaveEndTime"
            rules={[
              {
                required: true,
                message: '请选择结束时间',
              },
            ]}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>

          <Form.Item
            label="原因"
            name="reason"
            rules={[
              {
                required: false,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'pages.form.remark',
                })}`,
              },
            ]}
          >
            <TextArea autoSize={{ minRows: 3, maxRows: 5 }} maxLength={500} />
          </Form.Item>

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
