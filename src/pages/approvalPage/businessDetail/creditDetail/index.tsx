import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'
import CompanyInfo from './companyInfo'
import { getCreditDetail } from '@/services'
import CompanyPeople from './companyPeople'

interface creditprops {
  id: string
  isDetail?: boolean
}
const CreditDetail: React.FC<creditprops> = ({ id, isDetail = false }) => {
  const [infoData, setInfoData] = useState({})
  const [spinning, setSpinning] = useState(true)
  // 获取授信详情
  const getCredit = async () => {
    const { data } = await getCreditDetail(id)
    setSpinning(false)
    setInfoData(data)
  }

  useEffect(() => {
    getCredit()
  }, [])

  return (
    <Spin spinning={spinning}>
      <CompanyInfo handleUpdate={getCredit} isDetail={isDetail} infoData={infoData} />
      <CompanyPeople handleUp={getCredit} isDetail={isDetail} infoData={infoData} />
    </Spin>
  )
}

export default CreditDetail
