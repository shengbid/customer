import React, { useState } from 'react'
import CardTitle from '@/components/ComPage/CardTitle'
import ComEditTable from '@/components/ComProtable/ComEditTable'
import type { shareholderProps, relateCompanyProps } from '@/services/types'
import { Form, InputNumber } from 'antd'
import type { ProColumns } from '@ant-design/pro-table'
import RequiredTilte from '@/components/RequiredLabel'
import DictSelect from '@/components/ComSelect'

// 关联信息
const RelatedDetail: React.FC = () => {
  const [dataSource, setDataSource] = useState<shareholderProps[]>([
    {
      id: 1,
      name: '',
      identityType: '',
      identityNumber: '',
      rate: '',
    },
  ])
  const [editableKeys, setEditableRowKeys] = useState<any[]>([1])
  const [editableKeys2, setEditableRowKeys2] = useState<any[]>([1])
  const [dataSource2, setDataSource2] = useState<relateCompanyProps[]>([
    {
      id: 1,
      name: '',
      identityType: '',
      identityNumber: '',
      fullName: '',
      registerAddr: '',
      enterpriseNumber: '',
      registerDetails: '',
      remark: '',
    },
  ])
  const [mpForm] = Form.useForm()
  const [cpForm] = Form.useForm()

  const columns: ProColumns<shareholderProps>[] = [
    {
      title: <RequiredTilte label="股东姓名" />,
      dataIndex: 'name',
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
      title: <RequiredTilte label="身份证件类型" />,
      dataIndex: 'identityType',
      width: '18%',
      renderFormItem: () => <DictSelect authorword="cus_sfzlx" />,
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
      title: <RequiredTilte label="证件号码" />,
      dataIndex: 'identityNumber',
      width: '26%',
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
      title: <RequiredTilte label="占股比例(%)" />,
      dataIndex: 'rate',
      width: '140px',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => {
        return <InputNumber style={{ width: '100%' }} placeholder="请输入数字" />
      },
    },
  ]

  const columns2: ProColumns<relateCompanyProps>[] = [
    {
      title: <RequiredTilte label="企业名称" />,
      dataIndex: 'fullName',
      width: '15%',
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
      title: <RequiredTilte label="注册所在地区" />,
      dataIndex: 'registerAddr',
      width: '9%',
      renderFormItem: () => <DictSelect authorword="company_register" />,
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
      title: <RequiredTilte label="企业编号（注册编号\社会信用代码）" />,
      dataIndex: 'enterpriseNumber',
      width: '15%',
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
      title: <RequiredTilte label="法人姓名" />,
      dataIndex: 'name',
      width: '12%',
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
      title: <RequiredTilte label="身份证件类型" />,
      dataIndex: 'identityType',
      width: '11%',
      renderFormItem: () => <DictSelect authorword="cus_sfzlx" />,
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
      title: <RequiredTilte label="证件号码" />,
      dataIndex: 'identityNumber',
      width: '14%',
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
      title: <RequiredTilte label="注册地址" />,
      dataIndex: 'registerDetails',
      width: '13%',
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
      title: <RequiredTilte label="备注" />,
      dataIndex: 'remark',
      width: '15%',
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
      <CardTitle title="关联股东信息">
        <ComEditTable<shareholderProps>
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
            onChange: (editableKeyss: any, editableRows: shareholderProps[]) => {
              setEditableRowKeys(editableKeyss)
              setDataSource(editableRows)
            },
          }}
        />
      </CardTitle>
      <CardTitle title="关联企业">
        <ComEditTable<relateCompanyProps>
          columns={columns2}
          rowKey="id"
          scroll={{
            x: 1350,
          }}
          value={dataSource2}
          recordCreatorProps={{
            newRecordType: 'dataSource',
            record: () => ({
              id: Date.now(),
            }),
          }}
          editable={{
            type: 'multiple',
            form: cpForm,
            editableKeys: editableKeys2,
            onValuesChange: (record: any, recordList: any) => {
              setDataSource2(recordList)
            },
            onChange: (editableKeyss: any, editableRows: relateCompanyProps[]) => {
              setEditableRowKeys2(editableKeyss)
              setDataSource2(editableRows)
            },
          }}
        />
      </CardTitle>
    </>
  )
}

export default RelatedDetail
