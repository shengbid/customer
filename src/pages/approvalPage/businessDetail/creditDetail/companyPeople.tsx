import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import Descriptions from '@/components/ComPage/Descriptions'
import LegalPerson from './editComponents/legalPerson'
import RealPersonInfo from './editComponents/realPersonInfo'
import MetalPersonInfo from './editComponents/metaInfo'
import Principal from './editComponents/principal'
import FinancePrincipal from './editComponents/financePrincipal'

const { DescriptionsItem } = Descriptions

// 企业法人信息
const CompanyPeople: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [type, setType] = useState<number>(1) // 编辑的类型
  const [title, setTitle] = useState<string>('') // 编辑的类型
  const infoData = {
    companyName: '吉祥',
  }

  // 编辑
  const handleEdit = (val: number) => {
    setType(val)
    setModalVisible(true)
    switch (val) {
      case 1:
        setTitle('修改企业法人信息')
        break
      case 2:
        setTitle('修改实控人信息')
        break
      case 3:
        setTitle('修改实控人配偶信息')
        break
      case 4:
        setTitle('修改主要负责人信息')
        break
      case 5:
        setTitle('修改财务负责人信息')
        break

      default:
        break
    }
  }

  return (
    <>
      <Descriptions
        title="企业法人信息"
        extra={
          <Button type="primary" onClick={() => handleEdit(1)}>
            编辑
          </Button>
        }
      >
        <DescriptionsItem label="法人/董事姓名">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="身份证件类型">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="证件号码">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="证件正面">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="证件反面">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="手机号码">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="婚姻情况">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="住房地址">{infoData.companyName}</DescriptionsItem>
      </Descriptions>

      <Descriptions
        title="实控人信息"
        extra={
          <Button type="primary" onClick={() => handleEdit(2)}>
            编辑
          </Button>
        }
      >
        <DescriptionsItem label="实控人姓名">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="身份证件类型">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="证件号码">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="证件正面">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="证件反面">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="手机号码">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="婚姻情况">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="住房情况">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="实控人行业从业年限">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="住房地址">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="征信报告">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="房产证">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="行驶证">{infoData.companyName}</DescriptionsItem>
      </Descriptions>

      <Descriptions
        title="实控人配偶信息"
        extra={
          <Button type="primary" onClick={() => handleEdit(3)}>
            编辑
          </Button>
        }
      >
        <DescriptionsItem label="实控人配偶姓名">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="身份证件类型">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="证件号码">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="证件正面">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="证件反面">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="手机号码">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="征信报告">{infoData.companyName}</DescriptionsItem>
      </Descriptions>

      <Descriptions
        title="主要负责人信息"
        extra={
          <Button type="primary" onClick={() => handleEdit(4)}>
            编辑
          </Button>
        }
      >
        <DescriptionsItem label="主要负责人姓名">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="手机号码">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="职务">{infoData.companyName}</DescriptionsItem>
      </Descriptions>

      <Descriptions
        title="财务负责人信息"
        extra={
          <Button type="primary" onClick={() => handleEdit(5)}>
            编辑
          </Button>
        }
      >
        <DescriptionsItem label="财务负责人姓名">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="手机号码">{infoData.companyName}</DescriptionsItem>
        <DescriptionsItem label="职务">{infoData.companyName}</DescriptionsItem>
      </Descriptions>

      {/* 修改弹框 */}
      <Modal
        title={title}
        maskClosable={false}
        destroyOnClose
        width={800}
        visible={modalVisible}
        footer={false}
        onCancel={() => {
          setModalVisible(false)
        }}
      >
        {type === 1 && (
          <LegalPerson
            handleCancel={() => {
              setModalVisible(false)
            }}
          />
        )}
        {type === 2 && (
          <RealPersonInfo
            handleCancel={() => {
              setModalVisible(false)
            }}
          />
        )}
        {type === 3 && (
          <MetalPersonInfo
            handleCancel={() => {
              setModalVisible(false)
            }}
          />
        )}
        {type === 4 && (
          <Principal
            handleCancel={() => {
              setModalVisible(false)
            }}
          />
        )}
        {type === 5 && (
          <FinancePrincipal
            handleCancel={() => {
              setModalVisible(false)
            }}
          />
        )}
      </Modal>
    </>
  )
}

export default CompanyPeople
