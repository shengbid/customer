import React, { useState } from 'react'
import CardTitle from '@/components/ComPage/CardTitle'
import ComEditTable from '@/components/ComProtable/ComEditTable'
import type { reportFileProps } from '@/services/types'
import { Form } from 'antd'
import type { ProColumns } from '@ant-design/pro-table'
import RequiredTilte from '@/components/RequiredLabel'
import DictSelect from '@/components/ComSelect'
import ComUpload from '@/components/ComUpload'

const SurveyReport: React.FC = () => {
  const [dataSource, setDataSource] = useState<reportFileProps[]>([
    {
      id: 1,
      fileType: '尽调报告',
      fileList: [],
    },
  ])
  const [editableKeys, setEditableRowKeys] = useState<any[]>([1])
  const [mpForm] = Form.useForm()
  const columns: ProColumns<reportFileProps>[] = [
    {
      title: '附件类型',
      dataIndex: 'fileType',
      width: '30%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => <DictSelect authorword="cus_sfzlx" />,
    },
    {
      title: <RequiredTilte label="附件" />,
      dataIndex: 'identityType',
      ellipsis: true,
      renderFormItem: () => <ComUpload />,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
    },
  ]
  return (
    <>
      <CardTitle title="尽调报告和审贷会审批表">
        <ComEditTable<reportFileProps>
          columns={columns}
          rowKey="id"
          value={dataSource}
          recordCreatorProps={{
            newRecordType: 'dataSource',
            record: () => ({
              id: Date.now(),
            }),
          }}
          editable={{
            type: 'multiple',
            form: mpForm,
            editableKeys,
            onValuesChange: (record: any, recordList: any) => {
              setDataSource(recordList)
            },
            onChange: (editableKeyss: any, editableRows: reportFileProps[]) => {
              setEditableRowKeys(editableKeyss)
              setDataSource(editableRows)
            },
          }}
        />
      </CardTitle>
    </>
  )
}

export default SurveyReport
