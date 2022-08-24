import React, { useState, useEffect } from 'react'
import { Button, Typography, message, Popconfirm, Space } from 'antd'
import ComCard from '@/components/ComPage/ComCard'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { reportFileProps } from '@/services/types'
import type { ProColumns } from '@ant-design/pro-table'
// import ComUpload from '@/components/ComUpload'
import AddCooperate from './addCooperateModal'
import { deleteCooperatelogistics, downloadDocusignFile } from '@/services'
import { getDictData } from '@/utils/dictData'
// import ExportFile from '@/components/ComUpload/exportFile'

const { Link } = Typography

interface infoProps {
  infoData: any
  type: number
  enterpriseId: number
  handleSuccess: () => void
}

// 合作物流企业
const Logistics: React.FC<infoProps> = ({ infoData, enterpriseId, type, handleSuccess }) => {
  const [dataSource, setDataSource] = useState<reportFileProps[]>([])
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [auditStatusData, setAuditStatusData] = useState<any>()
  const [info, setInfo] = useState<any>({ enterpriseId })

  const coopreateStatus = {
    1: '待合作',
    30: '已到期',
    50: '正常',
  }
  const title = type === 1 ? '物流' : '仓储'

  const getDict = async () => {
    const obj = await getDictData('sign_status')
    setAuditStatusData(obj)
  }
  useEffect(() => {
    getDict()
  }, [])

  useEffect(() => {
    if (infoData && infoData.length) {
      setDataSource(infoData)
    }
  }, [infoData])

  // 删除
  const delteRecored = async (ids: number) => {
    await deleteCooperatelogistics(ids)
    message.success('删除成功!')
    handleSuccess()
  }

  const download = async (contractId: number) => {
    await downloadDocusignFile({ contractId })
  }

  const columns: ProColumns<any>[] = [
    {
      title: `${title}企业名称`,
      key: 'partnerFullName',
      dataIndex: 'partnerFullName',
      width: '15%',
      ellipsis: true,
    },
    {
      title: '有效起始日',
      dataIndex: 'validStartDate',
      valueType: 'date',
    },
    {
      title: '有效到期日',
      dataIndex: 'validEndDate',
      valueType: 'date',
    },
    {
      title: '合作状态',
      dataIndex: 'cooperationStatus',
      render: (_, recored) => <>{coopreateStatus[recored.cooperationStatus]}</>,
    },
    {
      title: '签署企业/收件人及状态',
      dataIndex: 'fileType',
      width: '17%',
      render: (_, recored) => (
        <Space wrap>
          {recored.recipientsList.map((item: any) => (
            <span key={item.enterpriseId} style={item.signStatus === 1 ? { color: 'red' } : {}}>
              {item.enterpriseName}
            </span>
          ))}
        </Space>
      ),
    },
    {
      title: '签署状态',
      dataIndex: 'signStatus',
      render: (_, recored) => <>{auditStatusData[recored.signStatus]}</>,
    },
    {
      title: '合同附件',
      key: 'file',
      dataIndex: 'file',
      width: '10%',
      ellipsis: true,
      render: (_, recored) =>
        // <ExportFile title={recored.name} url="/cus/agreement/downloadDoc" />
        recored.signStatus === 200 ? (
          <Link key="down" onClick={() => download(recored.contractId)}>
            下载
          </Link>
        ) : (
          '-'
        ),
    },
    {
      title: '操作',
      width: 130,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <Popconfirm
          key="delete"
          title="是否确认删除?"
          onConfirm={() => {
            delteRecored(recored.id)
          }}
          okText="确定"
          cancelText="取消"
        >
          <Link>删除</Link>
        </Popconfirm>,
        recored.cooperationStatus === 30 ? (
          <Link
            key="detail"
            onClick={() => {
              setInfo(recored)
              setModalVisible(true)
            }}
          >
            重新签署
          </Link>
        ) : null,
      ],
    },
  ]

  const updateCooperate = () => {
    handleSuccess()
    setModalVisible(false)
  }

  return (
    <>
      <ComCard
        title={`合作${title}企业`}
        extra={
          <Button
            type="primary"
            onClick={() => {
              setModalVisible(true)
              setInfo({ enterpriseId })
            }}
          >
            新增
          </Button>
        }
      >
        <SimpleProtable rowKey="id" columns={columns} dataSource={dataSource || []} />
      </ComCard>

      <AddCooperate
        type={type}
        modalVisible={modalVisible}
        info={info}
        handleCancel={() => {
          setModalVisible(false)
        }}
        handleSubmit={updateCooperate}
      />
    </>
  )
}

export default Logistics
