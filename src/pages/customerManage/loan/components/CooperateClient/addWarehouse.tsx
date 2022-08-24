import React, { useState, useEffect } from 'react'
import ComEditTable from '@/components/ComProtable/ComEditTable'
import RequiredLabel from '@/components/RequiredLabel'
import ComCard from '@/components/ComPage/ComCard'
import { Form, Modal, Select } from 'antd'
import { getWarehouseList } from '@/services'

interface infoProps {
  modalVisible: boolean
  handleCancel: (val?: any) => void
  info: any
}
const AddWarehouse: React.FC<infoProps> = ({ modalVisible, handleCancel, info }) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<any[]>([])
  const [wareList, setWareList] = useState<any[]>([])
  const [tableForm] = Form.useForm()

  const { Option } = Select

  // 获取仓库列表
  const getList = async () => {
    const param = {
      logisticsEnterpriseId: info.value,
      logisticsEnterprise: info.label,
    }
    const { rows } = await getWarehouseList(param)
    setWareList(rows)
  }

  useEffect(() => {
    getList()
  }, [])

  const selectWare = () => {}

  const columns = [
    {
      title: <RequiredLabel label="仓库名称" />,
      dataIndex: 'warehouseName',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => (
        <Select onChange={selectWare}>
          {wareList.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.fullName}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: <RequiredLabel label="所属仓库企业" />,
      dataIndex: 'barCode',
      editable: false,
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
      <ComCard title="合作仓库">
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
      </ComCard>
    </Modal>
  )
}

export default AddWarehouse
