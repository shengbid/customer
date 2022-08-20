import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import Descriptions from '@/components/ComPage/Descriptions'
import DictShow from '@/components/ComSelect/dictShow'
import { formatEmpty } from '@/utils/base'
import EditCompany from '../editComponents/editCompany'

const { DescriptionsItem } = Descriptions

interface companyProps {
  infoData: any
  isDetail?: boolean
  handleUpdate: () => void
  type?: number // 1合作企业基础信息 默认借款企业基础信息
}

const CompanyBasicInfo: React.FC<companyProps> = ({
  infoData,
  handleUpdate,
  isDetail = false,
  type,
}) => {
  const [companyVisible, setComapnyVisible] = useState<boolean>(false)
  const [companyData, setCompanyData] = useState<any>({})

  useEffect(() => {
    if (infoData && infoData.id) {
      setCompanyData(infoData)
    }
  }, [infoData])

  return (
    <>
      <Descriptions
        title="企业基础信息"
        extra={
          !isDetail && (
            <Button type="primary" onClick={() => setComapnyVisible(true)}>
              编辑
            </Button>
          )
        }
      >
        <DescriptionsItem label="企业名称">{companyData.fullName}</DescriptionsItem>
        <DescriptionsItem label="企业注册所在地区">
          <DictShow
            dictValue={type === 1 ? companyData.companyRegister : companyData.registerAddr}
            dictkey="company_register"
          />
        </DescriptionsItem>
        <DescriptionsItem label="企业编号（注册编号\社会信用代码）">
          {formatEmpty(type === 1 ? companyData.enterpriseCode : companyData.enterpriseNumber)}
        </DescriptionsItem>
        <DescriptionsItem label="注册地址">
          {formatEmpty(type === 1 ? companyData.registrationAddress : companyData.registerDetails)}
        </DescriptionsItem>
      </Descriptions>

      {/* 修改企业信息 */}
      <EditCompany
        info={companyData.id}
        modalVisible={companyVisible}
        infoData={infoData}
        type={type}
        handleCancel={(val: any) => {
          setComapnyVisible(false)
          if (val === 1) {
            handleUpdate()
          }
        }}
      />
    </>
  )
}

export default CompanyBasicInfo
