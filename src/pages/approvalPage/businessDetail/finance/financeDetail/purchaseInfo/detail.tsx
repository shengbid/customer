import { useState, useEffect } from 'react'
import CardTitle from '@/components/ComPage/CardTitle'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { ProColumns } from '@ant-design/pro-table'
import { formatAmount } from '@/utils/base'
import Descriptions from '@/components/ComPage/Descriptions'
import DictShow from '@/components/ComSelect/dictShow'

const { DescriptionsItem } = Descriptions

const PurchaseInfo = ({ creditParams }: any) => {
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
      editable: false,
    },
    {
      title: '商品条形码',
      dataIndex: 'barCode',
      width: '7%',
      editable: false,
    },
    {
      title: '参考编码REF NO',
      dataIndex: 'goodSku',
      width: '7%',
      editable: false,
    },
    {
      title: '有效期至',
      dataIndex: 'date2',
      width: '7%',
      editable: false,
    },
    {
      title: '申请单价',
      dataIndex: 'price1',
      width: '7%',
      editable: false,
      render: (val) => formatAmount(val),
    },
    {
      title: '批复单价',
      dataIndex: 'price1',
      width: '7%',
      editable: false,
      render: (val) => formatAmount(val),
    },
    {
      title: '数量',
      dataIndex: 'count',
      width: '6%',
      editable: false,
      valueType: 'digit',
    },
    {
      title: '采购金额',
      dataIndex: 'price2',
      width: '6%',
      editable: false,
      render: (val) => formatAmount(val),
    },
    {
      title: '保证金比例',
      dataIndex: 'count',
      width: '7%',
      editable: false,
      valueType: 'percent',
    },
    {
      title: '垫付单价',
      dataIndex: 'price1',
      width: '6%',
      editable: false,
      render: (val) => formatAmount(val),
    },
    {
      title: '委托方应付保证金',
      dataIndex: 'price1',
      width: '7%',
      editable: false,
      render: (val) => formatAmount(val),
    },
    {
      title: '受委托方垫付金额',
      dataIndex: 'price1',
      width: '7%',
      editable: false,
      render: (val) => formatAmount(val),
    },
  ]

  return (
    <>
      <CardTitle title="采购信息">
        <SimpleProtable key="id" columns={columns} dataSource={dataSource || []} />

        <Descriptions>
          <DescriptionsItem label="预计交货时间">{infoData.sellProduct}</DescriptionsItem>
          <DescriptionsItem label="运输方式">
            <DictShow dictValue={infoData.businessTypeList} dictkey="cus_zyyw" />
          </DescriptionsItem>
          <DescriptionsItem label="交货地点">{infoData.enterpriseDebt}</DescriptionsItem>
        </Descriptions>
      </CardTitle>
    </>
  )
}

export default PurchaseInfo
