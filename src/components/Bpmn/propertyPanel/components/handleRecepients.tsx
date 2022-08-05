import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Radio, Select } from 'antd'
import { UserOutlined, PlusOutlined } from '@ant-design/icons'
import { getRoleList } from '@/services'
import { handleOptionData } from '@/utils/base'

interface handleAssigneeProps {
  handleAssignee: (count: number, name: string) => void
}
// 处理人设置
const HandleUser: React.FC<handleAssigneeProps> = ({ handleAssignee }) => {
  const [roleList, setRoleList] = useState<any>([]) // 流程表单

  const getList = async () => {
    const { rows } = await getRoleList({ pageNum: 1, pageSize: 20 })
    setRoleList(handleOptionData({ data: rows, value: 'roleId', label: 'roleName' }))
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <>
      <Form.Item label="抄送人" name="recipientType">
        <Radio.Group
          options={[
            {
              label: '指定用户',
              value: '1',
            },
            // {
            //   label: '流程发起人',
            //   value: '2',
            // },
            // {
            //   label: '上级节点指定',
            //   value: '3',
            // },
          ]}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{ span: 24 }}
        shouldUpdate={(prevValues, curValues) =>
          prevValues.recipientType !== curValues.recipientType
        }
        noStyle
      >
        {({ getFieldValue }) => {
          const recipientType = getFieldValue('recipientType')
          return recipientType === '1' || recipientType === '3' ? (
            <>
              {recipientType === '1' && (
                <>
                  {/* <Form.Item
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    colon={false}
                    label=" "
                    name="assigneeName"
                  >
                    <Input
                      allowClear
                      readOnly
                      prefix={<UserOutlined />}
                      suffix={
                        <Button
                          size="small"
                          icon={<PlusOutlined />}
                          onClick={() => {
                            handleAssignee(1, 'assignee')
                          }}
                        />
                      }
                    />
                  </Form.Item> */}
                  <Form.Item
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    label="抄送人组"
                    name="recipientUsersName"
                  >
                    <Input
                      allowClear
                      readOnly
                      prefix={<UserOutlined />}
                      suffix={
                        <Button
                          size="small"
                          icon={<PlusOutlined />}
                          onClick={() => {
                            handleAssignee(1000, 'recipientUsers')
                          }}
                        />
                      }
                    />
                  </Form.Item>
                </>
              )}
              <Form.Item
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                label="抄送角色"
                name="recipientGroups"
              >
                <Select options={roleList} mode="multiple" />
              </Form.Item>
            </>
          ) : null
        }}
      </Form.Item>
    </>
  )
}

export default HandleUser
