import { ProList } from '@ant-design/pro-list'
import React, { useState } from 'react'
import { StatisticCard } from '@ant-design/pro-card'
import { Divider } from 'antd'

const Undone: React.FC = () => {
  const [activeKey, setActiveKey] = useState<React.Key | undefined>('tab1')

  const dataSource = [
    {
      name: '实验名称1',
      desc: '系统性的沉淀B端知识体系',
      content: [
        {
          label: '模型数',
          value: 2903,
        },
        {
          label: '指标数',
          value: 3720,
        },
        {
          label: '实验状态',
          value: '成功',
          status: 'success',
        },
      ],
    },
    {
      name: '实验名称2',
      desc: '系统性的沉淀B端知识体系',
      content: [
        {
          label: '模型数',
          value: 2904,
        },
        {
          label: '指标数',
          value: 3721,
        },
        {
          label: '实验状态',
          value: '成功',
          status: 'success',
        },
      ],
    },
    {
      name: '实验名称3',
      desc: '系统性的沉淀B端知识体系',
      content: [
        {
          label: '模型数',
          value: 2905,
        },
        {
          label: '指标数',
          value: 3722,
        },
        {
          label: '实验状态',
          value: '成功',
          status: 'success',
        },
      ],
    },
  ]

  return (
    <div>
      <StatisticCard.Group direction={'row'}>
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
      </StatisticCard.Group>
      <ProList<any>
        rowKey="name"
        dataSource={dataSource}
        metas={{
          title: {
            dataIndex: 'name',
          },
          description: {
            dataIndex: 'desc',
          },
          content: {
            dataIndex: 'content',
            render: (text) => (
              <div key="label" style={{ display: 'flex', justifyContent: 'space-around' }}>
                {(text as any[]).map((t) => (
                  <div key={t.label}>
                    <div style={{ color: '#00000073' }}>{t.label}</div>
                    <div style={{ color: '#000000D9' }}>
                      {t.status === 'success' && (
                        <span
                          style={{
                            display: 'inline-block',
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: '#52c41a',
                            marginRight: 8,
                          }}
                        />
                      )}
                      {t.value}
                    </div>
                  </div>
                ))}
              </div>
            ),
          },
          actions: {
            render: (text, row) => [
              activeKey === 'tab1' && (
                <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="link">
                  处理
                </a>
              ),
            ],
          },
        }}
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
    </div>
  )
}

export default Undone
