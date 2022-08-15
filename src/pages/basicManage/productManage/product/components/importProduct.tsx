import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'antd'
import type { addModalProps } from '@/services/types'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { ProColumns } from '@ant-design/pro-table'

const ImportProduct: React.FC<addModalProps> = ({
  modalVisible,
  handleSubmit,
  handleCancel,
  info,
}) => {
  const [dataSource, setDataSource] = useState<any[]>([
    {
      id: '1',
    },
  ])
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [count] = useState<number>(0)

  useEffect(() => {
    if (modalVisible && info) {
      setDataSource([{ id: '1' }])
    }
  }, [modalVisible, info])

  const columns: ProColumns<any>[] = [
    {
      title: '商品名称',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: '品牌名称',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: '商品条码',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: 'REF码',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: '商品HScode',
      key: 'code',
      dataIndex: 'code',
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: '最近购单价(美元)',
      key: 'code',
      dataIndex: 'code',
      valueType: 'digit',
      width: 125,
      hideInSearch: true,
    },
    {
      title: '公允价(美元)',
      key: 'code',
      dataIndex: 'code',
      valueType: 'digit',
      width: 110,
      hideInSearch: true,
    },
    {
      title: '单位',
      key: 'code',
      dataIndex: 'code',
      width: 60,
      hideInSearch: true,
    },
    {
      title: '保质期(月)',
      key: 'code',
      dataIndex: 'code',
      width: 90,
      hideInSearch: true,
    },
  ]

  const submit = () => {
    setConfirmLoading(false)
    handleSubmit()
  }

  return (
    <Modal
      title="批量导入商品"
      maskClosable={false}
      destroyOnClose
      width={1000}
      visible={modalVisible}
      footer={null}
      onCancel={handleCancel}
    >
      <SimpleProtable
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: 1100 }}
        rowSelection={{
          selectedRowKeys,
          onChange: (value) => {
            setSelectedRowKeys(value)
          },
        }}
        tableAlertRender={() => (
          <div>
            <span>已选择 {selectedRowKeys.length} 个商品</span>
            {count ? <span>，其中{count}个商品已存在， 若继续提交会覆盖已有商品信息。</span> : null}
          </div>
        )}
      />
      <div className="modal-btns" style={{ marginTop: 24 }}>
        <Button type="primary" onClick={submit} loading={confirmLoading}>
          确定
        </Button>
        <Button onClick={handleCancel} className="cancel-btn">
          取消
        </Button>
      </div>
    </Modal>
  )
}

export default ImportProduct
