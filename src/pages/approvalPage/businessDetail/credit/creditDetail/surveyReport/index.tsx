import { useImperativeHandle, forwardRef, useState, useEffect } from 'react'
import CardTitle from '@/components/ComPage/CardTitle'
import { EditableProTable } from '@ant-design/pro-table'
import type { reportFileProps } from '@/services/types'
import { Form, Row, Col, Cascader } from 'antd'
import type { ProColumns } from '@ant-design/pro-table'
import RequiredTilte from '@/components/RequiredLabel'
import ComUpload from '@/components/ComUpload'
import ComEditTable from '@/components/ComProtable/ComEditTable'
import DictSelect from '@/components/ComSelect'
import ComInputNumber from '@/components/Input/InputNumber'
import IntegerInputNumber from '@/components/Input/integerInput'
import { transferAmount } from '@/utils/base'

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
  const [dataSource2, setDataSource2] = useState<any[]>([
    {
      id: 1,
    },
  ])
  const [editableKeys2, setEditableRowKeys2] = useState<any[]>([1])
  const [options, setOptions] = useState<any[]>([])
  const [mpForm] = Form.useForm()
  const [creditForm] = Form.useForm()
  const [form] = Form.useForm()

  useEffect(() => {
    setOptions([{ label: '测试1', value: 1, children: [{ label: '测试11', value: 11 }] }])
  }, [])

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
        await creditForm.validateFields()
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

  const columns2 = [
    {
      title: <RequiredTilte label="金融产品" />,
      dataIndex: 'fileType',
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
      title: <RequiredTilte label="额度" />,
      dataIndex: 'amount',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => <ComInputNumber addonBefore="$" />,
    },
    {
      title: <RequiredTilte label="代理服务费(%)" />,
      dataIndex: 'rate',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => <ComInputNumber />,
    },
    {
      title: <RequiredTilte label="用款方式/垫资期限" />,
      dataIndex: 'type',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => (
        <Cascader style={{ width: '100%' }} options={options} multiple maxTagCount="responsive" />
      ),
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
      <CardTitle title="授信方案">
        <Form name="basic" form={form} autoComplete="off" layout="vertical">
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item
                label="客户质押率(%)"
                name="amount1"
                rules={[
                  {
                    required: true,
                    message: `请输入客户质押率`,
                  },
                ]}
              >
                <ComInputNumber max={100} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="授信期限(月)"
                name="amount2"
                rules={[
                  {
                    required: true,
                    message: `请输入授信期限`,
                  },
                ]}
              >
                <IntegerInputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="授信总额度"
                name="amount3"
                rules={[
                  {
                    required: true,
                    message: `请输入授信总额度`,
                  },
                ]}
              >
                <ComInputNumber addonBefore="$" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="客户申请金额(万元)"
                name="amount3"
                rules={[
                  {
                    required: true,
                    message: `请输入客户申请金额`,
                  },
                ]}
              >
                <span>{transferAmount(77700)}</span>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <ComEditTable<any>
          columns={columns2}
          rowKey="id"
          value={dataSource2}
          recordCreatorProps={false}
          editable={{
            form: creditForm,
            type: 'multiple',
            editableKeys: editableKeys2,
            onValuesChange: (record: any, recordList: any) => {
              setDataSource2(recordList)
            },
            onChange: setEditableRowKeys2,
          }}
        />
      </CardTitle>
    </>
  )
}

export default forwardRef(SurveyReport)
