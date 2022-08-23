import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import CardTitle from '@/components/ComPage/CardTitle'
import ComEditTable from '@/components/ComProtable/ComEditTable'
import type { signContractProps } from '@/services/types'
import { Form, Row, Col, DatePicker } from 'antd'
import type { ProColumns } from '@ant-design/pro-table'
import RequiredTilte from '@/components/RequiredLabel'
import DictSelect from '@/components/ComSelect'
import ComUpload from '@/components/ComUpload'
import { creditContractDetail } from '@/services'

const SignContract = ({ activityParams, creditParams }: any, ref: any) => {
  const [dataSource, setDataSource] = useState<signContractProps[]>([
    {
      id: 1,
      fileList: [],
    },
  ])
  const [editableKeys, setEditableRowKeys] = useState<any[]>([1])
  const [mpForm] = Form.useForm()
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<any[]>([])

  useImperativeHandle(ref, () => ({
    // 暴露给父组件的方法
    getBusinessData: async () => {
      try {
        await mpForm.validateFields()
        const cusContractList = dataSource.map((item) => {
          return {
            ...item,
            signWay: 2,
            recipientList: [
              {
                role: 1,
                enterpriseId: creditParams.enterpriseId,
                enterpriseName: creditParams.enterpriseName,
              },
            ],
            bizNo: activityParams.instanceId,
            fileName: item.fileList[0].fileName,
            fileUrl: item.fileList[0].fileUrl,
          }
        })
        return { businessData: { cusContractList } }
      } catch (error) {
        return ''
      }
    },
  }))

  const getDetail = async () => {
    const { data } = await creditContractDetail({
      taskID: activityParams.taskId,
      businessKey: activityParams.businessKey,
    })
    setFileList(data)
  }

  useEffect(() => {
    if (activityParams && activityParams.taskId) {
      getDetail()
    }
  }, [activityParams])

  const columns: ProColumns<signContractProps>[] = [
    {
      title: <RequiredTilte label="合同名称" />,
      dataIndex: 'contractName',
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
      title: <RequiredTilte label="合同编号" />,
      dataIndex: 'contractNo',
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
      title: <RequiredTilte label="合同类型" />,
      dataIndex: 'contractType',
      width: '17%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => <DictSelect authorword="contract_type" />,
    },
    {
      title: <RequiredTilte label="签署时间" />,
      dataIndex: 'signTime',
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
      renderFormItem: () => <ComUpload limit={1} />,
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
              <Form.Item label="现场拍摄视频">
                <ComUpload isDetail value={fileList} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="授信生效日"
                name="creditBecomDate"
                rules={[
                  {
                    required: true,
                    message: `请选择授信生效日`,
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
                    message: `请选择授信到期日`,
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
