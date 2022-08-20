import React, { useState, useEffect } from 'react'
import { getCooperateBasic, getCooperateLegal } from '@/services'
import { Button } from 'antd'
import ComCard from '@/components/ComPage/ComCard'
import CompanyBasicInfo from '@/pages/approvalPage/businessDetail/credit/creditDetail/companyBasicInfo'
import Descriptions from '@/components/ComPage/Descriptions'
import DictShow from '@/components/ComSelect/dictShow'
import SignPerson from './SignPerson'
import EditLegal from './editLegal'

const { DescriptionsItem } = Descriptions
interface basicProps {
  companyId: string
}

const CreditBasic: React.FC<basicProps> = ({ companyId }) => {
  const [companyData, setCompanyData] = useState<any>({})
  const [legalData, setLegalData] = useState<any>({ hzEnterpriseId: companyId })
  const [legalVisible, setlegalVisible] = useState<boolean>(false)

  // 获取企业信息
  const getDetail = async () => {
    const { data } = await getCooperateBasic(companyId)
    if (data) {
      setCompanyData(data)
    }
  }
  // 获取企业相关人员信息
  const getLegalDetail = async () => {
    const { data } = await getCooperateLegal(companyId)
    if (data) {
      setLegalData(data)
    }
  }

  useEffect(() => {
    getDetail()
    getLegalDetail()
  }, [])

  const handleUpdate = () => {
    getDetail()
  }

  return (
    <>
      {/* 企业基础信息 */}
      <div style={{ padding: 24, backgroundColor: '#fff' }}>
        <CompanyBasicInfo type={1} infoData={companyData} handleUpdate={handleUpdate} />
      </div>
      <ComCard
        style={{ marginTop: 12 }}
        title="企业相关人员信息"
        extra={
          <Button
            type="primary"
            onClick={() => {
              setlegalVisible(true)
            }}
          >
            编辑
          </Button>
        }
      >
        <Descriptions>
          <DescriptionsItem label="法人/董事姓名">{legalData.frName}</DescriptionsItem>
          <DescriptionsItem label="身份证件类型">
            <DictShow dictValue={legalData.identityType} dictkey="cus_sfzlx" />
          </DescriptionsItem>
          <DescriptionsItem label="证件号码">{legalData.identityNumber}</DescriptionsItem>
        </Descriptions>
      </ComCard>
      {/* 签约经办人 */}
      <SignPerson type={1} companyId={companyId} />

      {/* 修改法人 */}
      <EditLegal
        modalVisible={legalVisible}
        infoData={legalData}
        handleCancel={(val?: number) => {
          if (val) {
            getLegalDetail()
          }
          setlegalVisible(false)
        }}
      />
    </>
  )
}

export default CreditBasic
