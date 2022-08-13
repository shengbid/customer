import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, message, Spin, Row, Col } from 'antd'
import type { addModalProps } from '@/services/types'
import { addLoanCustomer } from '@/services'
import DictSelect from '@/components/ComSelect'
import { useIntl } from 'umi'
import RequiredLabel from '@/components/RequiredLabel'
import ComEditTable from '@/components/ComProtable/ComEditTable'

interface addProps extends addModalProps {
  title: string
}
const AddModal: React.FC<addProps> = ({
  title,
  modalVisible,
  handleSubmit,
  handleCancel,
  info,
}) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [dataSource, setDataSource] = useState<any[]>([
    {
      id: '1',
    },
  ])
  const [editableKeys, setEditableRowKeys] = useState<any[]>(['1'])
  const [spinning] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [tableForm] = Form.useForm()

  useEffect(() => {
    if (modalVisible && info) {
      setDataSource([])
    }
  }, [modalVisible, info])

  const intl = useIntl()

  const columns = [
    {
      title: <RequiredLabel label="联系人姓名" />,
      dataIndex: 'contractName',
      width: '25%',
    },
    {
      title: <RequiredLabel label="岗位" />,
      dataIndex: 'contractNo',
      width: '17%',
    },
    {
      title: '联系电话',
      dataIndex: 'typeName',
      width: '17%',
      editable: false,
    },
    {
      title: <RequiredLabel label="邮箱" />,
      dataIndex: 'signTime',
      width: '17%',
    },
    {
      title: <RequiredLabel label="抄送邮箱" />,
      dataIndex: 'signTime',
      width: '17%',
    },
  ]

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
          <h3 style={{ fontWeight: 'bold' }}>
            {intl.formatMessage({
              id: 'customer.loan.baseInfo',
            })}
          </h3>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="仓库名称"
                name="name"
                rules={[
                  {
                    required: true,
                    message: `请输入仓库名称`,
                  },
                ]}
              >
                <Input maxLength={150} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="仓库编号"
                name="code"
                rules={[
                  {
                    required: true,
                    message: `请输入仓库编号`,
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
                label="仓库类型"
                name="type1"
                rules={[
                  {
                    required: true,
                    message: `请选择仓库类型`,
                  },
                ]}
              >
                <DictSelect authorword="company_register" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="所属企业"
                name="type2"
                rules={[
                  {
                    required: true,
                    message: `请选择所属企业`,
                  },
                ]}
              >
                <DictSelect authorword="company_register" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="仓库地址"
                name="name"
                rules={[
                  {
                    required: true,
                    message: `请输入仓库地址`,
                  },
                ]}
              >
                <Input maxLength={350} />
              </Form.Item>
            </Col>
          </Row>

          <h3 style={{ fontWeight: 'bold' }}>联系人信息</h3>

          <ComEditTable<any>
            rowKey="id"
            className="nopaddingtable"
            maxLength={5}
            columns={columns}
            value={dataSource}
            onChange={setDataSource}
            editable={{
              form: tableForm,
              editableKeys,
              onValuesChange: (record, recordList) => {
                setDataSource(recordList)
              },
              onChange: setEditableRowKeys,
            }}
          />

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
