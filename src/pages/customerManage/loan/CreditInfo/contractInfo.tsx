import React, { useState, useEffect } from 'react'
import ComCard from '@/components/ComPage/ComCard'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { creditContractListProps } from '@/services/types'
import type { ProColumns } from '@ant-design/pro-table'
import { getLoanCustomerContractList } from '@/services'
import ComUpload from '@/components/ComUpload'
import { getDictData } from '@/utils/dictData'

interface infoProps {
  enterpriseId: number
}
const ContractDetail: React.FC<infoProps> = ({ enterpriseId }) => {
  const [dataSource, setDataSource] = useState<creditContractListProps[]>([])
  const [contractTypeData, setContractTypeData] = useState<any>()

  const getDict = async () => {
    const obj = await getDictData('contract_type')
    setContractTypeData(obj)
  }

  useEffect(() => {
    getDict()
  }, [])

  const getDetail = async () => {
    const { rows } = await getLoanCustomerContractList({ enterpriseId, bizCode: 1 })
    if (rows) setDataSource(rows)
  }

  useEffect(() => {
    if (enterpriseId) {
      getDetail()
    }
  }, [enterpriseId])

  const columns: ProColumns<creditContractListProps>[] = [
    {
      title: '协议名称',
      key: 'contractName',
      dataIndex: 'contractName',
      width: '18%',
      ellipsis: true,
    },
    {
      title: '合同编号',
      dataIndex: 'contractNo',
    },
    {
      title: '合同类型',
      dataIndex: 'contractType',
      hideInSearch: true,
      width: '15%',
      render: (_, recored) => <>{contractTypeData[recored.contractType]}</>,
    },
    {
      title: '签署时间',
      dataIndex: 'signTime',
      valueType: 'dateTime',
    },
    {
      title: '附件',
      key: 'fileName',
      dataIndex: 'fileName',
      width: '28%',
      ellipsis: true,
      render: (_, record) =>
        record.fileName ? (
          <ComUpload
            isDetail
            value={[{ fileName: record.fileName, fileUrl: record.fileUrl }] || []}
          />
        ) : (
          '-'
        ),
    },
  ]

  return (
    <>
      <ComCard title="合同信息">
        <SimpleProtable rowKey="id" columns={columns} dataSource={dataSource || []} />
      </ComCard>
    </>
  )
}

export default ContractDetail
