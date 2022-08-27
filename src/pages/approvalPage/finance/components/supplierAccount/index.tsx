import React, { useState, useEffect } from 'react'
import CardTitle from '@/components/ComPage/CardTitle'
import { Button } from 'antd'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { ProColumns } from '@ant-design/pro-table'
import EditAccount from './editAccount'

interface detailProps {
  isEdit?: boolean
  creditParams: any
}

// 指定供应商收款账户
const Detail: React.FC<detailProps> = ({ isEdit = true, creditParams }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [dataSource, setDataSource] = useState<any[]>([])

  const getList = () => {
    setDataSource([{ id: 1 }])
  }

  useEffect(() => {
    getList()
  }, [])

  const columns: ProColumns<any>[] = [
    {
      title: '账户名称',
      key: 'shareholderName',
      dataIndex: 'shareholderName',
    },
    {
      title: '账号',
      key: 'shareholderName',
      dataIndex: 'shareholderName',
    },
    {
      title: '收款银行',
      key: 'identityType',
      dataIndex: 'identityType',
    },
    {
      title: '银行地址',
      key: 'identityNumber',
      dataIndex: 'identityNumber',
      width: '25%',
    },
    {
      title: 'SWIFT Code',
      key: 'shareProportion',
      dataIndex: 'shareProportion',
    },
  ]

  return (
    <>
      <CardTitle
        title="指定供应商收款账户"
        extra={
          isEdit ? (
            <Button type="primary" onClick={() => setModalVisible(true)}>
              编辑
            </Button>
          ) : null
        }
      >
        <SimpleProtable rowKey="id" columns={columns} dataSource={dataSource || []} />
      </CardTitle>

      {/* 修改供应商收款账户 */}
      <EditAccount
        modalVisible={modalVisible}
        infoData={dataSource}
        creditParams={creditParams}
        handleCancel={(val: any) => {
          setModalVisible(false)
          if (val === 1) {
            getList()
          }
        }}
      />
    </>
  )
}

export default Detail
