import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, message, Spin, Row, Col, Radio, DatePicker } from 'antd'
import type { addModalProps } from '@/services/types'
import { addLoanCustomer } from '@/services'
import DictSelect from '@/components/ComSelect'
import { useIntl } from 'umi'
import type { ProColumns } from '@ant-design/pro-table'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import { EditableProTable } from '@ant-design/pro-table'
import ComUpload from '@/components/ComUpload'
import RequiredLabel from '@/components/RequiredLabel'

const { RangePicker } = DatePicker

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
  const [dataSource, setDataSource] = useState<any[]>([])
  const [dataSource2, setDataSource2] = useState<any[]>([
    {
      fileType: '1',
      typeName: '三方运输协议',
      contractName: '',
      contractNo: '',
      files: [],
    },
  ])
  const [editableKeys, setEditableRowKeys] = useState<any[]>(['1'])
  const [signType, setSignType] = useState<number>(1)
  const [spinning] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [tableForm] = Form.useForm()

  useEffect(() => {
    if (modalVisible && info) {
      setDataSource([])
    }
  }, [modalVisible, info])

  const intl = useIntl()
  const text = info
    ? intl.formatMessage({
        id: 'pages.btn.edit',
      })
    : intl.formatMessage({
        id: 'pages.btn.add',
      })

  const columns: ProColumns<any>[] = [
    {
      title: '收件人名字',
      key: 'fileName',
      dataIndex: 'fileName',
      width: '28%',
      ellipsis: true,
    },
    {
      title: '签署角色',
      dataIndex: 'fileType',
    },
    {
      title: '邮箱',
      dataIndex: 'fileType',
    },
    {
      title: '手机号码',
      dataIndex: 'createdTime',
      valueType: 'dateTime',
    },
  ]

  const columns2 = [
    {
      title: <RequiredLabel label="合同名称" />,
      dataIndex: 'contractName',
      width: '25%',
    },
    {
      title: <RequiredLabel label="合同编号" />,
      dataIndex: 'contractNo',
      width: '17%',
    },
    {
      title: '合同类型',
      dataIndex: 'typeName',
      width: '17%',
      editable: false,
    },
    {
      title: <RequiredLabel label="签署时间" />,
      dataIndex: 'signTime',
      width: '17%',
      valueType: 'date',
    },
    {
      title: <RequiredLabel label="合同附件" />,
      dataIndex: 'fileList',
      width: '25%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => <ComUpload />,
    },
  ]

  // const getDetail = async () => {
  //   setSpinning(true)
  //   const { data } = await postDetail(info)
  //   setSpinning(false)
  //   if (data) {
  //     form.setFieldsValue({ ...data })
  //   }
  // }

  // useEffect(() => {
  //   if (modalVisible && info) {
  //     getDetail()
  //   }
  // }, [modalVisible])

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
    message.success(
      `${text}${intl.formatMessage({
        id: 'pages.form.success',
      })}`,
    )
    handleSubmit()
    form.resetFields()
  }

  const onChange = (e: any) => {
    setSignType(e.target.value)
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
          <Form.Item label="id" name="id" style={{ display: 'none' }}>
            <Input />
          </Form.Item>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="企业"
                name="name"
                rules={[
                  {
                    required: true,
                    message: `${intl.formatMessage({
                      id: 'pages.form.select',
                    })}企业`,
                  },
                ]}
              >
                <DictSelect authorword="company_register" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="有效日期"
                name="date"
                rules={[
                  {
                    required: true,
                    message: `请选择有效日期`,
                  },
                ]}
              >
                <RangePicker />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="签署方式"
                name="signtype"
                rules={[
                  {
                    required: true,
                    message: `请选择签署方式`,
                  },
                ]}
              >
                <Radio.Group onChange={onChange}>
                  <Radio value={1}>发起线上签署</Radio>
                  <Radio value={2}>已签署上传</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <h3 style={{ fontWeight: 'bold' }}>签署信息</h3>

          {signType === 1 ? (
            <SimpleProtable key="id" columns={columns} dataSource={dataSource || []} />
          ) : (
            <EditableProTable<any>
              rowKey="fileType"
              className="nopaddingtable"
              maxLength={5}
              // 关闭默认的新建按钮
              recordCreatorProps={false}
              columns={columns2}
              value={dataSource2}
              onChange={setDataSource2}
              editable={{
                form: tableForm,
                editableKeys,
                onValuesChange: (record, recordList) => {
                  setDataSource2(recordList)
                },
                onChange: setEditableRowKeys,
              }}
            />
          )}

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
