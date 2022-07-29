import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Spin, message } from 'antd'
import { EditableProTable } from '@ant-design/pro-table'
import ComUpload from '@/components/ComUpload'
import { editCompanyFile } from '@/services'

interface compnayProps {
  modalVisible: boolean
  handleCancel: (val?: any) => void
  infoData: any[]
  extraInfo: any
}
// 修改企业文件
const EditCompanyFile: React.FC<compnayProps> = ({
  modalVisible,
  handleCancel,
  infoData,
  extraInfo,
}) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<any[]>([])
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [spining, setSpining] = useState<boolean>(true)
  const [tableForm] = Form.useForm()

  const limitTypes = ['gysqd', 'xykhqd', 'jyrsm']
  const columns = [
    {
      title: '附件类型',
      dataIndex: 'typeName',
      width: '40%',
      editable: false,
    },
    {
      title: '附件',
      dataIndex: 'fileList',
      width: '60%',
      formItemProps: {
        rules: [
          {
            required: true,
            validator: ({ field }: any) => {
              if (field.indexOf('qt') < 0) {
                return Promise.reject(new Error('此项是必填项'))
              }
              return Promise.resolve()
            },
          },
        ],
      },
      renderFormItem: (_, { recordKey }: any) => (
        <ComUpload limit={limitTypes.includes(recordKey) ? 1 : 10} />
      ),
    },
  ]

  // 获取详情
  const getDetail = () => {
    if (infoData && infoData.length) {
      if (!infoData.filter((item) => item.fileType === 'qt').length) {
        infoData.push({ fileType: 'qt', typeName: '其他', fileList: [] })
      }
      setDataSource(infoData)
      setEditableRowKeys(infoData.map((item: any) => item.fileType))
    }
    setSpining(false)
  }

  useEffect(() => {
    if (modalVisible) {
      getDetail()
    }
  }, [modalVisible])

  // 提交
  const handleOk = async () => {
    tableForm.validateFields()
    const data = { ...extraInfo }
    dataSource.forEach((item: any) => {
      data[item.fileType] = item.fileList
    })
    await editCompanyFile(data)
    setConfirmLoading(false)
    handleCancel(1)
    message.success('修改成功')
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
      bodyStyle={{ padding: '24px 0' }}
    >
      <Spin spinning={spining}>
        <EditableProTable<any>
          border
          rowKey="fileType"
          scroll={{
            x: 560,
            y: 500,
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
