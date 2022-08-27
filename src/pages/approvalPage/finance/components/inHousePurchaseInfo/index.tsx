import { useImperativeHandle, forwardRef, useState, useEffect } from 'react'
import CardTitle from '@/components/ComPage/CardTitle'
import ComEditTable from '@/components/ComProtable/ComEditTable'
import { Form } from 'antd'
import type { ProColumns } from '@ant-design/pro-table'
import RequiredLabel from '@/components/RequiredLabel'
import { formatAmount } from '@/utils/base'
import Descriptions from '@/components/ComPage/Descriptions'
import ComUpload from '@/components/ComUpload'

const { DescriptionsItem } = Descriptions

const PurchaseInfo = ({ creditParams }: any, ref: any) => {
  const [dataSource, setDataSource] = useState<any[]>([])
  const [editableKeys, setEditableRowKeys] = useState<any[]>([])
  const [infoData, setInfoData] = useState<any>({})
  const [tableForm] = Form.useForm()

  // 下一个节点驳回时,需要查询数据
  // 获取关联企业
  const getRlist = async () => {
    // const { rows } = await getRelateCompany(creditParams.enterpriseId)
    // if (rows && rows.length) {
    //   setDataSource(rows)
    //   setEditableRowKeys(rows.map((item: any) => item.id))
    // }
    setDataSource([{ id: 1 }])
    setEditableRowKeys([1])
  }

  useEffect(() => {
    if (creditParams.enterpriseId) {
      getRlist()
      setInfoData({})
    }
  }, [creditParams])

  useImperativeHandle(ref, () => ({
    // 暴露给父组件的方法
    getBusinessData: async () => {
      try {
        await tableForm.validateFields()
        const businessData = dataSource.map((item) => {
          return {
            ...item,
            associatedEnterpriseId: creditParams.enterpriseId,
          }
        })
        return {
          businessData: {
            cusAssoEnterpriseReqList: businessData,
          },
        }
      } catch (error) {
        return ''
      }
    },
  }))

  const columns: ProColumns<any>[] = [
    {
      title: '描述 DESCRIPTION',
      dataIndex: 'goodName',
      width: '8%',
      editable: false,
    },
    {
      title: '品牌 BRAND',
      dataIndex: 'goodBrand',
      width: '7%',
      editable: false,
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
      title: '保质期(月)',
      dataIndex: 'date',
      width: '7%',
    },
    {
      title: '有效期至',
      dataIndex: 'date2',
      width: '7%',
      editable: false,
    },
    {
      title: <RequiredLabel label="批次号" />,
      dataIndex: 'date',
      width: '7%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
    },
    {
      title: <RequiredLabel label="商品编码" />,
      dataIndex: 'date',
      width: '7%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
    },
    {
      title: '申请单价',
      dataIndex: 'price1',
      width: '6%',
      editable: false,
      render: (val) => formatAmount(val),
    },
    {
      title: '批复单价',
      dataIndex: 'price',
      width: '8%',
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
      title: '质押比例',
      dataIndex: 'count',
      width: '7%',
      editable: false,
      valueType: 'percent',
    },
    {
      title: '质押单价',
      dataIndex: 'price1',
      width: '6%',
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
        <ComEditTable<any>
          rowKey="id"
          className="nopaddingtable"
          maxLength={5}
          columns={columns}
          value={dataSource}
          scroll={{
            x: 1400,
            y: 600,
          }}
          onChange={setDataSource}
          editable={{
            form: tableForm,
            type: 'multiple',
            editableKeys,
            onValuesChange: (record: any, recordList: any) => {
              setDataSource(recordList)
            },
            onChange: setEditableRowKeys,
          }}
        />

        <Descriptions>
          <DescriptionsItem label="交货地点">{infoData.enterpriseDebt}</DescriptionsItem>

          <DescriptionsItem label="购买链路信息">
            <ComUpload isDetail={true} value={[]} />
          </DescriptionsItem>

          <DescriptionsItem label="物流信息">
            <ComUpload isDetail={true} value={[]} />
          </DescriptionsItem>

          <DescriptionsItem label="仓储资料">
            <ComUpload isDetail={true} value={[]} />
          </DescriptionsItem>

          <DescriptionsItem label="货权转移凭证">
            <ComUpload value={[]} />
          </DescriptionsItem>
        </Descriptions>
      </CardTitle>
    </>
  )
}

export default forwardRef(PurchaseInfo)
