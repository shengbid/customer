import { useState, useImperativeHandle, forwardRef } from 'react'
import CardTitle from '@/components/ComPage/CardTitle'
import ComEditTable from '@/components/ComProtable/ComEditTable'
import type { signContractProps } from '@/services/types'
import { Form, Row, Col, DatePicker } from 'antd'
import type { ProColumns } from '@ant-design/pro-table'
import RequiredTilte from '@/components/RequiredLabel'
import DictSelect from '@/components/ComSelect'
import ComUpload from '@/components/ComUpload'

const SignContract = ({}, ref: any) => {
  const [dataSource, setDataSource] = useState<signContractProps[]>([
    {
      id: 1,
      name: '授信合同',
      number: '99999',
      fileType: '尽调报告',
      fileList: [],
      time: '2022-7-27',
    },
  ])
  const [editableKeys, setEditableRowKeys] = useState<any[]>([1])
  const [mpForm] = Form.useForm()
  const [form] = Form.useForm()

  useImperativeHandle(ref, () => ({
    // 暴露给父组件的方法
    getBusinessData: async () => {
      try {
        await mpForm.validateFields()
        const cusContractList = dataSource
        return { businessData: { cusContractList } }
      } catch (error) {
        return ''
      }
    },
  }))

  const infoData = {
    creditReport: [
      {
        fileName: '微信图片_20220616181011.png',
        fileUrl: 'jixiang/dev/2022-07-26/36POBoMfcDrml1AipwE/微信图片_20220616181011.png',
        pictureDomain: 'https://jixiang2022.oss-cn-shenzhen.aliyuncs.com/',
      },
    ],
  }

  const columns: ProColumns<signContractProps>[] = [
    {
      title: '合同名称',
      dataIndex: 'name',
      width: '20%',
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
      title: '合同编号',
      dataIndex: 'number',
      width: '17%',
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
      title: '合同类型',
      dataIndex: 'fileType',
      width: '17%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => <DictSelect authorword="cus_sfzlx" />,
    },
    {
      title: '签署时间',
      dataIndex: 'time',
      width: '17%',
      valueType: 'date',
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
      title: <RequiredTilte label="附件" />,
      dataIndex: 'fileList',
      ellipsis: true,
      renderFormItem: () => <ComUpload />,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
    },
  ]
  return (
    <>
      <CardTitle title="合同信息">
        <Form name="basic" form={form} autoComplete="off" layout="vertical">
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="签署现场拍摄视频">
                <ComUpload isDetail value={infoData.creditReport} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="授信生效日"
                name="creditBecomDate"
                rules={[
                  {
                    required: true,
                    message: `请选择运输方式`,
                  },
                ]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="授信到期日"
                name="creditExpireDate"
                rules={[
                  {
                    required: true,
                    message: `请选择运输方式`,
                  },
                ]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <ComEditTable<signContractProps>
          columns={columns}
          rowKey="id"
          value={dataSource}
          recordCreatorProps={{
            newRecordType: 'dataSource',
            record: () => ({
              id: Date.now(),
            }),
          }}
          editable={{
            type: 'multiple',
            form: mpForm,
            editableKeys,
            onValuesChange: (record: any, recordList: any) => {
              setDataSource(recordList)
            },
            onChange: (editableKeyss: any, editableRows: signContractProps[]) => {
              setEditableRowKeys(editableKeyss)
              setDataSource(editableRows)
            },
          }}
        />
      </CardTitle>
    </>
  )
}

export default forwardRef(SignContract)
