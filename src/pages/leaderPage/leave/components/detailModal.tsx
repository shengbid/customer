import React, { useState, useEffect } from 'react'
import { Modal, Descriptions, Spin, Button } from 'antd'
import type { detailModalProps, leaveListProps } from '@/services/types'
import { leaveDetail, leaveHistory } from '@/services'

const DetailModal: React.FC<detailModalProps> = ({ modalVisible, handleCancel, info }) => {
  const [spinning, setSpinning] = useState<boolean>(true)
  const [infoData, setInfoData] = useState<leaveListProps>({})
  const [historyData, setHistoyData] = useState<any>([])

  const getDetail = async () => {
    const { data } = await leaveDetail(info)
    const res = await leaveHistory(info)
    setHistoyData(res.data)
    setSpinning(false)
    setInfoData(data)
  }

  useEffect(() => {
    console.log(33, modalVisible)
    if (modalVisible) getDetail()
  }, [modalVisible])

  const cancel = () => {
    handleCancel()
  }

  return (
    <Modal
      title="审批详情"
      maskClosable={false}
      destroyOnClose
      width={'65%'}
      visible={modalVisible}
      footer={
        <Button onClick={cancel} className="cancel-btn">
          关闭
        </Button>
      }
      onCancel={cancel}
    >
      <Spin spinning={spinning}>
        <Descriptions title={`请假人: ${infoData.createName}`}>
          <Descriptions.Item label="请假类型">{infoData.type}</Descriptions.Item>
          <Descriptions.Item label="标题">{infoData.title}</Descriptions.Item>
          <Descriptions.Item label="原因">{infoData.reason}</Descriptions.Item>
          <Descriptions.Item label="开始时间">{infoData.leaveStartTime}</Descriptions.Item>
          <Descriptions.Item label="结束时间">{infoData.leaveEndTime}</Descriptions.Item>
        </Descriptions>
        {historyData.length &&
          historyData.map((item: any) => (
            <Descriptions title={item.taskNodeName} key={item.id}>
              <Descriptions.Item label="审批人">{item.createName}</Descriptions.Item>
              <Descriptions.Item label="审批时间">{item.createdDate}</Descriptions.Item>
              {item.formHistoryDataDTO &&
                item.formHistoryDataDTO.map((subItem: any) => (
                  <Descriptions.Item key={item.title} label={subItem.title}>
                    {subItem.value}
                  </Descriptions.Item>
                ))}
            </Descriptions>
          ))}
      </Spin>
    </Modal>
  )
}

export default DetailModal
