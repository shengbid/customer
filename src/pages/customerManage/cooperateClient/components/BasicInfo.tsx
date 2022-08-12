import React, { useState, useEffect } from 'react'
import { getCompanyDetail } from '@/services'
import { Button } from 'antd'
import ComCard from '@/components/ComPage/ComCard'
import CompanyBasicInfo from '@/pages/approvalPage/businessDetail/creditDetail/companyBasicInfo'
import Descriptions from '@/components/ComPage/Descriptions'
import DictShow from '@/components/ComSelect/dictShow'
import SignPerson from './SignPerson'

const { DescriptionsItem } = Descriptions
interface basicProps {
  companyId: number
}

const CreditBasic: React.FC<basicProps> = ({ companyId }) => {
  const [companyData, setCompanyData] = useState<any>({})
  const [legalData, setLegalData] = useState<any>({})

  // 获取企业信息
  const getDetail = async () => {
    const { data } = await getCompanyDetail(companyId)
    setCompanyData(data)
  }
  // 获取企业相关人员信息
  const getLegalDetail = async () => {
    const { data } = await getCompanyDetail(companyId)
    setLegalData(data)
  }

  useEffect(() => {
    getDetail()
    getLegalDetail()
  }, [])

  const handleUpdate = () => {}

  // 修改企业相关人员信息
  const editReatePerson = () => {}

  return (
    <>
      {/* 企业基础信息 */}
      <div style={{ padding: 24, backgroundColor: '#fff' }}>
        <CompanyBasicInfo infoData={companyData} handleUpdate={handleUpdate} />
      </div>
      <ComCard
        style={{ marginTop: 12 }}
        title="企业相关人员信息"
        extra={
          <Button type="primary" onClick={editReatePerson}>
            编辑
          </Button>
        }
      >
        <Descriptions>
          <DescriptionsItem label="法人/董事姓名">{legalData.name}</DescriptionsItem>
          <DescriptionsItem label="身份证件类型">
            <DictShow dictValue={legalData.identityType} dictkey="cus_sfzlx" />
          </DescriptionsItem>
          <DescriptionsItem label="证件号码">{legalData.identityNumber}</DescriptionsItem>
        </Descriptions>
      </ComCard>
      {/* 签约经办人 */}
      <SignPerson />
    </>
  )
}

export default CreditBasic
