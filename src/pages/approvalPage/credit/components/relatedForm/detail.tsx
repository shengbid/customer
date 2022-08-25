import React, { useState, useEffect } from 'react'
import CardTitle from '@/components/ComPage/CardTitle'
import { Button } from 'antd'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { dictListProps, shareholderProps, relateCompanyProps } from '@/services/types'
import type { ProColumns } from '@ant-design/pro-table'
import DictShow from '@/components/ComSelect/dictShow'
import { getDictSelectList, getRelateCompany, getRelateShareholder } from '@/services'
import EditRelatedCompany from './components/EditRelatedCompany'
import EditRelatedSharelod from './components/EditRelatedSharelod'

interface relateProps {
  isEdit?: boolean
  creditParams: any
}

const RealteDetail: React.FC<relateProps> = ({ isEdit = false, creditParams }) => {
  const [dataSource, setDataSource] = useState<shareholderProps[]>([])
  const [dataSource2, setDataSource2] = useState<relateCompanyProps[]>([])
  const [dictList, setDictList] = useState<dictListProps[]>([])
  const [dictList2, setDictList2] = useState<dictListProps[]>([])
  const [shareholdVisible, setShareholdVisible] = useState<boolean>(false)
  const [companyVisible, setCompanyVisible] = useState<boolean>(false)

  // 获取关联企业
  const getRlist = async () => {
    const { rows } = await getRelateCompany(creditParams.enterpriseId)
    setDataSource2(rows)
  }
  // 获取关联股东
  const getShareloaderList = async () => {
    const { rows } = await getRelateShareholder(creditParams.enterpriseId)
    setDataSource(rows)
  }

  useEffect(() => {
    if (creditParams.enterpriseId) {
      getShareloaderList()
      getRlist()
    }
  }, [creditParams])

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
      key: 'shareholderName',
      dataIndex: 'shareholderName',
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
      key: 'shareProportion',
      dataIndex: 'shareProportion',
    },
  ]
  const columns2: ProColumns<relateCompanyProps>[] = [
    {
      title: '企业名称',
      key: 'enterpriseName',
      dataIndex: 'enterpriseName',
    },
    {
      title: '企业注册所在地区',
      key: 'companyRegister',
      dataIndex: 'companyRegister',
      render: (_, record) => <DictShow dictValue={record.companyRegister} dictData={dictList2} />,
    },
    {
      title: '企业编号（注册编号/社会信用代码）',
      key: 'enterpriseCode',
      dataIndex: 'enterpriseCode',
    },
    {
      title: '法人姓名',
      key: 'frName',
      dataIndex: 'frName',
    },
    {
      title: '身份证件类型',
      key: 'identityType',
      dataIndex: 'identityType',
      render: (_, record) => <DictShow dictValue={record.identityType} dictData={dictList} />,
    },
    {
      title: '地址',
      key: 'registrationAddress',
      dataIndex: 'registrationAddress',
    },
    {
      title: '备注',
      key: 'remark',
      dataIndex: 'remark',
    },
  ]

  return (
    <>
      <CardTitle
        title="关联股东信息"
        extra={
          isEdit ? (
            <Button type="primary" onClick={() => setShareholdVisible(true)}>
              编辑
            </Button>
          ) : null
        }
      >
        <SimpleProtable rowKey="id" columns={columns} dataSource={dataSource || []} />
      </CardTitle>
      <CardTitle
        title="关联企业"
        extra={
          isEdit ? (
            <Button type="primary" onClick={() => setCompanyVisible(true)}>
              编辑
            </Button>
          ) : null
        }
      >
        <SimpleProtable rowKey="id" columns={columns2} dataSource={dataSource2 || []} />
      </CardTitle>

      {/* 修改关联股东信息 */}
      <EditRelatedSharelod
        modalVisible={shareholdVisible}
        infoData={dataSource}
        creditParams={creditParams}
        handleCancel={(val: any) => {
          setShareholdVisible(false)
          if (val === 1) {
            getShareloaderList()
          }
        }}
      />
      {/* 修改关联企业信息 */}
      <EditRelatedCompany
        modalVisible={companyVisible}
        infoData={dataSource2}
        creditParams={creditParams}
        handleCancel={(val: any) => {
          setCompanyVisible(false)
          if (val === 1) {
            getRlist()
          }
        }}
      />
    </>
  )
}

export default RealteDetail
