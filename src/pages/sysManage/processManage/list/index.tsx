import React, { useState, useRef, useEffect } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { processListProps, processListParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { message, Button, Typography, Modal } from 'antd'
import { getProcessList, deleteProcess } from '@/services'
// import ExportFile from '@/components/ComUpload/exportFile'
import AddModal from './components/addModal'
import { useIntl, history } from 'umi'
import { CloudUploadOutlined, FileImageOutlined } from '@ant-design/icons'
import ViewBpmn from '@/components/Bpmn/ViewBpmn'
import { getDictData } from '@/utils/dictData'

const { MenuEditButton, MenuDelteButton } = MenuProTable
const { Link } = Typography

const RoleManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [info, setInfo] = useState<any>()
  const intl = useIntl()
  const actionRef = useRef<ActionType>()
  const [svgVisible, setSvgVisible] = useState<boolean>(false)
  const [statusData, setStatusData] = useState<any>({})

  const getDict = async () => {
    const obj = await getDictData('act_re_procdef_state')
    setStatusData(obj)
  }

  useEffect(() => {
    getDict()
  }, [])

  // 删除
  const delteRecored = async (ids: string) => {
    await deleteProcess(ids)
    message.success(
      intl.formatMessage({
        id: 'pages.form.delete',
      }),
    )
    actionRef.current?.reload()
  }

  const columns: ProColumns<processListProps>[] = [
    // {
    //   title: intl.formatMessage({
    //     id: 'pages.table.index',
    //   }),
    //   valueType: 'index',
    // },
    {
      title: intl.formatMessage({
        id: 'sys.process.name',
      }),
      width: '25%',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: intl.formatMessage({
        id: 'sys.process.processKey',
      }),
      key: 'key',
      dataIndex: 'key',
    },
    {
      title: intl.formatMessage({
        id: 'sys.process.processVsion',
      }),
      key: 'version',
      hideInSearch: true,
      dataIndex: 'version',
    },
    {
      title: intl.formatMessage({
        id: 'sys.process.createTime',
      }),
      key: 'deploymentTime',
      dataIndex: 'deploymentTime',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({
        id: 'sys.base.status',
      }),
      key: 'suspendState',
      dataIndex: 'suspendState',
      hideInSearch: true,
      render: (_, recored) => statusData[recored.suspendState],
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
          onClick={async () => {
            setInfo({
              deploymentId: recored.deploymentId,
              resourceName: recored.resourceName,
            })

            setSvgVisible(true)
          }}
        >
          <FileImageOutlined style={{ marginRight: 3 }} />
          流程图
        </Link>,
        <MenuEditButton
          key="edit"
          authorword="system:post:edit"
          onClick={() => {
            history.push(
              `/process/create?deploymentId=${recored.deploymentId}&resourceName=${recored.resourceName}`,
            )
          }}
        />,
        <MenuDelteButton
          authorword="system:post:remove"
          onClick={() => delteRecored(recored.deploymentId)}
          key="delete"
        />,
      ],
    },
  ]

  const getList = async (param: processListParamProps) => {
    // console.log(param)
    const { rows, total } = await getProcessList(param)
    const newData: any[] = []
    const obj = {}
    const ids: any[] = []
    rows.forEach((item: any) => {
      if (!obj[item.key]) {
        ids.push(item)
      }
      obj[item.key] = item.key
    })
    ids.forEach((item) => {
      const arr = rows.filter((ss: any) => ss.key === item.key)
      const children = arr.sort((a: any, b: any) => b.version - a.version)
      const newItem: any = {
        ...children.shift(),
      }
      if (children.length) {
        newItem.children = children
      }
      newData.push(newItem)
    })
    // console.log(ids, newData)

    return {
      data: newData,
      total,
    }
  }

  // 新增
  const submit = () => {
    setModalVisible(false)
    actionRef?.current?.reload()
  }

  return (
    <>
      <MenuProTable<processListProps>
        request={getList}
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        // headerTitle={
        //   <MenuAddButton
        //     authorword="system:post:add"
        //     onClick={() => {
        //       setId(null)
        //       setModalVisible(true)
        //     }}
        //   />
        // }
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={() => {
              setModalVisible(true)
            }}
            icon={<CloudUploadOutlined />}
          >
            部署流程文件
          </Button>,
        ]}
        tableAlertRender={false}
      />

      <AddModal
        modalVisible={modalVisible}
        handleSubmit={submit}
        info={{}}
        handleCancel={() => setModalVisible(false)}
      />

      {/* 查看流程图弹窗 */}
      {svgVisible && (
        <Modal
          title={`查看流程图`}
          maskClosable={false}
          destroyOnClose
          width={'65%'}
          visible={svgVisible}
          footer={false}
          onCancel={() => {
            setSvgVisible(false)
          }}
        >
          <ViewBpmn info={info} />
        </Modal>
      )}
    </>
  )
}

export default RoleManage
