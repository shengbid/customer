import React, { useState, useEffect } from 'react'
import ComPageContanier from '@/components/ComPage/ComPagContanier'
import { Button, /*Typography,*/ Spin } from 'antd'
import { history } from 'umi'
import ComCard from '@/components/ComPage/ComCard'
import Descriptions from '@/components/ComPage/Descriptions'
import DictShow from '@/components/ComSelect/dictShow'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { ProColumns } from '@ant-design/pro-table'
import { formatAmount } from '@/utils/base'
import { getInventoryEnterDetail } from '@/services'
import RuleModal from '../components/ruleModal'
import CargoFile from '../components/cargoFile'
import { isEmpty } from 'lodash'

// const { Link } = Typography

const { DescriptionsItem } = Descriptions

// 转在途,转在仓详情
const Detail: React.FC = (props: any) => {
  const [basicData, setBasicData] = useState<any>({})
  const [dataSource, setDataSource] = useState<any[]>([])
  const [dataSource2, setDataSource2] = useState<any[]>([])
  const [ruleVisible, setRuleVisible] = useState<boolean>(false)
  const [spinning, setSpinning] = useState<boolean>(true)
  const [title, setTitle] = useState<string>('转在仓库存详情')

  const { type, id } = props.location.query

  // 获取详情
  const getDetail = async () => {
    try {
      const { data } = await getInventoryEnterDetail(id)
      setSpinning(false)
      if (data) {
        setBasicData(data)
        if (!isEmpty(data.intoWarehouseGoodList)) {
          setDataSource(data.intoWarehouseGoodList)
        }
        if (!isEmpty(data.stockAnnexList)) {
          setDataSource2(data.stockAnnexList)
        }
      }
    } catch (error) {
      setSpinning(false)
    }
  }

  useEffect(() => {
    getDetail()
    if (type === '1') {
      setTitle('转在途库存详情')
    } else if (type === '3') {
      setTitle('库存质押详情')
    }
  }, [])

  useEffect(() => {
    setBasicData({})
    setDataSource([])
  }, [])

  const columns: ProColumns<any>[] = [
    {
      title: '商品编号/ID',
      key: 'enterpriseGoodNumber',
      dataIndex: 'enterpriseGoodNumber',
    },
    {
      title: '商品名称',
      key: 'goodName',
      dataIndex: 'goodName',
    },
    {
      title: '条形码',
      key: 'barCode',
      dataIndex: 'barCode',
    },
    {
      title: '效期到期日',
      key: 'effectiveDate',
      dataIndex: 'effectiveDate',
    },
    {
      title: '保质期(月)',
      key: 'warrantyMonth',
      dataIndex: 'warrantyMonth',
      width: 90,
    },
    {
      title: '批次号',
      key: 'batchNumber',
      dataIndex: 'batchNumber',
      width: 90,
    },
    {
      title: '良品数量',
      key: 'completeCount',
      dataIndex: 'completeCount',
      valueType: 'digit',
      width: 100,
    },
    {
      title: '残次品数量',
      key: 'imperfectCount',
      dataIndex: 'imperfectCount',
      valueType: 'digit',
      width: 100,
    },
    {
      title: '入库总数',
      key: 'warehouseTotal',
      dataIndex: 'warehouseTotal',
      valueType: 'digit',
      width: 100,
    },
    {
      title: '采购单价',
      key: 'purchasePrice',
      dataIndex: 'purchasePrice',
      // valueType: 'digit',
      width: 125,
      hideInSearch: true,
      render: (val) => formatAmount(val),
    },
    {
      title: '公允单价',
      key: 'fairPrice',
      dataIndex: 'fairPrice',
      // valueType: 'digit',
      width: 110,
      hideInSearch: true,
      render: (val) => formatAmount(val),
    },
    {
      title: '入库总价',
      key: 'warehousePrice',
      dataIndex: 'warehousePrice',
      // valueType: 'digit',
      width: 110,
      hideInSearch: true,
      render: (val) => formatAmount(val),
    },
    {
      title: '单位',
      key: 'unit',
      dataIndex: 'unit',
      width: 60,
      hideInSearch: true,
    },
  ]

  const cancel = () => {
    history.push('/creditLoanManage/inventoryManage/enter')
  }

  return (
    <Spin spinning={spinning}>
      <ComPageContanier
        title={title}
        extra={
          <Button type="primary" onClick={cancel}>
            返回
          </Button>
        }
      >
        <ComCard title="基础信息" style={{ marginTop: 12 }}>
          <Descriptions>
            <DescriptionsItem label="货主企业">{basicData.enterpriseName}</DescriptionsItem>
            <DescriptionsItem label="申请编号">{basicData.pledgeApplyNumber}</DescriptionsItem>
            <DescriptionsItem label="入库仓库">{basicData.warehouseName}</DescriptionsItem>
            <DescriptionsItem label="质押类型">
              <DictShow dictValue={basicData.pledgeType} dictkey="pledge_type" />
            </DescriptionsItem>
            <DescriptionsItem label="库存类型">
              <DictShow dictValue={basicData.stockType} dictkey="stock_type" />
            </DescriptionsItem>
            <DescriptionsItem label="关联融资单号">{basicData.financOrder}</DescriptionsItem>
            {type === '3' ? (
              <>
                {/* <DescriptionsItem label="实际入仓时间">{basicData.identityNumber}</DescriptionsItem> */}
                <DescriptionsItem label="转在仓时间">{basicData.inWarehouseDate}</DescriptionsItem>
                <DescriptionsItem label="转在仓状态">
                  <DictShow dictValue={basicData.inWarehouseStatus} dictkey="in_warehouse_status" />
                </DescriptionsItem>
              </>
            ) : (
              <DescriptionsItem label="创建时间">{basicData.createTime}</DescriptionsItem>
            )}
          </Descriptions>
        </ComCard>

        <ComCard title="本次入仓商品信息">
          <SimpleProtable columns={columns} dataSource={dataSource} scroll={{ x: 1300 }} />
        </ComCard>

        {/* <ComCard title="商品估值">
          <Descriptions>
            <DescriptionsItem label="本次质押商品值">{basicData.goodValuation}</DescriptionsItem>
            <DescriptionsItem label="本次质押实际估值">
              {basicData.goodValuation}
              <Link
                onClick={() => {
                  setRuleVisible(true)
                }}
              >
                查看质押规则
              </Link>
            </DescriptionsItem>
          </Descriptions>
        </ComCard> */}

        <CargoFile
          infoData={dataSource2}
          handleSuccess={getDetail}
          info={{
            id: basicData.id,
            version: basicData.version,
            enterpriseId: basicData.enterpriseId,
          }}
        />
        {/* 质押规则 */}
        <RuleModal
          modalVisible={ruleVisible}
          info={basicData.enterpriseId}
          handleCancel={() => setRuleVisible(false)}
          handleSubmit={() => setRuleVisible(false)}
        />
      </ComPageContanier>
    </Spin>
  )
}

export default Detail
