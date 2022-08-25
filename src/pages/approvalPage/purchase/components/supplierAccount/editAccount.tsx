import React, { useState, useEffect } from 'react'
import DictSelect from '@/components/ComSelect'
import { Modal, Form, Button, message } from 'antd'
import ComEditTable from '@/components/ComProtable/ComEditTable'
import RequiredLabel from '@/components/RequiredLabel'
import { isEmpty } from 'lodash'

interface editProps {
  modalVisible: boolean
  handleCancel: (val?: any) => void
  infoData: any
  creditParams: any
}
const EditAccount: React.FC<editProps> = ({
  modalVisible,
  handleCancel,
  // creditParams,
  infoData,
}) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<any[]>()
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

  const [tableForm] = Form.useForm()

  const columns = [
    {
      title: <RequiredLabel label="账户名称" />,
      dataIndex: 'barCode',
      width: '20%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => <DictSelect authorword="warehouse_type" />,
    },
    {
      title: <RequiredLabel label="账号" />,
      dataIndex: 'barCode',
      width: '18%',
      editable: false,
    },
    {
      title: <RequiredLabel label="收款银行" />,
      dataIndex: 'barCode',
      width: '17%',
      editable: false,
    },
    {
      title: <RequiredLabel label="银行地址" />,
      dataIndex: 'barCode',
      width: '25%',
      editable: false,
    },
    {
      title: <RequiredLabel label="SWIFT Code" />,
      dataIndex: 'barCode',
      width: '18%',
      editable: false,
    },
  ]

  const onSubmit = async () => {
    if (isEmpty(dataSource)) {
      message.warning('至少添加一条数据再提交!')
      return
    }
    await tableForm.validateFields()
    setConfirmLoading(false)
    handleCancel(1)
  }

  useEffect(() => {
    if (infoData && infoData.length) {
      setDataSource(
        infoData.map((item: any) => {
          return { ...item, key: item.id }
        }),
      )
      setEditableRowKeys(infoData.map((item: any) => item.id))
    }
  }, [infoData])

  return (
    <Modal
      title={'修改供应商收款账户'}
      maskClosable={false}
      destroyOnClose
      width={1000}
      visible={modalVisible}
      footer={false}
      onCancel={handleCancel}
    >
      <ComEditTable<any>
        rowKey="key"
        scroll={{
          x: 1260,
        }}
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

export default EditAccount
