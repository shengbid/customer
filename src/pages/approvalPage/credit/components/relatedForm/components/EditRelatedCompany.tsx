import React, { useState, useEffect } from 'react'
import type { relateCompanyProps } from '@/services/types'
import ComEditTable from '@/components/ComProtable/ComEditTable'
import type { ProColumns } from '@ant-design/pro-table'
import RequiredTilte from '@/components/RequiredLabel'
import DictSelect from '@/components/ComSelect'
import { idTestReg } from '@/utils/reg'
import { Modal, Form, Button, message } from 'antd'
import { editRelateCompany } from '@/services'
import { isEmpty } from 'lodash'

interface editProps {
  modalVisible: boolean
  handleCancel: (val?: any) => void
  infoData: any
  creditParams: any
}
const EditRelatedCompany: React.FC<editProps> = ({
  modalVisible,
  handleCancel,
  creditParams,
  infoData,
}) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<relateCompanyProps[]>()
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

  const [tableForm] = Form.useForm()

  useEffect(() => {
    if (infoData && infoData.length) {
      setDataSource(
        infoData.map((item: any) => {
          return { ...item, key: item.id }
        }),
      )
      setEditableRowKeys(infoData.map((item: any) => item.id))
    }
  }, [infoData])

  const onSubmit = async () => {
    if (isEmpty(dataSource)) {
      message.warning('至少添加一条数据再提交!')
      return
    }
    await tableForm.validateFields()
    setConfirmLoading(true)
    try {
      await editRelateCompany(
        creditParams.enterpriseId,
        dataSource?.map((item: any) => {
          return {
            ...item,
            associatedEnterpriseId: creditParams.enterpriseId,
          }
        }),
      )
    } catch (error) {
      setConfirmLoading(false)
      return
    }
    setConfirmLoading(false)
    handleCancel(1)
  }

  const columns: ProColumns<relateCompanyProps>[] = [
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
              const current = tableForm.getFieldValue(`${field.split('.')[0]}`) || {}
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
    <Modal
      title={'修改关联企业信息'}
      maskClosable={false}
      destroyOnClose
      width={1000}
      visible={modalVisible}
      footer={false}
      onCancel={handleCancel}
    >
      <ComEditTable<relateCompanyProps>
        rowKey="key"
        scroll={{
          x: 1260,
        }}
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
          onChange: (editableKeyss: any, editableRows: relateCompanyProps[]) => {
            setEditableRowKeys(editableKeyss)
            setDataSource(editableRows)
          },
        }}
      />
      <div className="modal-btns">
        <Button type="primary" onClick={onSubmit} loading={confirmLoading}>
          确定
        </Button>
        <Button onClick={handleCancel} className="cancel-btn">
          取消
        </Button>
      </div>
    </Modal>
  )
}

export default EditRelatedCompany
