import React, { useState, useEffect } from 'react'
import ComPageContanier from '@/components/ComPage/ComPagContanier'
import { Button, Form, Popconfirm, Typography } from 'antd'
import { history } from 'umi'
import ComCard from '@/components/ComPage/ComCard'
import Descriptions from '@/components/ComPage/Descriptions'
import DictShow from '@/components/ComSelect/dictShow'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { ProColumns } from '@ant-design/pro-table'
import ComEditTable from '@/components/ComProtable/ComEditTable'
import RequiredLabel from '@/components/RequiredLabel'
import ComUpload from '@/components/ComUpload'
import DictSelect from '@/components/ComSelect'
import { formatAmount } from '@/utils/base'
import { getInventoryEnterDetail } from '@/services'
import RuleModal from '../components/ruleModal'

const { Link } = Typography

const { DescriptionsItem } = Descriptions

// 新增质押, 转在仓, 转在途
const Detail: React.FC = (props: any) => {
  const [basicData, setBasicData] = useState<any>({})
  const [dataSource, setDataSource] = useState<any[]>([])
  const [editableKeys2, setEditableRowKeys2] = useState<any[]>([])
  const [dataSource2, setDataSource2] = useState<any[]>([])
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [ruleVisible, setRuleVisible] = useState<boolean>(false)
  const [title] = useState<string>('新增质押')
  const [tableForm] = Form.useForm()

  const { id } = props.location.query

  // 获取详情
  const getDetail = async () => {
    const { data } = await getInventoryEnterDetail(id)
    setBasicData(data)
  }

  useEffect(() => {
    getDetail()
  }, [])

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
      title: '采购单价',
      key: 'code',
      dataIndex: 'code',
      // valueType: 'digit',
      width: 125,
      hideInSearch: true,
      render: (val) => formatAmount(val),
    },
    {
      title: '公允单价',
      key: 'code',
      dataIndex: 'code',
      // valueType: 'digit',
      width: 110,
      hideInSearch: true,
      render: (val) => formatAmount(val),
    },
    {
      title: '入库总价',
      key: 'code',
      dataIndex: 'code',
      // valueType: 'digit',
      width: 110,
      hideInSearch: true,
      render: (val) => formatAmount(val),
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
      title: <RequiredLabel label="文件类型" />,
      dataIndex: 'typeName',
      width: '35%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => <DictSelect authorword="phone_code" />,
    },
    // {
    //   title: '',
    //   dataIndex: 'other',
    //   className: 'edittablecolright',
    //   width: 150,
    //   renderFormItem: (_: any, { record }: any) => {
    //     if (record.typeName === '2') {
    //       return <Input placeholder="请输入文件类型" />
    //     }
    //     return <></>
    //   },
    //   formItemProps: {
    //     rules: [
    //       {
    //         required: true,
    //         validator: ({ field }: any, value: any) => {
    //           // 获取当前行数据, 选择其他时需要填写
    //           const current = tableForm.getFieldValue(`${field.split('.')[0]}`) || {}
    //           const idType = current.typeName

    //           if (!value && idType === '2') {
    //             return Promise.reject(new Error('此项是必填项'))
    //           }
    //           return Promise.resolve()
    //         },
    //       },
    //     ],
    //   },
    // },
    {
      title: '附件',
      dataIndex: 'fileList',
      width: '65%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => <ComUpload limit={1} />,
    },
  ]

  const submit = async () => {
    setConfirmLoading(false)
    await tableForm.validateFields()
  }

  const cancel = () => {
    history.push('/creditLoanManage/inventoryManage/enter')
  }

  return (
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
        </Descriptions>
      </ComCard>

      <ComCard title="本次入仓商品信息">
        <SimpleProtable columns={columns} dataSource={dataSource} scroll={{ x: 1300 }} />
      </ComCard>

      <ComCard title="商品估值">
        <Descriptions>
          <DescriptionsItem label="本次质押商品值">{basicData.frName}</DescriptionsItem>
          <DescriptionsItem label="本次质押实际估值">
            {basicData.frName}
            <Link
              onClick={() => {
                setRuleVisible(true)
              }}
            >
              查看质押规则
            </Link>
          </DescriptionsItem>
        </Descriptions>
      </ComCard>

      <ComCard title="理货报告及附件">
        <ComEditTable<any>
          columns={columns2}
          rowKey="id"
          className="nopaddingtable"
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

      <div className="middle-btns" style={{ marginTop: 30 }}>
        <Popconfirm
          key="delete"
          title="继续退出则不会新增库存质押申请,您是否继续退出?"
          onConfirm={cancel}
          okText="继续退出"
          cancelText="取消"
        >
          <Button>取消</Button>
        </Popconfirm>
        <Button className="right-btn" type="primary" onClick={submit} loading={confirmLoading}>
          提交
        </Button>
      </div>

      {/* 质押规则 */}
      <RuleModal
        modalVisible={ruleVisible}
        handleCancel={() => setRuleVisible(false)}
        handleSubmit={() => setRuleVisible(false)}
      />
    </ComPageContanier>
  )
}

export default Detail
