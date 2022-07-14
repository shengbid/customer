import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { undoneListProps, undoneListParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { Typography } from 'antd'
import { getUndoneList } from '@/services'
import React, { useState, useRef } from 'react'
// import { StatisticCard } from '@ant-design/pro-card'
import { useIntl, history } from 'umi'
import AddModal from './components/addModal'
// import { FileImageOutlined } from '@ant-design/icons'

// const { Divider } = StatisticCard
const { Link } = Typography

const Undone: React.FC = () => {
  const [activeKey, setActiveKey] = useState<React.Key | undefined>('tab1')
  const intl = useIntl()
  const actionRef = useRef<ActionType>()
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [info, setInfo] = useState<any>()

  const getList = async (param: undoneListParamProps) => {
    // console.log(param)
    const { rows, total } = await getUndoneList(param)

    return {
      data: rows,
      total,
    }
  }

  const columns: ProColumns<undoneListProps>[] = [
    {
      title: '流程名称',
      dataIndex: 'instanceName',
    },
    {
      title: '任务节点名称',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '任务状态',
      key: 'status',
      dataIndex: 'status',
      hideInSearch: true,
    },
    {
      title: '办理人',
      key: 'deploymentTime',
      dataIndex: 'deploymentTime',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      key: 'createdDate',
      width: 180,
      dataIndex: 'createdDate',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({
        id: 'pages.table.option',
      }),
      width: 120,
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
                id: recored.businessKey,
              },
            })
          }}
        >
          {/* <FileImageOutlined style={{ marginRight: 3 }} /> */}
          处理
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
      <MenuProTable<any>
        rowKey="name"
        request={getList}
        columns={columns}
        actionRef={actionRef}
        search={false}
        toolbar={{
          menu: {
            activeKey,
            items: [
              {
                key: 'tab1',
                label: <span>我的待办</span>,
              },
              {
                key: 'tab2',
                label: <span>抄送给我</span>,
              },
              {
                key: 'tab3',
                label: <span>我的已办</span>,
              },
            ],
            onChange(key) {
              setActiveKey(key)
            },
          },
          search: {
            onSearch: (value: string) => {
              alert(value)
            },
          },
        }}
      />

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
