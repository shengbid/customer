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
}

const CompanyBasicInfo: React.FC<companyProps> = ({ infoData, handleUpdate, isDetail = false }) => {
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
          <DictShow dictValue={companyData.registerAddr} dictkey="company_register" />
        </DescriptionsItem>
        <DescriptionsItem label="企业编号（注册编号\社会信用代码）">
          {formatEmpty(companyData.enterpriseNumber)}
        </DescriptionsItem>
        <DescriptionsItem label="注册地址">
          {formatEmpty(companyData.registerDetails)}
        </DescriptionsItem>
      </Descriptions>

      {/* 修改企业信息 */}
      <EditCompany
        info={companyData.id}
        modalVisible={companyVisible}
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
