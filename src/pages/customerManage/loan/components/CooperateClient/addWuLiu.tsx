import React, { useState, useEffect } from 'react'
import ComEditTable from '@/components/ComProtable/ComEditTable'
import RequiredLabel from '@/components/RequiredLabel'
import { Form, Modal, Select, Button, message } from 'antd'
import { getCooperatelogisticsList, addCooperateSupplier } from '@/services'
import { isEmpty } from 'lodash'

interface infoProps {
  modalVisible: boolean
  handleCancel: (val?: any) => void
  info: any
}
const AddWarehouse: React.FC<infoProps> = ({ modalVisible, handleCancel, info }) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<any[]>([])
  const [companyList, setCompanyList] = useState<any[]>([])
  const [tableForm] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

  const { Option } = Select

  // 获取供应商企业列表
  const getList = async () => {
    const { rows } = await getCooperatelogisticsList('supplier')
    if (rows) {
      setCompanyList(rows)
    }
  }

  useEffect(() => {
    getList()
  }, [])

  const onSubmit = async () => {
    if (isEmpty(dataSource)) {
      message.warning('至少添加一条数据再提交!')
      return
    }
    await tableForm.validateFields()
    setConfirmLoading(true)
    try {
      await addCooperateSupplier({ info })
    } catch (error) {
      setConfirmLoading(false)
      return
    }
    setConfirmLoading(false)
    handleCancel(1)
  }

  const columns = [
    {
      title: <RequiredLabel label="账户名称" />,
      dataIndex: 'supplierId',
      width: '20%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => (
        <Select>
          {companyList.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.fullName}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: <RequiredLabel label="账号" />,
      dataIndex: 'account',
      width: '17%',
    },
    {
      title: <RequiredLabel label="收款银行" />,
      dataIndex: 'dueBank',
      width: '17%',
    },
    {
      title: <RequiredLabel label="银行地址" />,
      dataIndex: 'bankAddress',
      width: '25%',
    },
    {
      title: <RequiredLabel label="SWIFT Code" />,
      dataIndex: 'swiftCode',
      width: '16%',
    },
  ]
  return (
    <Modal
      title={'新增合作仓库'}
      maskClosable={false}
      destroyOnClose
      width={800}
      visible={modalVisible}
      footer={false}
      onCancel={handleCancel}
    >
      <ComEditTable<any>
        rowKey="key"
        className="nopaddingtable"
        columns={columns}
        value={dataSource}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({
            key: Date.now(),
          }),
        }}
        editable={{
          type: 'multiple',
          form: tableForm,
          editableKeys,
          onValuesChange: (record: any, recordList: any) => {
            setDataSource(recordList)
          },
          onChange: (editableKeyss: any, editableRows: any[]) => {
            setEditableRowKeys(editableKeyss)
            setDataSource(editableRows)
          },
        }}
      />
      <div className="modal-btns">
        <Button type="primary" onClick={onSubmit} loading={confirmLoading}>
          确定
        </Button>
        <Button onClick={handleCancel} className="cancel-btn">
          取消
        </Button>
      </div>
    </Modal>
  )
}

export default AddWarehouse
