import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { cooperateListProps, cooperateListParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { Typography } from 'antd'
import { getLoanCustomerList } from '@/services'
import AddModal from './components/addModal'
import { useIntl } from 'umi'
import ImportFile from '@/components/ComUpload/importFile'
import ImportProduct from './components/importProduct'

const { MenuAddButton } = MenuProTable
const { Link } = Typography

const ListManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [importVisible, setImportVisible] = useState<boolean>(false)
  const [tableData, setTableData] = useState<any[]>([])
  const [id, setId] = useState<any>()
  const intl = useIntl()
  const actionRef = useRef<ActionType>()

  const columns: ProColumns<cooperateListProps>[] = [
    {
      title: '商品ID',
      key: 'fullName',
      dataIndex: 'fullName',
      hideInSearch: true,
    },
    {
      title: '商品名称',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: '品牌名称',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: '商品条码',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: '最近采购价(美元)',
      key: 'code',
      dataIndex: 'code',
      valueType: 'digit',
      width: 127,
      hideInSearch: true,
    },
    {
      title: '公允价(美元)',
      key: 'code',
      dataIndex: 'code',
      valueType: 'digit',
      width: 110,
      hideInSearch: true,
    },
    {
      title: '保质期(月)',
      key: 'code',
      dataIndex: 'code',
      width: 90,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({
        id: 'pages.table.option',
      }),
      width: 85,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <Link
          key="edit"
          onClick={() => {
            setModalVisible(true)
            setId(recored.id)
          }}
        >
          编辑
        </Link>,
      ],
    },
  ]

  const getList = async (param: cooperateListParamProps) => {
    console.log(param)
    const { rows, total } = await getLoanCustomerList(param)
    return {
      data: rows,
      total,
    }
  }

  // 新增
  const submit = () => {
    setModalVisible(false)
    actionRef?.current?.reload()
  }

  // 导入成功
  const handleSuccess = () => {
    actionRef?.current?.reload()
    setImportVisible(true)
    setTableData([])
  }

  // 导入新增
  const submitImport = () => {
    actionRef?.current?.reload()
    setImportVisible(false)
  }

  return (
    <>
      <MenuProTable<cooperateListProps>
        request={getList}
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        headerTitle={
          <MenuAddButton
            authorword="system:post:add"
            onClick={() => {
              setId(null)
              setModalVisible(true)
            }}
          />
        }
        toolBarRender={() => [
          <ImportFile
            authorword="system:user:import"
            key="import"
            url="user"
            title={'商品列表'}
            handleSuccess={handleSuccess}
          />,
        ]}
        tableAlertRender={false}
      />

      <AddModal
        modalVisible={modalVisible}
        handleSubmit={submit}
        info={id}
        handleCancel={() => setModalVisible(false)}
      />

      {/* 批量导入 */}
      <ImportProduct
        modalVisible={importVisible}
        handleSubmit={submitImport}
        info={tableData}
        handleCancel={() => setImportVisible(false)}
      />
    </>
  )
}

export default ListManage
