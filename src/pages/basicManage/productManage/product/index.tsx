import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { productListProps, productListParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { Typography } from 'antd'
import { getProductList } from '@/services'
import AddModal from './components/addModal'
import { useIntl } from 'umi'
import ImportFile from '@/components/ComUpload/importFile'
import ImportProduct from './components/importProduct'
import { formatAmount } from '@/utils/base'

const { MenuAddButton } = MenuProTable
const { Link } = Typography

const ListManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [importVisible, setImportVisible] = useState<boolean>(false)
  const [tableData, setTableData] = useState<any[]>([])
  const [info, setInfo] = useState<any>()
  const intl = useIntl()
  const actionRef = useRef<ActionType>()

  const columns: ProColumns<productListProps>[] = [
    {
      title: '商品ID',
      key: 'id',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '商品名称',
      key: 'goodName',
      dataIndex: 'goodName',
    },
    {
      title: '品牌名称',
      key: 'goodBrand',
      dataIndex: 'goodBrand',
    },
    {
      title: '商品条码',
      key: 'barCode',
      dataIndex: 'barCode',
    },
    {
      title: '最近采购价',
      key: 'purchasePrice',
      dataIndex: 'purchasePrice',
      // valueType: 'digit',
      width: 127,
      hideInSearch: true,
      render: (val) => formatAmount(val),
    },
    {
      title: '公允价',
      key: 'fairPrice',
      dataIndex: 'fairPrice',
      // valueType: 'digit',
      width: 110,
      hideInSearch: true,
      render: (val) => formatAmount(val),
    },
    {
      title: '保质期(月)',
      key: 'warrantyMonth',
      dataIndex: 'warrantyMonth',
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
            setInfo(recored)
          }}
        >
          编辑
        </Link>,
      ],
    },
  ]

  const getList = async (param: productListParamProps) => {
    const { rows, total } = await getProductList(param)
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
  const handleSuccess = (data: any[]) => {
    setTableData(data)
    setImportVisible(true)
  }

  // 导入新增
  const submitImport = () => {
    actionRef?.current?.reload()
    setImportVisible(false)
  }

  return (
    <>
      <MenuProTable<productListProps>
        request={getList}
        rowKey="id"
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
        toolBarRender={() => [
          <ImportFile
            authorword="system:user:import"
            key="import"
            actionUrl="/system/goodManage/importData"
            downUrl="/system/goodManage/importTemplate"
            title={'商品列表'}
            handleSuccess={handleSuccess}
          />,
        ]}
        tableAlertRender={false}
      />

      <AddModal
        modalVisible={modalVisible}
        handleSubmit={submit}
        info={info}
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
