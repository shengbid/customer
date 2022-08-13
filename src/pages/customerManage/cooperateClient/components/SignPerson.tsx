import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import ComCard from '@/components/ComPage/ComCard'
import Descriptions from '@/components/ComPage/Descriptions'
import ComUpload from '@/components/ComUpload'
import DictShow from '@/components/ComSelect/dictShow'
import EditSignPerson from './editSignPerson'
import { getCooperateSigner } from '@/services'

const { DescriptionsItem } = Descriptions

interface infoProps {
  companyId: string
  type: number // 1合作企业  2借款企业
}

// 签约经办人
const SignPerson: React.FC<infoProps> = ({ companyId, type }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [signerData, setSignerData] = useState<any>({})

  // 获取合作企业签约经办人信息
  const getSignerDetail = async () => {
    const { data } = await getCooperateSigner(companyId)
    setSignerData(data)
  }

  // 获取借款企业签约经办人信息
  const getSignerDetail2 = async () => {
    const { data } = await getCooperateSigner(companyId)
    setSignerData(data)
  }

  const getDetails = () => {
    if (type === 1) {
      getSignerDetail()
    } else {
      getSignerDetail2()
    }
  }

  useEffect(() => {
    if (companyId) {
      getDetails()
    }
  }, [companyId])

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
          <DescriptionsItem label="姓名">{signerData.name}</DescriptionsItem>
          <DescriptionsItem label="邮箱">{signerData.email}</DescriptionsItem>
          <DescriptionsItem label="手机号">
            <DictShow dictValue={signerData.phoneArea} dictkey="phone_code" />
            {signerData.phoneNumber}
          </DescriptionsItem>
          <DescriptionsItem label="授权书">
            <ComUpload isDetail value={signerData.files} />
          </DescriptionsItem>
        </Descriptions>
      </ComCard>

      <EditSignPerson
        modalVisible={modalVisible}
        infoData={signerData}
        type={type}
        handleCancel={(val) => {
          if (val) {
            getDetails()
          }
          setModalVisible(false)
        }}
      />
    </>
  )
}

export default SignPerson
