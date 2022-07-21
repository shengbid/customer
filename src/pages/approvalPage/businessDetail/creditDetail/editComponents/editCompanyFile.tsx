import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Spin } from 'antd'
import { EditableProTable } from '@ant-design/pro-table'

interface compnayProps {
  modalVisible: boolean
  handleCancel: () => void
}
// 修改企业文件
const EditCompanyFile: React.FC<compnayProps> = ({ modalVisible, handleCancel }) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<any[]>([])
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [spining, setSpining] = useState<boolean>(true)
  const [tableForm] = Form.useForm()

  const columns = [
    {
      title: '附件类型',
      dataIndex: 'fileType',
      editable: false,
      width: '40%',
    },
    {
      title: '附件',
      dataIndex: 'fileList',
      editable: false,
      width: '60%',
    },
  ]

  // 获取详情
  const getDetail = () => {
    setSpining(false)
  }

  useEffect(() => {
    getDetail()
  }, [])

  // 提交
  const handleOk = () => {
    tableForm.validateFields()
    setConfirmLoading(false)
    handleCancel()
  }

  const footer = (
    <div className="modal-btns">
      <Button type="primary" onClick={handleOk} loading={confirmLoading}>
        确定
      </Button>
      <Button onClick={handleCancel} className="cancel-btn">
        取消
      </Button>
    </div>
  )

  return (
    <Modal
      title={'修改企业附件清单'}
      maskClosable={false}
      destroyOnClose
      width={800}
      visible={modalVisible}
      footer={footer}
      onCancel={handleCancel}
    >
      <Spin spinning={spining}>
        <EditableProTable<any>
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
      </Spin>
    </Modal>
  )
}

export default EditCompanyFile
