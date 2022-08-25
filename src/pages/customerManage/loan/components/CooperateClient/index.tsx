import React, { useState, useEffect, useRef } from 'react'
import Logistics from './logistics'
import { EditableProTable } from '@ant-design/pro-table'
import RequiredLabel from '@/components/RequiredLabel'
import ComCard from '@/components/ComPage/ComCard'
import { Form, Select, message, Popconfirm, Spin } from 'antd'
import {
  getLoanCooperateSignList,
  getCooperatelogisticsList,
  addCooperateSupplier,
  deleteCooperateSupplier,
  cooperateSupplierList,
  editCooperateSupplier,
} from '@/services'
import { omit } from 'lodash'

const { Option } = Select

interface infoProps {
  enterpriseId: number
}

const CooperateClient: React.FC<infoProps> = ({ enterpriseId }) => {
  const [tableData, setTableData] = useState<any[]>()
  const [tableData2, setTableData2] = useState<any[]>()
  // const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  // const [dataSource, setDataSource] = useState<any[]>()
  const [editableKeys2, setEditableRowKeys2] = useState<React.Key[]>([])
  const [dataSource2, setDataSource2] = useState<any[]>([])
  const [companyList, setCompanyList] = useState<any[]>([])
  const [spinning1, setSpinning1] = useState<boolean>(true)
  const [spinning2, setSpinning2] = useState<boolean>(true)
  const [spinning3, setSpinning3] = useState<boolean>(true)

  const [supplierForm] = Form.useForm()
  const formRef = useRef<any>()

  // 获取物流列表
  const getList = async () => {
    setSpinning1(true)
    try {
      const { data } = await getLoanCooperateSignList({ enterpriseId, partnerType: 1 })
      if (data) {
        setTableData(
          data.map((item: any) => {
            return {
              ...item,
              ...omit(item.contractInfoRes, ['id']),
            }
          }),
        )
      }
    } catch (error) {
      setSpinning1(false)
    }
    setSpinning1(false)
  }
  // 获取仓储列表
  const getList2 = async () => {
    setSpinning2(true)
    try {
      const { data } = await getLoanCooperateSignList({ enterpriseId, partnerType: 2 })
      setSpinning2(false)
      if (data) {
        setTableData2(
          data.map((item: any) => {
            return {
              ...item,
              ...omit(item.contractInfoRes, ['id']),
            }
          }),
        )
      }
    } catch (error) {
      setSpinning2(false)
    }
  }

  // 获取供应商企业列表
  const getSupplierCompanyList = async () => {
    const { rows } = await getCooperatelogisticsList('supplier')
    if (rows) {
      setCompanyList(rows)
    }
  }
  // 获取供应商列表
  const getSupplierList = async () => {
    setSpinning3(true)
    try {
      const { data } = await cooperateSupplierList({ enterpriseId })
      setSpinning3(false)
      if (data) {
        setDataSource2(
          data.map((item: any) => {
            return {
              ...item,
              key: item.id,
            }
          }),
        )
      }
    } catch (error) {
      setSpinning3(false)
    }
  }

  useEffect(() => {
    getList()
    getList2()
    getSupplierList()
    getSupplierCompanyList()
  }, [])

  // 删除
  const delteRecored = async (ids: number) => {
    await deleteCooperateSupplier(ids)
    message.success('删除成功!')
    getSupplierList()
  }

  // const columns = [
  //   {
  //     title: <RequiredLabel label="仓库名称" />,
  //     dataIndex: 'warehouseName',
  //     formItemProps: {
  //       rules: [
  //         {
  //           required: true,
  //           message: '此项是必填项',
  //         },
  //       ],
  //     },
  //     renderFormItem: () => (
  //       <Select onChange={selectWare}>
  //         {wareList.map((item) => (
  //           <Option key={item.id} value={item.id}>
  //             {item.fullName}
  //           </Option>
  //         ))}
  //       </Select>
  //     ),
  //   },
  //   {
  //     title: <RequiredLabel label="所属仓库企业" />,
  //     dataIndex: 'barCode',
  //     editable: false,
  //   },
  // ]

  const columns2 = [
    {
      title: <RequiredLabel label="账户名称" />,
      dataIndex: 'supplierId',
      width: '20%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => (
        <Select>
          {companyList.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.fullName}
            </Option>
          ))}
        </Select>
      ),
      render: (_, recored: any) => <>{recored.supplierName}</>,
    },
    {
      title: <RequiredLabel label="账号" />,
      dataIndex: 'account',
      width: '17%',
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
      title: <RequiredLabel label="收款银行" />,
      dataIndex: 'dueBank',
      width: '17%',
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
      title: <RequiredLabel label="银行地址" />,
      dataIndex: 'bankAddress',
      width: '25%',
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
      title: <RequiredLabel label="SWIFT Code" />,
      dataIndex: 'swiftCode',
      width: '16%',
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
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (text: any, record: any, _: any, action: any) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.key)
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key="delete"
          title="是否确认删除?"
          onConfirm={() => {
            delteRecored(record.id)
          }}
          okText="确定"
          cancelText="取消"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ]

  return (
    <>
      <Spin spinning={spinning1}>
        <Logistics
          infoData={tableData}
          handleSuccess={() => getList()}
          enterpriseId={enterpriseId}
          type={1}
        />
      </Spin>
      <Spin spinning={spinning2}>
        <Logistics
          infoData={tableData2}
          handleSuccess={() => getList2()}
          enterpriseId={enterpriseId}
          type={2}
        />
      </Spin>

      {/* <ComCard title="合作仓库">
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
      </ComCard> */}
      <Spin spinning={spinning3}>
        <ComCard title="合作供应商及收款账户">
          <EditableProTable<any>
            rowKey="key"
            className="nopaddingtable"
            formRef={formRef}
            columns={columns2}
            value={dataSource2}
            recordCreatorProps={{
              newRecordType: 'dataSource',
              record: () => ({
                key: Date.now(),
              }),
            }}
            onChange={setDataSource2}
            editable={{
              // type: 'multiple',
              form: supplierForm,
              editableKeys: editableKeys2,
              actionRender: (row, config, defaultDom) => {
                return [defaultDom.save, defaultDom.cancel]
              },
              onSave: async (rowKey, data) => {
                if (data.id) {
                  await editCooperateSupplier({ ...data, enterpriseId })
                } else {
                  await addCooperateSupplier({ ...data, enterpriseId })
                }
                message.success('保存成功!')
                getSupplierList()
              },
              onCancel: getSupplierList,
              onChange: setEditableRowKeys2,
            }}
          />
        </ComCard>
      </Spin>
    </>
  )
}

export default CooperateClient
