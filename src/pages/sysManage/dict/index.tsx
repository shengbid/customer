import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { dictProps, dictParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { message, Tag } from 'antd'
import { getDictList, deleteDict } from '@/services'
import ExportFile from '@/components/ComUpload/exportFile'
import DictSelect from '@/components/ComSelect'
import { Link } from 'umi'
import AddModal from './components/addModal'
import { useIntl } from 'umi'

const { MenuAddButton, MenuMultiDelButton, MenuEditButton, MenuDelteButton } = MenuProTable

const RoleManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [id, setId] = useState<any>()
  const [params, setParams] = useState<dictParamProps>()
  const intl = useIntl()
  const actionRef = useRef<ActionType>()

  // 删除用户
  const delteRecored = async (ids: number | string) => {
    await deleteDict(ids)
    message.success(
      intl.formatMessage({
        id: 'pages.form.delete',
      }),
    )
    actionRef.current?.reload()
  }

  const columns: ProColumns<dictProps>[] = [
    {
      title: intl.formatMessage({
        id: 'pages.table.index',
      }),
      valueType: 'index',
    },
    {
      title: intl.formatMessage({
        id: 'sys.dict.dictName',
      }),
      key: 'dictName',
      dataIndex: 'dictName',
    },
    {
      title: intl.formatMessage({
        id: 'sys.dict.dictType',
      }),
      key: 'dictType',
      dataIndex: 'dictType',
      render: (val, recored) => <Link to={`/sys/dict/type?type=${val}`}>{recored.dictType}</Link>,
    },
    {
      title: intl.formatMessage({
        id: 'sys.base.status',
      }),
      key: 'status',
      dataIndex: 'status',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return <DictSelect authorword="sys_normal_disable" />
      },
    },
    {
      title: intl.formatMessage({
        id: 'sys.base.status',
      }),
      key: 'status',
      dataIndex: 'status',
      hideInSearch: true,
      render: (val) =>
        val === '0' ? (
          <Tag color="processing">
            {intl.formatMessage({
              id: 'sys.base.normal',
            })}
          </Tag>
        ) : (
          <Tag color="error">
            {intl.formatMessage({
              id: 'sys.base.out',
            })}
          </Tag>
        ),
    },
    {
      title: intl.formatMessage({
        id: 'sys.base.remark',
      }),
      key: 'remark',
      ellipsis: true,
      hideInSearch: true,
      dataIndex: 'remark',
    },
    {
      title: intl.formatMessage({
        id: 'sys.base.createTime',
      }),
      key: 'createTime',
      dataIndex: 'createTime',
      hideInSearch: true,
      valueType: 'dateTime',
    },
    {
      title: intl.formatMessage({
        id: 'sys.base.createTime',
      }),
      hideInTable: true,
      dataIndex: 'createTime',
      valueType: 'dateRange',
      search: {
        transform: (value: any) => ({ beginTime: value[0], endTime: value[1] }),
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.table.option',
      }),
      width: 150,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <MenuEditButton
          key="edit"
          authorword="system:dict:edit"
          onClick={() => {
            setId(recored.dictId)
            setModalVisible(true)
          }}
        />,
        <MenuDelteButton
          authorword="system:dict:remove"
          onClick={() => delteRecored(recored.dictId)}
          key="delete"
        />,
      ],
    },
  ]

  const getList = async (param: dictParamProps) => {
    // console.log(param)
    setParams(param)
    const { rows, total } = await getDictList(param)
    return {
      data: rows,
      total,
    }
  }

  // 批量删除
  const multipleDelete = async () => {
    if (selectedRowKeys.length) {
      await deleteDict(selectedRowKeys.join(','))
      message.success(
        intl.formatMessage({
          id: 'pages.form.delete',
        }),
      )
      actionRef.current?.reload()
      setSelectedRowKeys([])
    } else {
      message.warning(
        intl.formatMessage({
          id: 'pages.table.oneDataDelete',
        }),
      )
    }
  }

  // 新增
  const submit = () => {
    setModalVisible(false)
    actionRef?.current?.reload()
  }

  return (
    <>
      <MenuProTable<dictProps>
        request={getList}
        rowKey="dictId"
        columns={columns}
        actionRef={actionRef}
        headerTitle={
          <MenuAddButton
            authorword="system:dict:add"
            onClick={() => {
              setId(null)
              setModalVisible(true)
            }}
          />
        }
        toolBarRender={() => [
          <ExportFile
            authorword="system:dict:export"
            key="export"
            params={params}
            title={intl.formatMessage({
              id: 'sys.dict.name',
            })}
            url="dict/type"
          />,
          <MenuMultiDelButton
            authorword="system:dict:remove"
            key="delete"
            onClick={multipleDelete}
          />,
        ]}
        tableAlertRender={false}
        rowSelection={{
          selectedRowKeys,
          onChange: (value) => {
            setSelectedRowKeys(value)
          },
        }}
      />

      <AddModal
        modalVisible={modalVisible}
        handleSubmit={submit}
        info={id}
        handleCancel={() => setModalVisible(false)}
      />
    </>
  )
}

export default RoleManage
