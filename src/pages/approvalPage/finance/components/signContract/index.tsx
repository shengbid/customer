import React, { useState, useEffect } from 'react'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { ProColumns } from '@ant-design/pro-table'
import CardTitle from '@/components/ComPage/CardTitle'
import Descriptions from '@/components/ComPage/Descriptions'
import { Button } from 'antd'

const { DescriptionsItem } = Descriptions

interface infoProps {
  showInfo?: any // 节点展示内容
}

const Detail: React.FC<infoProps> = ({ showInfo = {} }) => {
  const [dataSource, setDataSource] = useState<any[]>([])

  useEffect(() => {
    setDataSource([
      {
        id: 1,
        type: '吉祥公司',
      },
    ])
  }, [])

  const columns: ProColumns<any>[] = [
    {
      title: '收件人名字',
      dataIndex: 'name',
      width: '26%',
    },
    {
      title: '签署角色',
      dataIndex: 'goodBrand',
      width: '18%',
    },
    {
      title: '邮箱',
      dataIndex: 'goodSku',
      width: '18%',
      editable: false,
    },
    {
      title: '手机号码所在地区',
      dataIndex: 'barCode',
      width: '18%',
      editable: false,
    },
    {
      title: '电话号码',
      dataIndex: 'barCode',
      width: '18%',
      editable: false,
    },
  ]

  return (
    <CardTitle title="在线签署合同">
      <Descriptions>
        <DescriptionsItem label="合同签署方式">线上签署</DescriptionsItem>
      </Descriptions>
      <div>
        <p>
          采购申请书
          {showInfo.sign ? (
            <Button type="link">预览并签署</Button>
          ) : (
            <Button type="link">预览</Button>
          )}
        </p>
        <SimpleProtable rowKey="id" columns={columns} dataSource={dataSource || []} />
      </div>
      <div>
        <p>
          采购合同 <Button type="link">预览</Button>
        </p>
        <SimpleProtable rowKey="id" columns={columns} dataSource={dataSource || []} />
      </div>
    </CardTitle>
  )
}

export default Detail
