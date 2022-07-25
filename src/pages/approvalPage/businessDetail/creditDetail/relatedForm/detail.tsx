import React, { useState, useEffect } from 'react'
import CardTitle from '@/components/ComPage/CardTitle'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { dictListProps, shareholderProps, relateCompanyProps } from '@/services/types'
import type { ProColumns } from '@ant-design/pro-table'
import DictShow from '@/components/ComSelect/dictShow'
import { getDictSelectList } from '@/services'

const RealteDetail: React.FC = () => {
  const [dataSource, setDataSource] = useState<shareholderProps[]>([])
  const [dataSource2, setDataSource2] = useState<relateCompanyProps[]>([])
  const [dictList, setDictList] = useState<dictListProps[]>([])
  const [dictList2, setDictList2] = useState<dictListProps[]>([])

  useEffect(() => {
    setDataSource([
      {
        id: 1,
        name: '张三',
        identityType: 'dlsfz',
        identityNumber: '365896188801252356',
        rate: '20',
      },
    ])
    setDataSource2([
      {
        id: 1,
        name: '张三',
        identityType: 'dlsfz',
        identityNumber: '365896188801252356',
        fullName: '吉祥科创',
        registerAddr: '1',
        enterpriseNumber: '33333',
        registerDetails: '深圳',
        remark: '备注',
      },
    ])
  }, [])

  const getDictData = async () => {
    const { data } = await getDictSelectList('cus_sfzlx')
    if (data) setDictList(data)
  }
  const getDictData2 = async () => {
    const { data } = await getDictSelectList('company_register')
    if (data) setDictList2(data)
  }
  useEffect(() => {
    getDictData()
    getDictData2()
  }, [])

  const columns: ProColumns<shareholderProps>[] = [
    {
      title: '股东姓名',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '身份证件类型',
      key: 'identityType',
      dataIndex: 'identityType',
      render: (_, record) => <DictShow dictValue={record.identityType} dictData={dictList} />,
    },
    {
      title: '证件号码',
      key: 'identityNumber',
      dataIndex: 'identityNumber',
    },
    {
      title: '占股比例(%)',
      key: 'rate',
      dataIndex: 'rate',
    },
  ]
  const columns2: ProColumns<relateCompanyProps>[] = [
    {
      title: '企业名称',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: '企业注册所在地区',
      key: 'registerAddr',
      dataIndex: 'registerAddr',
      render: (_, record) => <DictShow dictValue={record.registerAddr} dictData={dictList2} />,
    },
    {
      title: '企业编号（注册编号社会信用代码）',
      key: 'enterpriseNumber',
      dataIndex: 'enterpriseNumber',
    },
    {
      title: '法人姓名',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '身份证件类型',
      key: 'identityType',
      dataIndex: 'identityType',
      render: (_, record) => <DictShow dictValue={record.identityType} dictData={dictList} />,
    },
    {
      title: '地址',
      key: 'registerDetails',
      dataIndex: 'registerDetails',
    },
    {
      title: '备注',
      key: 'remark',
      dataIndex: 'remark',
    },
  ]

  return (
    <>
      <CardTitle title="关联股东信息">
        <SimpleProtable key="id" columns={columns} dataSource={dataSource || []} />
      </CardTitle>
      <CardTitle title="关联企业">
        <SimpleProtable key="id" columns={columns2} dataSource={dataSource2 || []} />
      </CardTitle>
    </>
  )
}

export default RealteDetail
