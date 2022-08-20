import React, { useState } from 'react'
import Logistics from './logistics'
import ComEditTable from '@/components/ComProtable/ComEditTable'
import RequiredLabel from '@/components/RequiredLabel'
import ComCard from '@/components/ComPage/ComCard'
import DictSelect from '@/components/ComSelect'
import { Form } from 'antd'
interface infoProps {
  enterpriseId: string
}

const CooperateClient: React.FC<infoProps> = ({ enterpriseId }) => {
  const [tableData] = useState<any[]>()
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<any[]>()

  const [tableForm] = Form.useForm()

  const columns = [
    {
      title: <RequiredLabel label="仓库名称" />,
      dataIndex: 'barCode',
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
      title: <RequiredLabel label="所属仓库企业" />,
      dataIndex: 'barCode',
      editable: false,
    },
  ]

  return (
    <>
      <Logistics infoData={tableData} enterpriseId={enterpriseId} title="物流" />
      <Logistics infoData={tableData} enterpriseId={enterpriseId} title="仓储" />
      <ComCard title="合作仓库">
        <ComEditTable<any>
          rowKey="key"
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
    </>
  )
}

export default CooperateClient
