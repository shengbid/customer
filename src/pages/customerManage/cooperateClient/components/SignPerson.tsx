import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import ComCard from '@/components/ComPage/ComCard'
import Descriptions from '@/components/ComPage/Descriptions'
import ComUpload from '@/components/ComUpload'
import DictShow from '@/components/ComSelect/dictShow'
import EditSignPerson from './editSignPerson'

const { DescriptionsItem } = Descriptions

// 签约经办人
const SignPerson: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [infoData, setInfoData] = useState<any>({})

  // 获取经办人信息
  const getSignerInfo = () => {
    setInfoData({
      files: [],
      phoneArea: '1',
    })
  }

  useEffect(() => {
    getSignerInfo()
  }, [])

  return (
    <>
      <ComCard
        title="签约经办人信息"
        extra={
          <Button
            type="primary"
            onClick={() => {
              setModalVisible(true)
            }}
          >
            编辑
          </Button>
        }
      >
        <Descriptions>
          <DescriptionsItem label="姓名">{infoData.fullName}</DescriptionsItem>
          <DescriptionsItem label="邮箱">{infoData.email}</DescriptionsItem>
          <DescriptionsItem label="手机号">
            <DictShow dictValue={infoData.phoneArea} dictkey="phone_code" />
            {infoData.phoneNumber}
          </DescriptionsItem>
          <DescriptionsItem label="授权书">
            <ComUpload isDetail value={infoData.files} />
          </DescriptionsItem>
        </Descriptions>
      </ComCard>

      <EditSignPerson
        modalVisible={modalVisible}
        infoData={infoData}
        handleCancel={(val) => {
          if (val) {
            getSignerInfo()
          }
          setModalVisible(false)
        }}
      />
    </>
  )
}

export default SignPerson
