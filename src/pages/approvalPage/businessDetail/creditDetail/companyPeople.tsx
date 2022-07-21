import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'antd'
import Descriptions from '@/components/ComPage/Descriptions'
import LegalPerson from './editComponents/legalPerson'
import RealPersonInfo from './editComponents/realPersonInfo'
import MetalPersonInfo from './editComponents/metaInfo'
import Principal from './editComponents/principal'
import FinancePrincipal from './editComponents/financePrincipal'
import ComUpload from '@/components/ComUpload'

const { DescriptionsItem } = Descriptions

interface infoProps {
  infoData: any
  handleUp: () => void
}

// 企业法人信息
const CompanyPeople: React.FC<infoProps> = ({ infoData, handleUp }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [type, setType] = useState<number>(1) // 编辑的类型
  const [title, setTitle] = useState<string>('') // 编辑的类型
  const [legalData, setLegalData] = useState<any>({}) // 法人
  const [realData, setRealData] = useState<any>({}) // 实控人
  const [metalData, setMetalData] = useState<any>({}) // 实控人配偶
  const [mianData, setMainData] = useState<any>({}) // 负责人
  const [financeData, setFinanceData] = useState<any>({}) // 财务

  useEffect(() => {
    if (infoData.id && infoData.ryList) {
      const ryList = infoData.ryList
      const qyfr = ryList.qyfr
      if (qyfr.backFileName) {
        qyfr.idReverse = [
          {
            fileName: qyfr.backFileName,
            fileUrl: qyfr.backFileUrl,
            pictureDomain: qyfr.pictureDomain,
          },
        ]
      }
      qyfr.idFront = [
        {
          fileName: qyfr.frontFileName,
          fileUrl: qyfr.frontFileUrl,
          pictureDomain: qyfr.pictureDomain,
        },
      ]
      setLegalData(qyfr)
      // 实控人
      const skr = ryList.skr
      if (skr.backFileName) {
        skr.idReverse = [
          {
            fileName: skr.backFileName,
            fileUrl: skr.backFileUrl,
            pictureDomain: skr.pictureDomain,
          },
        ]
      }
      skr.idFront = [
        {
          fileName: skr.frontFileName,
          fileUrl: skr.frontFileUrl,
          pictureDomain: skr.pictureDomain,
        },
      ]
      skr.spouseCreditReport = JSON.parse(skr.spouseCreditReport)
      if (skr.houseLicense) {
        skr.houseLicense = JSON.parse(skr.houseLicense)
      }
      if (skr.driveLicense) {
        skr.driveLicense = JSON.parse(skr.driveLicense)
      }

      setRealData(skr)

      // 实控人配偶
      const skrpo = ryList.skrpo
      if (skrpo) {
        if (skrpo.backFileName) {
          skrpo.idReverse = [
            {
              fileName: skrpo.backFileName,
              fileUrl: skrpo.backFileUrl,
              pictureDomain: skrpo.pictureDomain,
            },
          ]
        }
        skrpo.idFront = [
          {
            fileName: skrpo.frontFileName,
            fileUrl: skrpo.frontFileUrl,
            pictureDomain: skrpo.pictureDomain,
          },
        ]
        skrpo.creditReport = JSON.parse(skrpo.creditReport)
        setMetalData(skrpo)
      }
      setMainData(ryList.zyfzr)
      setFinanceData(ryList.cwfzr)
    }
  }, [infoData])

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
        <DescriptionsItem label="法人/董事姓名">{legalData.name}</DescriptionsItem>
        <DescriptionsItem label="身份证件类型">{legalData.identityType}</DescriptionsItem>
        <DescriptionsItem label="证件号码">{legalData.identityNumber}</DescriptionsItem>
        <DescriptionsItem label="证件正面">
          <ComUpload isDetail value={legalData.idFront} />
        </DescriptionsItem>
        <DescriptionsItem label="证件反面">
          <ComUpload isDetail value={legalData.idReverse} />
        </DescriptionsItem>
        <DescriptionsItem label="手机号码">{legalData.phoneNumber}</DescriptionsItem>
        <DescriptionsItem label="婚姻情况">{legalData.marriageStatus}</DescriptionsItem>
        <DescriptionsItem label="住房地址">{legalData.houseAddr}</DescriptionsItem>
      </Descriptions>

      <Descriptions
        title="实控人信息"
        extra={
          <Button type="primary" onClick={() => handleEdit(2)}>
            编辑
          </Button>
        }
      >
        <DescriptionsItem label="实控人姓名">{realData.name}</DescriptionsItem>
        <DescriptionsItem label="身份证件类型">{realData.identityType}</DescriptionsItem>
        <DescriptionsItem label="证件号码">{realData.identityNumber}</DescriptionsItem>
        <DescriptionsItem label="证件正面">
          <ComUpload isDetail value={realData.idFront} />
        </DescriptionsItem>
        <DescriptionsItem label="证件反面">
          <ComUpload isDetail value={realData.idReverse} />
        </DescriptionsItem>
        <DescriptionsItem label="手机号码">{realData.phoneNumber}</DescriptionsItem>
        <DescriptionsItem label="婚姻情况">{realData.marriageStatus}</DescriptionsItem>
        <DescriptionsItem label="住房情况">{realData.houseStatus}</DescriptionsItem>
        <DescriptionsItem label="实控人行业从业年限">{realData.workYear}</DescriptionsItem>
        <DescriptionsItem label="住房地址">{realData.houseAddr}</DescriptionsItem>
        <DescriptionsItem label="征信报告">
          <ComUpload isDetail value={realData.spouseCreditReport} />
        </DescriptionsItem>
        <DescriptionsItem label="房产证">
          <ComUpload isDetail value={realData.houseLicense} />
        </DescriptionsItem>
        <DescriptionsItem label="行驶证">
          <ComUpload isDetail value={realData.driveLicense} />
        </DescriptionsItem>
      </Descriptions>

      {metalData.name ? (
        <Descriptions
          title="实控人配偶信息"
          extra={
            <Button type="primary" onClick={() => handleEdit(3)}>
              编辑
            </Button>
          }
        >
          <DescriptionsItem label="实控人配偶姓名">{metalData.name}</DescriptionsItem>
          <DescriptionsItem label="身份证件类型">{metalData.identityType}</DescriptionsItem>
          <DescriptionsItem label="证件号码">{metalData.identityNumber}</DescriptionsItem>
          <DescriptionsItem label="证件正面">
            <ComUpload isDetail value={metalData.idFront} />
          </DescriptionsItem>
          <DescriptionsItem label="证件反面">
            <ComUpload isDetail value={metalData.idReverse} />
          </DescriptionsItem>
          <DescriptionsItem label="手机号码">{metalData.phoneNumber}</DescriptionsItem>
          <DescriptionsItem label="征信报告">
            <ComUpload isDetail value={metalData.creditReport} />
          </DescriptionsItem>
        </Descriptions>
      ) : null}

      <Descriptions
        title="主要负责人信息"
        extra={
          <Button type="primary" onClick={() => handleEdit(4)}>
            编辑
          </Button>
        }
      >
        <DescriptionsItem label="主要负责人姓名">{mianData.name}</DescriptionsItem>
        <DescriptionsItem label="手机号码">{mianData.phoneNumber}</DescriptionsItem>
        <DescriptionsItem label="职务">{mianData.duty}</DescriptionsItem>
      </Descriptions>

      <Descriptions
        title="财务负责人信息"
        extra={
          <Button type="primary" onClick={() => handleEdit(5)}>
            编辑
          </Button>
        }
      >
        <DescriptionsItem label="财务负责人姓名">{financeData.name}</DescriptionsItem>
        <DescriptionsItem label="手机号码">{financeData.phoneNumber}</DescriptionsItem>
        <DescriptionsItem label="职务">{financeData.duty}</DescriptionsItem>
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
            info={legalData}
            handleCancel={() => {
              handleUp()
              setModalVisible(false)
            }}
          />
        )}
        {type === 2 && (
          <RealPersonInfo
            info={realData}
            handleCancel={() => {
              handleUp()
              setModalVisible(false)
            }}
          />
        )}
        {type === 3 && (
          <MetalPersonInfo
            info={metalData}
            handleCancel={() => {
              handleUp()
              setModalVisible(false)
            }}
          />
        )}
        {type === 4 && (
          <Principal
            info={mianData}
            handleCancel={() => {
              handleUp()
              setModalVisible(false)
            }}
          />
        )}
        {type === 5 && (
          <FinancePrincipal
            info={financeData}
            handleCancel={() => {
              handleUp()
              setModalVisible(false)
            }}
          />
        )}
      </Modal>
    </>
  )
}

export default CompanyPeople
