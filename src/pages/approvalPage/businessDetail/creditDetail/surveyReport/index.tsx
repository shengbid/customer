import { useImperativeHandle, forwardRef, useState } from 'react'
import CardTitle from '@/components/ComPage/CardTitle'
import { EditableProTable } from '@ant-design/pro-table'
import type { reportFileProps } from '@/services/types'
import { Form } from 'antd'
import type { ProColumns } from '@ant-design/pro-table'
import RequiredTilte from '@/components/RequiredLabel'
import ComUpload from '@/components/ComUpload'

const SurveyReport = ({ creditParams }: any, ref: any) => {
  const [dataSource, setDataSource] = useState<reportFileProps[]>([
    {
      id: 1,
      fileType: '尽调报告',
      fileList: [],
    },
    {
      id: 2,
      fileType: '审贷会审批表',
      fileList: [],
    },
    {
      id: 3,
      fileType: '其他附件',
      fileList: [],
    },
  ])
  const [editableKeys, setEditableRowKeys] = useState<any[]>([1, 2, 3])
  const [mpForm] = Form.useForm()

  useImperativeHandle(ref, () => ({
    // 暴露给父组件的方法
    getBusinessData: async () => {
      try {
        await mpForm.validateFields()
        const businessData = dataSource.map((item) => {
          return {
            ...item,
            ...creditParams,
          }
        })
        return { businessData: { cusCreditAuditReqList: businessData } }
      } catch (error) {
        return ''
      }
    },
  }))

  const columns: ProColumns<reportFileProps>[] = [
    {
      title: '附件类型',
      dataIndex: 'fileType',
      width: '30%',
      editable: false,
    },
    {
      title: <RequiredTilte label="附件" />,
      dataIndex: 'fileList',
      ellipsis: true,
      renderFormItem: () => <ComUpload />,
      formItemProps: {
        rules: [
          {
            validator: ({ field }: any, value: any) => {
              // 获取当前行数据
              const id = field.split('.')[0]
              if (Number(id) !== 3 && (!value || !value.length)) {
                // 如果是其他,不必填
                return Promise.reject(new Error('此项是必填项'))
              }
              return Promise.resolve()
            },
          },
        ],
      },
    },
  ]
  return (
    <>
      <CardTitle title="尽调报告和审贷会审批表">
        <EditableProTable<reportFileProps>
          columns={columns}
          rowKey="id"
          value={dataSource}
          recordCreatorProps={false}
          editable={{
            form: mpForm,
            editableKeys,
            onValuesChange: (record: any, recordList: any) => {
              setDataSource(recordList)
            },
            onChange: setEditableRowKeys,
          }}
        />
      </CardTitle>
    </>
  )
}

export default forwardRef(SurveyReport)
