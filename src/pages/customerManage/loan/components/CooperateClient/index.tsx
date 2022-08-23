import React, { useState, useEffect } from 'react'
import Logistics from './logistics'
import ComEditTable from '@/components/ComProtable/ComEditTable'
import RequiredLabel from '@/components/RequiredLabel'
import ComCard from '@/components/ComPage/ComCard'
import DictSelect from '@/components/ComSelect'
import { Form } from 'antd'
import { getLoanCooperateSignList } from '@/services'

interface infoProps {
  enterpriseId: string
}

const CooperateClient: React.FC<infoProps> = ({ enterpriseId }) => {
  const [tableData, setTableData] = useState<any[]>()
  const [tableData2, setTableData2] = useState<any[]>()
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<any[]>()
  const [editableKeys2, setEditableRowKeys2] = useState<React.Key[]>([])
  const [dataSource2, setDataSource2] = useState<any[]>()

  const [tableForm] = Form.useForm()
  const [supplierForm] = Form.useForm()

  // 获取物流列表
  const getList = async () => {
    const { data } = await getLoanCooperateSignList({ enterpriseId, partnerType: 1 })
    if (data) {
      setTableData(data)
    }
  }
  // 获取仓储列表
  const getList2 = async () => {
    const { data } = await getLoanCooperateSignList({ enterpriseId, partnerType: 2 })
    if (data) {
      setTableData2(data)
    }
  }

  useEffect(() => {
    getList()
    getList2()
  }, [])

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

  const columns2 = [
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
    },
    {
      title: <RequiredLabel label="账号" />,
      dataIndex: 'barCode',
      width: '17%',
    },
    {
      title: <RequiredLabel label="收款银行" />,
      dataIndex: 'barCode',
      width: '17%',
    },
    {
      title: <RequiredLabel label="银行地址" />,
      dataIndex: 'barCode',
      width: '25%',
    },
    {
      title: <RequiredLabel label="SWIFT Code" />,
      dataIndex: 'barCode',
      width: '16%',
    },
  ]

  return (
    <>
      <Logistics infoData={tableData} enterpriseId={enterpriseId} type={1} />
      <Logistics infoData={tableData2} enterpriseId={enterpriseId} type={2} />
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
      <ComCard title="合作供应商及收款账户">
        <ComEditTable<any>
          rowKey="key"
          className="nopaddingtable"
          columns={columns2}
          value={dataSource2}
          recordCreatorProps={{
            newRecordType: 'dataSource',
            record: () => ({
              key: Date.now(),
            }),
          }}
          editable={{
            type: 'multiple',
            form: supplierForm,
            editableKeys: editableKeys2,
            onValuesChange: (record: any, recordList: any) => {
              setDataSource2(recordList)
            },
            onChange: (editableKeyss: any, editableRows: any[]) => {
              setEditableRowKeys2(editableKeyss)
              setDataSource2(editableRows)
            },
          }}
        />
      </ComCard>
    </>
  )
}

export default CooperateClient
