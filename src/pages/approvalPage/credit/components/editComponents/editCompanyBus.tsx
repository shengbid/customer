import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, Tooltip, message } from 'antd'
import { useIntl } from 'umi'
import ComInputNumber from '@/components/Input/InputNumber'
import { EditableProTable } from '@ant-design/pro-table'
import type { ProColumns } from '@ant-design/pro-table'
import type { companyBusinessProps } from '@/services/types'
import { QuestionCircleOutlined } from '@ant-design/icons'
import DictSelect from '@/components/ComSelect'
import RequiredLabel from '@/components/RequiredLabel'
import { isEmpty } from 'lodash'
import { editCompanyBus } from '@/services'

const { TextArea } = Input

interface compnayProps {
  modalVisible: boolean
  handleCancel: (val?: any) => void
  infoData: any
}

// 修改企业信息
const EditCompany: React.FC<compnayProps> = ({ modalVisible, handleCancel, infoData }) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([2022, 2021])
  const [dataSource, setDataSource] = useState<companyBusinessProps[]>(infoData)
  const [busType, setBusType] = useState<string[]>([])
  const [unit, setUnit] = useState<number>(1)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const intl = useIntl()
  const [form] = Form.useForm()
  const [tableForm] = Form.useForm()

  // 表格初始数据
  const initTable = () => {
    setEditableRowKeys(infoData.businessDetailsList.map((item: any) => item.year))
    setDataSource(infoData.businessDetailsList)
    setUnit(1)
  }

  // 提交
  const handleOk = async (values: any) => {
    // console.log(values)
    await editCompanyBus({ cusEnterpriseInfo: values, businessDetailsList: dataSource })
    setConfirmLoading(false)
    handleCancel(1)
    message.success('修改成功')
  }

  useEffect(() => {
    if (modalVisible && infoData && infoData.id) {
      // console.log(infoData)
      if (!isEmpty(infoData.businessDetailsList)) {
        initTable()
      }
      setBusType(infoData.businessTypeList)
      form.setFieldsValue(infoData)
    }
  }, [modalVisible, infoData])

  const columns: ProColumns<companyBusinessProps>[] = [
    {
      title: '年度',
      dataIndex: 'year',
      editable: false,
      width: '20%',
    },
    {
      title: (
        <span>
          B2B营业额（万元）
          <Tooltip title="B2B营业额（万元）">
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      ),
      dataIndex: 'btobQuota',
      formItemProps: {
        rules: [
          {
            required: busType.includes('B2B') ? true : false,
            message: '此项为必填项',
          },
        ],
      },
      width: '40%',
      renderFormItem: () => <ComInputNumber unit={unit} />,
    },
    {
      title: (
        <span>
          B2C/BBC营业额（万元）
          <Tooltip title="B2C/BBC营业额（万元）">
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      ),
      dataIndex: 'btocQuota',
      formItemProps: {
        rules: [
          {
            required: busType.includes('B2C') ? true : false,
            message: '此项为必填项',
          },
        ],
      },
      width: '40%',
      renderFormItem: () => <ComInputNumber unit={unit} />,
    },
  ]

  return (
    <Modal
      title={'修改企业信息'}
      maskClosable={false}
      destroyOnClose
      width={800}
      visible={modalVisible}
      footer={false}
      onCancel={handleCancel}
    >
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ phoneArea: '+86' }}
        form={form}
        autoComplete="off"
        scrollToFirstError
        onFinish={handleOk}
      >
        <Form.Item label="enterpriseName" name="enterpriseName" style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item label="id" name="id" style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({
            id: 'credit.apply.companyName',
          })}
        >
          <span>{infoData.enterpriseName}</span>
        </Form.Item>

        <Form.Item
          name="businessTypeList"
          label={intl.formatMessage({
            id: 'credit.apply.business',
          })}
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}${intl.formatMessage({
                id: 'credit.apply.business',
              })}`,
            },
          ]}
        >
          <DictSelect authorword="cus_zyyw" disabled type="checkbox" onChange={setBusType} />
        </Form.Item>
        <Form.Item
          name="sellProduct"
          label={intl.formatMessage({
            id: 'credit.apply.type',
          })}
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}${intl.formatMessage({
                id: 'credit.apply.type',
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
                id: 'credit.apply.businessCondition',
              })}
            />
          }
        >
          <EditableProTable<companyBusinessProps>
            rowKey="year"
            scroll={{
              x: 560,
            }}
            maxLength={5}
            // 关闭默认的新建按钮
            recordCreatorProps={false}
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
        </Form.Item>
        <Form.Item
          name="enterpriseDebt"
          label={intl.formatMessage({
            id: 'credit.apply.debt',
          })}
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}${intl.formatMessage({
                id: 'credit.apply.debt',
              })}`,
            },
          ]}
        >
          <TextArea maxLength={1000} autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>
        <Form.Item
          name="applyQuota"
          label={intl.formatMessage({
            id: 'credit.apply.amount',
          })}
          tooltip="最高不超过月均销售额的2倍，实际以批复为准"
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}${intl.formatMessage({
                id: 'credit.apply.amount',
              })}`,
            },
          ]}
        >
          <ComInputNumber unit={unit} />
        </Form.Item>

        <div className="modal-btns">
          <Button type="primary" htmlType="submit" loading={confirmLoading}>
            确定
          </Button>
          <Button onClick={handleCancel} className="cancel-btn">
            取消
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default EditCompany
