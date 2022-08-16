import React, { useState, useEffect } from 'react'
import ComPageContanier from '@/components/ComPage/ComPagContanier'
import { Button, Form } from 'antd'
import { history } from 'umi'
import ComCard from '@/components/ComPage/ComCard'
import Descriptions from '@/components/ComPage/Descriptions'
import DictShow from '@/components/ComSelect/dictShow'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { ProColumns } from '@ant-design/pro-table'
import ComEditTable from '@/components/ComProtable/ComEditTable'
import RequiredLabel from '@/components/RequiredLabel'
import ComUpload from '@/components/ComUpload'

const { DescriptionsItem } = Descriptions

// 转在途,转在仓详情
const Detail: React.FC = (props: any) => {
  const [basicData, setBasicData] = useState<any>({})
  const [dataSource, setDataSource] = useState<any[]>([])
  const [editableKeys2, setEditableRowKeys2] = useState<any[]>([])
  const [dataSource2, setDataSource2] = useState<any[]>([])
  const [tableForm] = Form.useForm()

  const { type } = props.location.query

  useEffect(() => {
    setBasicData({})
    setDataSource([])
  }, [])

  const columns: ProColumns<any>[] = [
    {
      title: '商品编号/ID',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: '商品名称',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: '条形码',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: '效期到期日',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: '保质期(月)',
      key: 'code',
      dataIndex: 'code',
      width: 90,
    },
    {
      title: '批次号',
      key: 'code',
      dataIndex: 'code',
      width: 90,
    },
    {
      title: '良品数量',
      key: 'code',
      dataIndex: 'code',
      valueType: 'digit',
      width: 100,
    },
    {
      title: '残次品数量',
      key: 'code',
      dataIndex: 'code',
      valueType: 'digit',
      width: 100,
    },
    {
      title: '入库总数',
      key: 'code',
      dataIndex: 'code',
      valueType: 'digit',
      width: 100,
    },
    {
      title: '采购单价(美元)',
      key: 'code',
      dataIndex: 'code',
      valueType: 'digit',
      width: 125,
      hideInSearch: true,
    },
    {
      title: '公允单价(美元)',
      key: 'code',
      dataIndex: 'code',
      valueType: 'digit',
      width: 110,
      hideInSearch: true,
    },
    {
      title: '入库总价(美元)',
      key: 'code',
      dataIndex: 'code',
      valueType: 'digit',
      width: 110,
      hideInSearch: true,
    },
    {
      title: '单位',
      key: 'code',
      dataIndex: 'code',
      width: 60,
      hideInSearch: true,
    },
  ]

  const columns2 = [
    {
      title: '序号',
      dataIndex: 'typeName',
      width: 70,
      editable: false,
    },
    {
      title: <RequiredLabel label="文件类型" />,
      dataIndex: 'typeName',
      width: '20%',
      editable: false,
    },
    {
      title: '附件',
      dataIndex: 'fileList',
      width: '50%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => <ComUpload limit={100} />,
    },
  ]

  return (
    <ComPageContanier
      title={type ? '转在途库存详情' : '转在仓库存详情'}
      extra={
        <Button
          type="primary"
          onClick={() => history.push('/creditLoanManage/inventoryManage/enter')}
        >
          返回
        </Button>
      }
    >
      <ComCard title="基础信息" style={{ marginTop: 12 }}>
        <Descriptions>
          <DescriptionsItem label="货主企业">{basicData.frName}</DescriptionsItem>
          <DescriptionsItem label="申请编号">{basicData.frName}</DescriptionsItem>
          <DescriptionsItem label="入库仓库">
            <DictShow dictValue={basicData.identityType} dictkey="cus_sfzlx" />
          </DescriptionsItem>
          <DescriptionsItem label="质押类型">
            <DictShow dictValue={basicData.identityType} dictkey="cus_sfzlx" />
          </DescriptionsItem>
          <DescriptionsItem label="库存类型">
            <DictShow dictValue={basicData.identityType} dictkey="cus_sfzlx" />
          </DescriptionsItem>
          <DescriptionsItem label="关联融资单号">{basicData.identityNumber}</DescriptionsItem>
          <DescriptionsItem label="创建时间">{basicData.identityNumber}</DescriptionsItem>
        </Descriptions>
      </ComCard>

      <ComCard title="本次入仓商品信息">
        <SimpleProtable columns={columns} dataSource={dataSource} scroll={{ x: 1300 }} />
      </ComCard>

      <ComCard title="理货报告及附件">
        <ComEditTable<any>
          columns={columns2}
          rowKey="id"
          scroll={{
            x: 1350,
          }}
          value={dataSource2}
          recordCreatorProps={{
            newRecordType: 'dataSource',
            record: () => ({
              id: Date.now(),
            }),
          }}
          editable={{
            type: 'multiple',
            form: tableForm,
            editableKeys: editableKeys2,
            onValuesChange: (record: any, recordList: any) => {
              setDataSource2(recordList)
            },
            onChange: (editableKeyss: any, editableRows: any[]) => {
              setEditableRowKeys2(editableKeyss)
              setDataSource2(editableRows)
            },
          }}
        />
      </ComCard>
    </ComPageContanier>
  )
}

export default Detail
