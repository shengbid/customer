import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, message, Spin, Row, Col, Select } from 'antd'
import type { addModalProps } from '@/services/types'
import { addWarehouse, warehouseDetail, editWarehouse, getWareCompanyList } from '@/services'
import DictSelect from '@/components/ComSelect'
import { useIntl } from 'umi'
import RequiredLabel from '@/components/RequiredLabel'
import ComEditTable from '@/components/ComProtable/ComEditTable'
import { emailReg, phoneTestReg } from '@/utils/reg'

const { Option } = Select

const AddModal: React.FC<addModalProps> = ({ modalVisible, handleSubmit, handleCancel, info }) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [dataSource, setDataSource] = useState<any[]>([])
  const [editableKeys, setEditableRowKeys] = useState<any[]>([])
  const [companyList, setCompanyList] = useState<any[]>([])
  const [spinning] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [tableForm] = Form.useForm()
  const [title, setTitle] = useState<string>('新增仓库')

  // 获取物流企业下拉
  const getWareList = async () => {
    const { data } = await getWareCompanyList()
    if (data) {
      setCompanyList(data)
    }
  }
  // 获取详情
  const getDetail = async () => {
    const { data } = await warehouseDetail(info)
    if (data) {
      form.setFieldsValue({
        ...data,
        logistics: {
          label: data.logisticsEnterprise,
          value: data.logisticsEnterpriseId,
        },
      })
      setDataSource(data.warehouseContactList)
      setEditableRowKeys(data.warehouseContactList.map((item: any) => item.id))
    }
  }

  useEffect(() => {
    if (modalVisible) {
      getWareList()
      if (info) {
        setTitle('修改仓库')
        getDetail()
      } else {
        setDataSource([
          {
            id: '1',
          },
        ])
        setEditableRowKeys(['1'])
      }
    }
  }, [modalVisible, info])

  const intl = useIntl()

  const columns = [
    {
      title: <RequiredLabel label="联系人姓名" />,
      dataIndex: 'name',
      width: '17%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
    },
    {
      title: <RequiredLabel label="岗位" />,
      dataIndex: 'post',
      width: '17%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
    },
    {
      title: <RequiredLabel label="联系电话" />,
      dataIndex: 'phoneArea',
      className: 'edittablecolleft',
      width: 100,
      renderFormItem: () => <DictSelect authorword="phone_code" allowClear={false} />,
    },
    {
      title: '',
      dataIndex: 'phoneNumber',
      className: 'edittablecolright',
      width: 135,
      formItemProps: {
        rules: [
          {
            required: true,
            validator: ({ field }: any, value: any) => {
              // 获取当前行数据
              const current = tableForm.getFieldValue(`${field.split('.')[0]}`) || {}
              const idType = current.phoneArea ? Number(current.phoneArea) : 1

              if (!value) {
                return Promise.reject(new Error('此项是必填项'))
              } else if (!phoneTestReg(value)[idType]) {
                return Promise.reject(new Error('电话号码格式不正确'))
              }
              return Promise.resolve()
            },
          },
        ],
      },
    },
    {
      title: <RequiredLabel label="邮箱" />,
      dataIndex: 'mailbox',
      width: '17%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
          emailReg,
        ],
      },
    },
    {
      title: <RequiredLabel label="抄送邮箱" />,
      dataIndex: 'copyMailbox',
      width: '17%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
          emailReg,
        ],
      },
    },
  ]

  const handleOk = async (values: any) => {
    setConfirmLoading(true)
    await tableForm.validateFields()
    try {
      if (info) {
        await editWarehouse({
          jxWarehouseManage: {
            ...values,
            logisticsEnterpriseId: values.logistics.value,
            logisticsEnterprise: values.logistics.label,
          },
          jxWarehouseContactList: dataSource,
        })
      } else {
        await addWarehouse({
          jxWarehouseManage: {
            ...values,
            logisticsEnterpriseId: values.logistics.value,
            logisticsEnterprise: values.logistics.label,
          },
          jxWarehouseContactList: dataSource,
        })
      }
      setConfirmLoading(false)
    } catch (error) {
      setConfirmLoading(false)
      return
    }
    message.success(`新增成功`)
    handleSubmit()
    form.resetFields()
    tableForm.resetFields()
  }

  const cancel = () => {
    handleCancel()
    form.resetFields()
    tableForm.resetFields()
  }

  return (
    <Modal
      title={title}
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
          <h3 style={{ fontWeight: 'bold' }}>
            {intl.formatMessage({
              id: 'customer.loan.baseInfo',
            })}
          </h3>

          <Form.Item label="id" name="id" style={{ display: 'none' }}>
            <Input maxLength={150} />
          </Form.Item>
          <Form.Item label="version" name="version" style={{ display: 'none' }}>
            <Input maxLength={150} />
          </Form.Item>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="仓库名称"
                name="warehouseName"
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
                label="仓库类型"
                name="warehouseType"
                rules={[
                  {
                    required: true,
                    message: `请选择仓库类型`,
                  },
                ]}
              >
                <DictSelect authorword="warehouse_type" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="所属企业"
                name="logistics"
                rules={[
                  {
                    required: true,
                    message: `请选择所属企业`,
                  },
                ]}
              >
                <Select labelInValue>
                  {companyList.map((item: any) => (
                    <Option key={item.id} value={item.id}>
                      {item.fullName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="仓库地址"
                name="warehouseAddress"
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
            scroll={{
              x: 1000,
            }}
            onChange={setDataSource}
            editable={{
              form: tableForm,
              type: 'multiple',
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
