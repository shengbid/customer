import { useState, useEffect } from 'react'
import CardTitle from '@/components/ComPage/CardTitle'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { ProColumns } from '@ant-design/pro-table'
import { formatAmount } from '@/utils/base'
import Descriptions from '@/components/ComPage/Descriptions'
import DictShow from '@/components/ComSelect/dictShow'
import ComUpload from '@/components/ComUpload'

const { DescriptionsItem } = Descriptions

interface detailProps {
  creditParams: any
  type: number // 1代理采购  2在途  3在仓
}

const PurchaseInfo = ({ creditParams, type }: detailProps) => {
  const [dataSource, setDataSource] = useState<any[]>([])
  const [infoData, setInfoData] = useState<any>({})

  // 下一个节点驳回时,需要查询数据
  // 获取关联企业
  const getRlist = async () => {
    // const { rows } = await getRelateCompany(creditParams.enterpriseId)
    // if (rows && rows.length) {
    //   setDataSource(rows)
    //   setEditableRowKeys(rows.map((item: any) => item.id))
    // }
    setDataSource([{ id: 1 }])
  }

  useEffect(() => {
    if (creditParams.enterpriseId) {
      getRlist()
      setInfoData({})
    }
  }, [creditParams])

  const columns: ProColumns<any>[] = [
    {
      title: '描述 DESCRIPTION',
      dataIndex: 'goodName',
      width: '8%',
    },
    {
      title: '品牌 BRAND',
      dataIndex: 'goodBrand',
      width: '7%',
    },
    {
      title: 'SKU NO',
      dataIndex: 'goodSku',
      width: '7%',
    },
    {
      title: '商品条形码',
      dataIndex: 'barCode',
      width: '7%',
    },
    {
      title: '参考编码REF NO',
      dataIndex: 'goodSku',
      width: '7%',
    },
    {
      title: '保质期(月)',
      dataIndex: 'date2',
      width: '7%',
      hideInTable: type === 1,
    },
    {
      title: '有效期至',
      dataIndex: 'date2',
      width: '7%',
    },
    {
      title: '批次号',
      dataIndex: 'date2',
      width: '7%',
      hideInTable: type !== 3,
    },
    {
      title: '商品编码',
      dataIndex: 'date2',
      width: '7%',
      hideInTable: type !== 3,
    },
    {
      title: '申请单价',
      dataIndex: 'price1',
      width: '7%',
      render: (val) => formatAmount(val),
    },
    {
      title: '批复单价',
      dataIndex: 'price1',
      width: '7%',
      render: (val) => formatAmount(val),
    },
    {
      title: '数量',
      dataIndex: 'count',
      width: '6%',
      valueType: 'digit',
    },
    {
      title: '采购金额',
      dataIndex: 'price2',
      width: '6%',
      render: (val) => formatAmount(val),
    },
    {
      title: '保证金比例',
      dataIndex: 'count',
      width: '7%',
      valueType: 'percent',
      hideInTable: type !== 1,
    },
    {
      title: '质押比例',
      dataIndex: 'count',
      width: '7%',
      valueType: 'percent',
      hideInTable: type === 1,
    },
    {
      title: '垫付单价',
      dataIndex: 'price1',
      width: '6%',
      render: (val) => formatAmount(val),
      hideInTable: type !== 1,
    },
    {
      title: '质押单价',
      dataIndex: 'price1',
      width: '6%',
      render: (val) => formatAmount(val),
      hideInTable: type === 1,
    },
    {
      title: '委托方应付保证金',
      dataIndex: 'price1',
      width: '7%',
      render: (val) => formatAmount(val),
      hideInTable: type !== 1,
    },
    {
      title: '受委托方垫付金额',
      dataIndex: 'price1',
      width: '7%',
      render: (val) => formatAmount(val),
    },
  ]

  return (
    <>
      <CardTitle title="采购信息">
        <SimpleProtable rowKey="id" columns={columns} dataSource={dataSource || []} />

        <Descriptions>
          {type === 1 ? (
            <DescriptionsItem label="预计交货时间">{infoData.sellProduct}</DescriptionsItem>
          ) : null}
          {type !== 3 ? (
            <DescriptionsItem label="运输方式">
              <DictShow dictValue={infoData.businessTypeList} dictkey="cus_zyyw" />
            </DescriptionsItem>
          ) : null}
          {type === 2 ? (
            <DescriptionsItem label="运输公司">{infoData.enterpriseDebt}</DescriptionsItem>
          ) : null}
          <DescriptionsItem label="交货地点">{infoData.enterpriseDebt}</DescriptionsItem>
          {type === 2 ? (
            <DescriptionsItem label="预计交货时间">{infoData.enterpriseDebt}</DescriptionsItem>
          ) : null}
          {type !== 1 ? (
            <DescriptionsItem label="购买链路信息">
              <ComUpload isDetail={true} value={[]} />
            </DescriptionsItem>
          ) : null}
          {type === 3 ? (
            <DescriptionsItem label="物流信息">
              <ComUpload isDetail={true} value={[]} />
            </DescriptionsItem>
          ) : null}
          {type === 3 ? (
            <DescriptionsItem label="仓储资料">
              <ComUpload isDetail={true} value={[]} />
            </DescriptionsItem>
          ) : null}
          {type === 3 ? (
            <DescriptionsItem label="货权转移凭证">
              <ComUpload isDetail={true} value={[]} />
            </DescriptionsItem>
          ) : null}
        </Descriptions>
      </CardTitle>
    </>
  )
}

export default PurchaseInfo
