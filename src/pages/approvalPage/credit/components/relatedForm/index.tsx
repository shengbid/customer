import { useImperativeHandle, forwardRef, useState, useEffect } from 'react'
import CardTitle from '@/components/ComPage/CardTitle'
import ComEditTable from '@/components/ComProtable/ComEditTable'
import type { shareholderProps, relateCompanyProps } from '@/services/types'
import { Form } from 'antd'
import type { ProColumns } from '@ant-design/pro-table'
import RequiredTilte from '@/components/RequiredLabel'
import DictSelect from '@/components/ComSelect'
import { idTestReg } from '@/utils/reg'
import { getRelateCompany, getRelateShareholder } from '@/services'
import ComInputNumber from '@/components/Input/InputNumber'

// 关联信息
const RelatedDetail = ({ creditParams }: any, ref: any) => {
  const [dataSource, setDataSource] = useState<shareholderProps[]>([])
  const [editableKeys, setEditableRowKeys] = useState<any[]>([])
  const [editableKeys2, setEditableRowKeys2] = useState<any[]>([])
  const [dataSource2, setDataSource2] = useState<relateCompanyProps[]>([])
  const [mpForm] = Form.useForm()
  const [cpForm] = Form.useForm()

  // 下一个节点驳回时,需要查询数据
  // 获取关联企业
  const getRlist = async () => {
    const { rows } = await getRelateCompany(creditParams.enterpriseId)
    if (rows && rows.length) {
      setDataSource2(rows)
      setEditableRowKeys2(rows.map((item: any) => item.id))
    }
  }
  // 获取关联股东
  const getShareloaderList = async () => {
    const { rows } = await getRelateShareholder(creditParams.enterpriseId)
    if (rows && rows.length) {
      setDataSource(rows)
      setEditableRowKeys(rows.map((item: any) => item.id))
    }
  }

  useEffect(() => {
    if (creditParams.enterpriseId) {
      getShareloaderList()
      getRlist()
    }
  }, [creditParams])

  useImperativeHandle(ref, () => ({
    // 暴露给父组件的方法
    getBusinessData: async () => {
      let errors = ''
      try {
        await mpForm.validateFields()
        let totalRate = 0
        dataSource?.forEach((item: any) => {
          if (item.shareProportion) {
            totalRate += Number(item.shareProportion)
          }
        })
        if (totalRate > 100) {
          errors = '关联股东信息: 占股比例总和不能超过100!'
          throw new Error('占股比例总和不能超过100')
        }
        const cusRelatedShareholderReqList = dataSource.map((item) => {
          return {
            ...item,
            associatedEnterpriseId: creditParams.enterpriseId,
          }
        })
        await cpForm.validateFields()
        const businessData = dataSource2.map((item) => {
          return {
            ...item,
            associatedEnterpriseId: creditParams.enterpriseId,
          }
        })
        return {
          businessData: {
            cusAssoEnterpriseReqList: businessData,
            cusRelatedShareholderReqList,
          },
        }
      } catch (error) {
        return errors ? { error: errors } : ''
      }
    },
  }))

  const columns: ProColumns<shareholderProps>[] = [
    {
      title: <RequiredTilte label="股东姓名" />,
      dataIndex: 'shareholderName',
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
            validator: ({ field }: any, value: any) => {
              // 获取当前行数据
              const current = mpForm.getFieldValue(`${field.split('.')[0]}`) || {}
              const idType = current.identityType ? current.identityType : 'xgsfz'

              if (!value) {
                return Promise.reject(new Error('此项是必填项'))
              } else if (!idTestReg(value)[idType]) {
                return Promise.reject(new Error('证件号码格式不正确'))
              }
              return Promise.resolve()
            },
          },
        ],
      },
    },
    {
      title: <RequiredTilte label="占股比例(%)" />,
      dataIndex: 'shareProportion',
      width: '140px',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => <ComInputNumber max={100} />,
    },
  ]

  const columns2: ProColumns<relateCompanyProps>[] = [
    {
      title: <RequiredTilte label="企业名称" />,
      dataIndex: 'enterpriseName',
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
      dataIndex: 'companyRegister',
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
      title: <RequiredTilte label="企业编号（注册编号/社会信用代码）" />,
      dataIndex: 'enterpriseCode',
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
      dataIndex: 'frName',
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
            validator: ({ field }: any, value: any) => {
              // 获取当前行数据
              const current = cpForm.getFieldValue(`${field.split('.')[0]}`) || {}
              const idType = current.identityType ? current.identityType : 'xgsfz'

              if (!value) {
                return Promise.reject(new Error('此项是必填项'))
              } else if (!idTestReg(value)[idType]) {
                return Promise.reject(new Error('证件号码格式不正确'))
              }
              return Promise.resolve()
            },
          },
        ],
      },
    },
    {
      title: <RequiredTilte label="注册地址" />,
      dataIndex: 'registrationAddress',
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
      title: '备注',
      dataIndex: 'remark',
      width: '15%',
      // formItemProps: {
      //   rules: [
      //     {
      //       required: true,
      //       message: '此项是必填项',
      //     },
      //   ],
      // },
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

export default forwardRef(RelatedDetail)
