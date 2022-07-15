import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { templateProps, templateParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { Typography } from 'antd'
import { getTemplateList } from '@/services'
import React, { useState, useRef } from 'react'
import AddModal from './components/addModal'
import { useIntl } from 'umi'
import ComUpload from '@/components/ComUpload'

const { MenuAddButton } = MenuProTable

const { Link } = Typography
const Leave: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [info, setInfo] = useState<any>()
  const intl = useIntl()
  const actionRef = useRef<ActionType>()

  const getList = async (param: templateParamProps) => {
    // console.log(param)
    const { rows, total } = await getTemplateList(param)
    return {
      data: rows,
      total,
    }
  }

  const columns: ProColumns<templateProps>[] = [
    {
      title: '模板名称',
      dataIndex: 'templateName',
    },
    {
      title: '模板ID',
      dataIndex: 'templateId',
      hideInSearch: true,
    },
    {
      title: '附件',
      key: 'fileList',
      dataIndex: 'fileList',
      hideInSearch: true,
      render: (_, recored) => <ComUpload value={[recored]} isDetail />,
    },
    {
      title: intl.formatMessage({
        id: 'pages.table.option',
      }),
      width: 220,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <Link
          key="picture"
          onClick={() => {
            setInfo({ id: recored.id, templateId: recored.templateId })
            setModalVisible(true)
          }}
        >
          修改
        </Link>,
      ],
    },
  ]

  // 新增
  const submit = () => {
    setModalVisible(false)
    actionRef?.current?.reload()
  }

  return (
    <>
      <MenuProTable<any>
        rowKey="id"
        request={getList}
        columns={columns}
        actionRef={actionRef}
        headerTitle={
          <MenuAddButton
            authorword="system:post:add"
            onClick={() => {
              setInfo(null)
              setModalVisible(true)
            }}
          />
        }
      />

      <AddModal
        modalVisible={modalVisible}
        handleSubmit={submit}
        info={info}
        handleCancel={() => setModalVisible(false)}
      />
    </>
  )
}

export default Leave
