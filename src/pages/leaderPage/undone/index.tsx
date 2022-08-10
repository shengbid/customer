import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { undoneListProps, undoneListParamProps, doneListProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { Typography, Tabs, Badge } from 'antd'
import { getUndoneList, getdoneList } from '@/services'
import React, { useState, useRef } from 'react'
// import { StatisticCard } from '@ant-design/pro-card'
import { useIntl, history } from 'umi'
import AddModal from './components/addModal'
// import { FileImageOutlined } from '@ant-design/icons'
const { TabPane } = Tabs
// const { Divider } = StatisticCard
const { Link } = Typography

const Undone: React.FC = () => {
  // const [setActiveKey] = useState<React.Key | undefined>('tab1')
  const intl = useIntl()
  const actionRef = useRef<ActionType>()
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [info, setInfo] = useState<any>()
  const [dbCount, setdbCount] = useState<number>(0)
  const [ybCount] = useState<number>(0)

  const getList = async (param: undoneListParamProps) => {
    // console.log(param)
    const { rows, total } = await getUndoneList(param)
    setdbCount(total)
    return {
      data: rows,
      total,
    }
  }
  // 获取已办列表
  const getdoList = async (param: undoneListParamProps) => {
    // console.log(param)
    const { rows, total } = await getdoneList(param)
    // setybCount(total)
    return {
      data: rows,
      total,
    }
  }

  const columns: ProColumns<undoneListProps>[] = [
    {
      title: '任务编号',
      dataIndex: 'id',
    },
    {
      title: '任务类型',
      dataIndex: 'instanceName',
      hideInSearch: true,
    },
    {
      title: '任务名称',
      dataIndex: 'name',
      render: (_, recored) => (
        <span>
          {recored.instanceName}-{recored.name}
        </span>
      ),
    },
    {
      title: '任务类型',
      key: 'status',
      dataIndex: 'status',
      hideInTable: true,
    },
    {
      title: '发起人',
      key: 'deploymentTime',
      dataIndex: 'deploymentTime',
      hideInSearch: true,
    },
    {
      title: '接受时间',
      key: 'createdDate',
      width: 160,
      dataIndex: 'createdDate',
      hideInSearch: true,
      valueType: 'dateTime',
    },
    {
      title: intl.formatMessage({
        id: 'pages.table.option',
      }),
      width: 80,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <Link
          key="picture"
          onClick={async () => {
            setInfo(recored)
            // setModalVisible(true)
            history.push({
              pathname: '/leaderPage/undone/approval',
              query: {
                id: recored.id,
                businessKey: recored.businessKey,
                taskNodeName: recored.name,
                instanceId: recored.instanceId,
                formKey: recored.formKey,
              },
            })
            sessionStorage.setItem('preUrl', '/leaderPage/undone')
          }}
        >
          {/* <FileImageOutlined style={{ marginRight: 3 }} /> */}
          处理
        </Link>,
      ],
    },
  ]

  const columns2: ProColumns<doneListProps>[] = [
    {
      title: '任务编号',
      dataIndex: 'taskId',
    },
    {
      title: '任务类型',
      dataIndex: 'processDefinitionName',
      hideInSearch: true,
    },
    {
      title: '任务名称',
      dataIndex: 'name',
      render: (_, recored) => (
        <span>
          {recored.processDefinitionName}-{recored.taskNodeName}
        </span>
      ),
    },
    {
      title: '任务类型',
      key: 'processDefinitionName',
      dataIndex: 'processDefinitionName',
      hideInTable: true,
    },
    {
      title: '发起人',
      key: 'createBy',
      dataIndex: 'createBy',
      hideInSearch: true,
    },
    {
      title: '接受时间',
      key: 'startTime',
      width: 160,
      dataIndex: 'startTime',
      hideInSearch: true,
      valueType: 'dateTime',
    },
    {
      title: '完成时间',
      key: 'endTime',
      width: 160,
      dataIndex: 'endTime',
      hideInSearch: true,
      valueType: 'dateTime',
    },
    {
      title: intl.formatMessage({
        id: 'pages.table.option',
      }),
      width: 80,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <Link
          key="picture"
          onClick={async () => {
            setInfo(recored)
            // setModalVisible(true)
            history.push({
              pathname: '/leaderPage/undone/approval',
              query: {
                detail: 'detail',
                id: recored.id,
                businessKey: recored.businessKey,
                taskNodeName: recored.taskNodeName,
                instanceId: recored.instanceId,
                formKey: recored.formKey,
              },
            })
            sessionStorage.setItem('preUrl', '/leaderPage/undone')
          }}
        >
          {/* <FileImageOutlined style={{ marginRight: 3 }} /> */}
          详情
        </Link>,
      ],
    },
  ]

  const submit = () => {
    setModalVisible(false)
    actionRef?.current?.reload()
  }

  return (
    <div>
      {/* <StatisticCard.Group direction={'row'} style={{ marginBottom: 24 }}>
        <StatisticCard
          statistic={{
            title: '我的待办',
            value: 19,
            suffix: '个任务',
          }}
        />
        <Divider type="vertical" />
        <StatisticCard
          statistic={{
            title: '我的已办',
            value: 81,
            suffix: '个任务',
          }}
        />
        <Divider type="vertical" />
        <StatisticCard
          statistic={{
            title: '总任务',
            value: 100,
            suffix: '个任务',
          }}
        />
      </StatisticCard.Group> */}
      <Tabs type="card" className="tab-bages">
        <TabPane tab={<Badge count={dbCount}>我的待办</Badge>} key="tab1">
          <MenuProTable<any>
            rowKey="id"
            request={getList}
            columns={columns}
            actionRef={actionRef}
          />
        </TabPane>
        <TabPane tab={<Badge count={ybCount}>抄送给我</Badge>} key="tab2">
          <MenuProTable<any> rowKey="id" request={getdoList} columns={columns} />
        </TabPane>
        <TabPane tab="我的已办" key="tab3">
          <MenuProTable<any> rowKey="taskId" request={getdoList} columns={columns2} />
        </TabPane>
      </Tabs>

      <AddModal
        modalVisible={modalVisible}
        handleSubmit={submit}
        info={info}
        handleCancel={() => setModalVisible(false)}
      />
    </div>
  )
}

export default Undone
