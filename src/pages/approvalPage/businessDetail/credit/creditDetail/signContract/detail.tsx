import React, { useState, useEffect } from 'react'
import Descriptions from '@/components/ComPage/Descriptions'
import ComCard from '@/components/ComPage/ComCard'
import ComUpload from '@/components/ComUpload'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { ProColumns } from '@ant-design/pro-table'
import { creditContractDetail } from '@/services'
import DictSelect from '@/components/ComSelect'

const { DescriptionsItem } = Descriptions

interface infoProps {
  activityParams: any
}

const Detail: React.FC<infoProps> = ({ activityParams }) => {
  const [infoData, setInfoData] = useState<any>({})
  const [dataSource, setDataSource] = useState<any[]>([])
  const [fileList, setFileList] = useState<any[]>([])
  const [contractTypeData, setContractTypeData] = useState<any>()

  const getDetail = async () => {
    const { data } = await creditContractDetail({
      taskID: activityParams.taskId,
      businessKey: activityParams.businessKey,
    })
    setFileList(data)
  }

  useEffect(() => {
    if (activityParams && activityParams.taskId) {
      getDetail()
    }
  }, [activityParams])

  useEffect(() => {
    setInfoData({})
    setDataSource([])
  }, [])

  const columns: ProColumns<any>[] = [
    {
      title: '合同名称',
      dataIndex: 'contractName',
      width: '20%',
    },
    {
      title: '合同编号',
      dataIndex: 'contractNo',
      width: '15%',
    },
    {
      title: '合同类型',
      dataIndex: 'contractType',
      hideInSearch: true,
      width: '15%',
      render: (_, recored) => <>{contractTypeData[recored.contractType]}</>,
    },
    {
      title: '合同类型',
      key: 'contractType',
      dataIndex: 'contractType',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return <DictSelect authorword="contract_type" getDictData={setContractTypeData} />
      },
    },
    {
      title: '签署时间',
      dataIndex: 'signTime',
      width: '15%',
      valueType: 'date',
    },
    {
      title: '附件',
      dataIndex: 'time',
      width: '35%',
      ellipsis: true,
      render: (_, recored: any) => (recored.files ? <ComUpload /> : <>-</>),
    },
  ]

  return (
    <>
      <ComCard title="合同信息">
        <Descriptions layout="vertical">
          <DescriptionsItem label="现场拍摄视频">
            <ComUpload isDetail value={fileList} />
          </DescriptionsItem>
          <DescriptionsItem label="授信生效日">{infoData.sellProduct}</DescriptionsItem>
          <DescriptionsItem label="授信到期日">{infoData.sellProduct}</DescriptionsItem>
        </Descriptions>
        <SimpleProtable key="year" columns={columns} dataSource={dataSource || []} />
      </ComCard>
    </>
  )
}

export default Detail
