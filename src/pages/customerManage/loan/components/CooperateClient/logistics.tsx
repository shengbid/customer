import React, { useState, useEffect } from 'react'
import { Button, Typography } from 'antd'
import ComCard from '@/components/ComPage/ComCard'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { reportFileProps } from '@/services/types'
import type { ProColumns } from '@ant-design/pro-table'
// import ComUpload from '@/components/ComUpload'
import AddCooperate from './addCooperateModal'

const { Link } = Typography

interface infoProps {
  infoData: any
  title?: string
  enterpriseId: string
}

// 合作物流企业
const Logistics: React.FC<infoProps> = ({ infoData, enterpriseId, title = '物流' }) => {
  const [dataSource, setDataSource] = useState<reportFileProps[]>([])
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  useEffect(() => {
    if (infoData && infoData.length) {
      setDataSource(infoData)
    }
  }, [infoData])

  const columns: ProColumns<reportFileProps>[] = [
    {
      title: `${title}企业名称`,
      key: 'fileName',
      dataIndex: 'fileName',
      width: '15%',
      ellipsis: true,
    },
    {
      title: '有效起始日',
      dataIndex: 'createdTime',
      valueType: 'dateTime',
    },
    {
      title: '有效到期日',
      dataIndex: 'createdTime',
      valueType: 'dateTime',
    },
    {
      title: '合作状态',
      dataIndex: 'fileType',
    },
    {
      title: '签署企业/收件人及状态',
      dataIndex: 'fileType',
    },
    {
      title: '签署状态',
      dataIndex: 'fileType',
    },
    {
      title: '合同附件',
      key: 'file',
      dataIndex: 'file',
      width: '15%',
      ellipsis: true,
      render: () => (
        <Link key="approval" onClick={() => {}}>
          下载
        </Link>
      ),
    },
    {
      title: '操作',
      width: 170,
      key: 'option',
      valueType: 'option',
      render: () => [
        ,
        <Link key="dis" onClick={() => {}}>
          删除
        </Link>,
        <Link key="detail" onClick={() => {}}>
          去签署
        </Link>,
      ],
    },
  ]

  const updateCooperate = () => {
    setModalVisible(false)
  }

  return (
    <>
      <ComCard
        title={`合作${title}企业`}
        extra={
          <Button type="primary" onClick={() => setModalVisible(true)}>
            新增
          </Button>
        }
      >
        <SimpleProtable rowKey="id" columns={columns} dataSource={dataSource || []} />
      </ComCard>

      <AddCooperate
        title={`新建合作${title}企业`}
        modalVisible={modalVisible}
        info={enterpriseId}
        handleCancel={() => {
          setModalVisible(false)
        }}
        handleSubmit={updateCooperate}
      />
    </>
  )
}

export default Logistics
